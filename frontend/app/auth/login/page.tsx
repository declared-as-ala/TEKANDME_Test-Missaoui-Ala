/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authService";
import { useAuthStore } from "@/hooks/useAuth";
import { Button, Form } from "react-bootstrap";

export default function LoginPage() {
  const router = useRouter();
  const { user, login, hasHydrated } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Auto redirect if already logged in
  useEffect(() => {
    if (hasHydrated && user) {
      router.replace("/");
    }
  }, [hasHydrated, user, router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const { token, user } = await loginUser(email, password);
      login(user, token);
      router.push("/");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  }

  if (!hasHydrated || user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fbe3e3] to-[#e0f2f1] p-4">
      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Login to Todo App
        </h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="text-sm">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md border border-gray-300 shadow-sm text-sm"
              required
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="text-sm">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md border border-gray-300 shadow-sm text-sm"
              required
            />
          </Form.Group>
          <Button
            type="submit"
            className="w-100 bg-[#5ca882] hover:bg-[#4c926f] border-0 text-white text-sm py-2 rounded-md transition"
          >
            Login
          </Button>
        </Form>
        <p className="text-center mt-3 text-sm text-gray-600">
          Don’t have an account?{" "}
          <span className="text-[#5ca882] font-medium">Register</span>
        </p>
      </div>
    </div>
  );
}
