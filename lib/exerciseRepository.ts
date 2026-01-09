import { ID, Query } from "react-native-appwrite";
import {
  Equipment,
  ExerciseDefinition,
  ExerciseType,
  MuscleGroup,
} from "../types/database.types";
import {
  appwriteDb,
  DATABASE_ID,
  EXERCISE_DEFINITION_TABLE_ID,
  WORKOUT_EXERCISE_TABLE_ID
} from "./appwrite";

/* =========================
   CREATE
   ========================= */

export type CreateExerciseDefinitionInput = {
  name: string;
  description?: string;
  photoUrl?: string;
  isPublic: boolean;
  type: ExerciseType;
  muscleGroups: MuscleGroup[];
  equipment: Equipment;
};

export async function createExerciseDefinition(
  input: CreateExerciseDefinitionInput
): Promise<string> {
  const id = ID.unique();
  const now = new Date().toISOString();

  await appwriteDb.createRow({
    databaseId: DATABASE_ID,
    tableId: EXERCISE_DEFINITION_TABLE_ID,
    rowId: id,
    data: {
      name: input.name,
      description: input.description ?? null,
      photoUrl: input.photoUrl ?? null,
      isPublic: input.isPublic,

      type: input.type,
      muscleGroups: input.muscleGroups,
      equipment: input.equipment,

      createdAt: now,
      updatedAt: now,
    },
  });

  return id;
}

/* =========================
   READ
   ========================= */

export async function listExerciseDefinitions(): Promise<ExerciseDefinition[]> {
  const res = await appwriteDb.listRows({
    databaseId: DATABASE_ID,
    tableId: EXERCISE_DEFINITION_TABLE_ID,
  });

  return res.rows as unknown as ExerciseDefinition[];
}

/* =========================
   UPDATE
   ========================= */

export async function updateExerciseDefinition(
  id: string,
  data: Partial<
    Pick<
      ExerciseDefinition,
      "name" | "description" | "photoUrl" | "muscleGroups" | "equipment"
    >
  >
) {
  await appwriteDb.updateRow({
    databaseId: DATABASE_ID,
    tableId: EXERCISE_DEFINITION_TABLE_ID,
    rowId: id,
    data: {
      ...data,
      updatedAt: new Date().toISOString(),
    },
  });
}

/* =========================
   DELETE (HARD DELETE OK)
   ========================= */

export async function deleteExerciseDefinition(id: string) {
  await appwriteDb.deleteRow({
    databaseId: DATABASE_ID,
    tableId: EXERCISE_DEFINITION_TABLE_ID,
    rowId: id,
  });
}
