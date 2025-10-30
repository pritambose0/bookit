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
        "Leap from India's highest bungee platform overlooking the Ganges valley. Experience the thrill with certified safety gear and expert guidance.",
      about:
        "High-adrenaline jump with safety-certified harnesses. Minimum age 14.",
      price: 4200,
      currency: "INR",
      image:
        "https://images.pexels.com/photos/1486036/pexels-photo-1486036.jpeg",
      slots: [
        { date: "2025-11-01", time: "08:00 AM", capacity: 10, bookedCount: 8 },
        { date: "2025-11-01", time: "11:00 AM", capacity: 10, bookedCount: 10 },
        { date: "2025-11-01", time: "04:00 PM", capacity: 10, bookedCount: 7 },

        { date: "2025-11-02", time: "08:00 AM", capacity: 10, bookedCount: 5 },
        { date: "2025-11-02", time: "11:00 AM", capacity: 10, bookedCount: 8 },
        { date: "2025-11-02", time: "04:00 PM", capacity: 10, bookedCount: 9 },

        { date: "2025-11-03", time: "08:00 AM", capacity: 10, bookedCount: 4 },
        { date: "2025-11-03", time: "11:00 AM", capacity: 10, bookedCount: 10 },
        { date: "2025-11-03", time: "04:00 PM", capacity: 10, bookedCount: 8 },

        { date: "2025-11-04", time: "08:00 AM", capacity: 10, bookedCount: 10 },
        { date: "2025-11-04", time: "11:00 AM", capacity: 10, bookedCount: 7 },
        { date: "2025-11-04", time: "04:00 PM", capacity: 10, bookedCount: 9 },
      ],
    },
    {
      title: "Scuba Diving",
      location: "Andaman Islands",
      description:
        "Explore vibrant coral reefs and colorful marine life in crystal-clear waters guided by professional divers.",
      about:
        "Includes gear, safety briefing, and certified instructors. Minimum age 12.",
      price: 6500,
      currency: "INR",
      image:
        "https://images.pexels.com/photos/2404370/pexels-photo-2404370.jpeg",
      slots: [
        { date: "2025-11-04", time: "07:00 AM", capacity: 8, bookedCount: 5 },
        { date: "2025-11-04", time: "10:00 AM", capacity: 8, bookedCount: 8 },
        { date: "2025-11-04", time: "01:00 PM", capacity: 8, bookedCount: 6 },

        { date: "2025-11-05", time: "07:00 AM", capacity: 8, bookedCount: 4 },
        { date: "2025-11-05", time: "10:00 AM", capacity: 8, bookedCount: 6 },
        { date: "2025-11-05", time: "01:00 PM", capacity: 8, bookedCount: 7 },

        { date: "2025-11-06", time: "07:00 AM", capacity: 8, bookedCount: 2 },
        { date: "2025-11-06", time: "10:00 AM", capacity: 8, bookedCount: 4 },
        { date: "2025-11-06", time: "01:00 PM", capacity: 8, bookedCount: 6 },

        { date: "2025-11-07", time: "07:00 AM", capacity: 8, bookedCount: 5 },
        { date: "2025-11-07", time: "10:00 AM", capacity: 8, bookedCount: 8 },
        { date: "2025-11-07", time: "01:00 PM", capacity: 8, bookedCount: 7 },
      ],
    },
    {
      title: "Paragliding",
      location: "Bir Billing, Himachal Pradesh",
      description:
        "Glide above Kangra Valley’s scenic landscape with experienced tandem pilots.",
      about: "Includes briefing, safety gear, and pilot. Minimum age 10.",
      price: 3500,
      currency: "INR",
      image:
        "https://images.pexels.com/photos/2162689/pexels-photo-2162689.jpeg",
      slots: [
        { date: "2025-11-06", time: "09:00 AM", capacity: 6, bookedCount: 4 },
        { date: "2025-11-06", time: "11:00 AM", capacity: 6, bookedCount: 5 },
        { date: "2025-11-06", time: "03:00 PM", capacity: 6, bookedCount: 6 },

        { date: "2025-11-07", time: "09:00 AM", capacity: 6, bookedCount: 4 },
        { date: "2025-11-07", time: "11:00 AM", capacity: 6, bookedCount: 6 },
        { date: "2025-11-07", time: "03:00 PM", capacity: 6, bookedCount: 5 },

        { date: "2025-11-08", time: "09:00 AM", capacity: 6, bookedCount: 5 },
        { date: "2025-11-08", time: "11:00 AM", capacity: 6, bookedCount: 4 },
        { date: "2025-11-08", time: "03:00 PM", capacity: 6, bookedCount: 6 },

        { date: "2025-11-09", time: "09:00 AM", capacity: 6, bookedCount: 3 },
        { date: "2025-11-09", time: "11:00 AM", capacity: 6, bookedCount: 5 },
        { date: "2025-11-09", time: "03:00 PM", capacity: 6, bookedCount: 6 },
      ],
    },
    {
      title: "Hot Air Balloon Ride",
      location: "Jaipur, Rajasthan",
      description:
        "Soar over the Pink City at sunrise for breathtaking aerial views of Jaipur’s forts and palaces.",
      about: "Includes pilot, insurance, and refreshments. Minimum age 8.",
      price: 5500,
      currency: "INR",
      image:
        "https://images.pexels.com/photos/27377785/pexels-photo-27377785.jpeg",
      slots: [
        { date: "2025-11-08", time: "06:00 AM", capacity: 10, bookedCount: 9 },
        { date: "2025-11-08", time: "08:00 AM", capacity: 10, bookedCount: 8 },
        { date: "2025-11-08", time: "10:00 AM", capacity: 10, bookedCount: 10 },

        { date: "2025-11-09", time: "06:00 AM", capacity: 10, bookedCount: 9 },
        { date: "2025-11-09", time: "08:00 AM", capacity: 10, bookedCount: 8 },
        { date: "2025-11-09", time: "10:00 AM", capacity: 10, bookedCount: 7 },

        { date: "2025-11-10", time: "06:00 AM", capacity: 10, bookedCount: 9 },
        { date: "2025-11-10", time: "08:00 AM", capacity: 10, bookedCount: 7 },
        { date: "2025-11-10", time: "10:00 AM", capacity: 10, bookedCount: 10 },

        { date: "2025-11-11", time: "06:00 AM", capacity: 10, bookedCount: 8 },
        { date: "2025-11-11", time: "08:00 AM", capacity: 10, bookedCount: 10 },
        { date: "2025-11-11", time: "10:00 AM", capacity: 10, bookedCount: 8 },
      ],
    },
    {
      title: "Trekking",
      location: "Triund, Himachal Pradesh",
      description:
        "Trek through alpine meadows and Himalayan pine forests for stunning views of the Dhauladhar range.",
      about: "Guided trek with camping and meals. Minimum age 10.",
      price: 1800,
      currency: "INR",
      image:
        "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg",
      slots: [
        { date: "2025-11-10", time: "07:00 AM", capacity: 12, bookedCount: 10 },
        { date: "2025-11-10", time: "11:00 AM", capacity: 12, bookedCount: 11 },
        { date: "2025-11-10", time: "03:00 PM", capacity: 12, bookedCount: 9 },

        { date: "2025-11-11", time: "07:00 AM", capacity: 12, bookedCount: 8 },
        { date: "2025-11-11", time: "11:00 AM", capacity: 12, bookedCount: 12 },
        { date: "2025-11-11", time: "03:00 PM", capacity: 12, bookedCount: 10 },

        { date: "2025-11-12", time: "07:00 AM", capacity: 12, bookedCount: 7 },
        { date: "2025-11-12", time: "11:00 AM", capacity: 12, bookedCount: 8 },
        { date: "2025-11-12", time: "03:00 PM", capacity: 12, bookedCount: 9 },

        { date: "2025-11-13", time: "07:00 AM", capacity: 12, bookedCount: 10 },
        { date: "2025-11-13", time: "11:00 AM", capacity: 12, bookedCount: 12 },
        { date: "2025-11-13", time: "03:00 PM", capacity: 12, bookedCount: 8 },
      ],
    },
    {
      title: "White Water Rafting",
      location: "Rishikesh, Uttarakhand",
      description:
        "Navigate thrilling rapids on the Ganges under expert guidance for an adrenaline-packed day.",
      about: "Gear, instructor, and safety briefing included. Minimum age 12.",
      price: 2500,
      currency: "INR",
      image:
        "https://images.pexels.com/photos/1305095/pexels-photo-1305095.jpeg",
      slots: [
        { date: "2025-11-14", time: "09:00 AM", capacity: 10, bookedCount: 7 },
        { date: "2025-11-14", time: "11:00 AM", capacity: 10, bookedCount: 9 },
        { date: "2025-11-14", time: "03:00 PM", capacity: 10, bookedCount: 10 },

        { date: "2025-11-15", time: "09:00 AM", capacity: 10, bookedCount: 8 },
        { date: "2025-11-15", time: "11:00 AM", capacity: 10, bookedCount: 1 },
        { date: "2025-11-15", time: "03:00 PM", capacity: 10, bookedCount: 7 },

        { date: "2025-11-16", time: "09:00 AM", capacity: 10, bookedCount: 6 },
        { date: "2025-11-16", time: "11:00 AM", capacity: 10, bookedCount: 8 },
        { date: "2025-11-16", time: "03:00 PM", capacity: 10, bookedCount: 9 },

        { date: "2025-11-17", time: "09:00 AM", capacity: 10, bookedCount: 7 },
        { date: "2025-11-17", time: "11:00 AM", capacity: 10, bookedCount: 10 },
        { date: "2025-11-17", time: "03:00 PM", capacity: 10, bookedCount: 6 },
      ],
    },
    {
      title: "Desert Camping",
      location: "Jaisalmer, Rajasthan",
      description:
        "Sleep under the stars in luxury tents with bonfire, folk music, and authentic Rajasthani food.",
      about:
        "Luxury tents, dinner, and cultural show included. Minimum age 10.",
      price: 3600,
      currency: "INR",
      image:
        "https://images.pexels.com/photos/18717290/pexels-photo-18717290.jpeg",
      slots: [
        { date: "2025-12-18", time: "05:00 PM", capacity: 10, bookedCount: 8 },
        { date: "2025-12-18", time: "07:30 PM", capacity: 10, bookedCount: 9 },
        { date: "2025-12-19", time: "06:00 PM", capacity: 10, bookedCount: 10 },
        { date: "2025-12-20", time: "08:00 PM", capacity: 10, bookedCount: 7 },
        { date: "2025-12-21", time: "05:30 PM", capacity: 12, bookedCount: 11 },
        { date: "2025-12-21", time: "07:00 PM", capacity: 12, bookedCount: 10 },
      ],
    },
    {
      title: "Snow Trekking",
      location: "Gulmarg, Jammu & Kashmir",
      description:
        "Experience the magic of snow-covered trails and pine forests with expert mountain guides.",
      about: "Includes gear, hot drinks, and guide. Minimum age 12.",
      price: 5000,
      currency: "INR",
      image:
        "https://images.pexels.com/photos/31348069/pexels-photo-31348069.jpeg",
      slots: [
        { date: "2025-12-15", time: "07:00 AM", capacity: 10, bookedCount: 6 },
        { date: "2025-12-15", time: "10:00 AM", capacity: 10, bookedCount: 8 },
        { date: "2025-12-16", time: "09:00 AM", capacity: 10, bookedCount: 7 },
        { date: "2025-12-16", time: "12:00 PM", capacity: 10, bookedCount: 9 },
        { date: "2025-12-17", time: "08:30 AM", capacity: 8, bookedCount: 6 },
        { date: "2025-12-18", time: "06:30 AM", capacity: 8, bookedCount: 10 },
        { date: "2025-12-18", time: "07:00 AM", capacity: 8, bookedCount: 5 },
      ],
    },
    {
      title: "Island Hopping",
      location: "Lakshadweep, India",
      description:
        "Hop across serene coral islands, snorkel in lagoons, and enjoy a beachside BBQ.",
      about: "Boat trip, snorkeling, and lunch included. Minimum age 8.",
      price: 7000,
      currency: "INR",
      image:
        "https://images.pexels.com/photos/1430671/pexels-photo-1430671.jpeg",
      slots: [
        { date: "2025-12-22", time: "08:00 AM", capacity: 6, bookedCount: 5 },
        { date: "2025-12-22", time: "11:00 AM", capacity: 6, bookedCount: 6 },
        { date: "2025-12-23", time: "09:30 AM", capacity: 6, bookedCount: 7 },
        { date: "2025-12-23", time: "01:00 PM", capacity: 6, bookedCount: 4 },
        { date: "2025-12-24", time: "09:00 AM", capacity: 6, bookedCount: 6 },
        { date: "2025-12-24", time: "02:00 PM", capacity: 6, bookedCount: 5 },
        { date: "2025-12-24", time: "6:00 PM", capacity: 6, bookedCount: 6 },
        { date: "2025-12-25", time: "03:00 PM", capacity: 6, bookedCount: 3 },
      ],
    },
    {
      title: "Surfing Lessons",
      location: "Varkala, Kerala",
      description:
        "Learn to surf on Varkala’s pristine beach with certified surf instructors.",
      about: "Equipment and instructor provided. Minimum age 10.",
      price: 3300,
      currency: "INR",
      image:
        "https://images.pexels.com/photos/390051/surfer-wave-sunset-the-indian-ocean-390051.jpeg",
      slots: [
        { date: "2025-12-27", time: "06:30 AM", capacity: 10, bookedCount: 5 },
        { date: "2025-12-27", time: "08:00 AM", capacity: 10, bookedCount: 7 },
        { date: "2025-12-28", time: "07:30 AM", capacity: 10, bookedCount: 6 },
        { date: "2025-12-28", time: "09:00 AM", capacity: 10, bookedCount: 10 },
        { date: "2025-12-29", time: "07:30 AM", capacity: 10, bookedCount: 10 },
        { date: "2025-12-29", time: "10:00 AM", capacity: 10, bookedCount: 5 },
        { date: "2025-12-29", time: "07:00 PM", capacity: 10, bookedCount: 9 },
        { date: "2025-12-30", time: "08:00 AM", capacity: 10, bookedCount: 7 },
        { date: "2025-12-30", time: "10:00 AM", capacity: 10, bookedCount: 10 },
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
