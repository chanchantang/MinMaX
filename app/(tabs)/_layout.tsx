import { MaterialCommunityIcons } from '@expo/vector-icons/';
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#f5f5f5" },
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: "#f5f5f5",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0
        },
        tabBarActiveTintColor: "#6200ee"
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar-today" size={size} color={color} />
          )
        }}
      />

      <Tabs.Screen
        name="new-program"
        options={{
          title: "New Program",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-circle" size={size} color={color} />
          )
        }}
      />

      <Tabs.Screen
        name="create-workout"
        options={{
          title: "Create Workout",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-circle" size={size} color={color} />
          )
        }}
      />

      <Tabs.Screen
        name="streaks"
        options={{
          title: "Streaks",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chart-line" size={size} color={color} />
          )
        }}
      />
    </Tabs>
  )
}
