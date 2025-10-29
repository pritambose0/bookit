import mongoose, { Document, Schema } from "mongoose";

export interface Slot {
  date: string;
  time: string;
  available: boolean;
  capacity: number;
  bookedCount: number;
}

export interface Experience extends Document {
  title: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  location: string;
  slots: Slot[];
}

const ExperienceSchema = new Schema<Experience>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    currency: {
      type: String,
      enum: ["INR", "USD", "EUR"],
      default: "INR",
      required: [true, "Currency is required"],
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    slots: {
      type: [
        {
          date: { type: String, required: true },
          time: { type: String, required: true },
          available: { type: Boolean, default: true },
          capacity: {
            type: Number,
            default: 5,
            min: [1, "Capacity must be at least 1"],
          },
          bookedCount: {
            type: Number,
            default: 0,
            min: [0, "Booked count cannot be negative"],
          },
        },
      ],
    },
  },
  { timestamps: true }
);

const ExperienceModel =
  (mongoose.models.Experience as mongoose.Model<Experience>) ||
  mongoose.model<Experience>("Experience", ExperienceSchema);

export default ExperienceModel;
