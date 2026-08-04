import { Lesson } from "./types";
import { jsLessons } from "./js";
import { phpLessons } from "./php";
import { goLessons } from "./go";
import { pythonLessons } from "./python";
import { postgresqlLessons } from "./postgresql";
import { articleLessons } from "./articles";

export * from "./types";
export * from "./js";
export * from "./php";
export * from "./go";
export * from "./python";
export * from "./postgresql";
export * from "./articles";

export const INITIAL_LESSONS: Lesson[] = [
  ...jsLessons,
  ...phpLessons,
  ...goLessons,
  ...pythonLessons,
  ...postgresqlLessons,
  ...articleLessons,
];
