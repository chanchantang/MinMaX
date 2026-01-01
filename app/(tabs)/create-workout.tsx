import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default function AddWorkoutScreen() {
  const [name, setName] = useState<string>("");
  const router = useRouter();

  return (
    <View>
      <TextInput label="Workout title" onChangeText={setName} mode="flat"/>
      <Button mode="contained" onPress={() => {router.navigate('/add-exercise')}}>Add Exercise</Button>
    </View>
  )
}