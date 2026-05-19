import { Map, Marker, InfoWindow } from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";
import { IoLocationOutline, IoSearchOutline } from "react-icons/io5";

interface Location {
  lat: number;
  lng: number;
}

interface Groomer {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  services?: string[];
  openSlots?: number;
}

const dummyGroomers: Groomer[] = [
  {
    id: 1,
    name: "Timothy Groomshop",
    address: "123 Carlton Street",
    lat: 5.6067,
    lng: -0.187,
    services: ["Shaving", "Washing"],
    openSlots: 3,
  },
  {
    id: 2,
    name: "Happy Paws Salon",
    address: "45 Osu High Street",
    lat: 5.614,
    lng: -0.201,
    services: ["Nail Trimming", "Bathing"],
    openSlots: 5,
  },
  {
    id: 3,
    name: "Fluffy Friends Spa",
    address: "78 Labone Crescent",
    lat: 5.595,
    lng: -0.175,
    services: ["Tick Treatment", "Washing"],
    openSlots: 0,
  },
];

function Discover() {
  const [currentLocation, setCurrentLocation] = useState<Location>({
    lat: 5.6037,
    lng: -0.187,
  });
  const [selected, setSelected] = useState<Groomer | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error("Location access denied:", error),
      );
    }
  }, []);

  const filtered = dummyGroomers.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-10 py-6">

      <div className="mb-6">
        <h1 className="text-[24px] font-bold">Discover Groomers</h1>
        <p className="text-[12px] text-gray-400">Find a groomer near you</p>
      </div>
    <div className=" gap-6">

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

            {filtered.map((groomer) => (
              <Marker
                key={groomer.id}
                position={{ lat: groomer.lat, lng: groomer.lng }}
                onClick={() => setSelected(groomer)}
              />
            ))}

            {selected && (
              <InfoWindow
                position={{ lat: selected.lat, lng: selected.lng }}
                onCloseClick={() => setSelected(null)}
              >
                <div className="p-1 flex flex-col gap-1">
                  <p className="font-bold text-sm">{selected.name}</p>
                  <p className="text-xs text-gray-500">{selected.address}</p>
                  <button className="mt-1 text-xs text-white bg-[#155dfc] px-3 py-1 rounded-md">
                    Book Appointment
                  </button>
                </div>
              </InfoWindow>
            )}
          </Map>
        </div>

        
        
        </div>
      </div>
   
  );
}

export default Discover;