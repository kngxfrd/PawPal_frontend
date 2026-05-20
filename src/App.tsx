import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Userpage from "./pages/Userpage";

import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Guard internal dashboard and profile routes */}
      <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
      <Route path="/home" element={user ? <Userpage /> : <Navigate to="/login" />} />
      
      {/* Catch-all wildcard routes redirect to dashboard if authenticated, otherwise to landing */}
      <Route path="*" element={<Navigate to={user ? "/home" : "/"} />} />
    </Routes>
  );
}

export default App;
