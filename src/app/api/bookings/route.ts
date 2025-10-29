import connectDB from "@/lib/connectDB";
import BookingModel from "@/models/Booking";
import ExperienceModel from "@/models/Experience";
import PromoCodeModel from "@/models/PromoCode";
import { isValidObjectId } from "mongoose";

export async function POST(req: Request) {
  await connectDB();

  try {
    const { name, email, experienceId, promocodeId, slot } = await req.json();

    // Validate input
    if (!name || !email || !experienceId || !slot) {
      return Response.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    if (!isValidObjectId(experienceId)) {
      return Response.json(
        { success: false, message: "Invalid experience Id" },
        { status: 400 }
      );
    }

    if (promocodeId && !isValidObjectId(promocodeId)) {
      return Response.json(
        { success: false, message: "Invalid promocodeId" },
        { status: 400 }
      );
    }

    if (!slot.date || !slot.time) {
      return Response.json(
        { success: false, message: "Slot must include date and time" },
        { status: 400 }
      );
    }

    const experience = await ExperienceModel.findById(experienceId);
    if (!experience) {
      return Response.json(
        { success: false, message: "Experience not found" },
        { status: 404 }
      );
    }

    // Check if slot is available
    const targetSlot = experience.slots.find(
      (s) => s.date === slot.date && s.time === slot.time
    );

    if (!targetSlot) {
      return Response.json(
        { success: false, message: "Slot not found" },
        { status: 404 }
      );
    }

    if (targetSlot.bookedCount >= targetSlot.capacity) {
      return Response.json(
        { success: false, message: "This slot is fully booked" },
        { status: 409 }
      );
    }

    // Calculate final price and apply promocode
    let finalPrice = experience.price;
    if (promocodeId) {
      const promo = await PromoCodeModel.findById(promocodeId);

      if (promo) {
        if (promo.type === "percent") {
          finalPrice = finalPrice - (finalPrice * promo.value) / 100;
        } else if (promo.type === "fixed") {
          finalPrice = finalPrice - promo.value;
        }

        if (finalPrice < 0) finalPrice = 0;
      }
    }

    const booking = new BookingModel({
      name: name.trim(),
      email: email.trim(),
      experience: experienceId,
      price: experience?.price,
      slot,
      promocode: promocodeId,
      finalPrice,
      status: "confirmed",
    });

    await booking.save();

    // Update slot availability
    targetSlot.bookedCount += 1;

    if (targetSlot.bookedCount >= targetSlot.capacity) {
      targetSlot.available = false;
    }

    await experience.save({ validateModifiedOnly: true });

    return Response.json(
      {
        success: true,
        data: booking,
        message: "Booking created successfully",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error creating booking:", err);

    return Response.json(
      {
        success: false,
        message: "Failed to create booking",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectDB();
  try {
    const bookings = await BookingModel.find()
      .populate("experience")
      .populate("promocode");

    return Response.json(
      {
        success: true,
        data: bookings,
        message: "Bookings fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching bookings:", error);

    return Response.json(
      { success: false, message: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
