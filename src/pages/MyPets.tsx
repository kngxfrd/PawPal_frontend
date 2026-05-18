import { useState } from "react";
import { FiCalendar, FiClock } from "react-icons/fi";
import { GoCheckCircle } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";

interface Pet {
  Id: string;
  Name: string;
  Type: string;
  Breed: string;
  Age: string;
  Client: string;
  information: string | null;
}

function MyPets() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [pets, setPets] = useState<Pet[]>([]);
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [id, setId] = useState("");
    const [client, setClient] = useState("");
  const [info, setInfo] = useState("");

  const handleApply = () => {
    if (!name.trim()) return;
    else {
      const newPet: Pet = {
        Id: id,
        Name: name,
        Type: type,
        Breed: breed,
        Age: age,
        Client: client,
        information: info,
      };
      setPets([...pets, newPet]);
    }
    setClient("");
    setName("");
    setType("");
    setBreed("");
    setAge("");
    setInfo("");
    setId("");
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
            <th className="text-left text-xs text-gray-400 font-medium px-6 py-4 tracking-wide">
              ID
            </th>
            <th className="text-left text-xs text-gray-400 font-medium px-6 py-4 tracking-wide">
              NAME
            </th>
            <th className="text-left text-xs text-gray-400 font-medium px-6 py-4 tracking-wide">
              TYPE
            </th>
            <th className="text-left text-xs text-gray-400 font-medium px-6 py-4 tracking-wide">
              BREED
            </th>
            <th className="text-left text-xs text-gray-400 font-medium px-6 py-4 tracking-wide">
              ACTIONS
            </th>
          </tr>
        </thead>

        <tbody>
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
