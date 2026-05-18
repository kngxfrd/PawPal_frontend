import { Map, Marker, InfoWindow } from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";

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
}

const dummyGroomers: Groomer[] = [
  {
    id: 1,
    name: "Timothy Groomshop",
    address: "123 Carlton Street",
    lat: 5.6067,
    lng: -0.187,
  },
  {
    id: 2,
    name: "Happy Paws Salon",
    address: "45 Osu High Street",
    lat: 5.614,
    lng: -0.201,
  },
  {
    id: 3,
    name: "Fluffy Friends Spa",
    address: "78 Labone Crescent",
    lat: 5.595,
    lng: -0.175,
  },
];

function Discover() {
  const [currentLocation, setCurrentLocation] = useState<Location>({
    lat: 5.6037,
    lng: -0.187,
  });
  const [selected, setSelected] = useState<Groomer | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Location access denied:", error);
        },
      );
    }
  }, []);

  return (
    <div className="pt-17 px-15">
      <div className="mt-10 mb-6">
        <h1 className="text-[24px] font-bold">Discover Groomers</h1>
        <p className="text-[12px] text-gray-500">Find a groomer near you</p>
      </div>

      <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-md z-0 relative">
        <Map
          defaultCenter={currentLocation}
          defaultZoom={13}
          mapId="pawpal-map"
        >

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


          {dummyGroomers.map((groomer) => (
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
              <div className="p-1">
                <p className="font-bold text-sm">{selected.name}</p>
                <p className="text-xs text-gray-500">{selected.address}</p>
                <button className="mt-2 text-xs text-white bg-[#155dfc] px-3 py-1 rounded-md">
                  Book Appointment
                </button>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>

  
      <div className="mt-8 flex flex-col gap-3 pb-10">
        {dummyGroomers.map((groomer) => (
          <div
            key={groomer.id}
            onClick={() => setSelected(groomer)}
            className={`border rounded-lg p-4 shadow-sm cursor-pointer transition-colors
              ${selected?.id === groomer.id ? "border-[#155dfc] bg-blue-50" : "border-gray-200 hover:border-[#155dfc]"}`}
          >
            <h2 className="font-bold">{groomer.name}</h2>
            <p className="text-sm text-gray-500">{groomer.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Discover;
