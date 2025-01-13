<?php

namespace App\Http\Controllers;

use App\Models\Enchere;
use App\Models\Objet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Events\EncherePlaced; 


class EnchereController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request,$id)
    {
        // Validation des données
        $validator = Validator::make($request->all(), [
            'prix' => 'required|numeric|min:0',
            'prop_id' => 'required|integer|exists:users,id', // Vérifie que l'utilisateur existe
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Vérifie que l'objet existe
        $objet = Objet::find($id);
        if (!$objet) {
            return response()->json(['error' => 'Objet non trouvé'], 404);
        }

        // Vérifie si le prix est supérieur au prix actuel
        if ($request->prix <= $objet->prixActuel) {
            return response()->json(['error' => 'Le prix doit être supérieur au prix actuel.'], 400);
        }

        // Insère l'enchère dans la table
        $enchere = Enchere::create([
            'prix' => $request->prix,
            'date' => now(), // Date actuelle
            'prop_id' => $request->prop_id,
            'objet_id' => $id,
        ]);

        // Met à jour le prix actuel de l'objet
        $objet->update(['prixActuel' => $request->prix]);

        //event(new EncherePlaced($enchere));

        return response()->json([
            'message' => 'Enchère placée avec succès.',
            'enchere' => $enchere,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
