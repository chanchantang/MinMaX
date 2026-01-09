import { ID } from "react-native-appwrite";
import { SyncStatus } from "../domain/enum";
import { Workout } from "../types/database.types";
import {
  appwriteDb,
  DATABASE_ID,
  WORKOUT_TABLE_ID,
} from "./appwrite";

/* =========================
   CREATE
   ========================= */

export type CreateWorkoutInput = {
  userId: string;
  programId: string;
  name: string;
  order: number;
  scheduledDays: number[];
};

export async function createWorkout(
  input: CreateWorkoutInput
): Promise<string> {
  const id = ID.unique();
  const now = new Date().toISOString();

  await appwriteDb.createRow({
    databaseId: DATABASE_ID,
    tableId: WORKOUT_TABLE_ID,
    rowId: id,
    data: {
      userId: input.userId,
      programId: input.programId,
      name: input.name,
      order: input.order,
      scheduledDays: input.scheduledDays,

      version: 1,
      syncStatus: SyncStatus.Synced,

      createdAt: now,
      updatedAt: now,
    },
  });

  return id;
}

/* =========================
   READ
   ========================= */

export async function getWorkoutsForProgram(
  programId: string
): Promise<Workout[]> {
  const res = await appwriteDb.listRows({
    databaseId: DATABASE_ID,
    tableId: WORKOUT_TABLE_ID,
    queries: [`equal("programId", "${programId}")`],
  });

  return res.rows as unknown as Workout[];
}

/* =========================
   UPDATE
   ========================= */

export async function updateWorkoutName(
  workoutId: string,
  name: string,
  version: number
) {
  await appwriteDb.updateRow({
    databaseId: DATABASE_ID,
    tableId: WORKOUT_TABLE_ID,
    rowId: workoutId,
    data: {
      name,
      version: version + 1,
      syncStatus: SyncStatus.Synced,
      updatedAt: new Date().toISOString(),
    },
  });
}

/* =========================
   SOFT DELETE (SYNC SAFE)
   ========================= */

export async function deleteWorkout(workoutId: string, version: number) {
  await appwriteDb.updateRow({
    databaseId: DATABASE_ID,
    tableId: WORKOUT_TABLE_ID,
    rowId: workoutId,
    data: {
      syncStatus: SyncStatus.Deleted,
      version: version + 1,
      updatedAt: new Date().toISOString(),
    },
  });
}
