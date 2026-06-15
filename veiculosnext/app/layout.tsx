import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Home',
  description: 'Site do vectra prime',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
