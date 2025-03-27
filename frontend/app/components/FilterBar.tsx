"use client";

import { FaSearch } from "react-icons/fa";

interface FilterBarProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function FilterBar({ search, setSearch }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 mt-2">
      <button className="px-3 py-1 text-sm rounded-md bg-[#f3c77a] text-black shadow hover:opacity-90">
        by category
      </button>
      <button className="px-3 py-1 text-sm rounded-md bg-[#b17d43] text-white shadow hover:opacity-90">
        by priority
      </button>
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search your task"
          className="px-3 py-1 pl-9 rounded-md text-sm border border-gray-300 placeholder:text-gray-500 shadow-sm bg-white"
        />
        <FaSearch className="absolute top-2 right-4 text-gray-400 text-xs" />
      </div>
    </div>
  );
}
