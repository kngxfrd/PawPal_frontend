import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function GroomerPage() {
  const { user } = useAuth();
  const [active, setActive] = useState("Appointment Schedule");
  return (
    <div>
      <GroomHeader
        shopname={user?.fullName || "My Shop"}
        address="123 Carlton Street"
        openSlots={3}
        occupiedSlots={2}
        totalslots={5}
        occupancyrate={4}
      />
      <GroomerDashboard active={active} setActive={setActive} />
    </div>
  );
}

export default GroomerPage;
