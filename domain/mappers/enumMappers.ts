import { SyncStatus } from "../enum";

export function toSyncStatus(value: string): SyncStatus {
  if (!Object.values(SyncStatus).includes(value as SyncStatus)) {
    throw new Error(`Invalid SyncStatus from DB: ${value}`);
  }
  return value as SyncStatus;
}
