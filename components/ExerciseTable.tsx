import { WorkoutExercise } from '@/data/local/types';
import { ExerciseUnit, SetType } from '@/domain/enum';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import EditableSetRow from './EditableSetRow';

type WorkoutExerciseDisplay = WorkoutExercise & {
  name: string,
  load: number | null,
  unit: ExerciseUnit | null,
  alternatives: string[] | null,
  lastSetIntensity: SetType | null,
  rir: number | null,
  note: string | null
}

type Props = {
  exercises: WorkoutExerciseDisplay[]
}

export default function ExerciseTable({ exercises }: Props) {
  const updateLoggedSet = async (setId: string, data: Partial<{
    type: SetType;
    weight: number;
    reps: number;
    rir: number;
  }>) => { };

  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Exercise</DataTable.Title>
          <DataTable.Title numeric>Working Sets</DataTable.Title>
          <DataTable.Title numeric>Reps</DataTable.Title>
        </DataTable.Header>

        {exercises.map((exercise) => (
          <EditableSetRow
            key={exercise.id}
            name={exercise.name}
            sets={exercise.maxSets}
            reps={exercise.maxReps!} // TEMP solution
            onUpdate={(data) =>
              updateLoggedSet(exercise.id, data)
            }
          />
        ))}
      </DataTable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: 100,
    // paddingHorizontal: 30,
  },
});