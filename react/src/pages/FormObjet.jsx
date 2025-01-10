import React, { useState } from "react";
import NavbarL from "../components/NavBar";
import AddObjet from "../components/AddObjet";
import FooterL from "../components/FooterL";

const FormObjet = () => {
  return(
        <>
            <NavbarL></NavbarL>
            <AddObjet></AddObjet>
            <FooterL></FooterL>
        </>
  );
};

export default FormObjet;