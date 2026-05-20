import { useState } from "react";
import { IoArrowBackOutline, IoExitOutline, IoLocationOutline, IoPawOutline, IoCalendarOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import { LiaUser } from "react-icons/lia";
import { FiEdit2, FiPhone, FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState(() => {
    if (user?.fullName) return user.fullName;
    if (user?.first_name || user?.last_name) {
      return `${user.first_name || ""} ${user.last_name || ""}`.trim();
    }
    return "";
  });
  const [phone, setPhone] = useState(user?.phone || user?.phone_number || "");
  const [location, setLocation] = useState(user?.location || "");
  const [bio, setBio] = useState(user?.bio || "");

  function handleLogout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    localStorage.removeItem("user_role");
    navigate("/login");
  }

  const handleSave = () => {
    updateUser({ fullName, phone, location, bio });
    setEditing(false);
  };

  const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
  const pets     = JSON.parse(localStorage.getItem("pets")     || "[]");

  return (
    <div className="min-h-screen w-full bg-[#f8fafc]">
      <div className="flex flex-col px-4 md:px-8 py-8 gap-6 max-w-7xl mx-auto w-full font-sans pb-20">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-slate-500 hover:text-[#155dfc] font-bold text-xs transition-colors duration-200 w-max"
        >
          <IoArrowBackOutline size={18} />
          <span>Back</span>
        </button>

        {/* Main Profile Container */}
        <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
          
          {/* Header Card with Banner */}
          <div className="bg-white rounded-2xl shadow-2xs border border-slate-100 overflow-hidden relative transition-all duration-200">
            {/* Cover Banner */}
            <div className="h-40 w-full bg-[#155dfc] border-b border-blue-600/10 relative overflow-hidden">
              {/* Subtle Abstract Wave Vector for high-end SaaS touch */}
              <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,100 C30,40 70,60 100,0 L100,100 Z" fill="currentColor" className="text-white" />
                </svg>
              </div>
            </div>

            <div className="px-6 sm:px-10 pb-8 pt-0 relative">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 -mt-12 sm:-mt-16">
                
                {/* Avatar + name */}
                <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5">
                  <div className="relative group">
                    <div className="text-slate-500 border-4 border-white w-28 h-28 sm:w-32 sm:h-32 flex justify-center items-center rounded-full bg-slate-50 shrink-0 shadow-sm border border-slate-100 relative z-10 overflow-hidden transition-transform duration-300 hover:scale-105">
                      <LiaUser size={70} className="text-slate-400" />
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
                        className="text-[26px] font-bold border-b-2 border-[#155dfc] outline-none bg-transparent text-slate-800 placeholder-slate-300 w-full sm:w-auto"
                      />
                    ) : (
                      <h1 className="text-[26px] font-bold text-slate-800 leading-tight">{fullName || "Your Name"}</h1>
                    )}
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full mt-2 inline-flex items-center gap-1 uppercase tracking-wider
                      ${user?.role === "groomer"
                        ? "bg-purple-50 text-purple-700 border border-purple-100/50"
                        : "bg-blue-50 text-[#155dfc] border border-blue-100/50"
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
                      className="flex items-center gap-2 bg-[#155dfc] hover:bg-blue-600 active:scale-98 text-white font-bold text-xs rounded-xl px-5 h-11 shadow-3xs hover:shadow-2xs transition-all duration-200"
                    >
                      <IoCheckmarkCircleOutline size={18} /> Save Changes
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditing(true)}
                      className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-xl px-5 h-11 hover:bg-slate-50 transition-all shadow-3xs"
                    >
                      <FiEdit2 size={16} /> Edit Profile
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100/80 font-bold text-xs rounded-xl px-5 h-11 transition-all duration-200"
                  >
                    <IoExitOutline size={18} /> Logout
                  </button>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-100">
                <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-slate-100 shadow-2xs hover:shadow-xs hover:border-slate-200/80 transition-all duration-200">
                  <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl mb-2">
                    <IoCalendarOutline size={18} />
                  </div>
                  <p className="text-2xl font-bold text-slate-800">{bookings.length}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Bookings</p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-slate-100 shadow-2xs hover:shadow-xs hover:border-slate-200/80 transition-all duration-200">
                  <div className="bg-purple-50 text-purple-600 p-2.5 rounded-xl mb-2">
                    <IoPawOutline size={18} />
                  </div>
                  <p className="text-2xl font-bold text-slate-800">{pets.length}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Pets</p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-slate-100 shadow-2xs hover:shadow-xs hover:border-slate-200/80 transition-all duration-200">
                  <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl mb-2">
                    <IoCheckmarkCircleOutline size={18} />
                  </div>
                  <p className="text-2xl font-bold text-slate-800">
                    {bookings.filter((b: any) => b.status === "completed").length}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Completed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Details card */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-2xs border border-slate-100 p-6 sm:p-8">
              <h2 className="font-bold text-[15px] text-slate-800 mb-6 flex items-center gap-2">
                Personal Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                  <div className="flex items-center gap-3 h-10.5 rounded-xl border border-slate-100 bg-slate-50/30 px-4 transition-colors">
                    <FiMail size={16} className="text-slate-400" />
                    <span className="text-xs text-slate-600 font-semibold truncate">{user?.email || "No email provided"}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Phone Number</label>
                  <div className={`flex items-center gap-3 h-10.5 rounded-xl border ${editing ? 'border-[#155dfc] bg-white ring-1 ring-blue-100' : 'border-slate-100 bg-slate-50/30'} px-4 transition-all duration-200`}>
                    <FiPhone size={16} className={editing ? "text-[#155dfc]" : "text-slate-400"} />
                    {editing ? (
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter phone number"
                        className="flex-1 bg-transparent text-xs font-semibold text-slate-700 outline-none placeholder-slate-300"
                      />
                    ) : (
                      <span className="text-xs text-slate-600 font-semibold">{phone || "Not set"}</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Location</label>
                  <div className={`flex items-center gap-3 h-10.5 rounded-xl border ${editing ? 'border-[#155dfc] bg-white ring-1 ring-blue-100' : 'border-slate-100 bg-slate-50/30'} px-4 transition-all duration-200`}>
                    <IoLocationOutline size={18} className={editing ? "text-[#155dfc]" : "text-slate-400"} />
                    {editing ? (
                      <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter your location (e.g. Accra, Ghana)"
                        className="flex-1 bg-transparent text-xs font-semibold text-slate-700 outline-none placeholder-slate-300"
                      />
                    ) : (
                      <span className="text-xs text-slate-600 font-semibold">{location || "Not set"}</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Bio</label>
                  <div className={`rounded-xl border ${editing ? 'border-[#155dfc] bg-white ring-1 ring-blue-100' : 'border-slate-100 bg-slate-50/30'} px-4 py-3 transition-all duration-200`}>
                    {editing ? (
                      <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell us about yourself and your pets..."
                        rows={4}
                        className="w-full bg-transparent text-xs font-semibold text-slate-700 outline-none resize-none placeholder-slate-300"
                      />
                    ) : (
                      <p className="text-xs text-slate-600 font-semibold leading-relaxed min-h-[60px]">{bio || "No bio yet. Click edit to add a little about yourself!"}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent bookings sidebar */}
            <div className="bg-white rounded-2xl shadow-2xs border border-slate-100 p-6 sm:p-8 h-max">
              <h2 className="font-bold text-[15px] text-slate-800 mb-6">Recent Bookings</h2>
              
              {bookings.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {bookings.slice(0, 4).map((b: any) => {
                    const lower = (b.status || "").toLowerCase();
                    let statusBadge = "bg-blue-50 text-blue-700 border-blue-100/60";
                    if (lower === "confirmed" || lower === "completed") {
                      statusBadge = "bg-emerald-50 text-emerald-700 border-emerald-100/60";
                    } else if (lower === "pending" || lower === "awaiting") {
                      statusBadge = "bg-amber-50 text-amber-700 border-amber-100/60 animate-pulse";
                    }
                    
                    return (
                      <div key={b.id} className="flex flex-col gap-2.5 p-4 rounded-xl bg-white border border-slate-100 hover:border-slate-200/80 shadow-2xs transition-all duration-200 group">
                        <div className="flex justify-between items-start gap-4">
                          <p className="text-xs font-bold text-slate-800 group-hover:text-[#155dfc] transition-colors">{b.groomer}</p>
                          <span className={`text-[9px] px-2 py-0.5 rounded-md border font-bold uppercase tracking-wider shrink-0 ${statusBadge}`}>
                            {b.status}
                          </span>
                        </div>
                        <div className="flex items-center text-[10px] text-slate-400 font-semibold gap-3 border-t border-slate-50 pt-2">
                          <span className="flex items-center gap-1.5"><IoPawOutline size={12} className="text-slate-400"/> {b.pet}</span>
                          <span className="text-slate-200">•</span>
                          <span className="flex items-center gap-1.5"><IoCalendarOutline size={12} className="text-slate-400"/> {b.date}</span>
                        </div>
                      </div>
                    );
                  })}
                  {bookings.length > 4 && (
                    <button className="text-[#155dfc] font-bold text-xs hover:underline mt-2 self-start">
                      View all bookings
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-8 px-4 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-100 text-slate-400 shadow-3xs mb-3">
                    <IoCalendarOutline size={18} />
                  </div>
                  <p className="text-xs font-semibold text-slate-600">No bookings yet</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Your recent appointments will show up here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;