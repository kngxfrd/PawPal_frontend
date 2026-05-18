function GroomerSettings() {
  return (
    <div className="pt-6 px-15 pb-50">
      <div className="flex pt-4">
          <h1 className="font-bold text-[28px]">Business Settings</h1>
      </div>
      <div className=" flex flex-col items-left justify-center text-center mt-6 w-160 h-150 border border-gray-200 rounded-lg py-6 bg-white shadow-lg">
        <div className="flex flex-col gap-1">
          <label htmlFor="" className="text-left pl-6 text-sm pt-3">
            Business Name
          </label>
          <input
            required
            placeholder="Business Name"
            className=" h-12 rounded-md border border-gray-300 pl-4 mx-6 bg-white"
          />

          <label htmlFor="" className="text-left pl-6 text-sm pt-3">
            Address
          </label>
          <input
            required
            placeholder="123 Carlton St"
            className=" h-12 rounded-md border border-gray-300 pl-4 mx-6 bg-white"
          />
          <div className="flex pt-6">
              <label htmlFor="" className="text-left pl-6 text-sm pt-3">
                Phone
              </label>
              <input
                required
                placeholder=""
                className="w-70 h-12 rounded-md border border-gray-300 pl-4 mx-6 bg-white"
              />
              <label htmlFor="" className="text-left pl-6 text-sm pt-3">
                Email
              </label>
              <input
                required
                placeholder="info@pawpal.com"
                className="w-70  h-12 rounded-md border border-gray-300 pl-4 mx-6 bg-white"
              />
          </div>
          <label htmlFor="" className="text-left pl-6 text-sm pt-3">
            Specialties
          </label>
          <input
            required
            placeholder="your@email.com"
            className=" h-12 rounded-md border border-gray-300 pl-4 mx-6 bg-white"
          />
          <label htmlFor="" className="text-left pl-6 text-sm pt-3">
            Price Range
          </label>
          <input
            required
            placeholder="your@email.com"
            className=" h-12 rounded-md border border-gray-300 pl-4 mx-6 bg-white"
          />
        </div>
        <div className="flex flex-col gap 6 pt-6 gap-2">
          <div className="flex justify-center">
            <button className="w-150 rounded-md bg-[#9810fa] text-white text-sm border  h-12 ">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroomerSettings;
