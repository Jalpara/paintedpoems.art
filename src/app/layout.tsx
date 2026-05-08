import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Painted Poems | Omkar Bhatkar",
  description:
    "Painted Poems is an interactive diary of Omkar Bhatkar's Spain exhibition journey through painted mystic poetry, places, people, and public records."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
