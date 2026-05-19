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
    <div className=" px-15">
      <div className="mt-5 mb-6">
        <h1 className="text-[24px] font-bold">All Groomers</h1>
        <p className="text-[12px] text-gray-500">
          Find and book a groomer near you
        </p>
      </div>

      <div className="relative mb-6">
        <IoSearchOutline
          className="absolute left-4 top-3.5 text-gray-400"
          size={16}
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or address..."
          className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-[#155dfc]"
        />
      </div>
      {filtered.length === 0 && (
        <p className="text-sm text-gray-400 text-center mt-10">
          No groomers found.
        </p>
      )}
      <div className="grid grid-cols-2 gap-5">
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
  );
}

export default Groomers;
