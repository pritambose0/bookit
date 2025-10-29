"use client";

import Button from "@/components/Button";
import { CheckCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function BookingConfirmedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refId = searchParams.get("ref") || "HUF56&SO";

  return (
    <div className="flex flex-col items-center justify-center pt-28">
      <CheckCircle className="w-16 h-16 text-green-500 mb-6" />

      <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
        Booking Confirmed
      </h1>

      <p className="text-gray-600 mt-2 text-sm sm:textlg">
        Ref ID: <span className="font-medium">{refId}</span>
      </p>

      <Button
        onClick={() => router.push("/")}
        className="mt-6 px-5 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
      >
        Back to Home
      </Button>
    </div>
  );
}
