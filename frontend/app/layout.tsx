import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todo App (TS)",
  description: "Next.js 13 Todo with TypeScript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
