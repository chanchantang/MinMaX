import { DbProvider } from "@/data/local/db-context";
import * as schema from "@/data/local/schema";
import { AuthProvider, useAuth } from "@/data/remote/auth-context";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { Stack, useRouter, useSegments } from "expo-router";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { Suspense, useEffect } from "react";
import { SheetProvider } from "react-native-actions-sheet";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActivityIndicator, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const {user, isLoadingUser} = useAuth();
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === "auth"

    if (!user && !inAuthGroup && !isLoadingUser) {
      router.replace("/auth")
    } else if (user && inAuthGroup && !isLoadingUser) {
      router.replace("/")
    }
  }, [user, segments]);

  return <>{children}</>
}

export default function RootLayout() {
  const DATABASE_NAME = "workout.db"
  const expoDb = openDatabaseSync(DATABASE_NAME);
  const db = drizzle(expoDb, { schema });

  return (
    <Suspense fallback={<ActivityIndicator>Loading...</ActivityIndicator>}>
      <SQLiteProvider
        databaseName={DATABASE_NAME}
        options={{ enableChangeListener: true }}
        useSuspense>
        <DbProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SheetProvider context="global">
              <AuthProvider>
                <PaperProvider>
                  <SafeAreaProvider>
                    <RouteGuard>
                      <Stack>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                      </Stack>
                    </RouteGuard>
                  </SafeAreaProvider>
                </PaperProvider>
              </AuthProvider>
            </SheetProvider>
          </GestureHandlerRootView>
        </DbProvider>
      </SQLiteProvider>
    </Suspense>
  )
}
