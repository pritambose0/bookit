import Image from "next/image";
import Button from "./Button";
import Placeholder from "../../public/placeholder.jpg";
import { Experience } from "@/types/Experience";
import Link from "next/link";

export default function ExperienceCard({
  _id,
  title,
  location,
  price,
  image,
  currency,
  description,
}: Experience) {
  return (
    <div className="bg-[#F9F9F9] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full w-[300px]">
      <Image
        src={image || Placeholder}
        width={280}
        height={170}
        alt={title}
        loading="eager"
        className="w-full h-[200px] object-cover"
      />

      <div className="flex flex-col justify-between px-3 py-4 bg-[#F9F9F9] h-40">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-900 text-base leading-tight truncate w-40">
              {title}
            </h3>
            <span className="text-[10px] bg-[#E0E0E0] px-2 py-0.5 rounded-md text-gray-700 font-medium whitespace-nowrap">
              {location}
            </span>
          </div>

          <p className="text-xs text-gray-600 leading-snug line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div className="flex items-end gap-[5px]">
            <p className="text-[12px] text-gray-600 mt-1">From</p>
            <p className="text-lg font-semibold text-[#161616] leading-none">
              {currency === "INR"
                ? "₹"
                : currency === "USD"
                ? "$"
                : currency === "EUR"
                ? "€"
                : ""}

              {price}
            </p>
          </div>

          <Link href={`/experiences/${_id}`}>
            <Button className="h-8 px-3">View Details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
