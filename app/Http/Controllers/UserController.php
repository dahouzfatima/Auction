<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class UserController extends Controller
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
    public function dashboard(Request $request){
        $user = $request->user();
        $actual_user=User::where('id',$user->id)->get();
        if (!$actual_user) {
            return response()->json(['error' => 'Utilisateur non authentifié'], 401);
        }
    
        // Récupérer les ventes de l'utilisateur
        return response()->json([
            'user' => $user,
            'ventes' => $user->ventes, 
        ]);

    }
    public function dashboardUser(Request $request){
        $user = $request->user();
        $postedItems= $user->ventes()->exists() ? $user->ventes()->count() : 0;
        $winnedItems=$user->achats()->exists()?$user->achats()->count():0;
        $participatedItems=$user->encheres()->select('objet_id')->distinct()->count('objet_id');
        $losedItems=$user->encheres()
        ->select('objet_id') 
        ->distinct()         
        ->whereHas('objet', function ($query) use ($user) {
            $query->whereNotNull('acheteur_id') 
                  ->where('acheteur_id', '!=', $user->id); 
        })
        ->count();
        return response()->json([
            'postedItems' => $postedItems,
            'winnedBids' => $winnedItems, 
            'participatedItems'=>$participatedItems,
            'losedBids'=>$losedItems
        ]);

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
