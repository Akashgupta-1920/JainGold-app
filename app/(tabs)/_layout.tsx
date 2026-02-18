import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

const COLORS = {
  primary: "#D4AF37", // Your Gold Theme
  inactive: "#9E9E9E",
  background: "#FFFFFF",
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // We hide headers because your screens have their own custom headers
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.inactive,

        // Premium Tab Bar Styling
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopWidth: 0, // Remove default border for cleaner look
          height: Platform.OS === "ios" ? 85 : 65, // Taller on iOS for home indicator
          paddingBottom: Platform.OS === "ios" ? 28 : 10,
          paddingTop: 10,
          // Add Shadow/Elevation
          elevation: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          marginBottom: 30,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={28} color={color} />
          ),
        }}
      />

      {/* NEW: Bank Details Tab */}
      <Tabs.Screen
        name="bank-details" // Make sure your file is named 'bank-details.tsx' inside the app folder
        options={{
          title: "Bank Info",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="account-balance" size={26} color={color} />
          ),
        }}
      />

      {/* NEW: Contact Us Tab */}
      <Tabs.Screen
        name="contact-us" // Make sure your file is named 'contact-us.tsx' inside the app folder
        options={{
          title: "Contact",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="support-agent" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
