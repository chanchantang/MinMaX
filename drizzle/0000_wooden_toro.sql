CREATE TABLE `completed_exercises` (
	`id` text PRIMARY KEY NOT NULL,
	`order` integer NOT NULL,
	`workout_session_id` text NOT NULL,
	`exercise_definition_id` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `exercise_definitions` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`photo_url` text,
	`is_public` integer NOT NULL,
	`type` text NOT NULL,
	`muscle_groups` text NOT NULL,
	`equipment` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `logged_sets` (
	`id` text PRIMARY KEY NOT NULL,
	`set_number` integer NOT NULL,
	`reps` integer,
	`weight` integer,
	`duration` integer,
	`distance` integer,
	`unit` text,
	`type` text NOT NULL,
	`completed_exercise_id` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `programs` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`user_id` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user_profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`date_of_birth` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `workout_exercises` (
	`id` text PRIMARY KEY NOT NULL,
	`order` integer NOT NULL,
	`min_sets` integer NOT NULL,
	`max_sets` integer NOT NULL,
	`min_reps` integer,
	`max_reps` integer,
	`min_rest` integer,
	`max_rest` integer,
	`workout_id` text NOT NULL,
	`exercise_definition_id` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `workout_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`workout_id` text NOT NULL,
	`user_id` text NOT NULL,
	`started_at` text NOT NULL,
	`completed_at` text,
	`version` integer NOT NULL,
	`sync_status` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `workouts` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`order` integer NOT NULL,
	`scheduled_days` text NOT NULL,
	`program_id` text NOT NULL,
	`version` integer NOT NULL,
	`sync_status` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
