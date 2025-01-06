import { Navigate } from "react-router-dom";
import { userStateContext } from "../contexts/ContextProvider.jsx";

export default function ProtectedRoute({ children }) {
    const { userToken } = userStateContext();

    if (userToken) {
        return <Navigate to="/preview" />;
    }

    return children;
}
