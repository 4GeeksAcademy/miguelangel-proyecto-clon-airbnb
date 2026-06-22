"use client";

import { useState } from "react";
import Link from "next/link";

type NavbarProps = {
  onSearchChange: (value: string) => void;
};

const Navbar = ({ onSearchChange }: NavbarProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (value: string) => {
    setQuery(value);
    onSearchChange(value);
  };

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <Link href="/" className="text-lg font-bold text-rose-500 md:text-xl">
          airbnb
        </Link>
        <input
          type="text"
          value={query}
          onChange={(event) => handleChange(event.target.value)}
          placeholder="Buscar alojamientos"
          className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm outline-none ring-rose-300 focus:ring"
        />
        <button
          type="button"
          className="shrink-0 rounded-full border border-gray-300 px-3 py-2 text-sm font-medium"
        >
          Usuario
        </button>
      </nav>
    </header>
  );
};

export const NavbarComponent = Navbar;
