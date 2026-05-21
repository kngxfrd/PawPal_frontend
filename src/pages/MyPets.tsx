import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { TfiTrash } from "react-icons/tfi";
import { GoPencil } from "react-icons/go";
import DataTable from "../components/DataTable";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getPets, createPet, updatePet, deletePet, type Pet } from "../services/petService";
function MyPets() {
  const [open, setOpen] = useState(false);
  const [tip, setTip] = useState<number | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    setLoading(true);
    try {
      const data = await getPets();
      setPets(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handleApply = async () => {
    if (!name.trim()) return;
    
    try {
      if (editingPet) {
        const updated = await updatePet(editingPet.id, {
          name, type, breed, age: Number(age), special_notes: info
        });
        setPets(pets.map(p => p.id === updated.id ? updated : p));
      } else {
        const newPet = await createPet({
          name, type, breed, age: Number(age), special_notes: info
        });
        setPets([...pets, newPet]);
      }
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Failed to save pet. Check the console for details.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePet(id);
      setPets(pets.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete pet.");
    }
  };

  const resetForm = () => {
    setName("");
    setType("");
    setBreed("");
    setAge("");
    setInfo("");
    setEditingPet(null);
    setOpen(false);
    setTip(null);
  };

const columns = [
  {
    header: "ID",
    accessor: "id",
    render: (value: number) => (
      <span className="text-xs font-mono bg-gray-100 text-gray-500 px-2 py-1 rounded-md">
        #{value}
      </span>
    ),
  },
  {
    header: "NAME",
    accessor: "name",
    render: (value: string) => (
      <span className="font-semibold text-sm text-gray-800">
        {value}
      </span>
    ),
  },
  {
    header: "TYPE",
    accessor: "type",
    render: (value: string) => (
      <span className="text-sm text-gray-600">
        {value}
      </span>
    ),
  },
  {
    header: "BREED",
    accessor: "breed",
  },
  {
    header: "AGE",
    accessor: "age",
  },
  {
    header: "ACTIONS",
    accessor: "actions",

    render: (_: any, pet: Pet) => (
      <div className="flex items-center pl-4 gap-3 relative">
        <button
          onClick={() => setTip(tip === pet.id ? null : pet.id)}
          className="text-gray-400 hover:text-[#155dfc] transition-colors"
        >
          <BsThreeDotsVertical />
        </button>

        {tip === pet.id && (
          <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-xl z-50 w-36 overflow-hidden shadow-lg">

            <button
              onClick={() => {
                setEditingPet(pet);
                setName(pet.name);
                setType(pet.type || "");
                setBreed(pet.breed || "");
                setAge(pet.age?.toString() || "");
                setInfo(pet.special_notes || "");
                setOpen(true);
                setTip(null);
              }}
              className="cursor-pointer flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-500 transition-colors"
            >
              <GoPencil size={14} />
              Edit
            </button>
            <button
              onClick={() => {
                handleDelete(pet.id);
                setTip(null);
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
            onClick={() => { resetForm(); setOpen(true); }}
            className="bg-[#155dfc] hover:bg-blue-600 active:scale-98 transition-all duration-200 cursor-pointer flex items-center gap-2 text-white px-4 rounded-xl h-9.5 text-xs font-bold shadow-3xs hover:shadow-2xs"
          >
            + Add Pet
          </button>
        </div>

        <div className="bg-white border border-slate-100 shadow-2xs rounded-2xl p-2 sm:p-4">
          {loading ? (
            <div className="py-10 text-center text-sm text-slate-400">Loading pets...</div>
          ) : (
            <DataTable columns={columns} data={pets} emptyMessage="No pets added yet" />
          )}
        </div>

        {open && (
          <div className="fixed inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs z-50">
            <div className="bg-white rounded-2xl shadow-xl w-[420px] max-w-[90%] p-6 flex flex-col gap-5 border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
              
              <div className="flex justify-between items-start gap-4">
                <div className="flex flex-col gap-0.5">
                  <h2 className="text-base font-bold text-slate-800">{editingPet ? "Edit Pet" : "Add Pet"}</h2>
                  <p className="text-xs text-slate-400 font-medium">
                    Fill in your pet's details below
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetForm}
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
                {editingPet ? "Update Pet" : "Add Pet"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPets;
