import { getDb } from "../client";
import { exerciseDefinitions } from "../schema";

/* =========================
   READ
   ========================= */

export async function getExercisesDefinitions() {
  const db = getDb();

  return db
    .select()
    .from(exerciseDefinitions)
}