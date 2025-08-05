import { Category, FormattedResponse, ResponseWithCategories } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setLocalStorage(key: string, value: any): void {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    console.log("success", key, serializedValue);
  } catch (error) {
    console.error("Error saving to localStorage", error);
  }
}

export function getLocalStorage<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.error("Error reading from localStorage", error);
    return null;
  }
}

export function getWordCount(sentence: string) {
  return sentence
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
}

export function formatTimeSpent(
  startTime: string | Date,
  endTime: string | Date
): string {
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();

  if (isNaN(start) || isNaN(end) || end <= start) return "0 minutes";

  const diffMs = end - start;
  const totalMinutes = Math.floor(diffMs / 60000);

  const days = Math.floor(totalMinutes / 1440); // 60 * 24
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  const parts = [];
  if (days) parts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes || (!days && !hours))
    parts.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);

  return parts.join(" ");
}

export const formatDate = (date: string): string => {
  const d = new Date(date);

  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatMonthYear = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};

export function formatResponse(raw: ResponseWithCategories): FormattedResponse {
  const start = raw.start_time;
  const end = raw.end_time;

  return {
    id: raw.id,
    promptId: raw.prompt_id,
    date: formatDate(raw.prompt.date),
    prompt: raw.prompt.prompt_text,
    category: raw.prompt.prompt_categories.map(
      (c: { category: Category }) => c.category
    ),
    text: raw.response_text,
    preview: raw.response_text.slice(0, 250) + "...",
    timeSpent: formatTimeSpent(start, end),
    isPublic: raw.is_public,
    wordCount: raw.word_count,
    startTime: start,
    endTime: end,
    updatedAt: raw.updated_at,
  };
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
