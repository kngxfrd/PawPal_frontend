import { LuPawPrint } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  return (
    <div>
      <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className=" flex flex-col items-center justify-center text-center w-100 h-120 border border-gray-200 rounded-lg py-6 bg-white shadow-lg">
          <div className="flex items-center justify-center gap-1 cursor-pointer">
            <LuPawPrint size={40} color="#155dfc" />
            <h1 className="font-bold text-[25px]">PAWPAL GH</h1>
          </div>
          <div className="text-gray-400 text-[15px]">
            <h1>LOGIN</h1>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-left pl-6 text-sm pt-3">
              Username
            </label>
            <input
              required
              placeholder="Username"
              className="w-85 h-12 rounded-md border border-gray-300 pl-4 mx-6 bg-white"
            />
            <label htmlFor="" className="text-left pl-6 text-sm pt-3">
              Email
            </label>
            <input
              required
              type="email"
              placeholder="your@email.com"
              className="w-85 h-12 rounded-md border border-gray-300 pl-4 mx-6 bg-white"
            />
            <label htmlFor="" className="text-left pl-6 text-sm pt-3">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••••"
              className="w-85 h-12 rounded-md border border-gray-300 pl-4 mx-6 bg-white"
            />
            <p className="text-xs text-left pl-6 mt-1">Forgot Password?</p>
          </div>
          <div className="flex flex-col gap 6 pt-4 gap-2">
            <div className="flex justify-center">
              <button onClick={() => navigate("/home")} className="w-85 rounded-md bg-[#155dfc] text-white text-sm border border-[#6c63ff] h-9 ">
                Login
              </button>
            </div>
          </div>

          <div className="text-xs pt-3 flex flex-row justify-center gap-1">
            <p>Dont have an account?</p>
            <button onClick={() => navigate("/signup")}>
              <u>Register</u>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
