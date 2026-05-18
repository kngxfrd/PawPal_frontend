import { useState } from "react";
import { IoClose } from "react-icons/io5";

interface Pet {
  Name: string;
  Type: string;
  Breed: string;
  Age: string;
  information: string | null;
}
function MyPets() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [pets, setPets] = useState<Pet[]>([]);
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

//   const handleDelete = (index: number) => {
//     setPets(pets.filter((_, i) => i !== index));
//   };
  return (
    <div className=" h-screen flex flex-col px-15">
      <div className="flex items-left justify-between mt-6 ">
        <h1 className=" text-left text-[24px] font-bold">My Pets</h1>
        <button
          onClick={() => setOpen(true)}
          className="bg-[#155dfc] cursor-pointer flex items-center gap-2 text-white w-27 rounded-md h-9 justify-center"
        >
          + Add Pet
        </button>
      </div>
      <h1 className="text-[12px] text-gray-500">
        Manage your pets and bookings
      </h1>
      <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-xs text-gray-400 font-medium px-6 py-4 tracking-wide">DATE</th>
              <th className="text-left text-xs text-gray-400 font-medium px-6 py-4 tracking-wide">TIME</th>
              <th className="text-left text-xs text-gray-400 font-medium px-6 py-4 tracking-wide">STATUS</th>
              <th className="text-left text-xs text-gray-400 font-medium px-6 py-4 tracking-wide">CLIENT</th>
              <th className="text-left text-xs text-gray-400 font-medium px-6 py-4 tracking-wide">ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {slots.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-gray-400 text-sm py-10">
                  No slots added yet. Click "Add Slot" to get started.
                </td>
              </tr>
            ) : (
              slots.map((slot) => (
                <tr key={slot.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">

                  <td className="px-6 py-5">
                    <span className="flex items-center gap-2 font-bold text-sm">
                      <FiCalendar className="text-gray-400" />
                      {slot.date}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span className="flex items-center gap-2 text-sm text-gray-600">
                      <FiClock className="text-gray-400" />
                      {slot.time}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    {slot.status === "open" ? (
                      <span className="flex items-center gap-1 bg-green-100 text-green-600 text-xs font-medium px-3 py-1 rounded-full w-fit">
                        <MdOutlineCancel size={14} /> Open
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 bg-red-100 text-red-400 text-xs font-medium px-3 py-1 rounded-full w-fit">
                        <GoCheckCircle size={14} /> Occupied
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-5 text-sm text-gray-500">
                    {slot.client ?? "-"}
                  </td>

                  <td className="px-6 py-5">
                    {slot.status === "open" ? (
                      <button
                        onClick={() => handleRemove(slot.id)}
                        className="text-sm text-gray-400 hover:text-red-500 transition-colors"
                      >
                        Remove Slot
                      </button>
                    ) : (
                      <div className="flex gap-3">
                        <button className="text-sm text-[#155dfc] font-medium hover:underline">
                          View Details
                        </button>
                        <button
                          className="text-sm text-red-500 font-medium hover:underline"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
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

export default MyPets;
