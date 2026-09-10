import type { NavigationItem, Project, ExpertiseItem } from "@/types";

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: "projects", label: "Projects", scrollRatio: 0.25 },
  { id: "expertise", label: "Expertise", scrollRatio: 0.5 },
  { id: "about", label: "About", scrollRatio: 0.95 },
  { id: "contact", label: "Manifesto", scrollRatio: 3.5 },
];

// Unused on this single-screen page; kept for parity with the wider app shape.
export const PROJECTS_DATA: Project[] = [];
export const EXPERTISE_DATA: ExpertiseItem[] = [];
