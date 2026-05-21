const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface PaymentTransaction {
  id: string | number;
  status: string;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  transaction?: PaymentTransaction;
}

export async function initiateMomoPayment(
  bookingId: number
): Promise<PaymentResponse> {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}momo/pay/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ booking_id: bookingId }),
  });

  const data = await response.json();

  // Determine success from the payload, not the HTTP status.
  // The backend can return non-2xx even for a successful simulation,
  // and the body's `transaction.status` is the source of truth.
  const isSuccessful =
    data?.transaction?.status === "successful" ||
    data?.success === true;

  if (!isSuccessful) {
    throw {
      message: data?.message || "Payment failed",
      transaction: data?.transaction,
    };
  }

  return { ...data, success: true } as PaymentResponse;
}
