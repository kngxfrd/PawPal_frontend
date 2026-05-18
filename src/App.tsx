import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Userpage from "./pages/Userpage";
import GroomerPage from "./pages/GroomerPage";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login"   element={<Login />} />
      <Route path="/signup"  element={<Signup />} />
      <Route path="/profile" element={<Profile />} />

      <Route
        path="/home"
        element={
          !user ? <Navigate to="/login" /> :
          user.role === "groomer" ? <GroomerPage /> :
          <Userpage />
        }
      />

      <Route path="*" element={<Navigate to={user ? "/home" : "/login"} />} />
    </Routes>
  );
}

export default App;