import { IoSearchOutline } from "react-icons/io5";
import { IoLocationOutline, IoMailOpenOutline } from "react-icons/io5";
import { FiPhone, FiCalendar } from "react-icons/fi";
import { useState, useEffect } from "react";
import AppointModal from "../components/AppointModal";
import { getAvailableSlots } from "../services/BookingSevice";
import type { Slot } from "../services/BookingSevice";
import { getPets } from "../services/petService";

interface GroomerProfile {
  id: number;
  groomer_id: number;
  groomer_name: string;
  phone?: string;
  email?: string;
  location?: string;
  shop_name?: string;

  services?: {
    id: number;
    name: string;
    price: string;
  }[];
}

interface GroomerWithSlots {
  id: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  services: {
    name: string;
    price: string;
  }[];
  slots: Slot[];
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function fetchAllGroomers(): Promise<GroomerProfile[]> {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}registry/groomers/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : (data.results ?? data.groomers ?? []);
}

function Groomers() {
  const [search, setSearch] = useState("");
  const [groomers, setGroomers] = useState<GroomerWithSlots[]>([]);
  const [selectedGroomer, setSelectedGroomer] =
    useState<GroomerWithSlots | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [petNames, setPetNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [profiles, slots] = await Promise.all([
          fetchAllGroomers(),
          getAvailableSlots().catch(() => [] as Slot[]),
        ]);

        console.log("PROFILES:", profiles);
        console.log("SLOTS:", slots);

        const openSlots = slots.filter((s) => s.is_booked === false);

        if (profiles.length > 0) {
          const merged: GroomerWithSlots[] = profiles.map((p) => {
            const matchedSlots = openSlots.filter(
              (s) =>
                String(s.groomer) === String(p.id) ||
                String(s.groomer) === String(p.groomer_id),
            );

            return {
              id: String(p.id),
              name: p.shop_name || p.groomer_name || `Groomer #${p.id}`,
              phone: p.phone ?? "",
              email: p.email ?? "",
              location: p.location ?? "",

              services: (p.services ?? []).map((s: any) => ({
                name: s.name,
                price: s.price,
              })),

              slots: matchedSlots,
            };
          });
          setGroomers(merged);
        } else {
          const map = new Map<string, GroomerWithSlots>();
          openSlots.forEach((slot) => {
            const gId = String(slot.groomer);
            if (!map.has(gId)) {
              map.set(gId, {
                id: gId,
                name: slot.groomer_name ?? `Groomer #${gId}`,
                phone: "",
                email: "",
                location: "",
                services: [],
                slots: [],
              });
            }
            map.get(gId)!.slots.push(slot);
          });
          setGroomers(Array.from(map.values()));
        }
      } catch (err: any) {
        setError(err.message || "Failed to load groomers");
      } finally {
        setLoading(false);
      }

      // Load pet names separately so a pet fetch failure doesn't block groomers
      try {
        const pets = await getPets();
        setPetNames(pets.map((p) => p.name));
      } catch {
        setPetNames([]);
      }
    };

    load();
  }, []);

  const filtered = groomers.filter(
    (g) =>
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.location.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-full w-full bg-[#f8fafc]">
      <div className="flex flex-col px-4 md:px-8 py-8 gap-6 max-w-7xl mx-auto w-full font-sans">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
            All Groomers
          </h1>
          <p className="text-xs md:text-sm text-slate-400 font-medium">
            Find and book a groomer near you
          </p>
        </div>

        <div className="relative">
          <IoSearchOutline
            className="absolute left-4 top-3.5 text-slate-400"
            size={16}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or location..."
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-sm shadow-2xs focus:outline-none focus:border-[#155dfc] focus:ring-1 focus:ring-blue-100 transition-all duration-200"
          />
        </div>

        {loading ? (
          <p className="text-sm text-gray-400 text-center py-10">
            Loading groomers...
          </p>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3 text-center bg-white rounded-2xl border border-slate-100 shadow-2xs">
            <p className="text-sm font-semibold text-rose-500">{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3 text-center bg-white rounded-2xl border border-slate-100 shadow-2xs">
            <p className="text-sm font-semibold text-slate-600">
              No groomers found
            </p>
            <p className="text-xs text-slate-400">
              Groomers will appear here once they set up their shop
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((groomer) => (
              <div
                key={groomer.id}
                className="border border-slate-100 rounded-2xl shadow-2xs p-5 flex flex-col gap-4 hover:shadow-xs hover:border-slate-200 transition-all duration-200 bg-white"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h2 className="text-[17px] font-bold text-slate-800 tracking-tight leading-snug">
                      {groomer.name}
                    </h2>
                    <p className="text-xs flex items-center gap-1 text-slate-400 mt-1 font-medium">
                      <IoLocationOutline size={13} />
                      {groomer.location || "No location set"}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md border shrink-0 flex items-center gap-1 uppercase tracking-wide ${
                      groomer.slots.length > 0
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                        : "bg-rose-50 text-rose-700 border-rose-100"
                    }`}
                  >
                    <FiCalendar size={10} />
                    {groomer.slots.length > 0
                      ? `${groomer.slots.length} open`
                      : "Full"}
                  </span>
                </div>

                {groomer.services.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between w-full px-3 py-2 rounded-xl bg-blue-50/40 border border-blue-100"
                  >
                    <span className="text-[12px] font-semibold text-slate-700">
                      {service.name}
                    </span>

                    <span className="text-[11px] font-bold text-[#155dfc]">
                      GH₵ {service.price}
                    </span>
                  </div>
                ))}

                <div className="flex flex-col gap-1.5 text-xs text-slate-400 font-semibold border-t border-slate-50 pt-3">
                  {groomer.phone && (
                    <span className="flex items-center gap-1.5">
                      <FiPhone size={12} /> {groomer.phone}
                    </span>
                  )}
                  {groomer.email && (
                    <span className="flex items-center gap-1.5">
                      <IoMailOpenOutline size={13} /> {groomer.email}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => {
                    setSelectedGroomer(groomer);
                    setShowModal(true);
                  }}
                  disabled={groomer.slots.length === 0}
                  className="w-full bg-[#155dfc] hover:bg-blue-600 active:scale-98 text-white rounded-xl h-10 text-xs font-bold shadow-3xs hover:shadow-2xs transition-all duration-200 mt-auto disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#155dfc]"
                >
                  {groomer.slots.length > 0
                    ? "Book Appointment"
                    : "No Slots Available"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedGroomer && (
        <AppointModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedGroomer(null);
          }}
          groomerName={selectedGroomer.name}
          groomerId={Number(selectedGroomer.id)}
          pets={petNames}
          availableSlots={selectedGroomer.slots}
          onConfirm={() => {
            setShowModal(false);
            setSelectedGroomer(null);
          }}
        />
      )}
    </div>
  );
}

export default Groomers;
