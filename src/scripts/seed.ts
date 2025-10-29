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
      title: "Skydiving in Mysuru",
      description:
        "Experience the ultimate adrenaline rush as you freefall from 10,000 feet with breathtaking aerial views of Mysuru. Includes professional training and gear.",
      price: 3500,
      currency: "INR",
      image:
        "https://images.pexels.com/photos/1820563/pexels-photo-1820563.jpeg",
      slots: [
        { date: "2025-11-01", time: "08:00 AM", capacity: 10, bookedCount: 3 },
        { date: "2025-11-02", time: "10:30 AM", capacity: 8, bookedCount: 8 },
        { date: "2025-11-03", time: "03:00 PM", capacity: 12, bookedCount: 6 },
      ],
    },
    {
      title: "Scuba Diving in Andaman",
      description:
        "Dive into turquoise waters surrounded by coral reefs and marine life. Certified instructors ensure a safe and memorable underwater adventure.",
      price: 5000,
      currency: "INR",
      image: "https://images.pexels.com/photos/386148/pexels-photo-386148.jpeg",
      slots: [
        { date: "2025-11-05", time: "09:00 AM", capacity: 6, bookedCount: 2 },
        { date: "2025-11-06", time: "01:30 PM", capacity: 6, bookedCount: 4 },
        { date: "2025-11-07", time: "04:00 PM", capacity: 8, bookedCount: 1 },
      ],
    },
    {
      title: "Caving in Meghalaya",
      description:
        "Explore mysterious limestone caves in Cherrapunji with professional guides, helmets, and safety equipment. Discover stunning rock formations underground.",
      price: 2800,
      currency: "INR",
      image: "https://images.pexels.com/photos/33263/pexels-photo.jpg",
      slots: [
        { date: "2025-11-04", time: "07:30 AM", capacity: 8, bookedCount: 4 },
        { date: "2025-11-05", time: "09:00 AM", capacity: 10, bookedCount: 10 },
      ],
    },
    {
      title: "Paragliding in Bir Billing",
      description:
        "Soar high over the beautiful Kangra Valley with certified pilots. Enjoy smooth thermals and stunning views of the Himalayas.",
      price: 4200,
      currency: "INR",
      image:
        "https://images.pexels.com/photos/1809644/pexels-photo-1809644.jpeg",
      slots: [
        { date: "2025-11-01", time: "07:00 AM", capacity: 10, bookedCount: 6 },
        { date: "2025-11-02", time: "09:30 AM", capacity: 10, bookedCount: 9 },
        { date: "2025-11-03", time: "02:00 PM", capacity: 8, bookedCount: 8 },
      ],
    },
    {
      title: "Hot Air Balloon Ride in Jaipur",
      description:
        "Float over Jaipur’s pink city and the majestic Amer Fort in a serene sunrise hot-air balloon ride. Includes breakfast and safety briefing.",
      price: 3800,
      currency: "INR",
      image: "https://images.pexels.com/photos/327821/pexels-photo-327821.jpeg",
      slots: [
        { date: "2025-11-05", time: "06:30 AM", capacity: 5, bookedCount: 5 },
        { date: "2025-11-06", time: "07:00 AM", capacity: 6, bookedCount: 3 },
        { date: "2025-11-07", time: "08:00 AM", capacity: 6, bookedCount: 1 },
      ],
    },
    {
      title: "White Water Rafting in Rishikesh",
      description:
        "Conquer the Ganges rapids with professional guides. Includes safety gear, briefing, and a thrilling 16km river rafting stretch.",
      price: 1800,
      currency: "INR",
      image:
        "https://images.pexels.com/photos/2908175/pexels-photo-2908175.jpeg",
      slots: [
        { date: "2025-11-03", time: "08:00 AM", capacity: 12, bookedCount: 10 },
        { date: "2025-11-04", time: "10:00 AM", capacity: 12, bookedCount: 5 },
        { date: "2025-11-05", time: "12:30 PM", capacity: 10, bookedCount: 9 },
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
