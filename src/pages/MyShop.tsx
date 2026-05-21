import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { TfiTrash } from "react-icons/tfi";
import { FiPhone, FiMail, FiMapPin, FiPlus } from "react-icons/fi";
import { LuCalendar } from "react-icons/lu";
import { getMySlots, createSlot, deleteSlot } from "../services/BookingSevice";
import type { Slot } from "../services/BookingSevice";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

type Service = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  is_active: boolean;
  created_at: string;
};

type Shop = {
  id: number;
  groomer_email: string;
  shop_name: string;
  bio: string;
  location: string;
  latitude: string;
  longitude: string;
  is_available: boolean;
  services: Service[];
  created_at: string;
  updated_at: string;
};

function getHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
  };
}

async function safeJson(res: Response) {
  const text = await res.text();
  return text ? JSON.parse(text) : {};
}

async function fetchMyShop(): Promise<Shop | null> {
  const res = await fetch(`${BASE_URL}registry/groomer/shop/me/`, {
    headers: getHeaders(),
  });

  if (res.status === 404) return null;

  if (!res.ok) {
    throw new Error("Failed to fetch shop");
  }

  return safeJson(res);
}

async function saveShopToAPI(payload: {
  shop_name: string;
  bio: string;
  location: string;
  is_available: boolean;
}) {
  // Try updating existing shop
  const patchRes = await fetch(`${BASE_URL}registry/groomer/shop/me/`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });

  // Existing shop updated successfully
  if (patchRes.ok) {
    return safeJson(patchRes);
  }

  // Read backend error
  const patchError = await safeJson(patchRes);

  console.log("PATCH ERROR:", patchError);

  // Shop does not exist yet
  if (patchError.detail?.includes("You haven't set up your shop yet")) {
    // Create new shop
    const postRes = await fetch(`${BASE_URL}registry/groomer/shop/`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });

    if (!postRes.ok) {
      const postError = await safeJson(postRes);
      console.log("POST ERROR:", postError);

      throw new Error("Failed to create shop");
    }

    return safeJson(postRes);
  }

  throw new Error("Failed to save shop");
}

async function addServiceToAPI(name: string, price: string) {
  const res = await fetch(`${BASE_URL}registry/groomer/services/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      name,
      price,
    }),
  });

  if (!res.ok) {
    const errorData = await safeJson(res);
    console.log(errorData);
    throw new Error("Failed to add service");
  }

  return safeJson(res);
}

function MyShop() {
  const [shopName, setShopName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const [newService, setNewService] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [profileSaved, setProfileSaved] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [shopLoading, setShopLoading] = useState(true);

  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotOpen, setSlotOpen] = useState(false);
  const [slotDate, setSlotDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [slotLoading, setSlotLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      setShopLoading(true);

      try {
        const [shop, slotData] = await Promise.all([
          fetchMyShop(),
          getMySlots().catch(() => [] as Slot[]),
        ]);

        if (shop) {
          setShopName(shop.shop_name || "");
          setBio(shop.bio || "");
          setLocation(shop.location || "");
          setIsAvailable(shop.is_available);
          setServices(shop.services || []);
        }

        setSlots(slotData ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setShopLoading(false);
      }
    };

    init();
  }, []);

  const saveProfile = async () => {
    setProfileLoading(true);
    setProfileError(null);

    try {
      await saveShopToAPI({
        shop_name: shopName,
        bio,
        location,
        is_available: isAvailable,
      });

      setProfileSaved(true);

      setTimeout(() => {
        setProfileSaved(false);
      }, 2000);
    } catch (err: any) {
      setProfileError(err.message || "Failed to save profile");
    } finally {
      setProfileLoading(false);
    }
  };

  const addService = async () => {
    if (!newService.trim() || !servicePrice.trim()) return;

    try {
      const service = await addServiceToAPI(
        newService.trim(),
        servicePrice.trim(),
      );

      setServices((prev) => [...prev, service.name]);

      setNewService("");
      setServicePrice("");
    } catch (err) {
      console.error(err);
    }
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
        is_booked: false,
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

  if (shopLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-sm text-gray-400">Loading shop...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-10 py-6 gap-6">
      <div>
        <h1 className="text-[24px] font-bold">My Shop</h1>
        <p className="text-[12px] text-gray-400">
          Manage your shop profile, services, and availability
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Shop Profile Card */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-2xs p-6 flex flex-col gap-4">
          <h2 className="text-[15px] font-bold text-slate-800">Shop Profile</h2>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">
                Shop Name
              </label>

              <input
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                placeholder="eg. Kings Pet Grooming"
                className="h-11 rounded-xl border border-gray-200 pl-4 bg-gray-50 text-sm focus:outline-none focus:border-[#155dfc]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">Bio</label>

              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell customers about your grooming service"
                className="rounded-xl border border-gray-200 p-4 bg-gray-50 text-sm focus:outline-none focus:border-[#155dfc] min-h-[100px]"
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

          <div className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-700">
                Available for Booking
              </span>

              <span className="text-xs text-gray-400">
                Customers can book your slots
              </span>
            </div>

            <input
              type="checkbox"
              checked={isAvailable}
              onChange={(e) => setIsAvailable(e.target.checked)}
              className="w-4 h-4"
            />
          </div>

          <button
            onClick={saveProfile}
            disabled={profileLoading}
            className="w-full h-11 rounded-xl bg-[#155dfc] hover:bg-blue-700 text-white text-sm font-medium transition-colors mt-auto disabled:opacity-60"
          >
            {profileLoading
              ? "Saving..."
              : profileSaved
                ? "✓ Saved!"
                : "Save Profile"}
          </button>
          {/* Services */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">
              Services Offered
            </label>
            <div className="flex gap-2">
              <input
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                placeholder="Service Name"
                className="flex-1 h-10 rounded-xl border border-gray-200 pl-4 bg-gray-50 text-sm focus:outline-none focus:border-[#155dfc]"
              />

              <input
                type="number"
                value={servicePrice}
                onChange={(e) => setServicePrice(e.target.value)}
                placeholder="Price"
                className="w-28 h-10 rounded-xl border border-gray-200 pl-4 bg-gray-50 text-sm focus:outline-none focus:border-[#155dfc]"
              />

              <button
                onClick={addService}
                className="h-10 px-4 rounded-xl bg-[#155dfc] text-white text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-1"
              >
                <FiPlus size={14} /> Add
              </button>
            </div>

            {services.map((service, index) => (
              <div className="flex flex-wrap gap-2 mt-1">
                <span
                  key={index}
                  className="flex items-center gap-1.5 px-3 h-7 rounded-lg bg-blue-50 text-[#155dfc] text-xs font-bold border border-blue-100"
                >
                  {service.name} - GH₵ {service.price}
                  <button
                    onClick={() => removeService(index)}
                    className="hover:text-red-500 transition-colors"
                  >
                    <IoClose size={12} />
                  </button>
                </span>
              </div>
            ))}
          </div>

          {profileError && (
            <p className="text-xs text-rose-500">{profileError}</p>
          )}
        </div>

        {/* Slots Card */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-2xs p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[15px] font-bold text-slate-800">
              Available Slots
            </h2>
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
                        slot.is_booked
                          ? "bg-rose-50 text-rose-700 border-rose-100"
                          : "bg-emerald-50 text-emerald-700 border-emerald-100"
                      }`}
                    >
                      {slot.is_booked ? "Booked" : "Open"}
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

      {/* Add Slot Modal */}
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
                <label className="text-sm font-medium text-gray-600">
                  Date
                </label>
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
