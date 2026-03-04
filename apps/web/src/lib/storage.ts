import type { DocStatus, Profile } from "./documents";

const KEY = "taxpilot.checklist.v1";
const PROFILE_KEY = "taxpilot.profile.v1";

export type ChecklistState = Record<string, DocStatus>;

export function loadChecklist(): ChecklistState {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ChecklistState) : {};
  } catch {
    return {};
  }
}

export function saveChecklist(state: ChecklistState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(state));
}

export function loadProfile(): Profile {
  if (typeof window === "undefined") return "employee";
  const raw = window.localStorage.getItem(PROFILE_KEY) as Profile | null;
  return raw ?? "employee";
}

export function saveProfile(p: Profile) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROFILE_KEY, p);
}