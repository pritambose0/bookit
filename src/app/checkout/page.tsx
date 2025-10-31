"use client";

import { useEffect, useState, startTransition } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CheckCircleIcon, XCircleIcon, Loader2, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { CartItem, NewBookingData, PromoCode } from "@/types/Booking";

export default function CheckoutPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [experience, setExperience] = useState<NewBookingData>();
  const [promoDetails, setPromoDetails] = useState<PromoCode>();
  const [isValidatingPromo, setIsValidatingPromo] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("booking");
    if (stored) {
      startTransition(() => setExperience(JSON.parse(stored)));
    }
  }, []);

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;

    setIsValidatingPromo(true);
    setPromoError("");

    try {
      const res = await axios.post("/api/promo/validate", { code: promoCode });
      if (res.data?.success) {
        setPromoDetails(res.data.data);
        setIsApplied(true);
      } else {
        setPromoError("Invalid promo code.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setPromoError(error.response?.data?.message || "Something went wrong.");
      } else {
        setPromoError("Something went wrong.");
      }
    } finally {
      setIsValidatingPromo(false);
    }
  };

  const total = experience?.total || 0;

  const discountValue = promoDetails
    ? promoDetails.type === "percent"
      ? (total * promoDetails.value) / 100
      : promoDetails.type === "fixed"
      ? promoDetails.value
      : 0
    : 0;

  const handleSubmit = async () => {
    if (!experience) return toast.error("No experience selected.");
    if (!fullName.trim() || !email.trim())
      return toast.error("Please fill in all required fields.");
    if (!agreed)
      return toast.error("You must agree to the terms and safety policy.");

    const bookingData: CartItem = {
      experienceId: experience.experienceId,
      name: fullName,
      email,
      quantity: experience.quantity,
      slot: { date: experience.date, time: experience.time },
      ...(promoDetails?._id && { promocodeId: promoDetails._id }),
    };

    setIsSubmitting(true);

    try {
      const res = await axios.post("/api/bookings", bookingData);
      if (res.data.success) {
        router.push(`/booking-confirmed?ref=${res.data?.data?._id}`);
        toast.success("Booking submitted successfully!");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Booking failed. Please try again."
        );
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!experience)
    return (
      <div className="flex items-center justify-center h-[80vh] text-gray-600">
        <p>No booking data found. Please select an experience first.</p>
      </div>
    );

  return (
    <>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-0">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-gray-700 hover:text-[#191919] mb-4 transition cursor-pointer"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Checkout</span>
        </button>
      </div>

      <div className="bg-[#FAFAFA] px-6 md:px-16 lg:px-0 pb-10 flex flex-col md:flex-row justify-between gap-6 max-w-7xl mx-auto">
        <div className="bg-[#F6F6F6] rounded-lg shadow-sm w-full md:w-2/3 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Checkout</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <InputField
              label="Full name"
              value={fullName}
              onChange={setFullName}
              placeholder="Your name"
            />
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
            />
          </div>

          <div className="flex items-center gap-2 mb-2">
            <Input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Promo code"
              className="flex-1"
              readOnly={isApplied}
            />
            <Button
              onClick={handleApplyPromo}
              disabled={isValidatingPromo || isApplied}
              className="bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isValidatingPromo ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Validating...
                </div>
              ) : isApplied ? (
                <div className="flex items-center gap-1 text-green-600 font-medium">
                  <CheckCircleIcon className="w-4 h-4" />
                  <span>Applied</span>
                </div>
              ) : (
                "Apply"
              )}
            </Button>
          </div>

          {promoError && (
            <p className="text-sm text-red-500 mb-3 flex items-center gap-1">
              <XCircleIcon className="w-3 h-3" />
              {promoError}
            </p>
          )}

          {isApplied && promoDetails && (
            <p className="text-sm text-green-600 mb-3">
              You saved ₹{Math.round(discountValue)} with code{" "}
              <span className="font-semibold">{promoDetails.code}</span>
            </p>
          )}

          <div className="flex items-center gap-2 mt-3">
            <input
              id="agree"
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="h-4 w-4 accent-[#FFD643] rounded cursor-pointer"
            />
            <label
              htmlFor="agree"
              className="text-xs text-gray-600 cursor-pointer select-none"
            >
              I agree to the terms and safety policy
            </label>
          </div>
        </div>

        <div className="bg-[#F6F6F6] p-6 rounded-lg shadow-sm w-full md:w-1/3 space-y-3">
          <SummaryItem label="Experience" value={experience.title} />
          <SummaryItem label="Date" value={experience.date} />
          <SummaryItem label="Time" value={experience.time} />
          <SummaryItem label="Qty" value={experience.quantity} />
          <hr />
          <SummaryItem label="Subtotal" value={`₹${experience.subTotal}`} />
          <SummaryItem label="Tax" value={`₹${Math.round(experience.tax)}`} />
          {isApplied && promoDetails && (
            <SummaryItem
              label={`Promo (${promoDetails.code})`}
              value={`-₹${Math.round(discountValue)}`}
              highlight
            />
          )}
          <hr />
          <SummaryItem
            label="Total"
            value={`₹${Math.round(total - discountValue)}`}
            bold
          />
          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={isSubmitting || !agreed || !fullName || !email}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2 justify-center">
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </div>
            ) : (
              "Pay and Confirm"
            )}
          </Button>
        </div>
      </div>
    </>
  );
}

function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-700 mb-1">{label}</label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

function SummaryItem({
  label,
  value,
  bold = false,
  highlight = false,
}: {
  label: string;
  value: string | number;
  bold?: boolean;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex justify-between text-sm ${
        highlight
          ? "text-green-700"
          : bold
          ? "font-semibold text-gray-900"
          : "text-gray-700"
      }`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
