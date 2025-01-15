<?php

// Inclure l'autoloader de Composer
require __DIR__ . '/vendor/autoload.php';

// Démarrer l'application Laravel
$app = require_once __DIR__ . '/bootstrap/app.php';

// Initialiser le Kernel Laravel
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);

// Afficher un message pour savoir si tout est prêt
echo "Starting scheduler loop...\n";

// Boucle infinie pour exécuter la commande `schedule:run` en continu
while (true) {
    try {
        // Exécuter les commandes planifiées
        $input = new Symfony\Component\Console\Input\StringInput('schedule:run');
        $output = new Symfony\Component\Console\Output\ConsoleOutput();

        // Exécuter la commande planifiée
        $kernel->handle($input, $output);
        
        // Afficher un message à chaque exécution
        echo "Scheduler executed.\n";
        
    } catch (Exception $e) {
        // Afficher une erreur si quelque chose ne va pas
        echo "Error: " . $e->getMessage() . "\n";
    }
    echo "Scheduler loop running...\n";  // Message pour indiquer que la boucle continue
}
