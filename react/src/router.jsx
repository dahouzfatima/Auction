import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ObjetX from "./components/Objet";
import Preview from "./pages/preview";
import Authentification from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import PlaceBid from "./pages/PlaceBid";
import Homepage from "./pages/Homepage";
import FormObjet from "./pages/FormObjet";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Homepage />
    }, {
        path: '/preview',
        element: <Preview />
    }, {
        path: '/login',
        element: <Authentification />
    }, {
        path: '/signup',
        element: <Authentification />
    }
    , {
        path: '/Auth',
        element: <Authentification />
    }
    , {
        path: '/preview/dashboard',
        element: <Dashboard />
    }
    ,
    {
        path: '/details/:id',
        element: <PlaceBid />
    }
    ,{
        path:'/addObjet',
        element:<FormObjet></FormObjet>
    }

])
export default router;