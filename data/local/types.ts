import * as schema from "./schema";

export type UserProfile = typeof schema.userProfiles.$inferSelect;

export type Program = typeof schema.programs.$inferSelect;

export type Workout = typeof schema.workouts.$inferSelect;

export type ExerciseDefinition = typeof schema.exerciseDefinitions.$inferSelect;

export type WorkoutExercise = typeof schema.workoutExercises.$inferSelect;

export type WorkoutSession = typeof schema.workoutSessions.$inferSelect;

export type CompletedExercise = typeof schema.completedExercises.$inferSelect;

export type LoggedSet = typeof schema.loggedSets.$inferSelect;

export type ExerciseDefinitionSheetItem = {
  id: string;
  name: string;
  description?: string;
  // muscleGroups: MuscleGroup[];
  // equipment: Equipment;
  // type: ExerciseType;
  photoUrl?: string;
};
