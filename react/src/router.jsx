import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ObjetX from "./components/Objet";
import Preview from "./pages/preview";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Authentification from "./pages/Auth";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },{
        path:'/preview',
        element:<Preview />
    },{
        path:'/login',
        element:<Login />
    },{
        path:'/signup',
        element:<SignUp />
    }
    ,{
        path:'/Auth',
        element:<Authentification />
    }
])
export default router;