import { drizzle } from "drizzle-orm/expo-sqlite";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useSQLiteContext } from "expo-sqlite";
import React, { createContext, useContext, useEffect, useMemo } from "react";
import { clearDb, setDb } from "./db-client";

const DbContext = createContext<ReturnType<typeof drizzle> | null>(null);

export function DbProvider({ children }: { children: React.ReactNode }) {
  const client = useSQLiteContext();
  const db = useMemo(() => drizzle(client), [client]);

  useDrizzleStudio(client);

  useEffect(() => {
    setDb(db);
    return () => clearDb();
  }, [db]);

  return <DbContext.Provider value={db}>{children}</DbContext.Provider>;
}

export function useDb() {
  const db = useContext(DbContext);
  if (!db) throw new Error("useDb must be used inside a DbProvider");
  return db;
}