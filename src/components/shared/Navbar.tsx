"use client";

import Logo from "@/lib/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkoutPlan } from "@/context/WorkoutPlanContext";

const Navbar = () => {
  const { todayPlan, savedWorkouts } = useWorkoutPlan();
  const pathname = usePathname();
  const isMyPlan = pathname === "/my-plan";

  return (
    <nav className="w-full border-b border-[#1A1C21] bg-[#0D0F12] text-white py-5">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">

        {/* Logo Added from lib folder */}
        <Logo />

        <div className="flex items-center gap-1 text-[14px]">
          <Link
            href="/"
            className={`rounded-full px-3 py-1.5 font-medium cursor-pointer ${
              !isMyPlan
                ? "bg-[#1B1E24] text-[#C2F800]"
                : "text-white"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-full px-3 py-1.5 font-medium cursor-pointer ${
              isMyPlan
                ? "bg-[#1B1E24] text-[#C2F800]"
                : "text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-5 text-[12px] font-semibold">
          <button className="flex items-center gap-2 text-[#B5B7BC] cursor-pointer">
            <span>Plan</span>
            <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#C2F800] text-[10px] font-bold text-black">
              {todayPlan.length}
            </span>
          </button>

          <button className="flex items-center gap-2 text-[#B5B7BC] cursor-pointer">
            <span>Saved</span>
            <span className="flex h-3 w-3 items-center justify-center rounded-full border border-[#44474F] text-[10px] text-[#8B8D93]">
              {savedWorkouts.length}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
