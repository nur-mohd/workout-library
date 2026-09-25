"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useWorkoutPlan } from "@/context/WorkoutPlanContext";
import { IApi } from "@/types/apiType";

type PlanTab = "today" | "saved";
type SortKey = "duration" | "calories" | "rating";

const MyPlanPage = () => {
  const {
    todayPlan,
    savedWorkouts,
    loading,
    removeFromTodayPlan,
    removeFromSaved,
  } = useWorkoutPlan();
  const [activeTab, setActiveTab] = useState<PlanTab>("today");
  const [sortKey, setSortKey] = useState<SortKey>("duration");
  const activeWorkouts = activeTab === "today" ? todayPlan : savedWorkouts;

  const sortedWorkouts = [...activeWorkouts].sort((first, second) => {
    const firstValue =
      sortKey === "calories" ? first.caloriesBurned : first[sortKey];
    const secondValue =
      sortKey === "calories" ? second.caloriesBurned : second[sortKey];

    return secondValue - firstValue;
  });

  const minutes = activeWorkouts.reduce(
    (total, item) => total + item.duration,
    0,
  );
  const calories = activeWorkouts.reduce(
    (total, item) => total + item.caloriesBurned,
    0,
  );

  return (
    <main className="min-h-screen bg-[#0D0F12] text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <section>
          <h1 className="text-3xl font-bold uppercase">MY PLAN</h1>
          <p className="text-gray-400 mt-1">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </section>

        <section className="stats stats-vertical md:stats-horizontal w-full mt-8 bg-[#1A1C21] border border-[#292C33]">
          <div className="stat">
            <div className="stat-title text-gray-400">Exercises</div>
            <div className="stat-value text-[#C2F800]">
              {activeWorkouts.length}
            </div>
          </div>
          <div className="stat">
            <div className="stat-title text-gray-400">Minutes</div>
            <div className="stat-value">{minutes}</div>
          </div>
          <div className="stat">
            <div className="stat-title text-gray-400">Calories</div>
            <div className="stat-value">{calories}</div>
          </div>
        </section>

        <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mt-8">
          <div className="tabs tabs-box bg-[#1A1C21]">
            <button
              className={`tab ${activeTab === "today" ? "tab-active text-[#C2F800]" : ""}`}
              onClick={() => setActiveTab("today")}
            >
              Today&apos;s Plan
            </button>
            <button
              className={`tab ${activeTab === "saved" ? "tab-active text-[#C2F800]" : ""}`}
              onClick={() => setActiveTab("saved")}
            >
              Saved
            </button>
          </div>

          <div className="form-control w-full md:w-72">
            <label className="label">
              <span className="label-text text-white">Sort By</span>
            </label>
            <select
              className="select select-bordered bg-[#1A1C21] border-[#363940] text-white"
              value={sortKey}
              onChange={(event) => setSortKey(event.target.value as SortKey)}
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </section>

        <section className="mt-8 space-y-4">
          {loading ? (
            <p className="text-gray-400">Loading workouts...</p>
          ) : sortedWorkouts.length === 0 ? (
            <div className="py-16 text-center">
              <h2 className="text-xl font-bold uppercase">NOTHING HERE YET</h2>
              <p className="text-gray-400 mt-2 italic">
                Browse the library and add a lift to get today moving.
              </p>
              <Link
                href="/"
                className="btn mt-5 bg-[#C2F800] text-black border-none hover:bg-[#d5ff38]"
              >
                Go to workouts
              </Link>
            </div>
          ) : (
            sortedWorkouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                tab={activeTab}
                onRemove={
                  activeTab === "today"
                    ? removeFromTodayPlan
                    : removeFromSaved
                }
              />
            ))
          )}
        </section>
      </div>
    </main>
  );
};

const WorkoutCard = ({
  workout,
  tab,
  onRemove,
}: {
  workout: IApi;
  tab: PlanTab;
  onRemove: (id: number) => void;
}) => (
  <div className="bg-[#1A1C21] border border-[#292C33] rounded-xl p-4">
    <div className="flex flex-col md:flex-row md:items-center gap-4">
      <div className="w-full md:w-32 h-24 rounded-lg overflow-hidden shrink-0">
        <Image
          src={workout.image}
          alt={workout.name}
          width={160}
          height={120}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <h2 className="text-lg font-bold uppercase">{workout.name}</h2>
        <p className="text-sm text-gray-400">{workout.equipment}</p>
        <div className="flex flex-wrap gap-4 mt-2 text-sm">
          <span className="text-gray-300">◷ {workout.duration} min</span>
          <span className="text-gray-300">♨ {workout.caloriesBurned} kcal</span>
          <span className="text-[#C2F800]">★ {workout.rating}</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link
          href={`/library/${workout.id}`}
          className="btn btn-sm btn-outline"
        >
          View Details
        </Link>
        {tab === "today" && (
          <button
            className="btn btn-sm bg-[#C2F800] text-black border-none hover:bg-[#d5ff38]"
            onClick={() => onRemove(workout.id)}
          >
            ✓ Mark as Done
          </button>
        )}
        <button
          className="btn btn-sm btn-ghost text-gray-400"
          aria-label="Remove workout"
          onClick={() => onRemove(workout.id)}
        >
          ✕
        </button>
      </div>
    </div>
  </div>
);

export default MyPlanPage;
