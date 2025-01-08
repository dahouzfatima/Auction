import { useEffect, useState } from "react";
import Objet from "../components/Objet";
import Banner from "../components/ObjetDetails";
import { Footer } from "../components/Footer";
import ObjetDetails from "../components/ObjetDetails";
import ObjetSimilaire from "../components/ObjetSimilaire";
import Header from "../components/NavBar";

export default function PlaceBid() {

    return (
        <>
            <Header></Header>
            <ObjetDetails></ObjetDetails>
            <ObjetSimilaire></ObjetSimilaire>
            <Footer></Footer>

        </>
    );
}