<?php

namespace App\Http\Controllers;

use App\Models\Objet;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Enchere;
use Illuminate\Support\Facades\Auth;

class ObjetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Objet::query();
       if ($request->has('search')) {
        $search = $request->input('search');
        $query->where('titre', 'like', '%' . $search . '%');
        }
        $currentUserId = $request->input('id'); 
        $query->where('vendeur_id', '!=', $currentUserId);
        $objets = $query->where('etat', '!=', 'termine')->paginate(8);
       return response()->json($objets);
    }
    public function getUserSales($userId)
{
    $user = User::find($userId); 

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }
    $sales = $user->ventes()->paginate(6);

    return response()->json($sales);
}
public function store(Request $request)
    {
         // Validation des données
         $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|url', 
            'address' => 'required|string',
            'prixInitial' => 'required',
            'prixActuel'=> 'required',
            'dateDepart' => 'required|date',
            'dateFin' => 'required|date|after:dateDepart',
            'etat' => 'required|in:en_attente,en_cours,termine',
            'vendeur_id' => 'required|exists:users,id',
        ]);
        //dd($validated);
        // Création de l'objet dans la base de données
        $objet = Objet::create($validated);

        return response()->json([
            'message' => 'Objet créé avec succès.',
            'objet' => $objet
        ], 201); // Code HTTP 201 pour la création réussie
    }
public function getUserEncheres($userId)
{
    $user = User::find($userId);

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    // Récupérer les enchères de l'utilisateur avec l'objet associé
    $encheres = $user->encheres()
        ->with(['objet' => function ($query) {
            $query->with(['encheres']);
        }])
        ->get(); // Récupérer toutes les enchères de l'utilisateur

    // Grouper les enchères par objet_id et récupérer la dernière enchère pour chaque objet
    $encheresGrouped = $encheres->groupBy('objet_id')->map(function ($group) {
        // Trier les enchères par date décroissante et récupérer la première (la plus récente)
        return $group->sortByDesc('created_at')->first();
    });

    // Réorganiser les enchères en une collection pour la pagination
    $encheres = new \Illuminate\Pagination\LengthAwarePaginator(
        $encheresGrouped->values(),
        $encheresGrouped->count(),
        6,
        request()->input('page', 1)
    );

    return response()->json($encheres);
}



    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }
    public function wishlistedBy(){
    return $this->belongsToMany(User::class, 'wishlist', 'objet_id', 'user_id')
                ->withTimestamps();}
    public function latestObjects(Request $request)
    {
        $objets = Objet::orderBy('dateDepart', 'desc')->take(10)->get();
        return response()->json($objets);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $objet = Objet::findOrFail($id);  
            return response()->json($objet);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors de la récupération de l\'objet.'], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
