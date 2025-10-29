import mongoose, { Document, Schema } from "mongoose";

export interface PromoCode extends Document {
  code: string;
  type: "percent" | "fixed";
  value: number;
  validTill: Date;
}

const PromoCodeSchema = new Schema<PromoCode>(
  {
    code: {
      type: String,
      required: [true, "Promo code is required"],
      unique: true,
      uppercase: true,
      trim: true,
    },
    type: {
      type: String,
      enum: {
        values: ["percent", "fixed"],
        message: "Type must be either 'percent' or 'fixed'",
      },
      required: [true, "Promo type is required"],
    },
    value: {
      type: Number,
      required: [true, "Promo value is required"],
      min: [1, "Promo value must be at least 1"],
    },
    validTill: {
      type: Date,
      required: [true, "Promo validity is required"],
    },
  },
  { timestamps: true }
);

const PromoCodeModel =
  (mongoose.models.PromoCode as mongoose.Model<PromoCode>) ||
  mongoose.model<PromoCode>("PromoCode", PromoCodeSchema);

export default PromoCodeModel;
