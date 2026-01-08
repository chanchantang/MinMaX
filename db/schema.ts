import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { Equipment, ExerciseType, ExerciseUnit, MuscleGroup, SetType, SyncStatus } from "../domain/enum";
import { enumToTuple } from "./enumUtils";
/* =========================
  ENUM VALUES
  ========================= */

export const syncStatusValues = enumToTuple(SyncStatus);
export const setTypeValues = enumToTuple(SetType);
export const exerciseTypeValues = enumToTuple(ExerciseType);
export const exerciseUnitValues = enumToTuple(ExerciseUnit);
export const muscleGroupValues = enumToTuple(MuscleGroup);
export const equipmentValues = enumToTuple(Equipment);

/* =========================
  TABLES
  ========================= */

export const userProfiles = sqliteTable("user_profiles", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  dateOfBirth: text("date_of_birth"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const programs = sqliteTable("programs", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  userId: text("user_id").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const workouts = sqliteTable("workouts", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  order: integer("order").notNull(),
  scheduledDays: text("scheduled_days").notNull(), // JSON
  programId: text("program_id").notNull(),
  version: integer("version").notNull(),
  syncStatus: text("sync_status", { enum: syncStatusValues }).notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const exerciseDefinitions = sqliteTable("exercise_definitions", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  photoUrl: text("photo_url"),
  isPublic: integer("is_public", { mode: "boolean" }).notNull(),
  type: text("type", { enum: exerciseTypeValues }).notNull(),
  muscleGroups: text("muscle_groups").notNull(), // JSON
  equipment: text("equipment", { enum: equipmentValues }).notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const workoutExercises = sqliteTable("workout_exercises", {
  id: text("id").primaryKey(),
  order: integer("order").notNull(),
  minSets: integer("min_sets").notNull(),
  maxSets: integer("max_sets").notNull(),
  minReps: integer("min_reps"),
  maxReps: integer("max_reps"),
  minRest: integer("min_rest"),
  maxRest: integer("max_rest"),
  workoutId: text("workout_id").notNull(),
  exerciseDefinitionId: text("exercise_definition_id").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const workoutSessions = sqliteTable("workout_sessions", {
  id: text("id").primaryKey(),
  workoutId: text("workout_id").notNull(),
  userId: text("user_id").notNull(),
  startedAt: text("started_at").notNull(),
  completedAt: text("completed_at"),
  version: integer("version").notNull(),
  syncStatus: text("sync_status", { enum: syncStatusValues }).notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const completedExercises = sqliteTable("completed_exercises", {
  id: text("id").primaryKey(),
  order: integer("order").notNull(),
  workoutSessionId: text("workout_session_id").notNull(),
  exerciseDefinitionId: text("exercise_definition_id").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const loggedSets = sqliteTable("logged_sets", {
  id: text("id").primaryKey(),
  setNumber: integer("set_number").notNull(),
  reps: integer("reps"),
  weight: integer("weight"),
  duration: integer("duration"),
  distance: integer("distance"),
  unit: text("unit", { enum: exerciseUnitValues }),
  type: text("type", { enum: setTypeValues }).notNull(),
  completedExerciseId: text("completed_exercise_id").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

/* =========================
   RELATIONS (TYPE-ONLY)
   ========================= */

export const workoutRelations = relations(workouts, ({ many }) => ({
  exercises: many(workoutExercises),
  sessions: many(workoutSessions),
}));
