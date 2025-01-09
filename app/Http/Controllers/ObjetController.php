<?php

namespace App\Http\Controllers;

use App\Models\Objet;
use Illuminate\Http\Request;
use App\Models\User;
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
        $objets = $query->paginate(8);
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
public function getUserEncheres($userId)
{
    $user = User::find($userId);  // Utilisation de find() pour récupérer l'utilisateur par son ID

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }
    $encheres = $user->encheres()->with(['objet', 'prop'])->paginate(6);

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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // Utilisation de findOrFail pour récupérer l'objet ou renvoyer une erreur 404
        $objet = Objet::findOrFail($id);

        return response()->json($objet);
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
