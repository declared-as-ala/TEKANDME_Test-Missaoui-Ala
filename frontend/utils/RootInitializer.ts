"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/hooks/useAuth";

export default function RootInitializer() {
  const init = useAuthStore((state) => state.init);

  useEffect(() => {
    init(); // 🔁 hydrate user/token from localStorage
  }, [init]);

  return null;
}
