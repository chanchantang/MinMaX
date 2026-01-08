export enum SyncStatus {
  Pending = "pending",
  Synced = "synced",
  Conflict = "conflict",
  Deleted = "deleted",
}

export enum SetType {
  Normal = "Normal",
  WarmUp = "WarmUp",
  Drop = "Drop",
  Failure = "Failure",
}

export enum ExerciseType {
  WeightReps = "WeightReps",
  Bodyweight = "Bodyweight",
  Duration = "Duration",
  Distance = "Distance",
  Other = "Other",
}

export enum ExerciseUnit {
  Pounds = "Pounds",
  Kilograms = "Kilograms",
  Other = "Other",
}

export enum MuscleGroup {
  Arms = "Arms",
  Back = "Back",
  Cardio = "Cardio",
  Chest = "Chest",
  Core = "Core",
  FullBody = "FullBody",
  Legs = "Legs",
  Shoulders = "Shoulders",
  Other = "Other",
}

export enum Equipment {
  Barbell = "Barbell",
  Bodyweight = "Bodyweight",
  Dumbbell = "Dumbbell",
  Kettlebell = "Kettlebell",
  Machine = "Machine",
  Plates = "Plates",
  ResistanceBands = "ResistanceBands",
  Other = "Other",
}
