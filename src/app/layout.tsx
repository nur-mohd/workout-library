import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/shared/Navbar";
import FooterPage from "@/components/shared/Footer";
import { WorkoutPlanProvider } from "@/context/WorkoutPlanContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Workout Library",
  description: "A library of workouts to help you stay fit and healthy.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <WorkoutPlanProvider>
          <Navbar />
          {children}
          <ToastContainer />
          <FooterPage />
        </WorkoutPlanProvider>
        </body>
    </html>
  );
}
