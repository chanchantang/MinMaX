import React from 'react';
import { Text, View } from 'react-native';

export default function StreaksScreen() {
  // async function onCreateWorkout() {
  //   await createWorkout({
  //     name: "Push Day",
  //     order: 1,
  //     scheduledDays: [1, 4],
  //     programId: "1",
  //   });
  // }

  // useEffect(() => {
  //   const loadWorkouts = async () => {
  //     await onCreateWorkout();
  //     console.log("Created workout");
  //     await getWorkoutsForProgram("1").then((workouts) => {
  //       console.log("Workouts for program 1:", workouts);
  //     });
  //   };
  //   loadWorkouts();
  // }, []);

  return (
    <View>
      <Text>Streaks</Text>
    </View>
  );
}