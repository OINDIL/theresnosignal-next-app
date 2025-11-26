import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const myFont = localFont({
  src: "../../public/fonts/font-custom.ttf",
});

export const metadata: Metadata = {
  title: "Theresnosignal",
  description: "Theresnosignal - Experimental Music & Sound Art Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${myFont.className} antialiased dark`}>{children}</body>
    </html>
  );
}
