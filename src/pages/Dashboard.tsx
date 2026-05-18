import { useState } from "react";
import { FiCalendar } from "react-icons/fi";
import { GoPencil } from "react-icons/go";
import { IoClose, IoLocationOutline } from "react-icons/io5";
import { LuPawPrint } from "react-icons/lu";
import { TfiTrash } from "react-icons/tfi";

interface Pet {
  Name: string;
  Type: string;
  Breed: string;
  Age: string;
  information: string | null;
}

interface Booking {
  id: number;
  groomer: string;
  address: string;
  pet: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "completed";
}
const dummyBookings: Booking[] = [
  {
    id: 1,
    groomer: "Timothy Groomshop",
    address: "123 Carlton Street",
    pet: "Rex",
    date: "2025-05-20",
    time: "10:00 AM",
    status: "confirmed",
  },
  {
    id: 2,
    groomer: "Happy Paws Salon",
    address: "45 Osu High Street",
    pet: "Boadi",
    date: "2025-05-22",
    time: "2:00 PM",
    status: "pending",
  },
  {
    id: 3,
    groomer: "Fluffy Friends Spa",
    address: "78 Labone Crescent",
    pet: "Max",
    date: "2025-05-10",
    time: "11:00 AM",
    status: "completed",
  },
];

const statusStyles = {
  confirmed: "bg-[#f0fdf4] text-[#008236]",
  pending:   "bg-[#fefce8] text-[#a16207]",
  completed: "bg-[#eff6ff] text-[#1d4ed8]",
};

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [pets, setPets] = useState<Pet[]>([]);
  const [bookings] = useState<Booking[]>(dummyBookings);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [info, setInfo] = useState("");

  const handleApply = () => {
    if (!name.trim()) return;
    else {
      const newPet: Pet = {
        Name: name,
        Type: type,
        Breed: breed,
        Age: age,
        information: info,
      };
      setPets([...pets, newPet]);
    }
    setName("");
    setType("");
    setBreed("");
    setAge("");
    setInfo("");
    setOpen(false);
  };

  const handleDelete = (index: number) => {
    setPets(pets.filter((_, i) => i !== index));
  };
  return (
    <div className=" w-screen h-screen flex flex-col pt-17 px-15">
      <div className="flex flex-col items-left justify-center mt-10 ">
        <h1 className=" text-left text-[24px] font-bold">My Dashboard</h1>
        <h1 className="text-[12px] text-gray-500">
          Manage your pets and bookings
        </h1>
      </div>
      <div className="flex justify-between items-left mt-8 gap-8">
        <h1 className=" text-left text-[24px] font-bold">My Pets</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-[#155dfc] cursor-pointer flex items-center gap-2 text-white w-27 rounded-md h-9 justify-center"
        >
          + Add Pet
        </button>
      </div>
        <div className="flex flex-wrap gap-4 mt-6">
        {pets.length === 0 && (
          <p className="text-gray-400 text-sm">No pets added yet.</p>
        )}
        {pets.map((pet, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-xl p-5 w-64 shadow-sm flex flex-col gap-2"
        >
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg">{pet.Name}</h2>
            <div className="flex gap-2 text-gray-400">
              <GoPencil className="cursor-pointer hover:text-blue-500" />
              <TfiTrash
                className="cursor-pointer hover:text-red-500"
                onClick={() => handleDelete(index)}
              />
            </div>
          </div>

          <p className="text-sm text-gray-500"><LuPawPrint/> {pet.Type}</p>
          <p className="text-sm text-gray-500">Breed: {pet.Breed}</p>
          <p className="text-sm text-gray-500">Age: {pet.Age}</p>
          {pet.information && (
            <p className="text-xs text-gray-400 italic">{pet.information}</p>
          )}

          <button className="mt-3 w-full bg-[#155dfc] text-white text-sm rounded-md h-9">
            Book Appointment
          </button>
        </div>
      ))}</div>

      <div className="flex justify-between items-left mt-8 gap-8">
        <h1 className=" text-left text-[24px] font-bold">My Bookings</h1>
      </div>
      <div className="flex flex-col gap-4 mt-6">
        {bookings.length === 0 && (
          <p className="text-gray-400 text-sm">No bookings yet.</p>
        )}
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="border border-gray-200 rounded-xl p-5 shadow-sm flex justify-between items-center"
          >
            <div className="flex flex-col gap-1">
              <h2 className="font-bold text-[16px]">{booking.groomer}</h2>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <IoLocationOutline /> {booking.address}
              </p>
              <p className="flex flex-row items-center gap-1 text-sm text-gray-500"><LuPawPrint/> {booking.pet}</p>
              <p className="flex flex-row items-center gap-1text-sm text-gray-500">
                <FiCalendar /> {booking.date} at {booking.time}
              </p>
            </div>

            <div className="flex flex-col items-end gap-3">
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusStyles[booking.status]}`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
              <button className="text-xs border border-red-400 text-red-400 px-5 py-1 rounded-md hover:bg-red-50">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <>
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <form onSubmit={handleApply}>
              <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className=" flex flex-col items-center justify-center text-center w-100 h-140 border border-gray-200 rounded-lg py-6 bg-white shadow-lg">
                  <div className="flex text-[18px] font-bold">
                    <h1 className="ml-35">Add Pet</h1>
                    <IoClose
                      onClick={() => setOpen(false)}
                      size={25}
                      className="ml-30"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-left pl-6 text-sm pt-3">
                      Pet Name
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="eg. Rex, Boadi"
                      className="w-85 h-12 rounded-md border border-gray-300 pl-4 mx-6 bg-white"
                    />
                    <label htmlFor="" className="text-left pl-6 text-sm pt-3">
                      Pet Type
                    </label>
                    <input
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      required
                      placeholder="Dog, Cat, Rabbit"
                      className="w-85 h-12 rounded-md border border-gray-300 pl-4 mx-6 bg-white"
                    />
                    <label htmlFor="" className="text-left pl-6 text-sm pt-3">
                      Breed
                    </label>
                    <input
                      value={breed}
                      onChange={(e) => setBreed(e.target.value)}
                      required
                      type=""
                      placeholder="Breed"
                      className="w-85 h-12 rounded-md border border-gray-300 pl-4 mx-6 bg-white"
                    />
                    <label htmlFor="" className="text-left pl-6 text-sm pt-3">
                      Age
                    </label>
                    <input
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      type="text"
                      required
                      placeholder="3 years"
                      className="w-85 h-12 rounded-md border border-gray-300 pl-4 mx-6 bg-white"
                    />
                    <label htmlFor="" className="text-left pl-6 text-sm pt-3">
                      Additional Notes
                    </label>
                    <textarea
                      value={info}
                      onChange={(e) => setInfo(e.target.value)}
                      rows={2}
                      placeholder="Any extra info..."
                      className="w-85 rounded-md border border-gray-300 pl-4 mx-6 bg-white"
                    />
                  </div>
                  <div className="flex flex-col gap 6 pt-4 gap-2">
                    <div className="flex justify-center">
                      <button
                        onClick={handleApply}
                        className="w-85 rounded-md bg-[#155dfc] text-white text-sm border border-[#6c63ff] h-9 "
                      >
                        Add Pet
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
