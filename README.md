# 🌍 Bookit

**Bookit** is a travel experience booking platform built using **Next.js App Router**.  
Users can explore experiences, validate promos, and complete their bookings seamlessly.

---

## 🚀 Tech Stack

- **Frontend Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** MongoDB (via Mongoose or Prisma)
- **API Handling:** Next.js API Routes
- **Deployment:** Vercel

---

## 🧩 Features

- 🏝️ Browse Experiences and View Details
- 📅 Book Travel Experiences
- 💸 Promo Code Validation
- ✅ Booking Confirmation Page
- 💻 API Routes for Bookings, Experiences, and Promotions
- 🎨 Responsive UI Design

---

## 🗂️ Folder Structure
```bash
bookit/
├── public/
├── src/
│ ├── app/
│ │ ├── api/
│ │ │ ├── bookings/
│ │ │ │ ├── [id]/route.ts
│ │ │ │ └── route.ts
│ │ │ ├── experiences/
│ │ │ │ ├── [id]/route.ts
│ │ │ │ └── route.ts
│ │ │ ├── promo/
│ │ │ │ ├── [id]/route.ts
│ │ │ │ ├── validate/route.ts
│ │ │ │ └── route.ts
│ │ ├── booking-confirmed/
│ │ │ └── page.tsx
│ │ ├── checkout/
│ │ │ └── page.tsx
│ │ ├── experiences/
│ │ │ └── [id]/page.tsx
│ │ ├── favicon.ico
│ │ ├── globals.css
│ │ ├── layout.tsx
│ │ ├── not-found.tsx
│ │ └── page.tsx
│ ├── components/ # Reusable UI components
│ ├── lib/ # DB connection, utils
│ ├── models/ # Mongoose models
│ ├── scripts/
| | └── seed.ts
│ └── types/ # TypeScript interfaces & types
│ ├── Booking.ts
│ └── Experience.ts
├── .env
├── .gitignore
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

---

## ⚙️ Installation & Setup

### Prerequisites

Ensure you have:
- Node.js ≥ 18  
- pnpm / npm / yarn  
- MongoDB (local or Atlas)

### Steps

```bash
# Clone the repository
git clone https://github.com/pritambose0/bookit.git
cd bookit
```
```bash
# Install dependencies
pnpm install   # or npm install / yarn install
```
# Setup environment variables
.env

```bash
# Add your MongoDB connection string and any other keys
MONGODB_URI = "your_connection_string"

# Run the development server
pnpm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## 🧪 API Routes Overview

| Route | Method | Description |
|-------|---------|-------------|
| `/api/experiences` | `GET` | Fetch all experiences |
| `/api/experiences/[id]` | `GET` | Fetch single experience |
| `/api/bookings` | `POST` | Create new booking |
| `/api/bookings/[id]` | `GET` / `DELETE` | Get or delete booking |
| `/api/promo/validate` | `POST` | Validate promo code |

---

## 📄 Pages Overview

| Path | Description |
|------|--------------|
| `/` | Homepage (Experiences list) |
| `/experiences/[id]` | Experience details |
| `/checkout` | Booking checkout |
| `/booking-confirmed` | Booking confirmation |
| `/404` | Custom Not Found page |

---

## 💙 Author

Built with passion by **Pritam Bose**  

🌐 My Portfolio: [click here](https://pritambose.netlify.app)  

> “Code. Create. Travel. Repeat.” ✈️
