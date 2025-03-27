"use client";
import { useState, useEffect, useRef } from "react";

import { useAuthStore } from "@/hooks/useAuth";
import Image from "next/image";
import avatar from "../../assets/avatar.png";

export default function Header() {
  const { user, logout } = useAuthStore();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-[#f6eeee] border-b border-[#f0dada] px-4 py-2 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#ef7f7f] flex items-center justify-center relative">
          <div className="absolute w-10 h-10 rounded-full bg-[#f19f9f] left-1 top-1 -z-10"></div>
          <span className="text-white text-xl italic font-fancy">T</span>
        </div>
        <h1 className="text-xl font-fancy italic text-black">Todo List</h1>
      </div>

      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => setOpen(!open)}
          className="w-9 h-9 rounded-full overflow-hidden cursor-pointer border border-gray-300"
        >
          <Image
            src={avatar}
            alt="user avatar"
            width={36}
            height={36}
            className="object-cover w-full h-full"
          />
        </div>
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow z-20">
            <div className="px-4 py-2 text-sm text-gray-700">
              Hello, {user?.email}
            </div>
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
