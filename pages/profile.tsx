import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const COLORS = {
  primary: "#D4AF37", // Gold
  primaryDark: "#AA8C2C",
  background: "#F4F6F8",
  cardBg: "#FFFFFF",
  textDark: "#1A1A1A",
  textLight: "#757575",
  success: "#2E7D32", // Green
  danger: "#C62828", // Red
  border: "#E0E0E0",
};

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  const menuItems = [
    { title: "My Trades", icon: "history", badge: "3", color: COLORS.primary },
    {
      title: "Bank Info",
      icon: "account-balance",
      badge: "",
      color: "#2196F3",
    },
    { title: "Address", icon: "location-on", badge: "", color: "#FF9800" },
    {
      title: "KYC Status",
      icon: "verified-user",
      badge: "Done",
      color: COLORS.success,
    },
    { title: "Gold SIP", icon: "savings", badge: "", color: "#9C27B0" },
    { title: "Refer", icon: "share", badge: "", color: "#607D8B" },
    { title: "Support", icon: "headset-mic", badge: "", color: "#795548" },
    { title: "Settings", icon: "settings", badge: "", color: "#666" },
  ];

  const recentActivity = [
    {
      id: "1",
      date: "Today, 10:30 AM",
      items: "Bought Gold (10g)",
      amount: "₹72,500",
      status: "Success",
    },
    {
      id: "2",
      date: "Yesterday, 2:15 PM",
      items: "Added to Wallet",
      amount: "₹50,000",
      status: "Pending",
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primaryDark}
      />

      {/* --- HEADER --- */}
      <LinearGradient
        colors={[COLORS.primaryDark, COLORS.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>My Profile</Text>
          <TouchableOpacity>
            <MaterialIcons name="edit" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Profile Info Overlay */}
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400",
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Rahul Jain</Text>
            <Text style={styles.profileEmail}>rahul.jain@example.com</Text>
            <View style={styles.verifiedBadge}>
              <MaterialIcons name="verified" size={14} color={COLORS.success} />
              <Text style={styles.verifiedText}>KYC Verified</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Stats Card (The Line Grid) */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>₹2.4L</Text>
            <Text style={styles.statLabel}>Total Value</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>45g</Text>
            <Text style={styles.statLabel}>Gold</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>1.2kg</Text>
            <Text style={styles.statLabel}>Silver</Text>
          </View>
        </View>

        {/* Menu Grid */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.menuGrid}>
            {menuItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuItem}>
                <View
                  style={[
                    styles.menuIconCircle,
                    { backgroundColor: `${item.color}15` },
                  ]}
                >
                  <MaterialIcons
                    name={item.icon}
                    size={24}
                    color={item.color}
                  />
                  {item.badge ? (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{item.badge}</Text>
                    </View>
                  ) : null}
                </View>
                <Text style={styles.menuText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>View All</Text>
            </TouchableOpacity>
          </View>

          {recentActivity.map((order) => (
            <View key={order.id} style={styles.activityRow}>
              <View style={styles.activityIcon}>
                <MaterialIcons
                  name={
                    order.status === "Success" ? "check-circle" : "schedule"
                  }
                  size={24}
                  color={
                    order.status === "Success" ? COLORS.success : "#FFA000"
                  }
                />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.activityItem}>{order.items}</Text>
                <Text style={styles.activityDate}>{order.date}</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.activityAmount}>{order.amount}</Text>
                <Text
                  style={[
                    styles.activityStatus,
                    {
                      color:
                        order.status === "Success" ? COLORS.success : "#FFA000",
                    },
                  ]}
                >
                  {order.status}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* App Settings */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <MaterialIcons
                name="notifications"
                size={22}
                color={COLORS.textLight}
              />
              <Text style={styles.settingText}>Push Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#ddd", true: COLORS.primary }}
              thumbColor="#fff"
            />
          </View>

          <View style={[styles.settingItem, { borderBottomWidth: 0 }]}>
            <View style={styles.settingLeft}>
              <MaterialIcons
                name="fingerprint"
                size={22}
                color={COLORS.textLight}
              />
              <Text style={styles.settingText}>Biometric Login</Text>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: "#ddd", true: COLORS.primary }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton}>
          <MaterialIcons name="logout" size={20} color={COLORS.danger} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Jain One Gold v1.2.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  // --- HEADER ---
  header: {
    paddingTop: 50,
    paddingBottom: 80, // Extra padding for stats card overlap
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#FFF",
    marginRight: 15,
  },
  profileInfo: {
    justifyContent: "center",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 4,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  verifiedText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "600",
    marginLeft: 4,
  },

  // --- CONTENT ---
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 110, // Increased bottom padding to fix scrolling issue
    marginTop: 30, // Pull up to overlap header
  },
  statsCard: {
    flexDirection: "row",
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 20,
    elevation: 5, // Increased elevation to ensure it sits on top
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: 20,
    zIndex: 10, // Ensure it renders above other elements
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold", // Changed from "800" to "bold" to fix Android display issue
    color: COLORS.textDark,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: "600",
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 10,
  },

  // --- SECTIONS ---
  sectionContainer: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  seeAll: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "600",
  },

  // --- MENU GRID ---
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  menuItem: {
    width: "23%", // 4 items per row
    alignItems: "center",
    marginBottom: 15,
  },
  menuIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: COLORS.danger,
    borderRadius: 8,
    paddingHorizontal: 4,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFF",
  },
  badgeText: {
    color: "#FFF",
    fontSize: 9,
    fontWeight: "bold",
  },
  menuText: {
    fontSize: 11,
    color: COLORS.textDark,
    textAlign: "center",
    fontWeight: "500",
  },

  // --- ACTIVITY ROW ---
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F9F9F9",
    justifyContent: "center",
    alignItems: "center",
  },
  activityItem: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textDark,
    marginBottom: 2,
  },
  activityDate: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  activityAmount: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.textDark,
  },
  activityStatus: {
    fontSize: 10,
    fontWeight: "600",
  },

  // --- SETTINGS ---
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingText: {
    fontSize: 14,
    color: COLORS.textDark,
    marginLeft: 12,
    fontWeight: "500",
  },

  // --- LOGOUT ---
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.cardBg,
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 2,
  },
  logoutText: {
    fontSize: 14,
    color: COLORS.danger,
    fontWeight: "600",
    marginLeft: 8,
  },
  footer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.textLight,
  },
});

export default ProfileScreen;
