import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lush & Polish",
  description:
    "Boutique nail studio for Japanese gel manicures, custom nail art, and luxury pedicures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-rose-50 text-stone-800">{children}</body>
    </html>
  );
}
