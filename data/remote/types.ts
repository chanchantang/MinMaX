import { Models } from "react-native-appwrite";
import { SyncStatus, ExerciseType, Equipment, MuscleGroup, ExerciseUnit, SetType } from "../../domain/enum";

/* =========================
  USER PROFILE (App Data)
  ========================= */

export interface UserProfile extends Models.Document {
  userId: string;

  firstName: string;
  lastName: string;
  dateOfBirth?: string;

  createdAt: string;
  updatedAt: string;
}

/* =========================
  PROGRAM & WORKOUT TEMPLATES
  ========================= */

export interface Program extends Models.Document {
  name: string;
  description?: string;

  userId: string;

  createdAt: string;
  updatedAt: string;
}

export interface Workout extends Models.Document {
  name: string;
  order: number;
  scheduledDays: number[]; // 0 (Sun) - 6 (Sat)

  programId: string;

  version: number;
  syncStatus: SyncStatus;

  createdAt: string;
  updatedAt: string;
}

/* =========================
  EXERCISE LIBRARY
  ========================= */

export interface ExerciseDefinition extends Models.Document {
  name: string;
  description?: string;
  photoUrl?: string;
  isPublic: boolean;

  type: ExerciseType;
  muscleGroups: MuscleGroup[];
  equipment: Equipment;

  createdAt: string;
  updatedAt: string;
}

/* =========================
  WORKOUT STRUCTURE
  ========================= */

export interface WorkoutExercise extends Models.Document {
  order: number;

  minSets: number;
  maxSets: number;

  minReps?: number;
  maxReps?: number;

  minRest?: number;
  maxRest?: number;

  workoutId: string;
  exerciseDefinitionId: string;

  createdAt: string;
  updatedAt: string;
}

/* =========================
  WORKOUT EXECUTION
  ========================= */

export interface WorkoutSession extends Models.Document {
  workoutId: string;
  userId: string;

  startedAt: string;
  completedAt?: string;

  version: number;
  syncStatus: SyncStatus;

  createdAt: string;
  updatedAt: string;
}

export interface CompletedExercise extends Models.Document {
  order: number;

  workoutSessionId: string;
  exerciseDefinitionId: string;

  createdAt: string;
  updatedAt: string;
}

export interface LoggedSet extends Models.Document {
  setNumber: number;

  reps?: number;
  weight?: number;
  duration?: number;
  distance?: number;

  unit?: ExerciseUnit;
  type: SetType;

  completedExerciseId: string;

  createdAt: string;
  updatedAt: string;
}