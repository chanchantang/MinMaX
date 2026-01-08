import { ID } from "react-native-appwrite";
import { appwriteDb, DATABASE_ID, EXERCISE_TABLE_ID } from "./appwrite";

export type CreateExerciseInput = {
  userId: string;
  name: string;
  notes?: string;
  lastCompleted?: string;
};

export async function createExercise(input: CreateExerciseInput) {
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
      lastCompleted,
    },
  });

  return rowId;
}