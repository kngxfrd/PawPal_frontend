import {  IoSearchOutline } from "react-icons/io5";
import Groomcard from "../components/Groomcard";
import { useState } from "react";

function Groomers() {
  const [search, setSearch] = useState("");

  const groomers = [
    {
      id: 1,
      name: "Timothy Groomshop",
      address: "123 Carlton Street",
      services: ["Shaving", "Washing", "Nail Trimming"],
      phone: "0201234567",
      email: "timothy@business.com",
      openSlots: 3,
      occupiedSlots: 2,
    },
    {
      id: 2,
      name: "Happy Paws Salon",
      address: "45 Osu High Street",
      services: ["Washing", "Tick Treatment"],
      phone: "0557654321",
      email: "happypaws@salon.com",
      openSlots: 5,
      occupiedSlots: 1,
    },
    {
      id: 3,
      name: "Fluffy Friends Spa",
      address: "78 Labone Crescent",
      services: ["Shaving", "Tick Treatment", "Nail Trimming"],
      phone: "0241122334",
      email: "fluffy@friendsspa.com",
      openSlots: 0,
      occupiedSlots: 6,
    },
  ];
  const filtered = groomers.filter(
    (g) =>
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.address.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-full w-full bg-[#f8fafc]">
      <div className="flex flex-col px-4 md:px-8 py-8 gap-6 max-w-7xl mx-auto w-full font-sans">
        
        {/* Page Header */}
        <div className="flex flex-col gap-1.5">
          <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
            All Groomers
          </h1>
          <p className="text-xs md:text-sm text-slate-400 font-medium">
            Find and book a groomer near you
          </p>
        </div>

        {/* Premium Search Bar */}
        <div className="relative">
          <IoSearchOutline
            className="absolute left-4 top-3.5 text-slate-400"
            size={16}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or address..."
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-sm shadow-2xs focus:outline-none focus:border-[#155dfc] focus:ring-1 focus:ring-blue-100 transition-all duration-200"
          />
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 gap-3 text-center bg-white rounded-2xl border border-slate-100 shadow-2xs">
            <p className="text-sm font-semibold text-slate-600">No groomers found</p>
            <p className="text-xs text-slate-400">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((groomer) => (
            <Groomcard
              key={groomer.id}
              name={groomer.name}
              address={groomer.address}
              services={groomer.services}
              phone={groomer.phone}
              email={groomer.email}
              openSlots={groomer.openSlots}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Groomers;
