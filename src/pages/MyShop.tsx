import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { TfiTrash } from "react-icons/tfi";
import { FiPhone, FiMail, FiMapPin, FiPlus } from "react-icons/fi";
import { LuCalendar } from "react-icons/lu";
import { getMySlots, createSlot, deleteSlot } from "../services/BookingSevice";
import type { Slot } from "../services/BookingSevice";

function MyShop() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const shopKey = `shop_${currentUser.id}`;
  const savedShop = JSON.parse(localStorage.getItem(shopKey) || "{}");

  const [phone, setPhone] = useState(savedShop.phone || currentUser.phone_number || "");
  const [email, setEmail] = useState(savedShop.email || currentUser.email || "");
  const [location, setLocation] = useState(savedShop.location || "");
  const [services, setServices] = useState<string[]>(savedShop.services || []);
  const [newService, setNewService] = useState("");
  const [profileSaved, setProfileSaved] = useState(false);

  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotOpen, setSlotOpen] = useState(false);
  const [slotDate, setSlotDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [slotLoading, setSlotLoading] = useState(false);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const data = await getMySlots();
      setSlots(data ?? []);
    } catch (err) {
      console.error(err);
    }
  };

  const saveProfile = () => {
    const shopData = { phone, email, location, services };
    localStorage.setItem(shopKey, JSON.stringify(shopData));
  
    const allShops = JSON.parse(localStorage.getItem("shops") || "{}");
    allShops[String(currentUser.id)] = {
      groomerId: String(currentUser.id),
      groomerName: `${currentUser.first_name ?? ""} ${currentUser.last_name ?? ""}`.trim(),
      phone,
      email,
      location,
      services,
    };
    localStorage.setItem("shops", JSON.stringify(allShops));
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  const addService = () => {
    if (!newService.trim()) return;
    const updated = [...services, newService.trim()];
    setServices(updated);
    setNewService("");
  };

  const removeService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const handleAddSlot = async () => {
    if (!slotDate || !startTime || !endTime) return;
    setSlotLoading(true);
    try {
      const slot = await createSlot({
        date: slotDate,
        start_time: startTime,
        end_time: endTime,
        is_available: true,
      });
      setSlots((prev) => [...prev, slot]);
      setSlotDate("");
      setStartTime("");
      setEndTime("");
      setSlotOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSlotLoading(false);
    }
  };

  const handleDeleteSlot = async (id: number) => {
    try {
      await deleteSlot(id);
      setSlots((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col px-10 py-6 gap-6">

      <div>
        <h1 className="text-[24px] font-bold">My Shop</h1>
        <p className="text-[12px] text-gray-400">
          Manage your shop profile, services, and availability
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <div className="bg-white border border-slate-100 rounded-2xl shadow-2xs p-6 flex flex-col gap-4">
          <h2 className="text-[15px] font-bold text-slate-800">Shop Profile</h2>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600 flex items-center gap-1.5">
                <FiPhone size={13} /> Phone Number
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="eg. 0201234567"
                className="h-11 rounded-xl border border-gray-200 pl-4 bg-gray-50 text-sm focus:outline-none focus:border-[#155dfc]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600 flex items-center gap-1.5">
                <FiMail size={13} /> Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="h-11 rounded-xl border border-gray-200 pl-4 bg-gray-50 text-sm focus:outline-none focus:border-[#155dfc]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600 flex items-center gap-1.5">
                <FiMapPin size={13} /> Location
              </label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="eg. Accra, Tema"
                className="h-11 rounded-xl border border-gray-200 pl-4 bg-gray-50 text-sm focus:outline-none focus:border-[#155dfc]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">Services Offered</label>
            <div className="flex gap-2">
              <input
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addService()}
                placeholder="eg. Pet Washing"
                className="flex-1 h-10 rounded-xl border border-gray-200 pl-4 bg-gray-50 text-sm focus:outline-none focus:border-[#155dfc]"
              />
              <button
                onClick={addService}
                className="h-10 px-4 rounded-xl bg-[#155dfc] text-white text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-1"
              >
                <FiPlus size={14} /> Add
              </button>
            </div>

            {services.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {services.map((service, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1.5 px-3 h-7 rounded-lg bg-blue-50 text-[#155dfc] text-xs font-bold border border-blue-100"
                  >
                    {service}
                    <button
                      onClick={() => removeService(index)}
                      className="hover:text-red-500 transition-colors"
                    >
                      <IoClose size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={saveProfile}
            className="w-full h-11 rounded-xl bg-[#155dfc] hover:bg-blue-700 text-white text-sm font-medium transition-colors mt-auto"
          >
            {profileSaved ? "✓ Saved!" : "Save Profile"}
          </button>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl shadow-2xs p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[15px] font-bold text-slate-800">Available Slots</h2>
            <button
              onClick={() => setSlotOpen(true)}
              className="flex items-center gap-1.5 px-3 h-8 rounded-xl bg-[#155dfc] text-white text-xs font-bold hover:bg-blue-700 transition-colors"
            >
              <FiPlus size={13} /> Add Slot
            </button>
          </div>

          {slots.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <LuCalendar size={28} className="text-gray-200 mb-2" />
              <p className="text-sm text-gray-400">No slots posted yet</p>
              <p className="text-xs text-gray-300 mt-0.5">
                Add slots for pet owners to book
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2 overflow-y-auto max-h-80">
              {slots.map((slot) => (
                <div
                  key={slot.id}
                  className="flex items-center justify-between px-4 py-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-slate-700">
                      {slot.date}
                    </span>
                    <span className="text-xs text-slate-400">
                      {slot.start_time} – {slot.end_time}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wide ${
                        slot.is_available
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                          : "bg-rose-50 text-rose-700 border-rose-100"
                      }`}
                    >
                      {slot.is_available ? "Open" : "Booked"}
                    </span>
                    <button
                      onClick={() => handleDeleteSlot(slot.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <TfiTrash size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {slotOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-[400px] p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-[18px] font-bold">Add Time Slot</h2>
                <p className="text-xs text-gray-400">
                  Post a new available slot
                </p>
              </div>
              <IoClose
                onClick={() => setSlotOpen(false)}
                size={22}
                className="cursor-pointer text-gray-400 hover:text-gray-600"
              />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">Date</label>
                <input
                  type="date"
                  value={slotDate}
                  onChange={(e) => setSlotDate(e.target.value)}
                  className="h-11 rounded-xl border border-gray-200 pl-4 bg-gray-50 text-sm focus:outline-none focus:border-[#155dfc]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-600">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="h-11 rounded-xl border border-gray-200 pl-4 bg-gray-50 text-sm focus:outline-none focus:border-[#155dfc]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-600">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="h-11 rounded-xl border border-gray-200 pl-4 bg-gray-50 text-sm focus:outline-none focus:border-[#155dfc]"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleAddSlot}
              disabled={slotLoading}
              className="w-full rounded-xl bg-[#155dfc] hover:bg-blue-700 text-white text-sm h-11 font-medium transition-colors disabled:opacity-60"
            >
              {slotLoading ? "Adding..." : "Add Slot"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyShop;
