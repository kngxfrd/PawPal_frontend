import { useState } from "react";
import { LuPawPrint } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"pet_owner" | "groomer">("pet_owner");
  const [error, setError] = useState("");
  const handleSignup = () => {
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required");
      return;
    }
    const err = signup(fullName, email, password, role);
    if (err) {
      setError(err);
      return;
    }
    navigate("/home");
  };
  return (
    <div>
      <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className=" flex flex-col items-center justify-center text-center w-100 h-140 border border-gray-200 rounded-lg py-6 bg-white shadow-lg">
          <div className="flex items-center justify-center gap-1 cursor-pointer">
            <LuPawPrint size={40} color="#155dfc" />
            <h1 className="font-bold text-[25px]">PAWPAL GH</h1>
          </div>
          <div className="text-gray-400 text-[15px]">
            <h1>REGISTER</h1>
          </div>
          {error && <p className="text-red-500 text-xs mb-2">{error}</p>}

          <div className="flex gap-3 px-6 mt-3 w-full h-8">
            <button
              onClick={() => setRole("pet_owner")}
              className={`flex-1 h-8 rounded-md border text-sm transition-colors
                  ${
                    role === "pet_owner"
                      ? "border-[#155dfc] text-[#155dfc] bg-blue-50"
                      : "border-gray-300 text-gray-500"
                  }`}
            >
              Pet Owner
            </button>
            <button
              onClick={() => setRole("groomer")}
              className={`flex-1 h-8 rounded-md border text-sm transition-colors
                  ${
                    role === "groomer"
                      ? "border-[#155dfc] text-[#155dfc] bg-blue-50"
                      : "border-gray-300 text-gray-500"
                  }`}
            >
              Groomer
            </button>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-left pl-6 text-sm pt-3">
              Full Name
            </label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Full Name"
              className="w-85 h-12 rounded-md bg-gray-100 pl-4 mx-6 "
            />

            <label htmlFor="" className="text-left pl-6 text-sm pt-3">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              placeholder="your@email.com"
              className="w-85 h-12 rounded-md bg-gray-100 pl-4 mx-6 "
            />
            <label htmlFor="" className="text-left pl-6 text-sm pt-3">
              Phone
            </label>
            <div className="flex px-6">
              <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 text-sm font-medium">
                +233
              </div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                placeholder="244xxxxx"
                className="w-65 h-12 rounded-md bg-gray-100 pl-4 mx-6 "
              />
            </div>
            <label htmlFor="" className="text-left pl-6 text-sm pt-3">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              placeholder="••••••••••"
              className="w-85 h-12 rounded-md bg-gray-100 pl-4 mx-6"
            />
            <p className="text-xs text-left pl-6 mt-1">Forgot Password?</p>
          </div>
          <div className="flex flex-col gap 6 pt-4 gap-2">
            <div className="flex justify-center">
              <button
                onClick={handleSignup}
                className="w-85 rounded-md bg-[#155dfc] text-white text-sm border border-[#6c63ff] h-9 "
              >
                Register
              </button>
            </div>
          </div>

          <div className="text-xs pt-3 flex flex-row justify-center gap-1">
            <p>Already have an account?</p>
            <button onClick={() => navigate("/login")}>
              <u>Login</u>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
