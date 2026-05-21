import { Map, Marker, InfoWindow } from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";
import AppointModal from "../components/AppointModal";
import { getAvailableSlots } from "../services/BookingSevice";
import type { Slot } from "../services/BookingSevice";
import { getPets } from "../services/petService";

interface Location {
  lat: number;
  lng: number;
}

interface Shop {
  groomerId: string;
  groomerName: string;
  phone: string;
  email: string;
  location: string;
  services: string[];
  lat?: number;
  lng?: number;
}

interface GroomerWithSlots extends Shop {
  slots: Slot[];
}

function Discover() {
  const [currentLocation, setCurrentLocation] = useState<Location>({
    lat: 5.6037,
    lng: -0.187,
  });
  const [groomers, setGroomers] = useState<GroomerWithSlots[]>([]);
  const [selected, setSelected] = useState<GroomerWithSlots | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [petNames, setPetNames] = useState<string[]>([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error("Location access denied:", error)
      );
    }

    const load = async () => {
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
          (s) => String(s.groomer) === String(shop.groomerId) && s.is_available
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
              (s) => String(s.groomer) === gId && s.is_available
            ),
          });
        }
      });

      setGroomers([...fromShops, ...extraGroomers]);

      try {
        const pets = await getPets();
        setPetNames(pets.map((p) => p.name));
      } catch {
        const local = JSON.parse(localStorage.getItem("pets") || "[]");
        setPetNames(local.map((p: any) => p.name));
      }
    };

    load();
  }, []);


  const DEFAULT_COORDS = [
    { lat: 5.6067, lng: -0.187 },
    { lat: 5.614, lng: -0.201 },
    { lat: 5.595, lng: -0.175 },
    { lat: 5.602, lng: -0.193 },
    { lat: 5.621, lng: -0.180 },
  ];

  const groomersWithCoords = groomers.map((g, i) => ({
    ...g,
    lat: g.lat ?? DEFAULT_COORDS[i % DEFAULT_COORDS.length].lat,
    lng: g.lng ?? DEFAULT_COORDS[i % DEFAULT_COORDS.length].lng,
  }));

  return (
    <div className="px-10 py-6">
      <div className="mb-6">
        <h1 className="text-[24px] font-bold">Discover Groomers</h1>
        <p className="text-[12px] text-gray-400">Find a groomer near you</p>
      </div>

      <div className="flex-1 h-[520px] rounded-2xl overflow-hidden shadow-sm border border-gray-100 z-0 relative">
        <Map defaultCenter={currentLocation} defaultZoom={13} mapId="pawpal-map">

          <Marker
            position={currentLocation}
            icon={{
              path: (window as any).google?.maps?.SymbolPath?.CIRCLE,
              scale: 10,
              fillColor: "#155dfc",
              fillOpacity: 1,
              strokeColor: "white",
              strokeWeight: 2,
            }}
          />

          {groomersWithCoords.map((groomer) => (
            <Marker
              key={groomer.groomerId}
              position={{ lat: groomer.lat!, lng: groomer.lng! }}
              onClick={() => {
                setSelected(groomer);
                setShowModal(false);
              }}
            />
          ))}

          {selected && (
            <InfoWindow
              position={{ lat: selected.lat!, lng: selected.lng! }}
              onCloseClick={() => {
                setSelected(null);
                setShowModal(false);
              }}
            >
              <div className="p-1 flex flex-col gap-1.5 min-w-[160px]">
                <p className="font-bold text-sm">{selected.groomerName}</p>
                {selected.location && (
                  <p className="text-xs text-gray-500">{selected.location}</p>
                )}
                <p className="text-xs text-gray-400">
                  {selected.slots.length > 0
                    ? `${selected.slots.length} slot${selected.slots.length > 1 ? "s" : ""} available`
                    : "No slots available"}
                </p>
                {selected.services.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {selected.services.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => setShowModal(true)}
                  className="mt-1 text-xs text-white bg-[#155dfc] px-3 py-1.5 rounded-lg font-medium"
                >
                  Book Appointment
                </button>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>

      {selected && (
        <AppointModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelected(null);
          }}
          groomerName={selected.groomerName}
          groomerId={Number(selected.groomerId)}
          pets={petNames}
          availableSlots={selected.slots}
          onConfirm={() => {
            setShowModal(false);
            setSelected(null);
          }}
        />
      )}
    </div>
  );
}

export default Discover;