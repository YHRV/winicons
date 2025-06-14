"use client";

import Header from "@/components/hero";
import IconList from "@/components/icon-list";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24">
      <Header onSearch={setSearchQuery} />
      <IconList searchQuery={searchQuery} />
    </main>
  );
}
