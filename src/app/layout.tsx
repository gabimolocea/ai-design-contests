'use client';

// Removed unused Metadata import
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/ui/navbar";
import { LumaStyleBackground } from "@/components/background";
import { FormProvider } from "@/context/form-context";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

// Removed metadata export as it may not be supported

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} flex min-h-screen flex-col relative bg-background`}
      >
        <AuthProvider>
          <FormProvider>
            <LumaStyleBackground />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </FormProvider>
        </AuthProvider>
      </body>
    </html>
  );
}