import { drizzle } from "drizzle-orm/expo-sqlite";

let dbInstance: ReturnType<typeof drizzle> | null = null;

export function setDb(instance: ReturnType<typeof drizzle>) {
  dbInstance = instance;
}

export function getDb() {
  if (!dbInstance) throw new Error("Database not initialized. Make sure DbProvider is mounted.");
  return dbInstance;
}

export function clearDb() {
  dbInstance = null;
}