import Groomcard from "../components/Groomcard"


function Groomers() {
  const groomers = [
  {
    id: 1,
    name: "Timothy Groomshop",
    address: "123 Carlton Street",
    services: ["Shaving", "Washing", "Tick Treatment", "Nail Trimming"],
    phone: "0201234567",
    email: "timothy@business.com",
    openSlots: 3,
    occupiedSlots: 2,
  },
  {
    id: 2,
    name: "Happy Paws Salon",
    address: "45 Osu High Street",
    services: ["Washing", "Nail Trimming", "Fur Styling"],
    phone: "0557654321",
    email: "happypaws@salon.com",
    openSlots: 5,
    occupiedSlots: 1,
  },
  {
    id: 3,
    name: "Fluffy Friends Spa",
    address: "78 Labone Crescent",
    services: ["Shaving", "Tick Treatment", "Bathing"],
    phone: "0241122334",
    email: "fluffy@friendsspa.com",
    openSlots: 0,
    occupiedSlots: 6,
  },
];
  return (
    <div className="pt-17 px-15">
      <div className="mt-10 mb-6">
        <h1 className="text-[24px] font-bold">All Groomers</h1>
        <p className="text-[12px] text-gray-500">Find and book a groomer near you</p>
      </div>

      <div className="flex flex-col gap-5">
        {groomers.map((groomer) => (
          <Groomcard
            key={groomer.id}
            name={groomer.name}
            address={groomer.address}
            services={groomer.services}
            phone={groomer.phone}
            email={groomer.email}
            openSlots={groomer.openSlots}
            occupiedSlots={groomer.occupiedSlots}
          />
        ))}
      </div>
    </div>
  )
}

export default Groomers