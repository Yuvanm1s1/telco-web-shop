import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded) return null; // Optionally show a loading spinner
  return isSignedIn ? children : <Navigate to="/sign-in" />;
}
