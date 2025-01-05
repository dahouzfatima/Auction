import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ObjetX from "./components/Objet";
import Preview from "./pages/preview";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },{
        path:'/preview',
        element:<Preview />
    }
])
export default router;