<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;

class DailySalesEmail extends Mailable
{
    use Queueable, SerializesModels;

    public Collection $salesSummary;
    public string $date;

    /**
     * Create a new message instance.
     */
    public function __construct(Collection $salesSummary, string $date)
    {
        $this->salesSummary = $salesSummary;
        $this->date = $date;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Daily Sales Summary - ' . $this->date,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mails.dailySalesEmail',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        $csvData = "Product Name,Price,Quantity Sold,Total Revenue\n";

        foreach ($this->salesSummary as $item) {
            $csvData .= sprintf(
                "\"%s\",%.2f,%d,%.2f\n",
                str_replace('"', '""', $item->name),
                $item->price,
                $item->total_sold,
                $item->total_revenue
            );
        }

        $zipFileName = 'sales_summary_' . $this->date . '.zip';
        $csvFileName = 'sales_summary_' . $this->date . '.csv';
        
        $zipPath = sys_get_temp_dir() . '/' . uniqid() . '.zip';
        
        $zip = new \ZipArchive();
        if ($zip->open($zipPath, \ZipArchive::CREATE) === TRUE) {
            $zip->addFromString($csvFileName, $csvData);
            $zip->close();
        }

        return [
            Attachment::fromPath($zipPath)
                ->as($zipFileName)
                ->withMime('application/zip'),
        ];
    }
}
