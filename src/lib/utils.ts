import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const colorMap = {
  "green-500": "bg-green-500",
  "rose-500": "bg-rose-500",
  "purple-500": "bg-purple-500",
  "blue-500": "bg-blue-500",
  "amber-500": "bg-amber-500",
  "yellow-500": "bg-yellow-500",
  "stone-500": "bg-stone-500",
  "red-500": "bg-red-500",
  "indigo-500": "bg-indigo-500",
  "cyan-500": "bg-cyan-500",
  "slate-500": "bg-slate-500",
  "violet-500": "bg-violet-500",
  "teal-500": "bg-teal-500",
  "lime-500": "bg-lime-500",
  "neutral-500": "bg-neutral-500",
};
