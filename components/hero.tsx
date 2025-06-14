"use client";

import { Search } from "lucide-react";

interface HeroProps {
  onSearch: (query: string) => void;
}

export default function Header({ onSearch }: HeroProps) {
  return (
    <div className="flex flex-col gap-3 items-center mb-10">
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        The windows icons app
      </p>
      <p className="text-lg lg:text-xl !leading-tight mx-auto max-w-xl text-center">
        Give your desktop a fresh look with these icons
      </p>
      <div className="relative w-full max-w-xl mt-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search icons..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-lg border dark:border-gray-800 dark:bg-black dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
        </div>
      </div>
      {/* 
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
      */}
    </div>
  );
}
