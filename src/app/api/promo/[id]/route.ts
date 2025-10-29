import connectDB from "@/lib/connectDB";
import PromoCodeModel from "@/models/PromoCode";
import { isValidObjectId } from "mongoose";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  try {
    const { id } = await context.params;

    if (!id || !isValidObjectId(id)) {
      return Response.json(
        { success: false, message: "Promocode ID is not valid or missing" },
        { status: 400 }
      );
    }

    const promocode = await PromoCodeModel.findByIdAndDelete(id);

    if (!promocode) {
      return Response.json(
        { success: false, message: "Error while deleting promocode" },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Promocode deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting promocode:", error);

    return Response.json(
      { success: false, message: "Failed to delete promocode" },
      { status: 500 }
    );
  }
}
