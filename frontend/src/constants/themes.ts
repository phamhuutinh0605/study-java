import type { ThemeVariant } from "../types/themes";

export const themes: {
  id: ThemeVariant;
  name: string;
  color: string;
  bg: string;
}[] = [
  {
    id: "red",
    name: "Netflix Red",
    color: "--color-netflix-red",
    bg: "--color-dark-bg",
  },
  {
    id: "violet",
    name: "Netflix Violet",
    color: "--color-neon-violet",
    bg: "--color-dark-bg",
  },
  {
    id: "emerald",
    name: "Netflix Matrix",
    color: "--color-matrix-emerald",
    bg: "--color-dark-bg",
  },
  {
    id: "gold",
    name: "Netflix Luxe",
    color: "--color-luxe-gold",
    bg: "--color-dark-bg",
  },
];

export const THEME_STORAGE_KEY = "theme_variant";
