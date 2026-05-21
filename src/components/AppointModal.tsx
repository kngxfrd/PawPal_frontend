import { useState } from "react";
import { FiCalendar, FiClock } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { LuPawPrint } from "react-icons/lu";
import { createBooking } from "../services/BookingSevice";
import { getPets } from "../services/petService";
import type { Slot } from "../services/BookingSevice";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  groomerName: string | undefined;
  groomerId: number;
  pets: string[];
  availableSlots: Slot[];
  onConfirm: () => void;
}

function AppointModal({
  isOpen,
  onClose,
  groomerName,
  pets,
  availableSlots,
  onConfirm,
}: BookingModalProps) {
  const [selectedPetName, setSelectedPetName] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!selectedPetName) {
      setError("Please select a pet");
      return;
    }
    if (!selectedSlot) {
      setError("Please select a slot");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const allPets = await getPets();
      const pet = allPets.find((p) => p.name === selectedPetName);
      if (!pet) {
        setError("Could not find selected pet. Please try again.");
        setLoading(false);
        return;
      }

      await createBooking({
        slot: selectedSlot.id,
        pet: pet.id,
        notes,
      });

      setSelectedPetName("");
      setSelectedSlot(null);
      setNotes("");
      setError("");
      onConfirm();
    } catch (err: any) {
      setError(err.message || "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-[480px] p-6 flex flex-col gap-5">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-[18px] font-bold">Book Appointment</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Fill in the details to confirm your booking
            </p>
          </div>
          <IoClose
            onClick={onClose}
            size={22}
            className="cursor-pointer text-gray-400 hover:text-gray-600"
          />
        </div>

        <div className="bg-blue-50 rounded-xl px-4 py-3 flex items-center gap-3">
          <div className="bg-[#155dfc] text-white w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
            <LuPawPrint size={18} />
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-800">{groomerName}</p>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">Select Pet</label>
          <select
            value={selectedPetName}
            onChange={(e) => setSelectedPetName(e.target.value)}
            className="h-11 rounded-xl border border-gray-200 pl-4 bg-gray-50 text-sm focus:outline-none focus:border-[#155dfc]"
          >
            <option value="" disabled>Choose a pet...</option>
            {pets.map((pet) => (
              <option key={pet} value={pet}>{pet}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">Select Slot</label>
          {availableSlots.length === 0 ? (
            <p className="text-sm text-rose-400">No available slots from this groomer</p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {availableSlots.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm transition-colors ${
                    selectedSlot?.id === slot.id
                      ? "border-[#155dfc] bg-blue-50 text-[#155dfc] font-medium"
                      : "border-gray-200 text-gray-600 hover:border-[#155dfc]"
                  }`}
                >
                  <FiCalendar size={13} className="shrink-0" />
                  <span>{slot.date}</span>
                  <FiClock size={13} className="shrink-0 ml-auto" />
                  <span>{slot.start_time}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">
            Additional Notes{" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="Any special requests or info..."
            className="rounded-xl border border-gray-200 pl-4 pt-3 bg-gray-50 text-sm focus:outline-none focus:border-[#155dfc] resize-none"
          />
        </div>

        {error && <p className="text-red-500 text-xs">{error}</p>}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-11 rounded-xl border border-gray-200 text-sm hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 h-11 rounded-xl bg-[#155dfc] hover:bg-blue-700 text-white text-sm font-medium transition-colors disabled:opacity-60"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppointModal;
