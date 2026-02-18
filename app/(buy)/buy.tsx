import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

// --- SHARED COLOR PALETTE (Matches Home Screen) ---
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
  white: "#FFFFFF",
};

const BuyScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 10000, max: 500000 });

  const filters = [
    "All",
    "Necklaces",
    "Earrings",
    "Rings",
    "Bangles",
    "Bracelets",
  ];

  const jewelryItems = [
    {
      id: "1",
      name: "24K Gold Necklace",
      category: "Necklaces",
      weight: "15g",
      purity: "24K (99.9%)",
      price: "₹96,750",
      discount: "10%",
      image:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400",
    },
    {
      id: "2",
      name: "Traditional Jhumkas",
      category: "Earrings",
      weight: "8g",
      purity: "22K (91.6%)",
      price: "₹43,200",
      discount: "5%",
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400",
    },
    {
      id: "3",
      name: "Gold Mangalsutra",
      category: "Necklaces",
      weight: "12g",
      purity: "24K (99.9%)",
      price: "₹77,400",
      discount: null,
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
    },
    {
      id: "4",
      name: "Diamond Ring",
      category: "Rings",
      weight: "5g",
      purity: "18K (75%)",
      price: "₹24,750",
      discount: "15%",
      image:
        "https://images.unsplash.com/photo-1605100940287-ee4cc8da7d62?w=400",
    },
    {
      id: "5",
      name: "Gold Bangles Set",
      category: "Bangles",
      weight: "30g",
      purity: "22K (91.6%)",
      price: "₹1,62,000",
      discount: "12%",
      image:
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
    },
    {
      id: "6",
      name: "Chain Bracelet",
      category: "Bracelets",
      weight: "10g",
      purity: "22K (91.6%)",
      price: "₹54,000",
      discount: null,
      image:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400",
    },
  ];

  // --- RENDER FUNCTIONS ---

  const renderFilterChip = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.filterChip,
        selectedFilter === item && styles.filterChipActive,
      ]}
      onPress={() => setSelectedFilter(item)}
    >
      <Text
        style={[
          styles.filterText,
          selectedFilter === item && styles.filterTextActive,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderJewelryItem = ({ item }) => (
    <View style={styles.itemCard}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        {/* Discount Badge */}
        {item.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount} OFF</Text>
          </View>
        )}
        {/* Wishlist Icon */}
        <TouchableOpacity style={styles.wishlistIcon}>
          <MaterialIcons
            name="favorite-border"
            size={20}
            color={COLORS.textDark}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.itemInfo}>
        <Text style={styles.itemCategory}>{item.category}</Text>
        <Text style={styles.itemName} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.detailsRow}>
          <Text style={styles.itemMeta}>{item.purity}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.itemMeta}>{item.weight}</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.itemPrice}>{item.price}</Text>
          <TouchableOpacity style={styles.addToCartBtn}>
            <MaterialIcons name="add" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const filteredItems =
    selectedFilter === "All"
      ? jewelryItems
      : jewelryItems.filter((item) => item.category === selectedFilter);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primaryDark}
      />

      {/* --- PREMIUM HEADER --- */}
      <LinearGradient
        colors={[COLORS.primaryDark, COLORS.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Collections</Text>
          <TouchableOpacity style={styles.cartBtn}>
            <MaterialIcons name="shopping-bag" size={24} color={COLORS.white} />
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* --- SEARCH & FILTER BAR --- */}
        <View style={styles.searchFilterContainer}>
          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={22} color={COLORS.textLight} />
            <TextInput
              placeholder="Search gold, diamonds..."
              style={styles.searchInput}
              placeholderTextColor={COLORS.textLight}
            />
          </View>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => setShowFilterModal(true)}
          >
            <MaterialIcons name="tune" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* --- FILTER CHIPS --- */}
      <View style={styles.chipsContainer}>
        <FlatList
          data={filters}
          renderItem={renderFilterChip}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        />
      </View>

      {/* --- PRODUCTS GRID --- */}
      <FlatList
        data={filteredItems}
        renderItem={renderJewelryItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productsGrid}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
      />

      {/* --- FILTER MODAL --- */}
      <Modal visible={showFilterModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filters</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <MaterialIcons name="close" size={24} color={COLORS.textDark} />
              </TouchableOpacity>
            </View>

            {/* Price Range */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Price Range</Text>
              <View style={styles.rangeBox}>
                <Text style={styles.rangeText}>₹10,000</Text>
                <Text style={styles.rangeText}>-</Text>
                <Text style={styles.rangeText}>₹5,00,000</Text>
              </View>
            </View>

            {/* Purity */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Purity</Text>
              <View style={styles.purityOptions}>
                {["24K", "22K", "18K", "14K"].map((purity) => (
                  <TouchableOpacity key={purity} style={styles.purityChip}>
                    <Text style={styles.purityText}>{purity}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={styles.applyFilterBtn}
              onPress={() => setShowFilterModal(false)}
            >
              <Text style={styles.applyFilterText}>Show Results</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 5,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  cartBtn: {
    padding: 5,
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: COLORS.danger,
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  cartBadgeText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: "bold",
  },

  // --- SEARCH ---
  searchFilterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 48,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 15,
    color: COLORS.textDark,
    marginLeft: 10,
  },
  filterBtn: {
    width: 48,
    height: 48,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },

  // --- CHIPS ---
  chipsContainer: {
    paddingVertical: 15,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    fontSize: 13,
    color: COLORS.textLight,
    fontWeight: "600",
  },
  filterTextActive: {
    color: COLORS.white,
  },

  // --- PRODUCT CARD ---
  productsGrid: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  itemCard: {
    width: (width - 45) / 2, // 2 columns with spacing
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
  },
  imageContainer: {
    height: 160,
    width: "100%",
    position: "relative",
  },
  itemImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  discountBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: COLORS.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  discountText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "bold",
  },
  wishlistIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255,255,255,0.9)",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  itemInfo: {
    padding: 12,
  },
  itemCategory: {
    fontSize: 10,
    color: COLORS.textLight,
    textTransform: "uppercase",
    fontWeight: "600",
    marginBottom: 4,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textDark,
    marginBottom: 4,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  itemMeta: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  dot: {
    marginHorizontal: 4,
    color: COLORS.textLight,
    fontSize: 10,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.textDark,
  },
  addToCartBtn: {
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  // --- MODAL ---
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: COLORS.cardBg,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    minHeight: 450,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.textDark,
  },
  filterSection: {
    marginBottom: 30,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textDark,
    marginBottom: 15,
  },
  rangeBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.background,
    padding: 15,
    borderRadius: 12,
  },
  rangeText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textDark,
  },
  purityOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  purityChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  purityText: {
    fontSize: 14,
    color: COLORS.textDark,
    fontWeight: "500",
  },
  applyFilterBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  applyFilterText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BuyScreen;
