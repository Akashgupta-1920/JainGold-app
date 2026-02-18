import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* This hides the header for the entire tab group */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* This is for your landing/index screen if you have one */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
