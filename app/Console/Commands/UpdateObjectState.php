<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Objet;
use Carbon\Carbon;

class UpdateObjectState extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:update-object-state';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Met à jour l\'état des objets à "en_attente" si la date de départ est dépassée';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $objets = Objet::where('dateDepart', '<=', Carbon::now()) 
               ->where('dateFin', '>', Carbon::now())    
               ->where('etat', '!=', 'en_cours')        
               ->get();

        foreach ($objets as $objet) {
            $objet->etat = 'en_cours';
            $objet->save();

            $this->info("Objet ID {$objet->id} mis à jour : état=en_attente");
        }

        $this->info('Vérification des objets terminée.');
    }
}