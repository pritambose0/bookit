"use client";

import Button from "./Button";
import Input from "./Input";
import Image from "next/image";
import Logo from "../../public/logo.png";
import Link from "next/link";

export default function Header({
  text,
  setText,
  onSearch,
}: {
  text?: string;
  setText?: (text: string) => void;
  onSearch?: () => void;
}) {
  return (
    <header className="w-full fixed top-0 z-50 shadow-[0_10px_30px_rgba(0,0,0,0.1)] bg-[#F9F9F9] h-[132px] sm:h-20">
      <main className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 lg:px-0 h-auto sm:h-[87px]">
        {/* Logo Section */}
        <div className="flex items-center justify-center sm:justify-start space-x-2 w-full sm:w-auto">
          <Link href="/">
            <Image
              src={Logo}
              alt="Bookit Logo"
              width={100}
              height={55}
              loading="eager"
              className="object-contain"
            />
          </Link>
        </div>

        {/* Search Section */}
        <div className="flex items-center w-full sm:w-auto justify-center sm:justify-end space-x-2">
          <Input
            value={text}
            onChange={(e) => setText?.(e.target.value)}
            onClear={() => setText?.("")}
            cross
            placeholder="Search experiences"
          />
          <Button
            type="button"
            onClick={onSearch}
            className="h-10 px-4 py-2 text-sm"
          >
            Search
          </Button>
        </div>
      </main>
    </header>
  );
}
