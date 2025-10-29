import connectDB from "@/lib/connectDB";
import PromoCodeModel from "@/models/PromoCode";

export async function POST(req: Request) {
  await connectDB();

  try {
    const { code } = await req.json();

    // Validate input
    if (!code || typeof code !== "string") {
      return Response.json(
        { success: false, message: "Promo code is required" },
        { status: 400 }
      );
    }

    const promocode = await PromoCodeModel.findOne({
      code: code.trim().toUpperCase(),
    });

    if (!promocode) {
      return Response.json(
        { success: false, message: "Invalid promo code" },
        { status: 404 }
      );
    }

    // Check if promo code is expired
    if (promocode.validTill?.getTime() < Date.now()) {
      return Response.json(
        { success: false, message: "Promo code is invalid or expired" },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Promo code validated successfully",
        data: promocode,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while validating promo code:", error);

    return Response.json(
      { success: false, message: "Failed to validate promo code" },
      { status: 500 }
    );
  }
}
