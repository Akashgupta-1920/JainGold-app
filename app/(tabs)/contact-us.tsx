import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import React from "react";
import {
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const COLORS = {
  primary: "#D4AF37",
  primaryDark: "#AA8C2C",
  background: "#F4F6F8",
  cardBg: "#FFFFFF",
  textDark: "#1A1A1A",
  textLight: "#757575",
  border: "#E0E0E0",
};

const ContactUsScreen = () => {
  const navigation = useNavigation();

  // Helper to open phone dialer or email
  const handleContact = (type, value) => {
    if (type === "phone") Linking.openURL(`tel:${value}`);
    if (type === "email") Linking.openURL(`mailto:${value}`);
  };

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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Contact Support</Text>
          <View style={{ width: 24 }} />
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Contact Info Cards */}
        <Text style={styles.sectionTitle}>Get in Touch</Text>
        <View style={styles.contactRow}>
          {/* Call Card */}
          <TouchableOpacity
            style={styles.contactCard}
            onPress={() => handleContact("phone", "+919876543210")}
          >
            <View style={styles.iconCircle}>
              <MaterialIcons name="call" size={24} color={COLORS.primary} />
            </View>
            <Text style={styles.contactLabel}>Call Us</Text>
            <Text style={styles.contactValue}>+91 98765 43210</Text>
          </TouchableOpacity>

          {/* Email Card */}
          <TouchableOpacity
            style={styles.contactCard}
            onPress={() => handleContact("email", "support@jainone.com")}
          >
            <View style={styles.iconCircle}>
              <MaterialIcons name="email" size={24} color={COLORS.primary} />
            </View>
            <Text style={styles.contactLabel}>Email Us</Text>
            <Text style={styles.contactValue}>support@jainone.com</Text>
          </TouchableOpacity>
        </View>

        {/* Address Card */}
        <View style={styles.addressCard}>
          <MaterialIcons name="location-on" size={24} color={COLORS.primary} />
          <View style={{ marginLeft: 15 }}>
            <Text style={styles.contactLabel}>Visit Our Store</Text>
            <Text style={styles.addressText}>
              123, Gold Market, Zaveri Bazaar, Mumbai, Maharashtra 400002
            </Text>
          </View>
        </View>

        {/* Message Form */}
        <Text style={styles.sectionTitle}>Send a Message</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            placeholderTextColor="#999"
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Type your message here..."
            multiline
            numberOfLines={4}
            placeholderTextColor="#999"
          />

          <TouchableOpacity style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>Send Message</Text>
            <MaterialIcons
              name="send"
              size={18}
              color="#FFF"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
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
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  scrollContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 15,
    marginTop: 10,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  contactCard: {
    backgroundColor: COLORS.cardBg,
    width: "48%",
    padding: 15,
    borderRadius: 16,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  iconCircle: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#FFF9E6", // Light Gold
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  addressCard: {
    backgroundColor: COLORS.cardBg,
    padding: 15,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    elevation: 2,
  },
  addressText: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 4,
    lineHeight: 20,
    width: "90%",
  },
  formContainer: {
    backgroundColor: COLORS.cardBg,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 15,
    color: COLORS.textDark,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  submitBtnText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ContactUsScreen;
