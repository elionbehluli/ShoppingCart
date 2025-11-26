<?php

namespace App\Jobs;

use App\Mail\LowStockEmail;
use App\Models\Product;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class SendLowStockEmail implements ShouldQueue
{
    use Queueable;
    protected Product $product;
    /**
     * Create a new job instance.
     */
    public function __construct(Product $product)
    {
        $this->product = $product;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $email = new LowStockEmail($this->product);
        Mail::to('admin@gmail.com')->send($email);
    }
}
