

function AppointmentSchedule() {
  return (
    <div className="px-15 mt-10">
        <div className="flex justify-between">
            <h1 className="font-bold text-[28px]">Appointment Schedule</h1>
            <button className="w-35 h-10 rounded-lg bg-[#9810fa] text-white">Add New Slot</button>
        </div>
        <div className=" flex flex-col items-left px-15 text-center mt-10 w-full border border-gray-200 rounded-lg py-6 bg-white shadow-lg">
        <div className="flex justify-between gap-1 text-gray-400 text-sm">
          <label htmlFor=""> Date</label>
          <label htmlFor=""> Time</label>
          <label htmlFor=""> Status</label>
          <label htmlFor=""> Client</label>
          <label htmlFor=""> Actions</label>
        </div>
      </div>
    </div>
  )
}

export default AppointmentSchedule