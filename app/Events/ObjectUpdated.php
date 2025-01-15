<?php

namespace App\Events;

use App\Models\Objet;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class ObjectUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $objet;

    /**
     * Créer un nouvel événement de mise à jour d'objet
     *
     * @param Objet $objet
     */
    public function __construct(Objet $objet)
    {
        $this->objet = $objet;
    }

    /**
     * Diffuser l'événement sur un canal
     *
     * @return \Illuminate\Broadcasting\Channel
     */
    public function broadcastOn()
    {
        return new Channel('objets');
    }

   
    public function broadcastWith()
    {
        return [
            'objet_id' => $this->objet->id,
            'etat' => $this->objet->etat,
            'acheteur_id' => $this->objet->acheteur_id,
        ];
    }
}
