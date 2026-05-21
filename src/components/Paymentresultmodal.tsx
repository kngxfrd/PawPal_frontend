import { useEffect, useRef } from "react";
import { MdCheckCircle, MdErrorOutline, MdClose } from "react-icons/md";
import { LuReceipt } from "react-icons/lu";

interface Transaction {
  id: string | number;
  status: string;
}

interface PaymentResult {
  success: boolean;
  message: string;
  transaction?: Transaction;
}

interface PaymentResultModalProps {
  result: PaymentResult | null;
  onClose: () => void;
  onRetry?: () => void;
}

export default function PaymentResultModal({
  result,
  onClose,
  onRetry,
}: PaymentResultModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!result) return null;

  const { success, message, transaction } = result;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] px-4"
      style={{ animation: "fadeIn 150ms ease" }}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
        style={{ animation: "slideUp 200ms cubic-bezier(0.34,1.56,0.64,1)" }}
      >
        {/* Top accent strip */}
        <div
          className={`h-1 w-full ${success ? "bg-emerald-400" : "bg-rose-400"}`}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-gray-500 transition-colors cursor-pointer"
        >
          <MdClose size={18} />
        </button>

        <div className="px-7 pt-7 pb-6 flex flex-col items-center gap-4 text-center">
          {/* Icon */}
          <div
            className={`flex items-center justify-center w-14 h-14 rounded-full ${
              success ? "bg-emerald-50" : "bg-rose-50"
            }`}
          >
            {success ? (
              <MdCheckCircle size={32} className="text-emerald-500" />
            ) : (
              <MdErrorOutline size={32} className="text-rose-400" />
            )}
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-1">
            <h2 className="text-base font-bold text-slate-800 tracking-tight">
              {success ? "Payment Successful" : "Payment Failed"}
            </h2>
            <p className="text-sm text-slate-400 leading-snug">{message}</p>
          </div>

          {/* Transaction details */}
          {transaction && (
            <div className="w-full bg-slate-50 rounded-xl px-4 py-3 flex flex-col gap-2 border border-slate-100">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">
                <LuReceipt size={11} />
                Transaction Details
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Reference</span>
                <span className="font-mono font-semibold text-slate-700">
                  #{transaction.id}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Status</span>
                <span
                  className={`font-bold uppercase tracking-wide ${
                    transaction.status === "successful"
                      ? "text-emerald-600"
                      : "text-rose-500"
                  }`}
                >
                  {transaction.status}
                </span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 w-full mt-1">
            {!success && onRetry && (
              <button
                onClick={() => {
                  onClose();
                  onRetry();
                }}
                className="flex-1 h-9 rounded-xl text-sm font-bold text-white bg-[#155dfc] hover:bg-blue-600 active:scale-95 transition-all duration-150 cursor-pointer"
              >
                Retry Payment
              </button>
            )}
            <button
              onClick={onClose}
              className={`h-9 rounded-xl text-sm font-semibold transition-all duration-150 active:scale-95 cursor-pointer ${
                success
                  ? "flex-1 bg-slate-800 text-white hover:bg-slate-700"
                  : "flex-none px-5 bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              {success ? "Done" : "Dismiss"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px) scale(0.97) } to { opacity: 1; transform: translateY(0) scale(1) } }
      `}</style>
    </div>
  );
}
