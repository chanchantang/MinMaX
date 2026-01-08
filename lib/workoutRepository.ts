import { ID } from "react-native-appwrite";
import { appwriteDb, DATABASE_ID, EXERCISE_TABLE_ID } from "./appwrite";

export type CreateWorkoutInput = {
  userId: string;
  name: string;
  notes?: string;
  intensity?: "easy" | "medium" | "hard";
  lastCompleted?: string;
};

export async function createWorkout(input: CreateWorkoutInput) {
  const rowId = ID.unique();
  const lastCompleted = input.lastCompleted ?? new Date().toISOString();

  await appwriteDb.createRow({
    databaseId: DATABASE_ID,
    tableId: EXERCISE_TABLE_ID,
    rowId,
    data: {
      userId: input.userId,
      name: input.name,
      notes: input.notes ?? "",
      intensity: input.intensity ?? "easy",
      lastCompleted,
    },
  });

  return rowId;
}