import connectDB from "@/lib/connectDB";
import PromoCodeModel from "@/models/PromoCode";

export async function POST(req: Request) {
  await connectDB();

  try {
    const { code, type, value, validTill } = await req.json();

    // Validate input
    if (!code || !type || !value) {
      return Response.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    if (type !== "percent" && type !== "fixed") {
      return Response.json(
        {
          success: false,
          message: "Type must be either 'percent' or 'fixed'",
        },
        { status: 400 }
      );
    }

    if (type === "percent" && (value < 1 || value > 100)) {
      return Response.json(
        {
          success: false,
          message: "Discount value must be between 1 and 100",
        },
        { status: 400 }
      );
    }

    // Check if validity is valid
    if (!validTill || validTill < Date.now()) {
      return Response.json(
        { success: false, message: "Promo valid till is required" },
        { status: 400 }
      );
    }

    const promocode = new PromoCodeModel({ code, type, value, validTill });
    await promocode.save();

    return Response.json(
      {
        success: true,
        message: "Promocode created successfully",
        data: promocode,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while creating promocode:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to create promocode",
      },
      { status: 500 }
    );
  }
}
