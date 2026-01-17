import { eq } from "drizzle-orm";
import { nanoid } from "nanoid/non-secure";
import { getDb } from "../client";
import { workoutExercises } from "../schema";

/* =========================
   HELPERS
   ========================= */

export function generateId() {
  return nanoid();
}

export function nowIso() {
  return new Date().toISOString();
}

/* =========================
   TYPES
   ========================= */

export type CreateWorkoutExerciseInput = {
  workoutId: string;
  exerciseDefinitionId: string;
  order: number;

  minSets: number;
  maxSets: number;

  minReps?: number;
  maxReps?: number;

  minRest?: number;
  maxRest?: number;
};

export type UpdateWorkoutExerciseInput = Partial<
  Pick<
    CreateWorkoutExerciseInput,
    | "order"
    | "minSets"
    | "maxSets"
    | "minReps"
    | "maxReps"
    | "minRest"
    | "maxRest"
  >
>;

/* =========================
   CREATE
   ========================= */

export async function addExerciseToWorkout(
  data: CreateWorkoutExerciseInput
) {
  const db = getDb();
  const id = generateId();
  const timestamp = nowIso();

  await db.insert(workoutExercises).values({
    id,
    workoutId: data.workoutId,
    exerciseDefinitionId: data.exerciseDefinitionId,
    order: data.order,

    minSets: data.minSets,
    maxSets: data.maxSets,

    minReps: data.minReps ?? null,
    maxReps: data.maxReps ?? null,

    minRest: data.minRest ?? null,
    maxRest: data.maxRest ?? null,

    createdAt: timestamp,
    updatedAt: timestamp,
  });

  return id;
}

/* =========================
   READ
   ========================= */

export async function getExercisesForWorkout(workoutId: string) {
  const db = getDb();

  return db
    .select()
    .from(workoutExercises)
    .where(eq(workoutExercises.workoutId, workoutId))
    .orderBy(workoutExercises.order);
}

/* =========================
   UPDATE
   ========================= */

export async function updateWorkoutExercise(
  workoutExerciseId: string,
  data: UpdateWorkoutExerciseInput
) {
  const db = getDb();

  await db
    .update(workoutExercises)
    .set({
      ...data,
      updatedAt: nowIso(),
    })
    .where(eq(workoutExercises.id, workoutExerciseId));
}

/* =========================
   REORDER (IMPORTANT)
   ========================= */

export async function reorderWorkoutExercises(
  workoutId: string,
  orderedIds: string[]
) {
  const db = getDb();
  const timestamp = nowIso();

  await Promise.all(
    orderedIds.map((id, index) =>
      db
        .update(workoutExercises)
        .set({
          order: index,
          updatedAt: timestamp,
        })
        .where(
          eq(workoutExercises.id, id)
        )
    )
  );
}

/* =========================
   DELETE
   ========================= */

export async function removeExerciseFromWorkout(
  workoutExerciseId: string
) {
  const db = getDb();

  await db
    .delete(workoutExercises)
    .where(eq(workoutExercises.id, workoutExerciseId));
}
