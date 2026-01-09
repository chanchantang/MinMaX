import { ID } from "react-native-appwrite";
import { WorkoutExercise } from "../types/database.types";
import {
    appwriteDb,
    DATABASE_ID,
    WORKOUT_EXERCISE_TABLE_ID,
} from "./appwrite";

/* =========================
   CREATE
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

export async function addExerciseToWorkout(
  input: CreateWorkoutExerciseInput
): Promise<string> {
  const id = ID.unique();
  const now = new Date().toISOString();

  await appwriteDb.createRow({
    databaseId: DATABASE_ID,
    tableId: WORKOUT_EXERCISE_TABLE_ID,
    rowId: id,
    data: {
      workoutId: input.workoutId,
      exerciseDefinitionId: input.exerciseDefinitionId,
      order: input.order,

      minSets: input.minSets,
      maxSets: input.maxSets,

      minReps: input.minReps ?? null,
      maxReps: input.maxReps ?? null,

      minRest: input.minRest ?? null,
      maxRest: input.maxRest ?? null,

      createdAt: now,
      updatedAt: now,
    },
  });

  return id;
}

export async function getExercisesForWorkout(
  workoutId: string
): Promise<WorkoutExercise[]> {
  const res = await appwriteDb.listRows({
    databaseId: DATABASE_ID,
    tableId: WORKOUT_EXERCISE_TABLE_ID,
    queries: [
      `equal("workoutId", "${workoutId}")`,
      `orderAsc("order")`,
    ],
  });

  return res.rows as unknown as WorkoutExercise[];
}

export type UpdateWorkoutExerciseInput = Partial<
  Pick<
    WorkoutExercise,
    | "minSets"
    | "maxSets"
    | "minReps"
    | "maxReps"
    | "minRest"
    | "maxRest"
  >
>;

export async function updateWorkoutExercise(
  workoutExerciseId: string,
  data: UpdateWorkoutExerciseInput
) {
  await appwriteDb.updateRow({
    databaseId: DATABASE_ID,
    tableId: WORKOUT_EXERCISE_TABLE_ID,
    rowId: workoutExerciseId,
    data: {
      ...data,
      updatedAt: new Date().toISOString(),
    },
  });
}

export async function reorderWorkoutExercises(
  workoutId: string,
  orderedIds: string[]
) {
  const now = new Date().toISOString();

  await Promise.all(
    orderedIds.map((id, index) =>
      appwriteDb.updateRow({
        databaseId: DATABASE_ID,
        tableId: WORKOUT_EXERCISE_TABLE_ID,
        rowId: id,
        data: {
          order: index,
          updatedAt: now,
        },
      })
    )
  );
}

export async function removeExerciseFromWorkout(
  workoutExerciseId: string
) {
  await appwriteDb.deleteRow({
    databaseId: DATABASE_ID,
    tableId: WORKOUT_EXERCISE_TABLE_ID,
    rowId: workoutExerciseId,
  });
}

