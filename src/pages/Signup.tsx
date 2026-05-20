import { useState } from "react";
import { LuPawPrint } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiUser, FiPhone } from "react-icons/fi";
import type { RegisterPayload } from "../services/auth";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<"owner" | "groomer">("owner");

  const [form, setForm] = useState<RegisterPayload>({
    first_name: "",
    last_name: "",
    phone_number: "",
    role: "owner",
    email: "",
    password: "",
    password_confirm:"",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const errMsg = await signup({ ...form, role });
      if (errMsg) {
        setError(errMsg);
      } else {
        setSuccessMessage(
          `Account created! Welcome, ${form.first_name || "there"}`
        );
        setTimeout(() => navigate("/home"), 1500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-[420px] min-h-screen bg-white rounded-2xl shadow-md p-8 flex flex-col gap-5">
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <LuPawPrint size={36} color="#155dfc" />
            <h1 className="font-bold text-[24px]">PAWPAL GH</h1>
          </div>
          <p className="text-gray-400 text-sm">Create your account</p>
        </div>
        {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
        {successMessage && (
          <p style={{ color: "green", fontSize: "12px" }}>{successMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setRole("owner")}
              className={`flex-1 h-10 rounded-xl border text-sm font-medium transition-colors
                ${
                  role === "owner"
                    ? "border-[#155dfc] text-[#155dfc] bg-blue-50"
                    : "border-gray-200 text-gray-400 hover:border-gray-300"
                }`}
            >
              Pet Owner
            </button>
            <button
              type="button"
              onClick={() => setRole("groomer")}
              className={`flex-1 h-10 rounded-xl border text-sm font-medium transition-colors
                ${
                  role === "groomer"
                    ? "border-[#155dfc] text-[#155dfc] bg-blue-50"
                    : "border-gray-200 text-gray-400 hover:border-gray-300"
                }`}
            >
              Groomer
            </button>
          </div>
          <div className="flex flex-col gap-3 mt-2">
            <div className="flex gap-3">
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm font-medium text-gray-600">
                  First Name
                </label>
                <div className="flex items-center gap-3 h-11 rounded-xl border w-40 border-gray-200 bg-gray-50 px-4 focus-within:border-[#155dfc]">
                  <FiUser size={15} className="text-gray-400 shrink-0" />
                  <input
                    id="first_name"
                    name="first_name"
                    required
                    value={form.first_name}
                    onChange={handleChange}
                    placeholder="John"
                    className="flex-1 bg-transparent text-sm outline-none "
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm font-medium text-gray-600">
                  Last Name
                </label>
                <div className="flex items-center gap-3 h-11 rounded-xl border w-45 border-gray-200 bg-gray-50 px-4 focus-within:border-[#155dfc]">
                  <FiUser size={15} className="text-gray-400 shrink-0" />
                  <input
                    id="last_name"
                    name="last_name"
                    required
                    value={form.last_name}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="flex-1 bg-transparent text-sm outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Email</label>
              <div className="flex items-center gap-3 h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 focus-within:border-[#155dfc]">
                <HiOutlineMail size={16} className="text-gray-400 shrink-0" />
                <input
                  id="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent text-sm outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Phone</label>
              <div className="flex items-center h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 gap-2 focus-within:border-[#155dfc]">
                <FiPhone size={15} className="text-gray-400 shrink-0" />
                <span className="text-sm font-medium text-gray-500 border-r border-gray-200 pr-2">
                  +233
                </span>
                <input
                  id="phone_number"
                  name="phone_number"
                  required
                  value={form.phone_number}
                  onChange={handleChange}
                  type="tel"
                  placeholder="244 xxx xxx"
                  className="flex-1 bg-transparent text-sm outline-none"
                />
              </div>
            </div>

            {/* <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">
                Password
              </label>
              <div className="flex items-center gap-3 h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 focus-within:border-[#155dfc]">
                <RiLockPasswordLine
                  size={16}
                  className="text-gray-400 shrink-0"
                />
                <input
                  id="password"
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="••••••••••"
                  className="flex-1 bg-transparent text-sm outline-none"
                />
              </div>
            </div> */}
            <div className="flex gap-3">
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm font-medium text-gray-600">
                  Password 
                </label>
                <div className="flex items-center gap-3 h-11 rounded-xl border w-40 border-gray-200 bg-gray-50 px-4 focus-within:border-[#155dfc]">
                  <RiLockPasswordLine size={15} className="text-gray-400 shrink-0" />
                  <input
                    id="password"
                  name="password"
                  required
                  type="password"
                  value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••••"
                    className="flex-1 bg-transparent text-sm outline-none "
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm font-medium text-gray-600">
                  Confirm Password 
                </label>
                <div className="flex items-center gap-3 h-11 rounded-xl border w-40 border-gray-200 bg-gray-50 px-4 focus-within:border-[#155dfc]">
                  <RiLockPasswordLine size={15} className="text-gray-400 shrink-0" />
                  <input
                    id="password_confirm"
                    name="password_confirm"
                    required
                    value={form.password_confirm}
                    onChange={handleChange}
                    type="password"
                    placeholder="••••••••••"
                    className="flex-1 bg-transparent text-sm outline-none "
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-[#155dfc] hover:bg-blue-700 text-white text-sm font-medium transition-colors mt-5"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
          <p className="text-xs text-center text-gray-400 mt-3">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-[#155dfc] font-medium hover:underline"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
