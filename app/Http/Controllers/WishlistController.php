<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WishlistController extends Controller
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
    public function store(Request $request)
{
    $user = auth()->user();

    $exists = $user->wishlist()->where('objet_id', $request->objet_id)->exists();

    if ($exists) {
        $user->wishlist()->detach($request->objet_id);
        return response()->json(['message' => 'Item removed from wishlist'], 200);
    }
    else{
        $user->wishlist()->attach($request->objet_id);
        return response()->json(['message' => 'Item added to wishlist'], 201);
    }


}


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getWishList(Request $request){
        $user = auth()->user();
        $wishedListItems=$user->wishlist()->get();
        return response()->json( $wishedListItems);
    }

    public function getWishListUser(Request $request){
        $user = auth()->user();
        $wishlistItems = $user->wishlist()
        ->where('etat', '!=', 'termine')
        ->paginate(5);
        return response()->json( $wishlistItems);
    }
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
