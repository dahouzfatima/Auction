import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ObjetX from "./components/Objet";
import Preview from "./pages/preview";
import Authentification from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    }, {
        path: '/preview',
        element: <Preview />
    }, {
        path: '/login',
        element: <Authentification/>
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
        element: <Dashboard />}
])
export default router;