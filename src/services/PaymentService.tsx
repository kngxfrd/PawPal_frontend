const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function initiateMomoPayment(
  bookingId: number
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${BASE_URL}api/momo/pay/`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        booking_id: bookingId,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Payment failed");
  }

  return response.json();
}