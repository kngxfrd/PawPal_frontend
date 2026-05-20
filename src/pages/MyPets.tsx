import { useState } from "react";
import { IoCardOutline, IoClose } from "react-icons/io5";
import { TfiTrash } from "react-icons/tfi";
import { GoPencil } from "react-icons/go";
import DataTable from "../components/DataTable";
import { BsThreeDotsVertical } from "react-icons/bs";

interface Pet {
  Id: string;
  Name: string;
  Type: string;
  Breed: string;
  Age: number;
  information: string | null;
}

function MyPets() {
  const [open, setOpen] = useState(false);
  const [tip, setTip] = useState(false);
  const [pets, setPets] = useState<Pet[]>([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [info, setInfo] = useState("");

  const handleApply = () => {
    if (!name.trim()) return;
    const newPet: Pet = {
      Id: crypto.randomUUID().slice(0, 4).toUpperCase(),
      Name: name,
      Type: type,
      Breed: breed,
      Age: Number(age),
      information: info,
    };

     const updated = [...pets, newPet];
  setPets(updated);
  localStorage.setItem("pets", JSON.stringify(updated));
    setPets([...pets, newPet]);
    setName("");
    setType("");
    setBreed("");
    setAge("");
    setInfo("");
    setOpen(false);
    setTip(false);
  };

  const handleDelete = (id: string) => {
    setPets(pets.filter((p) => p.Id !== id));
  };
const columns = [
  {
    header: "ID",
    accessor: "Id",
    render: (value: string) => (
      <span className="text-xs font-mono bg-gray-100 text-gray-500 px-2 py-1 rounded-md">
        #{value}
      </span>
    ),
  },

  {
    header: "Name",
    accessor: "Name",
    render: (value: string) => (
      <span className="font-semibold text-sm text-gray-800">
        {value}
      </span>
    ),
  },

  {
    header: "Type",
    accessor: "Type",
    render: (value: string) => (
      <span className="text-sm text-gray-600">
        {value}
      </span>
    ),
  },

  {
    header: "Breed",
    accessor: "Breed",
  },

  {
    header: "Age",
    accessor: "Age",
  },

  {
    header: "Actions",
    accessor: "Actions",

    render: (_: any, pet: Pet) => (
      <div className="flex items-center pl-4 gap-3">
        <button
          onClick={() => setTip(!tip)}
          className="text-gray-400 hover:text-[#155dfc] transition-colors"
        >
          <BsThreeDotsVertical />
        </button>

        {tip && (
          <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-xl z-50 w-36 overflow-hidden mt-60 mr-15">
            <button className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors">
              <IoCardOutline size={14} />
              Pay
            </button>

            <button
              className="cursor-pointer flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors"
            >
              <GoPencil size={14} />
              Edit
            </button>
            <button
              onClick={() => {
                handleDelete(pet.Id)
                setTip(false);
              }}
              className="cursor-pointer flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors"
            >
              <TfiTrash size={14} />
              Delete
            </button>
          </div>
        )}
      </div>
    ),
  },
];
  return (
    <div className="flex flex-col px-10 py-6">
      <div className="flex items-center justify-between mb-1">
        <div>
          <h1 className="text-[24px] font-bold">My Pets</h1>
          <p className="text-[12px] text-gray-400">
            Manage your registered pets
          </p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="bg-[#155dfc] hover:bg-blue-700 transition-colors cursor-pointer flex items-center gap-2 text-white px-4 rounded-xl h-9 text-sm font-medium"
        >
          + Add Pet
        </button>
      </div>

      {pets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-300">
          <p className="mt-3 text-sm">No pets added yet</p>
        </div>
      ) : (
        <DataTable columns={columns} data={pets} />
      )}

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-[420px] p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-[18px] font-bold">Add Pet</h2>
                <p className="text-xs text-gray-400">
                  Fill in your pet's details
                </p>
              </div>
              <IoClose
                onClick={() => setOpen(false)}
                size={22}
                className="cursor-pointer text-gray-400 hover:text-gray-600"
              />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">
                  Pet Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="eg. Rex, Boadi"
                  className="h-11 rounded-xl border border-gray-200 pl-4 bg-gray-50 text-sm focus:outline-none focus:border-[#155dfc]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-600">
                    Pet Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="h-11 rounded-xl border border-gray-200 pl-4 bg-gray-50 text-sm focus:outline-none focus:border-[#155dfc]"
                  >
                    <div className="rounded-lg border-0">
                        <option value="" disabled className="text-sm text-gray-400">
                          Select pet type...
                        </option>
                        <option value="dog"> Dog </option>
                        <option value="cat"> Cat </option>
                        <option value="rabbit"> Rabbit </option>
                        <option value="bird"> Bird </option>
                        <option value="other"> Other </option>
                    </div>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-600">
                    Age
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={30}
                    placeholder="0"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="h-11 rounded-xl border border-gray-200 pl-4 bg-gray-50 text-sm focus:outline-none focus:border-[#155dfc]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">
                  Breed
                </label>
                <input
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  placeholder="Breed"
                  className="h-11 rounded-xl border border-gray-200 pl-4 bg-gray-50 text-sm focus:outline-none focus:border-[#155dfc]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-600">
                  Additional Notes
                </label>
                <textarea
                  value={info}
                  onChange={(e) => setInfo(e.target.value)}
                  rows={2}
                  placeholder="Any extra info..."
                  className="rounded-xl border border-gray-200 pl-4 pt-3 bg-gray-50 text-sm focus:outline-none focus:border-[#155dfc] resize-none"
                />
              </div>
            </div>

            <button
              onClick={handleApply}
              className="w-full rounded-xl bg-[#155dfc] hover:bg-blue-700 text-white text-sm h-11 font-medium transition-colors"
            >
              Add Pet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPets;
