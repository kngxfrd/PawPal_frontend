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
    header: "NAME",
    accessor: "Name",
    render: (value: string) => (
      <span className="font-semibold text-sm text-gray-800">
        {value}
      </span>
    ),
  },

  {
    header: "TYPE",
    accessor: "Type",
    render: (value: string) => (
      <span className="text-sm text-gray-600">
        {value}
      </span>
    ),
  },

  {
    header: "BREED",
    accessor: "Breed",
  },

  {
    header: "AGE",
    accessor: "Age",
  },

  {
    header: "ACTIONS",
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
    <div className="min-h-full w-full bg-[#f8fafc]">
      <div className="flex flex-col px-4 md:px-8 py-8 gap-6 max-w-7xl mx-auto w-full font-sans">
        
        {/* Page Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
              My Pets
            </h1>
            <p className="text-xs md:text-sm text-slate-400 font-medium">
              Manage your registered pets
            </p>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="bg-[#155dfc] hover:bg-blue-600 active:scale-98 transition-all duration-200 cursor-pointer flex items-center gap-2 text-white px-4 rounded-xl h-9.5 text-xs font-bold shadow-3xs hover:shadow-2xs"
          >
            + Add Pet
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-white border border-slate-100 shadow-2xs rounded-2xl p-2 sm:p-4">
          <DataTable columns={columns} data={pets} emptyMessage="No pets added yet" />
        </div>

        {/* Add Pet Dialog Modal */}
        {open && (
          <div className="fixed inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs z-50">
            <div className="bg-white rounded-2xl shadow-xl w-[420px] max-w-[90%] p-6 flex flex-col gap-5 border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
              
              <div className="flex justify-between items-start gap-4">
                <div className="flex flex-col gap-0.5">
                  <h2 className="text-base font-bold text-slate-800">Add Pet</h2>
                  <p className="text-xs text-slate-400 font-medium">
                    Fill in your pet's details below
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
                >
                  <IoClose size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Pet Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rex, Buddy"
                    className="h-10.5 rounded-xl border border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 placeholder-slate-300 focus:outline-none focus:border-[#155dfc] focus:ring-1 focus:ring-blue-100 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Pet Type
                    </label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="h-10.5 rounded-xl border border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 focus:outline-none focus:border-[#155dfc] focus:ring-1 focus:ring-blue-100 transition-all"
                    >
                      <option value="" disabled className="text-slate-300">
                        Select...
                      </option>
                      <option value="dog">Dog</option>
                      <option value="cat">Cat</option>
                      <option value="rabbit">Rabbit</option>
                      <option value="bird">Bird</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Age
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={30}
                      placeholder="0"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="h-10.5 rounded-xl border border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 placeholder-slate-300 focus:outline-none focus:border-[#155dfc] focus:ring-1 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Breed
                  </label>
                  <input
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    placeholder="e.g. Golden Retriever"
                    className="h-10.5 rounded-xl border border-slate-200 bg-white px-4 text-xs font-medium text-slate-700 placeholder-slate-300 focus:outline-none focus:border-[#155dfc] focus:ring-1 focus:ring-blue-100 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Additional Notes
                  </label>
                  <textarea
                    value={info}
                    onChange={(e) => setInfo(e.target.value)}
                    rows={2}
                    placeholder="Any health or behavioral notes..."
                    className="rounded-xl border border-slate-200 bg-white p-3.5 text-xs font-medium text-slate-700 placeholder-slate-300 focus:outline-none focus:border-[#155dfc] focus:ring-1 focus:ring-blue-100 transition-all resize-none"
                  />
                </div>
              </div>

              <button
                onClick={handleApply}
                className="w-full rounded-xl bg-[#155dfc] hover:bg-blue-600 active:scale-98 text-white text-xs font-bold h-11 shadow-3xs hover:shadow-2xs transition-all duration-200 mt-2"
              >
                Add Pet
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPets;
