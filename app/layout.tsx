import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "عرض فني ومالي | منصة مدرس اللغة العربية — VELTRIX",
  description: "عرض فني ومالي لتصميم وتطوير منصة تعليمية متكاملة لإدارة المراكز والحصص الخاصة والطلاب.",
  applicationName: "VELTRIX",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
