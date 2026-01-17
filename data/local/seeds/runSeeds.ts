import { getDb } from "../client";
import { exerciseDefinitions } from "../schema";
import { exerciseDefinitionsSeed } from "./exerciseDefinitions.seed";

export async function runSeedsIfNeeded() {
    const db = getDb();

  const existing = await db
    .select({ id: exerciseDefinitions.id })
    .from(exerciseDefinitions)
    .limit(1);

  if (existing.length > 0) {
    return; // already seeded
  }

  await db.insert(exerciseDefinitions).values(
    exerciseDefinitionsSeed
      .filter((e) => e.muscleGroups !== undefined && e.equipment !== undefined)
      .map((e) => ({
        ...e,
        muscleGroups: e.muscleGroups!,
        equipment: e.equipment!,
      }))
  );
}
