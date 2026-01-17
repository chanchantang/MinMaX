// import { eq } from "drizzle-orm";
// import { db } from "../db/database";
// import { workouts } from "../db/schema";
// import { SyncStatus } from "../domain/enum";

// export async function pushPendingWorkouts() {
//   const pending = await db
//     .select()
//     .from(workouts)
//     .where(eq(workouts.syncStatus, SyncStatus.Pending));

//   for (const workout of pending) {
//     try {
//     //   // 1️⃣ Push to Appwrite
//     //   await appwrite.databases.createDocument(
//     //     "db",
//     //     "workouts",
//     //     workout.id,
//     //     {
//     //       ...workout,
//     //       scheduledDays: JSON.parse(workout.scheduledDays),
//     //     }
//     //   );

//       // 2️⃣ Mark as synced
//       await db
//         .update(workouts)
//         .set({ syncStatus: SyncStatus.Synced })
//         .where(eq(workouts.id, workout.id));
//     } catch (e) {
//       // leave as pending
//     }
//   }
// }


// if (local.version > remote.version) {
//   pushLocal();
// } else if (remote.version > local.version) {
//   pullRemote();
// } else {
//   markSynced();
// }