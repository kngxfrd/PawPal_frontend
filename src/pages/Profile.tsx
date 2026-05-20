import { useState } from "react";
import { IoArrowBackOutline, IoExitOutline, IoLocationOutline } from "react-icons/io5";
import { LiaUser } from "react-icons/lia";
import { FiEdit2, FiPhone, FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const navigate = useNavigate();
  const { user} = useAuth();
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState(user?.first_name || "");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");

  function handleLogout() {
   localStorage.clear(); 
    navigate("/login");
  }

  const handleSave = () => {
    // save to localStorage for now — replace with API call later
    const updated = { ...user, fullName, phone, location, bio };
    localStorage.setItem("currentUser", JSON.stringify(updated));
    setEditing(false);
  };

  const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
  const pets     = JSON.parse(localStorage.getItem("pets")     || "[]");

  return (
    <div className="flex flex-col px-10 py-8 pb-20 w-full ">
<button
  onClick={() => navigate(-1)}
  className="flex items-center gap-2 text-gray-500 hover:text-[#155dfc] text-sm mb-4 transition-colors"
>
  <IoArrowBackOutline size={18} />
  Back
</button>
      {/* Header card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 w-full">
        <div className="flex items-start justify-between">

          {/* Avatar + name */}
          <div className="flex items-center gap-5">
            <div className="cursor-pointer text-[#155dfc]/70 border-2 border-[#155dfc] w-24 h-24 flex justify-center items-center rounded-full bg-blue-50 shrink-0">
              <LiaUser size={55} />
            </div>
            <div>
              {editing ? (
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="text-[22px] font-bold border-b border-[#155dfc] outline-none bg-transparent"
                />
              ) : (
                <h1 className="text-[22px] font-bold text-gray-800">{fullName || "Your Name"}</h1>
              )}
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block
                ${user?.role === "groomer"
                  ? "bg-purple-50 text-purple-600"
                  : "bg-blue-50 text-[#155dfc]"
                }`}
              >
                {user?.role === "groomer" ? " Groomer" : " Pet Owner"}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {editing ? (
              <button
                onClick={handleSave}
                className="bg-[#155dfc] text-white text-sm rounded-xl px-4 h-9 hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-2 border border-gray-200 text-gray-500 text-sm rounded-xl px-4 h-9 hover:bg-gray-50 transition-colors"
              >
                <FiEdit2 size={13} /> Edit
              </button>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-[#f1f7ff] text-[#155dfc] border border-[#155dfc] text-sm rounded-xl px-4 h-9 hover:bg-blue-50 transition-colors"
            >
              <IoExitOutline size={15} /> Logout
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-6 mt-6 pt-6 border-t border-gray-100">
          <div className="text-center">
            <p className="text-[22px] font-bold text-gray-800">{bookings.length}</p>
            <p className="text-xs text-gray-400">Bookings</p>
          </div>
          <div className="text-center">
            <p className="text-[22px] font-bold text-gray-800">{pets.length}</p>
            <p className="text-xs text-gray-400">Pets</p>
          </div>
          <div className="text-center">
            <p className="text-[22px] font-bold text-gray-800">
              {bookings.filter((b: any) => b.status === "completed").length}
            </p>
            <p className="text-xs text-gray-400">Completed</p>
          </div>
        </div>
      </div>

      {/* Details card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-4">
        <h2 className="font-bold text-[15px] mb-4">Personal Details</h2>

        <div className="flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 font-medium">EMAIL</label>
            <div className="flex items-center gap-3 h-11 rounded-xl border border-gray-200 bg-gray-50 px-4">
              <FiMail size={15} className="text-gray-400" />
              <span className="text-sm text-gray-600">{user?.email}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 font-medium">PHONE</label>
            <div className="flex items-center gap-3 h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 focus-within:border-[#155dfc]">
              <FiPhone size={15} className="text-gray-400" />
              {editing ? (
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className="flex-1 bg-transparent text-sm outline-none"
                />
              ) : (
                <span className="text-sm text-gray-600">{phone || "Not set"}</span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 font-medium">LOCATION</label>
            <div className="flex items-center gap-3 h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 focus-within:border-[#155dfc]">
              <IoLocationOutline size={16} className="text-gray-400" />
              {editing ? (
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your location"
                  className="flex-1 bg-transparent text-sm outline-none"
                />
              ) : (
                <span className="text-sm text-gray-600">{location || "Not set"}</span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 font-medium">BIO</label>
            <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus-within:border-[#155dfc]">
              {editing ? (
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows={3}
                  className="w-full bg-transparent text-sm outline-none resize-none"
                />
              ) : (
                <p className="text-sm text-gray-600">{bio || "No bio yet"}</p>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Recent bookings */}
      {bookings.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-4">
          <h2 className="font-bold text-[15px] mb-4">Recent Bookings</h2>
          <div className="flex flex-col gap-3">
            {bookings.slice(0, 3).map((b: any) => (
              <div key={b.id} className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-gray-800">{b.groomer}</p>
                  <p className="text-xs text-gray-400">🐾 {b.pet} · 📅 {b.date}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium
                  ${b.status === "confirmed" ? "bg-green-50 text-green-600" :
                    b.status === "pending"   ? "bg-yellow-50 text-yellow-600" :
                    "bg-blue-50 text-[#155dfc]"}`}
                >
                  {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default Profile;