import ExerciseTable from '@/components/ExerciseTable';
import { getExercisesDefinitions } from '@/data/local/repositories/exerciseDefinitionRepository';
import { ExerciseDefinition, ExerciseDefinitionSheetItem } from '@/data/local/types';
import { useAuth } from '@/data/remote/auth-context';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';

export default function NewProgramScreem() {
    const [name, setName] = useState<string>("");
    const [notes, setNotes] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [exerciseDefinitions, setExerciseDefinitions] = useState<ExerciseDefinition[]>([]);

    const {user} = useAuth();
    const router = useRouter();
    const theme = useTheme();

    function toSheetItem(
      def: ExerciseDefinition
    ): ExerciseDefinitionSheetItem {
      return {
        id: def.id,
        name: def.name,
        // description: def.description,
        // muscleGroups: def.muscleGroups,
        // equipment: def.equipment,
        // type: def.type,
        // photoUrl: def.photoUrl,
      };
    }


    const handleSubmit = async () => {
        const data = await getExercisesDefinitions();

        SheetManager.show('payload', {
          payload: data.map(toSheetItem)
        });

      // if (!user) return;

      // try {
      //   await createWorkout({
      //     userId: user.$id,
      //     programId: "",
      //     name: name,
      //     order: 0,
      //     scheduledDays: [],
      //   });

      //   router.back();
      // } catch (error) {
      //   if (error instanceof Error) {
      //     setError(error.message)
      //     return;
      //   }

      //   setError("There was an error creating the exercise.");
      // }
    }

    useEffect(() => {
      const loadExercises = async () => {
        const data = await getExercisesDefinitions();
        setExerciseDefinitions(data);
      };
      loadExercises();
    }, []);

    return (
      <View>
        <TextInput label="Name" onChangeText={setName} mode="outlined"/>
        <TextInput label="Notes" onChangeText={setNotes} mode="outlined"/>
        <ExerciseTable exercises={[]}/>
        <Button
          mode="contained"
          onPress={handleSubmit}
          // disabled={!name}
        >
          Add Exercise
        </Button>

        {error && <Text style={{color: theme.colors.error}}>{error}</Text>}
      </View>
    )
}