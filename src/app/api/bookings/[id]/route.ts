import connectDB from "@/lib/connectDB";
import BookingModel from "@/models/Booking";
import ExperienceModel from "@/models/Experience";
import { isValidObjectId } from "mongoose";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  try {
    const { id } = await context.params;

    // Validate input
    if (!id || !isValidObjectId(id)) {
      return Response.json(
        { success: false, message: "Booking ID is not valid or missing" },
        { status: 400 }
      );
    }

    const booking = await BookingModel.findByIdAndDelete(id);

    if (!booking) {
      return Response.json(
        { success: false, message: "Error while deleting booking" },
        { status: 404 }
      );
    }

    // Update slot availability
    const experience = await ExperienceModel.findById(booking.experience);
    if (!experience) {
      return Response.json(
        { success: false, message: "Error while fetching experience" },
        { status: 404 }
      );
    }

    const slotIndex = experience.slots.findIndex(
      (slot) =>
        slot.date === booking.slot.date && slot.time === booking.slot.time
    );

    if (slotIndex === -1) {
      return Response.json(
        { success: false, message: "Error while updating slot" },
        { status: 404 }
      );
    }

    experience.slots[slotIndex].available = true;
    await experience.save();

    return Response.json(
      {
        success: true,
        message: "Booking deleted successfully and slot updated",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting booking:", error);

    return Response.json(
      { success: false, message: "Failed to delete booking" },
      { status: 500 }
    );
  }
}
