import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const JJIBBABBA = localFont({
  src: "./fonts/UhBee JJIBBABBA.ttf",
  variable: "--font-uhbee-jjibbabba",
  weight: "400",
});
const JJIBBABBA_Bold = localFont({
  src: "./fonts/UhBee JJIBBABBA Bold.ttf",
  variable: "--font-uhbee-jjibbabba-bold",
  weight: "900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${JJIBBABBA.variable} ${JJIBBABBA_Bold.variable} antialiased bg-background`}
      >
        {children}
      </body>
    </html>
  );
}
