<?php

namespace App\Console\Commands;

use App\Mail\DailySalesEmail;
use App\Models\Transaction;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendDailySalesEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-daily-sales-email';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send a daily summary of product sales to the admin';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $date = now()->format('Y-m-d');
        $summary = Transaction::getSalesSummary($date);

        Mail::to('admin@gmail.com')->send(new DailySalesEmail($summary, $date));

        $this->info('Daily sales email sent successfully.');
    }
}
