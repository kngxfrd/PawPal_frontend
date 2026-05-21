import { IoSearchOutline } from "react-icons/io5";
import { IoLocationOutline, IoMailOpenOutline } from "react-icons/io5";
import { FiPhone, FiCalendar } from "react-icons/fi";
import { useState, useEffect } from "react";
import AppointModal from "../components/AppointModal";
import { getAvailableSlots } from "../services/BookingSevice";
import type { Slot } from "../services/BookingSevice";
import { getPets } from "../services/petService";

interface Shop {
  groomerId: string;
  groomerName: string;
  phone: string;
  email: string;
  location: string;
  services: string[];
}

interface GroomerWithSlots extends Shop {
  slots: Slot[];
}

function Groomers() {
  const [search, setSearch] = useState("");
  const [groomers, setGroomers] = useState<GroomerWithSlots[]>([]);
  const [selectedGroomer, setSelectedGroomer] = useState<GroomerWithSlots | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [petNames, setPetNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {

        const shops: Record<string, Shop> = JSON.parse(
          localStorage.getItem("shops") || "{}"
        );

        let slots: Slot[] = [];
        try {
          slots = await getAvailableSlots();
        } catch (err) {
          console.error("Failed to load slots:", err);
        }

        const fromShops: GroomerWithSlots[] = Object.values(shops).map((shop) => ({
          ...shop,
          slots: slots.filter(
            (s) => String(s.groomer) === String(shop.groomerId)
          ),
        }));

        const knownIds = new Set(Object.values(shops).map((s) => String(s.groomerId)));
        const extraGroomers: GroomerWithSlots[] = [];

        slots.forEach((slot) => {
          const gId = String(slot.groomer);
          if (!knownIds.has(gId)) {
            knownIds.add(gId);
            extraGroomers.push({
              groomerId: gId,
              groomerName: slot.groomer_name ?? `Groomer #${gId}`,
              phone: "",
              email: "",
              location: "",
              services: [],
              slots: slots.filter(
                (s) => String(s.groomer) === gId
              ),
            });
          }
        });

        setGroomers([...fromShops, ...extraGroomers]);
      } finally {
        setLoading(false);
      }

      try {
        const pets = await getPets();
        setPetNames(pets.map((p) => p.name));
      } catch {
        const localPets = JSON.parse(localStorage.getItem("pets") || "[]");
        setPetNames(localPets.map((p: any) => p.name));
      }
    };

    load();
  }, []);

  const filtered = groomers.filter(
    (g) =>
      g.groomerName.toLowerCase().includes(search.toLowerCase()) ||
      g.location.toLowerCase().includes(search.toLowerCase())
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
          <IoSearchOutline className="absolute left-4 top-3.5 text-slate-400" size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or location..."
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-sm shadow-2xs focus:outline-none focus:border-[#155dfc] focus:ring-1 focus:ring-blue-100 transition-all duration-200"
          />
        </div>

        {loading ? (
          <p className="text-sm text-gray-400 text-center py-10">Loading groomers...</p>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3 text-center bg-white rounded-2xl border border-slate-100 shadow-2xs">
            <p className="text-sm font-semibold text-slate-600">No groomers found</p>
            <p className="text-xs text-slate-400">
              Groomers will appear here once they set up their shop
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((groomer) => (
              <div
                key={groomer.groomerId}
                className="border border-slate-100 rounded-2xl shadow-2xs p-5 flex flex-col gap-4 hover:shadow-xs hover:border-slate-200 transition-all duration-200 bg-white"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h2 className="text-[17px] font-bold text-slate-800 tracking-tight leading-snug">
                      {groomer.groomerName}
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
                    {groomer.slots.length > 0 ? `${groomer.slots.length} open` : "Full"}
                  </span>
                </div>

                {groomer.services.length > 0 && (
                  <div className="flex gap-1.5 flex-wrap">
                    {groomer.services.map((service) => (
                      <span
                        key={service}
                        className="px-2.5 h-6.5 rounded-lg bg-blue-50/60 text-[#155dfc] text-[11px] font-bold border border-blue-100/20 flex items-center tracking-wide"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                )}

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
                  className="w-full bg-[#155dfc] hover:bg-blue-600 active:scale-98 text-white rounded-xl h-10 text-xs font-bold shadow-3xs hover:shadow-2xs transition-all duration-200 mt-auto"
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedGroomer && (
        <AppointModal
          isOpen={showModal}
          onClose={() => { setShowModal(false); setSelectedGroomer(null); }}
          groomerName={selectedGroomer.groomerName}
          groomerId={Number(selectedGroomer.groomerId)}
          pets={petNames}
          availableSlots={selectedGroomer.slots}
          onConfirm={() => { setShowModal(false); setSelectedGroomer(null); }}
        />
      )}
    </div>
  );
}

export default Groomers;