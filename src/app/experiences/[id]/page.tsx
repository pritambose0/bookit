"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import axios from "axios";
import { NewBookingData } from "@/app/checkout/page";

interface Slot {
  _id: string;
  date: string;
  time: string;
  bookedCount: number;
  capacity: number;
  seatsLeft: number;
  available: boolean;
}

interface Experience {
  _id: string;
  title: string;
  description: string;
  location: string;
  image: string;
  price: number;
  slots: Slot[];
}

export default function ExperienceDetails() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [experienceData, setExperienceData] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);

  const tax = 59;

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    async function fetchExperienceDetails() {
      try {
        const res = await axios.get<{ data: Experience }>(
          `/api/experiences/${id}`
        );
        const data = res.data.data;

        if (data && Array.isArray(data.slots)) {
          data.slots = data.slots.map((slot) => {
            const booked = Number(slot.bookedCount ?? 0);
            const cap = Number(slot.capacity ?? 0);
            const seatsLeft = Math.max(0, cap - booked);
            const available = seatsLeft > 0;
            return {
              ...slot,
              bookedCount: booked,
              capacity: cap,
              seatsLeft,
              available,
            };
          });
        }

        setExperienceData(data);
      } catch {
        setExperienceData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchExperienceDetails();
  }, [id]);

  if (loading)
    return (
      <div className="max-w-7xl mx-auto py-20 text-center text-gray-500">
        Loading...
      </div>
    );

  if (!experienceData)
    return (
      <div className="max-w-7xl mx-auto py-20 text-center text-gray-500">
        Unable to load experience.
      </div>
    );

  const slots = experienceData.slots || [];
  const uniqueDates = Array.from(new Set(slots.map((s) => s.date)));
  const timesForSelectedDate = slots.filter((s) => s.date === selectedDate);
  const basePrice = experienceData.price || 0;
  const total = basePrice * quantity + tax;

  const handleConfirmData = () => {
    const bookingData: NewBookingData = {
      experienceId: id,
      title: experienceData.title,
      location: experienceData.location,
      date: selectedDate,
      time: selectedTime,
      subTotal: basePrice,
      tax,
      quantity,
      total,
    };
    localStorage.setItem("booking", JSON.stringify(bookingData));
    router.push("/checkout");
  };

  const basePriceValue = (data: Experience) =>
    data?.price ? Number(data.price).toLocaleString() : "0";

  return (
    <>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-0">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-gray-700 hover:text-black mb-4 transition"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Details</span>
        </button>
      </div>

      <main className="max-w-7xl mx-auto pb-10 px-4 md:px-6 lg:px-0 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2">
          <div className="mb-6">
            <Image
              src={experienceData.image}
              alt={experienceData.title}
              width={1000}
              height={500}
              className="rounded-xl w-full object-cover aspect-video"
            />
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {experienceData.title}
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            {experienceData.description}
          </p>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              Choose date
            </h3>
            <div className="flex flex-wrap gap-2">
              {uniqueDates.length === 0 ? (
                <div className="text-sm text-gray-500">No dates available.</div>
              ) : (
                uniqueDates.map((date) => (
                  <button
                    key={date}
                    onClick={() => {
                      setSelectedDate(date);
                      setSelectedTime("");
                    }}
                    className={`px-4 py-2 rounded-md text-sm  transition-colors duration-200 ${
                      selectedDate === date
                        ? "bg-[#FFD643] text-[#161616]"
                        : "border border-[#BDBDBD] hover:bg-[#efefef] text-gray-700 cursor-pointer"
                    }`}
                  >
                    {new Date(date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-[#161616] mb-2">
              Choose time
            </h3>
            <div className="flex flex-wrap gap-2">
              {timesForSelectedDate.length === 0 ? (
                <div className="text-sm font-medium text-gray-500">
                  Select a date to view times.
                </div>
              ) : (
                timesForSelectedDate.map((slot) => {
                  const soldOut = slot.bookedCount >= slot.capacity;
                  const seatsLeft = Math.max(
                    0,
                    slot.capacity - slot.bookedCount
                  );
                  const selected = selectedTime === slot.time;
                  return (
                    <button
                      key={slot._id}
                      onClick={() => !soldOut && setSelectedTime(slot.time)}
                      className={`px-3 py-2 rounded-md text-sm flex items-center justify-center gap-1 transition-colors  duration-150 ${
                        soldOut
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : selected
                          ? "bg-[#FFD643] text-black font-medium"
                          : "text-gray-700 border border-[#BDBDBD] hover:bg-[#efefef] cursor-pointer"
                      }`}
                    >
                      <span>{slot.time}</span>
                      {soldOut ? (
                        <span className="text-xs font-medium text-gray-500">
                          Sold out
                        </span>
                      ) : (
                        <span
                          className={`text-xs px-2 py-0.5 rounded font-medium text-red-600`}
                        >
                          {seatsLeft} left
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              All times are in IST (GMT +5:30)
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">About</h3>
            <p className="text-gray-500 text-sm bg-gray-100 rounded-md px-4 py-2">
              Scenic routes, trained guides, and safety briefing. Minimum age
              10.
            </p>
          </div>
        </section>

        {/* Sidebar */}
        <aside className="bg-[#EFEFEF] rounded-xl shadow-md p-6 h-fit">
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Starts at</span>
              <span className="font-medium">
                ₹{basePriceValue(experienceData)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span>Quantity</span>
              <div className="flex items-center rounded-md">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-1 border border-[#C9C9C9] cursor-pointer hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-3">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-1 border border-[#C9C9C9] cursor-pointer hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium">
                ₹{(experienceData.price * quantity).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between border-b border-[#D9D9D9] pb-2">
              <span>Taxes</span>
              <span className="font-medium">₹{tax}</span>
            </div>

            <div className="flex justify-between text-base font-semibold text-gray-900 pt-2">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>

          <Button
            className="w-full mt-5 text-[#161616]"
            onClick={handleConfirmData}
            disabled={!selectedDate || !selectedTime}
          >
            Confirm
          </Button>
        </aside>
      </main>
    </>
  );
}
