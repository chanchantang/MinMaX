import { Account, Client, TablesDB } from 'react-native-appwrite';

export const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
    .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!);

export const account = new Account(client)

export const appwriteDb = new TablesDB(client)

export const DATABASE_ID = process.env.EXPO_PUBLIC_DB_ID!
export const EXERCISE_TABLE_ID = process.env.EXPO_PUBLIC_EXERCISE_TABLE_ID!
export const WORKOUT_TABLE_ID = process.env.EXPO_PUBLIC_WORKOUT_TABLE_ID!
export const USER_PROFILE_TABLE_ID = process.env.EXPO_PUBLIC_USER_PROFILE_TABLE_ID!
export const PROGRAM_TABLE_ID = process.env.EXPO_PUBLIC_PROGRAM_TABLE_ID!
export const WORKOUT_EXERCISE_TABLE_ID = process.env.EXPO_PUBLIC_WORKOUT_EXERCISE_TABLE_ID!
export const EXERCISE_DEFINITION_TABLE_ID = process.env.EXPO_PUBLIC_EXERCISE_DEFINITION_TABLE_ID!
export const WORKOUT_SESSION_TABLE_ID = process.env.EXPO_PUBLIC_WORKOUT_SESSION_TABLE_ID!
export const COMPLETED_EXERCISE_TABLE_ID = process.env.EXPO_PUBLIC_COMPLETED_EXERCISE_TABLE_ID!
export const LOGGED_SETS_TABLE_ID = process.env.EXPO_PUBLIC_LOGGED_SETS_TABLE_ID!

export interface RealtimeResponse {
    events: string[];
    payload: any;
}