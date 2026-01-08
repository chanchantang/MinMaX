import { SyncStatus } from "./enum";

export type WorkoutModel = {
  id: string;
  name: string;
  order: number;
  scheduledDays: number[];
  programId: string;
  version: number;
  syncStatus: SyncStatus;
};
