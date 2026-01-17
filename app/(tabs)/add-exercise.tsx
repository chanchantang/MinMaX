import { useAuth } from '@/data/remote/auth-context';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';

import { Button, SegmentedButtons, Text, TextInput, useTheme } from 'react-native-paper';

const INTENSITIES = ["easy", "medium", "hard"];
type Intensity = (typeof INTENSITIES)[number];

export default function AddExerciseScreen() {
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
      // await createExercise({
      //   userId: user.$id,
      //   name,
      //   notes
      // });


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