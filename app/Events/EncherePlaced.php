<?php
namespace App\Events;

use App\Models\Enchere;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable; // Importation correcte du trait Dispatchable
use Illuminate\Queue\SerializesModels;
class EncherePlaced implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $enchere;

    public function __construct(Enchere $enchere)
    {
        $this->enchere = $enchere;
    }

    public function broadcastOn()
    {
        return new Channel('enchere.' . $this->enchere->objet_id);
    }
    
    public function broadcastWith()
    {
        return [
            'id' => $this->enchere->id,
            'prix' => $this->enchere->prix,
            'objet_id' => $this->enchere->objet_id,
        ];
    }
}
