import { Navigate } from "react-router-dom";
import useUserStore from "../store/userStore";

export default function ProtectedRoute({ children }) {
    const { user } = useUserStore();
    if (!localStorage.getItem("token")) return <Navigate to="/login" />;
    return user ? children : <Navigate to="/login" />;
}
