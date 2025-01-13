<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Objet;
use App\Models\Enchere;
use Carbon\Carbon;
use App\Events\ObjectUpdated; // Importer l'événement


class CheckExpiredObjects extends Command
{
    /**
     * Nom et signature de la commande.
     */
    protected $signature = 'objects:check-expired';

    /**
     * Description de la commande.
     */
    protected $description = 'Vérifie les enchères expirées, attribue l\'acheteur_id et met à jour l\'état';

    /**
     * Exécute la commande.
     */
    public function handle()
    {
        // Récupérer tous les objets dont la date de fin est atteinte et qui ne sont pas encore terminés
        $objets = Objet::where('dateFin', '<=', Carbon::now())
                       ->where('etat', '!=', 'termine')
                       ->get();

        foreach ($objets as $objet) {
            // Trouver la dernière enchère pour cet objet
            $dernierEnchere = Enchere::where('objet_id', $objet->id)
                                     ->orderBy('created_at', 'desc')
                                     ->first();

            if ($dernierEnchere) {
                // Mettre à jour l'acheteur_id avec prop_id de la dernière enchère
                $objet->acheteur_id = $dernierEnchere->prop_id;
            }

            // Mettre à jour l'état de l'objet à "terminé"
            $objet->etat = 'termine';
            $objet->save();

            $this->info("Objet ID {$objet->id} mis à jour : état=terminé, acheteur_id={$objet->acheteur_id}");
            //event(new ObjectUpdated($objet));

        }

        $this->info('Vérification des enchères terminée.');
    }
}
