import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { JJIBBABBA, JJIBBABBA_Bold } from "@/fonts";

const title = "Butter's Dream";
const description =
  "Purchase Butter tokens and donate them to meaningful causes through this platform.";

export const metadata: Metadata = {
  title,
  description,
  icons: {
    icon: "/favicon.ico", // 기본 파비콘 설정
    apple: "/apple-touch-icon.png", // 애플 터치 아이콘 (선택 사항)
    shortcut: "/favicon-32x32.png", // 추가적인 아이콘 사이즈
  },
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
