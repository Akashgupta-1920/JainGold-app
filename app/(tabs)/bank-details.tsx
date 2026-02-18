import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
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
  success: "#2E7D32",
  lightGold: "#FFF9E6",
};

const BankDetailsScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  // Simulated API Data
  const [bankData, setBankData] = useState({
    accountName: "",
    accountNumber: "",
    ifsc: "",
    bankName: "",
    branch: "",
    status: "",
  });

  // Simulate Fetching Data from API
  useEffect(() => {
    setTimeout(() => {
      setBankData({
        accountName: "Jain One Gold Pvt Ltd",
        accountNumber: "50200012345678",
        ifsc: "HDFC0000240",
        bankName: "HDFC Bank",
        branch: "Zaveri Bazaar, Mumbai",
        status: "VERIFIED",
      });
      setLoading(false);
    }, 1500); // 1.5 seconds delay
  }, []);

  const handleCopy = (label, value) => {
    // In a real app, use Clipboard.setString(value)
    Alert.alert("Copied", `${label} copied to clipboard!`);
  };

  const renderDetailRow = (label, value, copyable = false) => (
    <View style={styles.detailRow}>
      <View>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
      {copyable && (
        <TouchableOpacity
          style={styles.copyButton}
          onPress={() => handleCopy(label, value)}
        >
          <MaterialIcons name="content-copy" size={18} color={COLORS.primary} />
          <Text style={styles.copyText}>Copy</Text>
        </TouchableOpacity>
      )}
    </View>
  );

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
          <Text style={styles.headerTitle}>Bank Details</Text>
          <View style={{ width: 24 }} />
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <MaterialIcons
            name="info-outline"
            size={20}
            color={COLORS.textDark}
          />
          <Text style={styles.infoText}>
            Use these details to add funds to your wallet via NEFT, IMPS, or
            RTGS.
          </Text>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Fetching Bank Details...</Text>
          </View>
        ) : (
          <View style={styles.card}>
            {/* Header of Card */}
            <View style={styles.cardHeader}>
              <View style={styles.bankIcon}>
                <MaterialIcons
                  name="account-balance"
                  size={32}
                  color={COLORS.primary}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 15 }}>
                <Text style={styles.bankNameTitle}>{bankData.bankName}</Text>
                <View style={styles.verifiedBadge}>
                  <MaterialIcons name="verified" size={14} color="#FFF" />
                  <Text style={styles.verifiedText}>{bankData.status}</Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Details */}
            {renderDetailRow("Account Name", bankData.accountName)}
            {renderDetailRow("Account Number", bankData.accountNumber, true)}
            {renderDetailRow("IFSC Code", bankData.ifsc, true)}
            {renderDetailRow("Branch", bankData.branch)}

            <View style={styles.divider} />

            {/* Note */}
            <Text style={styles.noteText}>
              Note: Transfers usually reflect within 2-4 hours during banking
              hours.
            </Text>
          </View>
        )}

        {!loading && (
          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => Alert.alert("Share", "Sharing details...")}
          >
            <MaterialIcons name="share" size={20} color="#FFF" />
            <Text style={styles.shareText}>Share Bank Details</Text>
          </TouchableOpacity>
        )}
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
  infoBanner: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: COLORS.lightGold,
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#F0E0B0",
  },
  infoText: {
    color: COLORS.textDark,
    marginLeft: 10,
    fontSize: 13,
    lineHeight: 20,
    flex: 1,
  },
  loadingContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: COLORS.textLight,
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: 25,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  bankIcon: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.lightGold,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  bankNameTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 4,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.success,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  verifiedText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "bold",
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginVertical: 15,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 16,
    color: COLORS.textDark,
    fontWeight: "600",
  },
  copyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  copyText: {
    fontSize: 12,
    color: COLORS.primary,
    marginLeft: 4,
    fontWeight: "600",
  },
  noteText: {
    fontSize: 11,
    color: COLORS.textLight,
    fontStyle: "italic",
    marginTop: 5,
  },
  shareButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 16,
    elevation: 2,
  },
  shareText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default BankDetailsScreen;
