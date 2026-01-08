import { Workout } from "../db/types";
import { WorkoutModel } from "./models";
import { toSyncStatus } from "./enumMappers";

export function workoutFromDb(row: Workout): WorkoutModel {
  return {
    id: row.id,
    name: row.name,
    order: row.order,
    scheduledDays: JSON.parse(row.scheduledDays),
    programId: row.programId,
    version: row.version,
    syncStatus: toSyncStatus(row.syncStatus)
  };
}

export function workoutToDb(
  model: WorkoutModel
): Partial<Workout> {
  return {
    ...model,
    scheduledDays: JSON.stringify(model.scheduledDays),
  };
}
