import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Interactions from "./pages/Interactions";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Chargement...
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/clients"
        element={user ? <Clients /> : <Navigate to="/login" />}
      />
      <Route
        path="/interactions"
        element={user ? <Interactions /> : <Navigate to="/login" />}
      />
      <Route
        path="/"
        element={<Navigate to={user ? "/dashboard" : "/login"} />}
      />
    </Routes>
  );
}

export default App;
