import { DATABASE_ID, databases, EXERCISE_TABLE_ID } from '@/lib/appwrite';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';
import { ID } from 'react-native-appwrite';

import { Button, SegmentedButtons, TextInput, useTheme, Text } from 'react-native-paper';

const INTENSITIES = ["easy", "medium", "hard"];
type Intensity = (typeof INTENSITIES)[number];

export default function AddWorkoutScreen() {
    const [name, setName] = useState<string>("");
    const [notes, setNotes] = useState<string>("");
    const [intensity, setIntensity] = useState<Intensity>("easy");
    const [error, setError] = useState<string>("");

    const {user} = useAuth();
    const router = useRouter();
    const theme = useTheme();

    const handleSubmit = async () => {
      if (!user) return;

      try {
        await databases.createRow({
          databaseId: DATABASE_ID,
          tableId: EXERCISE_TABLE_ID,
          rowId: ID.unique(),
          data: {
            userId: user.$id,
            name: name,
            notes: notes,
            lastCompleted: new Date().toISOString()
          }
        })

        router.back();
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
          return;
        }

        setError("There was an error creating the exercise.");
      }
    }

    return (
      <View>
        <TextInput label="Name" onChangeText={setName} mode="outlined"/>
        <TextInput label="Notes" onChangeText={setNotes} mode="outlined"/>
        <View>
          <SegmentedButtons
            value={intensity}
            onValueChange={(value) => {setIntensity(value as Intensity)}}
            buttons={INTENSITIES.map((intensity) => ({
              value: intensity,
              label: intensity.charAt(0).toUpperCase() + intensity.slice(1)
            }))}
          />
        </View>
        <Button
          mode="contained"
          onPress={handleSubmit}
          disabled={!name}
        >
          Add Exercise
        </Button>

        {error && <Text style={{color: theme.colors.error}}>{error}</Text>}
      </View>
    )
}