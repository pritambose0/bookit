import mongoose, { Document, Schema } from "mongoose";

export interface SlotSelection {
  date: string;
  time: string;
}

export interface Booking extends Document {
  name: string;
  email: string;
  promocode?: Schema.Types.ObjectId;
  experience: Schema.Types.ObjectId;
  quantity: number;
  price: number;
  finalPrice: number;
  slot: SlotSelection;
  status: "confirmed" | "failed" | "pending";
}

const BookingSchema = new Schema<Booking>(
  {
    name: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    promocode: {
      type: Schema.Types.ObjectId,
      ref: "PromoCode",
      default: null,
    },
    experience: {
      type: Schema.Types.ObjectId,
      ref: "Experience",
      required: [true, "Experience ID is required"],
    },
    quantity: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    finalPrice: {
      type: Number,
      required: [true, "Final price is required"],
    },
    slot: {
      date: { type: String, required: [true, "Slot date is required"] },
      time: { type: String, required: [true, "Slot time is required"] },
    },
    status: {
      type: String,
      enum: ["confirmed", "failed", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const BookingModel =
  (mongoose.models.Booking as mongoose.Model<Booking>) ||
  mongoose.model<Booking>("Booking", BookingSchema);

export default BookingModel;
