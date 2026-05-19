import { useState } from "react";
import { LuPawPrint } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"pet_owner" | "groomer">("pet_owner");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const err = login(email, password, role);
    if (err) { setError(err); return; }
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-[420px] bg-white rounded-2xl shadow-md p-8 flex flex-col gap-5">
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <LuPawPrint size={36} color="#155dfc" />
            <h1 className="font-bold text-[24px]">PAWPAL GH</h1>
          </div>
          <p className="text-gray-400 text-sm">Welcome back</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setRole("pet_owner")}
            className={`flex-1 h-10 rounded-xl border text-sm font-medium transition-colors
              ${role === "pet_owner"
                ? "border-[#155dfc] text-[#155dfc] bg-blue-50"
                : "border-gray-200 text-gray-400 hover:border-gray-300"
              }`}
          >
            Pet Owner
          </button>
          <button
            onClick={() => setRole("groomer")}
            className={`flex-1 h-10 rounded-xl border text-sm font-medium transition-colors
              ${role === "groomer"
                ? "border-[#155dfc] text-[#155dfc] bg-blue-50"
                : "border-gray-200 text-gray-400 hover:border-gray-300"
              }`}
          >
            Groomer
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-xs bg-red-50 px-3 py-2 rounded-lg">{error}</p>
        )}
        <div className="flex flex-col gap-3">

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Email</label>
            <div className="flex items-center gap-3 h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 focus-within:border-[#155dfc]">
              <HiOutlineMail size={16} className="text-gray-400 shrink-0" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-600">Password</label>
              <p className="text-xs text-[#155dfc] cursor-pointer hover:underline">
                Forgot Password?
              </p>
            </div>
            <div className="flex items-center gap-3 h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 focus-within:border-[#155dfc]">
              <RiLockPasswordLine size={16} className="text-gray-400 shrink-0" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••••"
                className="flex-1 bg-transparent text-sm outline-none"
              />
            </div>
          </div>

        </div>

        <button
          onClick={handleLogin}
          className="w-full h-11 rounded-xl bg-[#155dfc] hover:bg-blue-700 text-white text-sm font-medium transition-colors"
        >
          Login
        </button>

        <p className="text-xs text-center text-gray-400">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-[#155dfc] font-medium hover:underline"
          >
            Register
          </button>
        </p>

      </div>
    </div>
  );
}

export default Login;