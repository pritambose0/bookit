import "dotenv/config";
import mongoose from "mongoose";
import ExperienceModel from "@/models/Experience";
import PromoCodeModel from "@/models/PromoCode";
import connectDB from "@/lib/connectDB";

async function seed() {
  await connectDB();
  console.log("🌱 Starting database seeding...");

  // Clear existing data
  await ExperienceModel.deleteMany({});
  await PromoCodeModel.deleteMany({});

  // Seed Experiences
  const experiences = [
    {
      title: "Bungee Jumping",
      location: "Rishikesh, Uttarakhand",
      description:
        "Leap from India's highest bungee platform overlooking the stunning Ganges valley. Experience the adrenaline rush under the guidance of certified experts using top-grade safety gear.",
      price: 4200,
      currency: "INR",
      image:
        "https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg",
      slots: [
        { date: "2025-11-01", time: "08:00 AM", capacity: 10, bookedCount: 10 },
        { date: "2025-11-01", time: "10:30 AM", capacity: 10, bookedCount: 9 },
        { date: "2025-11-01", time: "12:00 PM", capacity: 10, bookedCount: 3 },
        { date: "2025-11-02", time: "09:00 AM", capacity: 8, bookedCount: 6 },
        { date: "2025-11-02", time: "11:30 AM", capacity: 8, bookedCount: 8 },
        { date: "2025-11-03", time: "02:00 PM", capacity: 12, bookedCount: 5 },
        { date: "2025-11-03", time: "04:00 PM", capacity: 12, bookedCount: 12 },
      ],
    },
    {
      title: "Scuba Diving",
      location: "Andaman Islands",
      description:
        "Explore the enchanting coral reefs and diverse marine life of Havelock Island. Professional dive instructors ensure safety and unforgettable underwater experiences.",
      price: 6500,
      currency: "INR",
      image: "https://images.pexels.com/photos/386148/pexels-photo-386148.jpeg",
      slots: [
        { date: "2025-11-04", time: "07:00 AM", capacity: 8, bookedCount: 8 },
        { date: "2025-11-04", time: "09:00 AM", capacity: 8, bookedCount: 4 },
        { date: "2025-11-04", time: "11:30 AM", capacity: 8, bookedCount: 7 },
        { date: "2025-11-05", time: "08:30 AM", capacity: 10, bookedCount: 9 },
        { date: "2025-11-05", time: "10:30 AM", capacity: 10, bookedCount: 3 },
        { date: "2025-11-06", time: "01:00 PM", capacity: 6, bookedCount: 1 },
        { date: "2025-11-06", time: "03:30 PM", capacity: 6, bookedCount: 6 },
      ],
    },
    {
      title: "Paragliding",
      location: "Bir Billing, Himachal Pradesh",
      description:
        "Soar over the majestic Kangra Valley with certified tandem pilots. Perfect wind conditions, scenic views, and an unforgettable sense of freedom.",
      price: 3500,
      currency: "INR",
      image:
        "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg",
      slots: [
        { date: "2025-11-06", time: "07:00 AM", capacity: 6, bookedCount: 3 },
        { date: "2025-11-06", time: "09:00 AM", capacity: 6, bookedCount: 6 },
        { date: "2025-11-06", time: "11:00 AM", capacity: 6, bookedCount: 1 },
        { date: "2025-11-07", time: "08:00 AM", capacity: 8, bookedCount: 8 },
        { date: "2025-11-07", time: "10:30 AM", capacity: 8, bookedCount: 4 },
        { date: "2025-11-08", time: "03:00 PM", capacity: 10, bookedCount: 9 },
        { date: "2025-11-08", time: "05:00 PM", capacity: 10, bookedCount: 2 },
      ],
    },
    {
      title: "Hot Air Balloon Ride",
      location: "Jaipur, Rajasthan",
      description:
        "Float gently over the Pink City as the first light of dawn illuminates Jaipur’s royal architecture. Enjoy a serene sunrise experience with trained balloon pilots.",
      price: 5500,
      currency: "INR",
      image: "https://images.pexels.com/photos/238741/pexels-photo-238741.jpeg",
      slots: [
        { date: "2025-11-08", time: "05:30 AM", capacity: 10, bookedCount: 10 },
        { date: "2025-11-08", time: "07:00 AM", capacity: 10, bookedCount: 5 },
        { date: "2025-11-09", time: "06:30 AM", capacity: 12, bookedCount: 11 },
        { date: "2025-11-09", time: "08:00 AM", capacity: 12, bookedCount: 12 },
        { date: "2025-11-10", time: "06:00 AM", capacity: 8, bookedCount: 4 },
        { date: "2025-11-10", time: "07:30 AM", capacity: 8, bookedCount: 6 },
      ],
    },
    {
      title: "Trekking",
      location: "Triund, Himachal Pradesh",
      description:
        "Embark on a guided trek through lush green trails, alpine meadows, and breathtaking Himalayan vistas. Perfect for adventure seekers and nature lovers alike.",
      price: 1800,
      currency: "INR",
      image:
        "https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg",
      slots: [
        { date: "2025-11-10", time: "07:00 AM", capacity: 15, bookedCount: 15 },
        { date: "2025-11-10", time: "09:00 AM", capacity: 15, bookedCount: 14 },
        { date: "2025-11-11", time: "06:30 AM", capacity: 12, bookedCount: 10 },
        { date: "2025-11-11", time: "08:30 AM", capacity: 12, bookedCount: 6 },
        { date: "2025-11-12", time: "10:00 AM", capacity: 10, bookedCount: 3 },
        { date: "2025-11-12", time: "12:30 PM", capacity: 10, bookedCount: 10 },
      ],
    },
  ];

  await ExperienceModel.insertMany(experiences);
  console.log("✅ Experiences seeded successfully");

  // Seed Promo Codes
  const promoCodes = [
    {
      code: "WELCOME20",
      type: "percent",
      value: 20,
      validTill: new Date("2025-12-31"),
    },
    {
      code: "FESTIVE10",
      type: "percent",
      value: 10,
      validTill: new Date("2025-11-30"),
    },
    {
      code: "FLAT500",
      type: "fixed",
      value: 500,
      validTill: new Date("2026-01-15"),
    },
    {
      code: "ADVENTURE15",
      type: "percent",
      value: 15,
      validTill: new Date("2025-12-15"),
    },
    {
      code: "SAVE1000",
      type: "fixed",
      value: 1000,
      validTill: new Date("2026-02-01"),
    },
  ];

  await PromoCodeModel.insertMany(promoCodes);
  console.log("✅ Promo codes seeded successfully");

  // Close connection
  await mongoose.connection.close();
  console.log("🎉 Seeding complete! Database ready for testing.");
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  mongoose.connection.close();
});
