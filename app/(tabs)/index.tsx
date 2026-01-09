import { WorkoutExercise } from "@/db/types";
import { useAuth } from "@/lib/auth-context";
import { removeExerciseFromWorkout } from "@/lib/workoutExerciseRepository";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MutableRefObject, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Swipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import { Button, Surface, Text } from "react-native-paper";

export default function Index() {
  const {signOut, user} = useAuth();
  const [exercises, setExercises] = useState<WorkoutExercise[]>();

  const swipeableRefs = useRef<Record<string, MutableRefObject<SwipeableMethods | null>>>({} as Record<string, MutableRefObject<SwipeableMethods | null>>);

  // useEffect(() => {
  //   if (user) {
  //     const channel = `databases.${DATABASE_ID}.tables.${EXERCISE_TABLE_ID}.rows`
  //     const habitsSubscription = client.subscribe(
  //       channel,
  //       (response: RealtimeResponse) => {
  //         console.log('Received subscription event:', response);
  //         if (response.events.includes("databases.*.tables.*.rows.*.create")) {
  //           fetchExercises();
  //         } else if (response.events.includes("databases.*.tables.*.rows.*.update")) {
  //           fetchExercises();
  //         } else if (response.events.includes("databases.*.tables.*.rows.*.delete")) {
  //           fetchExercises();
  //         }
  //       }
  //     );
  //     fetchExercises();
  //     return () => {
  //       habitsSubscription();
  //     }
  //   }
  // }, [user]);

  const handleDeleteExercise = async (id: string) => {
    removeExerciseFromWorkout(id);
  }

  const renderLeftActions = () => (
    <View style={styles.swipeActionLeft}>
      <MaterialCommunityIcons name="delete" size={32} color="white" />
    </View>
  )

  const renderRightActions = () => (
    <View style={styles.swipeActionRight}>
      <MaterialCommunityIcons name="pencil" size={32} color="white" />
    </View>
  )

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <Text variant="headlineSmall">Exercises</Text>
        <Button mode="text" onPress={signOut} icon={"logout"}>Sign Out</Button>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {exercises?.length !== 0 ? (
          exercises?.map((exercise, key) => {
            if (!swipeableRefs.current[exercise.$id]) {
              swipeableRefs.current[exercise.$id] = { current: null };
            }
            const refObject = swipeableRefs.current[exercise.$id];
            return (
              <Swipeable
                key={exercise.$id}
                ref={refObject}
                overshootLeft={false}
                overshootRight={false}
                renderLeftActions={renderLeftActions}
                renderRightActions={renderRightActions}
                onSwipeableOpen={(direction) => {
                  if (direction === 'left') {
                    handleDeleteExercise(exercise.$id);
                  } else if (direction === 'right') {
                    // Handle edit action
                  }
                  swipeableRefs.current[exercise.$id].current?.close();
                }}
              >
                <Surface style={styles.card} elevation={0}>
                  <View style={styles.cardContent}>
                    <Text>{exercise.name}</Text>
                  </View>
                </Surface>
              </Swipeable>
            );
          })
        ) : (
          <Text>No exercises found. Add one!</Text>
        ) }
      </ScrollView>



    </View>
  );
}

const styles = StyleSheet.create({
  navButton: {
    width: 100,
    height: 40,
    backgroundColor: "coral",
    borderRadius: 8,
    textAlign: "center",
    textAlignVertical: "center"
  },
  card: {
    marginBottom: 18,
    borderRadius: 18,
    backgroundColor: "#f7f2f8",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  cardContent: {
    padding: 20
  },
  swipeActionLeft: {
    justifyContent: 'center',
    alignItems: "flex-start",
    flex: 1,
    backgroundColor: '#e53935',
    borderRadius: 18,
    marginBottom: 18,
    marginTop: 2,
    paddingLeft: 16,
  },
  swipeActionRight: {
    justifyContent: 'center',
    alignItems: "flex-end",
    flex: 1,
    backgroundColor: '#4caf50',
    borderRadius: 18,
    marginBottom: 18,
    marginTop: 2,
    paddingRight: 16,
  }
})