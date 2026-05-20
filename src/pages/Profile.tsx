import { useState } from "react";
import { IoArrowBackOutline, IoExitOutline, IoLocationOutline, IoPawOutline, IoCalendarOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import { LiaUser } from "react-icons/lia";
import { FiEdit2, FiPhone, FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();
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
    <div className="flex flex-col px-4 md:px-10 py-8 pb-20 w-full min-h-screen bg-gray-50 font-inter">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-[#155dfc] font-medium text-sm mb-6 transition-all duration-300 w-max"
      >
        <IoArrowBackOutline size={20} />
        Back
      </button>

      {/* Main Profile Container */}
      <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
        
        {/* Header Card with Banner */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden relative transition-all duration-300 hover:shadow-md">
          {/* Cover Banner */}
          <div className="h-40 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 relative">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          <div className="px-6 sm:px-10 pb-8 pt-0 relative">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 -mt-12 sm:-mt-16">
              
              {/* Avatar + name */}
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5">
                <div className="relative group">
                  <div className="text-white border-4 border-white w-28 h-28 sm:w-32 sm:h-32 flex justify-center items-center rounded-full bg-gradient-to-br from-[#155dfc] to-blue-400 shrink-0 shadow-lg relative z-10 overflow-hidden transition-transform duration-300 hover:scale-105">
                    <LiaUser size={70} />
                  </div>
                  {editing && (
                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center z-20 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                      <FiEdit2 className="text-white text-xl" />
                    </div>
                  )}
                </div>
                
                <div className="text-center sm:text-left mb-2">
                  {editing ? (
                    <input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your Name"
                      className="text-[26px] font-bold border-b-2 border-[#155dfc] outline-none bg-transparent text-gray-800 placeholder-gray-300 w-full sm:w-auto"
                    />
                  ) : (
                    <h1 className="text-[26px] font-bold text-gray-800 leading-tight">{fullName || "Your Name"}</h1>
                  )}
                  <span className={`text-xs font-bold px-3 py-1 rounded-full mt-2 inline-flex items-center gap-1 uppercase tracking-wider
                    ${user?.role === "groomer"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-blue-100 text-[#155dfc]"
                    }`}
                  >
                    {user?.role === "groomer" ? "Groomer" : "Pet Owner"}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-4 sm:mt-0 mb-2 justify-center">
                {editing ? (
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#155dfc] to-blue-600 text-white font-medium text-sm rounded-xl px-6 h-11 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <IoCheckmarkCircleOutline size={18} /> Save Changes
                  </button>
                ) : (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 font-medium text-sm rounded-xl px-5 h-11 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
                  >
                    <FiEdit2 size={16} /> Edit Profile
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-50 text-red-600 border border-red-100 font-medium text-sm rounded-xl px-5 h-11 hover:bg-red-100 transition-all duration-300"
                >
                  <IoExitOutline size={18} /> Logout
                </button>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-gray-100">
              <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-blue-50/50 hover:bg-blue-50 transition-colors">
                <div className="bg-blue-100 p-2 rounded-full text-blue-600 mb-2">
                  <IoCalendarOutline size={20} />
                </div>
                <p className="text-2xl font-black text-gray-800">{bookings.length}</p>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-1">Bookings</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-purple-50/50 hover:bg-purple-50 transition-colors">
                <div className="bg-purple-100 p-2 rounded-full text-purple-600 mb-2">
                  <IoPawOutline size={20} />
                </div>
                <p className="text-2xl font-black text-gray-800">{pets.length}</p>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-1">Pets</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-green-50/50 hover:bg-green-50 transition-colors">
                <div className="bg-green-100 p-2 rounded-full text-green-600 mb-2">
                  <IoCheckmarkCircleOutline size={20} />
                </div>
                <p className="text-2xl font-black text-gray-800">
                  {bookings.filter((b: any) => b.status === "completed").length}
                </p>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-1">Completed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Details card */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 transition-all duration-300 hover:shadow-md">
            <h2 className="font-bold text-xl text-gray-800 mb-6 flex items-center gap-2">
              Personal Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Email Address</label>
                <div className="flex items-center gap-3 h-12 rounded-xl border border-gray-200 bg-gray-50/80 px-4 transition-colors">
                  <FiMail size={18} className="text-gray-400" />
                  <span className="text-[15px] text-gray-700 font-medium truncate">{user?.email || "No email provided"}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Phone Number</label>
                <div className={`flex items-center gap-3 h-12 rounded-xl border ${editing ? 'border-[#155dfc] bg-white ring-2 ring-blue-50' : 'border-gray-200 bg-gray-50/80'} px-4 transition-all duration-300`}>
                  <FiPhone size={18} className={editing ? "text-[#155dfc]" : "text-gray-400"} />
                  {editing ? (
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter phone number"
                      className="flex-1 bg-transparent text-[15px] font-medium text-gray-800 outline-none placeholder-gray-300"
                    />
                  ) : (
                    <span className="text-[15px] text-gray-700 font-medium">{phone || "Not set"}</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Location</label>
                <div className={`flex items-center gap-3 h-12 rounded-xl border ${editing ? 'border-[#155dfc] bg-white ring-2 ring-blue-50' : 'border-gray-200 bg-gray-50/80'} px-4 transition-all duration-300`}>
                  <IoLocationOutline size={20} className={editing ? "text-[#155dfc]" : "text-gray-400"} />
                  {editing ? (
                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter your location (e.g. Accra, Ghana)"
                      className="flex-1 bg-transparent text-[15px] font-medium text-gray-800 outline-none placeholder-gray-300"
                    />
                  ) : (
                    <span className="text-[15px] text-gray-700 font-medium">{location || "Not set"}</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Bio</label>
                <div className={`rounded-xl border ${editing ? 'border-[#155dfc] bg-white ring-2 ring-blue-50' : 'border-gray-200 bg-gray-50/80'} px-4 py-3 transition-all duration-300`}>
                  {editing ? (
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us about yourself and your pets..."
                      rows={4}
                      className="w-full bg-transparent text-[15px] font-medium text-gray-800 outline-none resize-none placeholder-gray-300"
                    />
                  ) : (
                    <p className="text-[15px] text-gray-700 font-medium leading-relaxed min-h-[60px]">{bio || "No bio yet. Click edit to add a little about yourself!"}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Recent bookings sidebar */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 transition-all duration-300 hover:shadow-md h-max">
            <h2 className="font-bold text-xl text-gray-800 mb-6">Recent Bookings</h2>
            
            {bookings.length > 0 ? (
              <div className="flex flex-col gap-4">
                {bookings.slice(0, 4).map((b: any) => (
                  <div key={b.id} className="flex flex-col gap-2 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-100 transition-colors group">
                    <div className="flex justify-between items-start">
                      <p className="text-[15px] font-bold text-gray-800 group-hover:text-[#155dfc] transition-colors">{b.groomer}</p>
                      <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wide
                        ${b.status === "confirmed" ? "bg-green-100 text-green-700" :
                          b.status === "pending"   ? "bg-yellow-100 text-yellow-700" :
                          "bg-blue-100 text-[#155dfc]"}`}
                      >
                        {b.status}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 font-medium gap-3">
                      <span className="flex items-center gap-1"><IoPawOutline size={14}/> {b.pet}</span>
                      <span className="text-gray-300">•</span>
                      <span className="flex items-center gap-1"><IoCalendarOutline size={14}/> {b.date}</span>
                    </div>
                  </div>
                ))}
                {bookings.length > 4 && (
                  <button className="text-[#155dfc] font-semibold text-sm hover:underline mt-2">
                    View all bookings
                  </button>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-10 px-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <div className="bg-white p-3 rounded-full shadow-sm mb-3 text-gray-400">
                  <IoCalendarOutline size={24} />
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-1">No bookings yet</p>
                <p className="text-xs text-gray-400">Your recent appointments will show up here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;