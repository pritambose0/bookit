import connectDB from "@/lib/connectDB";
import ExperienceModel from "@/models/Experience";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();
    const {
      title,
      description,
      price,
      image,
      slots,
      currency,
      location,
      about,
    } = body;

    if (
      !title ||
      !description ||
      !price ||
      !image ||
      !slots ||
      !currency ||
      !location
    ) {
      return Response.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    if (!Array.isArray(slots) || slots.length === 0) {
      return Response.json(
        { success: false, message: "At least one slot is required" },
        { status: 400 }
      );
    }

    const existingExperience = await ExperienceModel.findOne({
      title,
      price,
      currency,
      location,
    });

    if (existingExperience) {
      return Response.json(
        { success: false, message: "Experience already exists" },
        { status: 400 }
      );
    }

    const experience = new ExperienceModel({
      title: title.trim(),
      description: description.trim(),
      price,
      image: image.trim(),
      slots,
      currency,
      about: about.trim(),
      location: location.trim(),
    });

    await experience.save();

    return Response.json(
      {
        success: true,
        message: "Experience added successfully",
        data: experience,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding experience:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to add experience",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const query = searchParams.get("query") || "";
    const limit = 8;
    const skip = (page - 1) * limit;

    // Search by query
    const filter = query ? { title: { $regex: query, $options: "i" } } : {};
    const total = await ExperienceModel.countDocuments(filter);

    const experiences = await ExperienceModel.find(filter)
      .sort({ createdAt: -1, _id: -1 })
      .skip(skip)
      .limit(limit);

    return Response.json(
      {
        success: true,
        data: experiences,
        pagination: {
          total,
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          hasNextPage: page < Math.ceil(total / limit),
          hasPrevPage: page > 1,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return Response.json(
      { success: false, message: "Failed to fetch experiences" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  await connectDB();

  try {
    const deleteBulk = await ExperienceModel.deleteMany();

    return Response.json(
      {
        success: true,
        message: "Experience deleted successfully",
        data: deleteBulk,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting experience:", error);

    return Response.json(
      { success: false, message: "Failed to delete experience" },
      { status: 500 }
    );
  }
}
