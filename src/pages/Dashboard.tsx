import { useState } from "react";
import { IoClose } from "react-icons/io5";

function Dashboard() {
  const [open, setOpen] = useState(false);
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
      {open && (
        <>
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
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
                    required
                    placeholder="eg. Rex, Boadi"
                    className="w-85 h-12 rounded-md border border-gray-300 pl-4 mx-6 bg-white"
                  />
                  <label htmlFor="" className="text-left pl-6 text-sm pt-3">
                    Pet Type
                  </label>
                  <input
                    required
                    placeholder="Dog, Cat, Rabbit"
                    className="w-85 h-12 rounded-md border border-gray-300 pl-4 mx-6 bg-white"
                  />
                  <label htmlFor="" className="text-left pl-6 text-sm pt-3">
                    Breed
                  </label>
                  <input
                    required
                    type=""
                    placeholder="Breed"
                    className="w-85 h-12 rounded-md border border-gray-300 pl-4 mx-6 bg-white"
                  />
                  <label htmlFor="" className="text-left pl-6 text-sm pt-3">
                    Age
                  </label>
                  <input
                    type="date"
                    required
                    placeholder="3 years"
                    className="w-85 h-12 rounded-md border border-gray-300 pl-4 mx-6 bg-white"
                  />

                  <label htmlFor="" className="text-left pl-6 text-sm pt-3">
                    Additional Notes
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="3 years"
                    className="w-85 h-12 rounded-md border border-gray-300 pl-4 mx-6 bg-white"
                  />
                </div>
                <div className="flex flex-col gap 6 pt-4 gap-2">
                  <div className="flex justify-center">
                    <button className="w-85 rounded-md bg-[#155dfc] text-white text-sm border border-[#6c63ff] h-9 ">
                      Add Pet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
