import connectDB from "@/lib/connectDB";
import ExperienceModel from "@/models/Experience";
import { isValidObjectId } from "mongoose";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  try {
    const { id } = await context.params;
    // console.log("ID", id);

    if (!id || !isValidObjectId(id)) {
      return Response.json(
        { success: false, message: "Experience ID is not valid or missing" },
        { status: 400 }
      );
    }

    const experience = await ExperienceModel.findById(id);
    // console.log("Experience", experience);

    if (!experience) {
      return Response.json(
        { success: false, message: "Error while fetching experience" },
        { status: 404 }
      );
    }

    const formattedSlots = experience.toObject().slots.map((slot) => ({
      ...slot,
      seatsLeft: slot.capacity - slot.bookedCount,
    }));
    // console.log("Formatted", formattedSlots);

    return Response.json(
      {
        success: true,
        data: {
          ...experience.toObject(),
          slots: formattedSlots,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching experience details:", err);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch experience details",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  try {
    const { id } = await context.params;

    if (!id || !isValidObjectId(id)) {
      return Response.json(
        { success: false, message: "Experience ID is required" },
        { status: 400 }
      );
    }

    const experience = await ExperienceModel.findByIdAndDelete(id);

    if (!experience) {
      return Response.json(
        { success: false, message: "Error while deleting experience" },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Experience deleted successfully",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error while deleting experience:", err);

    return Response.json(
      {
        success: false,
        message: "Failed to delete experience",
      },
      { status: 500 }
    );
  }
}
