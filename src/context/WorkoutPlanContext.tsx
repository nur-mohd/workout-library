"use client";

import { IApi } from "@/types/apiType";
import {createContext,ReactNode,useContext,useEffect,useState,} from"react";
import { toast } from "react-toastify";

interface WorkoutPlanContextValue {
  todayPlan: IApi[];
  savedWorkouts: IApi[];
  loading: boolean;
  addToTodayPlan: (workout: IApi) => void;
  saveForLater: (workout: IApi) => void;
  markAsDone: (id: number) => void;
  removeFromTodayPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
}

const WorkoutPlanContext = createContext<WorkoutPlanContextValue | null>(null);

const readStoredWorkouts = (key: string): IApi[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(key) ?? "[]") as IApi[];
  } catch {
    return [];
  }
};

export function WorkoutPlanProvider({ children }: { children: ReactNode }) {
  const [todayPlan, setTodayPlan] = useState<IApi[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<IApi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStoredWorkouts = window.setTimeout(() => {
      setTodayPlan(readStoredWorkouts("fitlog-today-plan"));
      setSavedWorkouts(readStoredWorkouts("fitlog-saved-workouts"));
      setLoading(false);
    }, 0);

    return () => window.clearTimeout(loadStoredWorkouts);
  }, []);

  useEffect(() => {
    if (!loading)
      localStorage.setItem("fitlog-today-plan", JSON.stringify(todayPlan));
  }, [loading, todayPlan]);

  useEffect(() => {
    if (!loading)
      localStorage.setItem(
        "fitlog-saved-workouts",
        JSON.stringify(savedWorkouts),
      );
  }, [loading, savedWorkouts]);

  const addToTodayPlan = (workout: IApi) => {
    if (todayPlan.some((item) => item.id === workout.id)) {
      toast.info("Workout is already in today's plan.");
      return;
    }
    if (todayPlan.length >= 5) {
      toast.info("Finish today's five lifts before adding more.");
      return;
    }
    setTodayPlan((current) => [...current, workout]);
    toast.success("Added to today's plan");
  };

  const saveForLater = (workout: IApi) => {
    if (savedWorkouts.some((item) => item.id === workout.id)) {
      toast.info("Workout is already saved.");
      return;
    }
    setSavedWorkouts((current) => [...current, workout]);
    toast.success("Saved for later");
  };

  const removeFromTodayPlan = (id: number) => {
    setTodayPlan((current) => current.filter((item) => item.id !== id));
    toast.info("Removed from today's plan");
  };

  const markAsDone = (id: number) => {
    setTodayPlan((current) => current.filter((item) => item.id !== id));
    toast.success("Workout marked as done");
  };

  const removeFromSaved = (id: number) => {
    setSavedWorkouts((current) => current.filter((item) => item.id !== id));
    toast.info("Removed from saved workouts");
  };

  return (
    <WorkoutPlanContext.Provider
      value={{
        todayPlan,
        savedWorkouts,
        loading,
        addToTodayPlan,
        saveForLater,
        markAsDone,
        removeFromTodayPlan,
        removeFromSaved,
      }}
    >
      {children}
    </WorkoutPlanContext.Provider>
  );
}

export function useWorkoutPlan() {
  const context = useContext(WorkoutPlanContext);
  if (!context)
    throw new Error("useWorkoutPlan must be used inside WorkoutPlanProvider");
  return context;
}
