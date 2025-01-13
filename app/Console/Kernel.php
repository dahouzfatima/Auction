<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

use App\Console\Commands\CheckExpiredObjects;
use App\Console\Commands\UpdateObjectState;

class Kernel extends ConsoleKernel
{
    protected $commands = [
        \App\Console\Commands\CheckExpiredObjects::class,
        \App\Console\Commands\UpdateObjectState::class,
    ];
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')->hourly();
        $schedule->command('objects:check-expired')->everyMinute(); // Exécution chaque heure
        $schedule->command('command:update-object-state')->everyMinute();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
