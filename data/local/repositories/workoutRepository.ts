import { eq, sql } from "drizzle-orm";
import { nanoid } from "nanoid/non-secure";
import { SyncStatus } from "../../../domain/enum";
import { getDb } from "../client";
import { workouts } from "../schema";

export function generateId() {
  return nanoid();
}

export function nowIso() {
  return new Date().toISOString();
}

export type CreateWorkoutInput = {
  name: string;
  order: number;
  scheduledDays: number[];
  programId: string;
};

export async function createWorkout(data: CreateWorkoutInput) {
  const db = getDb();
  const id = generateId();
  const timestamp = nowIso();

  await db.insert(workouts).values({
    id,
    name: data.name,
    order: data.order,
    scheduledDays: JSON.stringify(data.scheduledDays),
    programId: data.programId,

    version: 1,
    syncStatus: SyncStatus.Pending,

    createdAt: timestamp,
    updatedAt: timestamp,
  });

  return id;
}

export async function getWorkoutsForProgram(programId: string) {
  const db = getDb();
  const rows = await db
    .select()
    .from(workouts)
    .where(eq(workouts.programId, programId))
    .orderBy(workouts.order);

  return rows.map((row) => ({
    ...row,
    scheduledDays: JSON.parse(row.scheduledDays),
  }));
}

export async function updateWorkoutName(workoutId: string, name: string) {
  const db = getDb();
  await db
    .update(workouts)
    .set({
      name,
      version: sql`${workouts.version} + 1`,
      syncStatus: SyncStatus.Pending,
      updatedAt: nowIso(),
    })
    .where(eq(workouts.id, workoutId));
}

export async function deleteWorkout(workoutId: string) {
  const db = getDb();
  await db
    .update(workouts)
    .set({
      syncStatus: SyncStatus.Deleted,
      updatedAt: nowIso(),
    })
    .where(eq(workouts.id, workoutId));
}

export async function getPendingWorkouts() {
  const db = getDb();
  const rows = await db
    .select()
    .from(workouts)
    .where(eq(workouts.syncStatus, SyncStatus.Pending))
    .orderBy(workouts.createdAt);

  return rows.map((row) => ({
    ...row,
    scheduledDays: JSON.parse(row.scheduledDays),
  }));
}

export async function updateWorkoutSyncStatus(workoutId: string, syncStatus: SyncStatus) {
  const db = getDb();
  await db
    .update(workouts)
    .set({
      syncStatus,
      updatedAt: nowIso(),
    })
    .where(eq(workouts.id, workoutId));
}