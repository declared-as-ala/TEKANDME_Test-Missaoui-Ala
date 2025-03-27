// ✅ Footer.tsx
// components/Footer.tsx
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#f6eeee] border-t border-[#f0dada] py-4 px-6 flex flex-col md:flex-row justify-between items-center text-[#1a1a2e] text-sm">
      <div className="flex items-center gap-2 mb-2 md:mb-0">
        <div className="w-8 h-8 rounded-full bg-[#ef7f7f] flex items-center justify-center relative">
          <div className="absolute w-8 h-8 rounded-full bg-[#f19f9f] left-1 top-1 -z-10"></div>
          <span className="text-white text-base italic font-fancy">T</span>
        </div>
        <span className="italic font-fancy text-sm text-black">Todo List</span>
      </div>

      <p className="text-sm text-gray-800">
        © 2024 Tekandme. All Rights Reserved.
      </p>

      <div className="flex gap-3">
        <a
          href="#"
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-400 hover:bg-gray-100"
        >
          <FaFacebookF className="text-sm" />
        </a>
        <a
          href="#"
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-400 hover:bg-gray-100"
        >
          <FaLinkedinIn className="text-sm" />
        </a>
        <a
          href="#"
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-400 hover:bg-gray-100"
        >
          <FaTwitter className="text-sm" />
        </a>
        <a
          href="#"
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-400 hover:bg-gray-100"
        >
          <FaGithub className="text-sm" />
        </a>
      </div>
    </footer>
  );
}
