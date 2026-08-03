import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LearnHub — База Знань та Навчальні Уроки z Програмування",
  description: "Навчальний портал та база знань з JavaScript, TypeScript, PHP, Go, Python, PostgreSQL та архітектури.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
