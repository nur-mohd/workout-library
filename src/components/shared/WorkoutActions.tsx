"use client";

import { useWorkoutPlan } from "@/context/WorkoutPlanContext";
import { IApi } from "@/types/apiType";

const WorkoutActions = ({ workout }: { workout: IApi }) => {
  const { addToTodayPlan, saveForLater } = useWorkoutPlan();
  return (
    <div className="flex flex-wrap gap-2 mt-5">
      <button
        onClick={() => addToTodayPlan(workout)}
        className="bg-[#C2F800] text-black px-4 py-2 rounded-lg text-[15px] font-semibold hover:bg-[#d2ff35] transition cursor-pointer"
      >
        + Add to today&apos;s plan
      </button>
      <button
        onClick={() => saveForLater(workout)}
        className="border border-gray-500 px-4 py-2 rounded-lg text-[15px] hover:border-[#C2F800] transition cursor-pointer"
      >
        ☆ Save for later
      </button>
    </div>
  );
};

export default WorkoutActions;
