<?php

use Illuminate\Support\Facades\Schedule;

Schedule::command('app:send-daily-sales-email')->dailyAt('23:58');
