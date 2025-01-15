<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Objet;
use App\Models\Enchere;
use Carbon\Carbon;
use App\Events\ObjectUpdated; 

class CheckExpiredObjects extends Command
{
   
    protected $signature = 'objects:check-expired';

    protected $description = 'Vérifie les enchères expirées, attribue l\'acheteur_id et met à jour l\'état';
    public function handle()
    {
        $objets = Objet::where('dateFin', '<=', Carbon::now())
                       ->where('etat', '!=', 'termine')
                       ->get();
                       
        foreach ($objets as $objet) {
            Objet::where('id', $objet->id)
                       ->update([
                           'etat' => 'termine',
                       ]);
            $dernierEnchere = Enchere::where('objet_id', $objet->id)
                                     ->orderBy('created_at', 'desc')
                                     ->first();
             if ($dernierEnchere) {
                Objet::where('id', $objet->id)
             ->update([
                 'acheteur_id' => $dernierEnchere->prop_id, 
             ]);

             }}

            $this->info("Objet ID {$objet->id} mis à jour : état=terminé, acheteur_id={$objet->acheteur_id}");

        }
    }