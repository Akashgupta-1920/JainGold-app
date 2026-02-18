import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const COLORS = {
  primary: "#D4AF37",
  secondary: "#1A1A1A",
  background: "#F2F4F7",
  cardBg: "#FFFFFF",
  success: "#22C55E",
  danger: "#EF4444",
  textMain: "#1F2937",
  textSub: "#6B7280",
};

const PROMOTIONS = [
  {
    id: "1",
    title: "Diwali Special Offer",
    subtitle: "Get 0.5% Extra Gold on every purchase",
    image:
      "https://www.malabargoldanddiamonds.com/media/wysiwyg/offer_page/2019/Store_Work/Diwali-offer/mobile_LPBanner1.jpg",
  },
  {
    id: "2",
    title: "Secure Your Future",
    subtitle: "100% Insured Bank-Grade Storage",
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1000&q=80",
  },
  {
    id: "3",
    title: "Special Offer",
    subtitle: "100% Insured Bank-Grade Storage",
    image:
      "https://c8.alamy.com/comp/H6K1W6/special-offer-banner-with-gold-glitter-vector-illustration-elements-H6K1W6.jpg",
  },
];

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const scrollRef = useRef(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const [livePrices] = useState([
    {
      id: "1",
      label: "GOLD SPOT",
      value: "2034.50",
      bid: "2034.20",
      ask: "2034.80",
      trend: "up",
    },
    {
      id: "2",
      label: "SILVER SPOT",
      value: "22.84",
      bid: "22.80",
      ask: "22.88",
      trend: "up",
    },
    {
      id: "3",
      label: "USD/INR",
      value: "83.12",
      bid: "83.10",
      ask: "83.15",
      trend: "down",
    },
  ]);

  const [productRates] = useState([
    { id: "1", name: "Gold 999 (24K)", buy: "₹65,400", sell: "₹65,800" },
    { id: "2", name: "Gold 9950", buy: "₹64,800", sell: "₹65,200" },
    { id: "3", name: "Silver 9999", buy: "₹103.29", sell: "₹104.50" },
    { id: "4", name: "Silver Bar 1kg", buy: "₹1,03,290", sell: "₹1,04,500" },
    { id: "5", name: "Gold 999 (with GST)", buy: "₹67,200", sell: "₹67,800" },
  ]);

  const [coinRates] = useState([
    { size: "100 gm (9999)", mmtc: "₹6,54,000", kundan: "₹6,60,000" },
    { size: "50 gm", mmtc: "₹3,27,000", kundan: "₹3,30,000" },
    { size: "20 gm", mmtc: "₹1,30,800", kundan: "₹1,32,000" },
    { size: "10 gm", mmtc: "₹65,400", kundan: "₹66,000" },
    { size: "8 gm", mmtc: "₹52,320", kundan: "₹52,800" },
    { size: "5 gm", mmtc: "₹32,700", kundan: "₹33,000" },
    { size: "4 gm", mmtc: "₹26,160", kundan: "₹26,400" },
    { size: "2 gm", mmtc: "₹13,080", kundan: "₹13,200" },
    { size: "1 gm", mmtc: "₹6,540", kundan: "₹6,600" },
  ]);

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();

    const sliderInterval = setInterval(() => {
      let next = activeIndex === PROMOTIONS.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(next);
      scrollRef.current?.scrollTo({ x: next * width, animated: true });
    }, 5000);

    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      pulse.stop();
      clearInterval(sliderInterval);
      clearInterval(timeInterval);
    };
  }, [activeIndex]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.brandName}>Jain Jewellery</Text>
            <View style={styles.liveContainer}>
              <Animated.View
                style={[styles.liveDot, { transform: [{ scale: pulseAnim }] }]}
              />
              <Text style={styles.liveText}>Live Market</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconBtn}>
              <MaterialIcons
                name="notifications-none"
                size={24}
                color={COLORS.textMain}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.primary]}
            />
          }
          contentContainerStyle={styles.scrollContent}
        >
          {/* --- SLIDER --- */}
          <View style={styles.sliderContainer}>
            <ScrollView
              ref={scrollRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(e) =>
                setActiveIndex(
                  Math.round(e.nativeEvent.contentOffset.x / width),
                )
              }
            >
              {/* FIXED: added index to the map function arguments */}
              {PROMOTIONS.map((item, index) => (
                <View key={`${item.id}-${index}`} style={styles.slide}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.slideImage}
                  />
                  <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.8)"]}
                    style={styles.slideOverlay}
                  >
                    <Text style={styles.slideTitle}>{item.title}</Text>
                    <Text style={styles.slideSub}>{item.subtitle}</Text>
                  </LinearGradient>
                </View>
              ))}
            </ScrollView>
            <View style={styles.pagination}>
              {PROMOTIONS.map((_, i) => (
                <View
                  key={`dot-${i}`}
                  style={[
                    styles.dot,
                    activeIndex === i ? styles.activeDot : null,
                  ]}
                />
              ))}
            </View>
          </View>

          {/* --- LIVE PRICES --- */}
          <View style={styles.ratesGrid}>
            {livePrices.map((item) => (
              <View key={item.id} style={styles.rateCard}>
                <Text style={styles.rateLabel}>{item.label}</Text>
                <Text style={styles.rateVal}>{item.value}</Text>
                <View style={styles.bidAskRow}>
                  <Text style={styles.bidTxt}>{item.bid}</Text>
                  <Text style={styles.dividerTxt}>|</Text>
                  <Text style={styles.askTxt}>{item.ask}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.timeContainer}>
            <MaterialIcons
              name="access-time"
              size={14}
              color={COLORS.primary}
            />
            <Text style={styles.timeText}>
              {currentTime.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
              {"  "}|{"  "}
              {currentTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </Text>
            <Text style={styles.liveRate}> Live rate </Text>
          </View>

          {/* --- TABLES --- */}
          <View style={styles.sectionCard}>
            <Text style={styles.cardHeaderTitle}>FUTURE MARKET RATES</Text>
            <View style={styles.tableHeader}>
              <Text style={[styles.hCell, { flex: 2 }]}>COMMODITY</Text>
              <Text style={styles.hCell}>BID</Text>
              <Text style={styles.hCell}>ASK</Text>
            </View>
            <TableRow
              label="GOLD MCX"
              bid="155,960"
              ask="155,990"
              low="155,248"
              high="159,226"
            />
            <TableRow
              label="SILVER MCX"
              bid="334,550"
              ask="335,899"
              low="327,502"
              high="339,927"
            />
          </View>

          {/* <View style={styles.sectionCard}>
            <Text style={styles.cardHeaderTitle}>OUR PRODUCTS</Text>
            <ProductRow name="Silver Tyaari" buy="341,550" sell="345,899" />
            <ProductRow name="Gold Tayari (24K)" buy="157,860" sell="158,190" />
            <ProductRow name="Gold MCX 995" buy="--" sell="156,944" />
          </View> */}

          <View style={styles.sectionCard}>
            <Text style={styles.cardHeaderTitle}>OUR PRODUCT</Text>
            <View style={styles.tableHeader}>
              <Text style={[styles.hCell, { flex: 2 }]}>PRODUCT</Text>
              <View style={styles.tableHe}>
                <Text style={styles.hCell}>BUY</Text>

                <Text style={styles.hCell}>SELL</Text>
              </View>
            </View>
            {productRates.map((product) => (
              <View key={product.id} style={styles.productRateRow}>
                <Text style={[styles.productName, { flex: 2 }]}>
                  {product.name}
                </Text>

                <Text
                  style={[styles.productBuy, { flex: 1, textAlign: "center" }]}
                >
                  {product.buy}
                </Text>
                <Text
                  style={[styles.productSell, { flex: 1, textAlign: "right" }]}
                >
                  {product.sell}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.cardHeaderTitle}>COINS (MMTC / KUNDAN)</Text>
            <View style={styles.tableHeader}>
              <Text style={[styles.hCell, { flex: 2 }]}>COIN SIZE</Text>
              <Text style={styles.hCell}>MMTC</Text>
              <Text style={styles.hCell}>KUNDAN</Text>
            </View>
            {coinRates.map((coin, index) => (
              <View key={index} style={styles.coinRow}>
                <View style={[styles.coinSizeCell, { flex: 2 }]}>
                  <MaterialIcons
                    name="circle"
                    size={8}
                    color={COLORS.primary}
                    style={styles.coinDot}
                  />
                  <Text style={styles.coinSize}>{coin.size}</Text>
                </View>
                <Text
                  style={[styles.coinPrice, { flex: 1, textAlign: "center" }]}
                >
                  {coin.mmtc}
                </Text>
                <Text
                  style={[styles.coinPrice, { flex: 1, textAlign: "right" }]}
                >
                  {coin.kundan}
                </Text>
              </View>
            ))}
          </View>

          <LinearGradient
            colors={["#2C3E50", "#000000"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.contactCard}
          >
            <View>
              <Text style={styles.contactPhone}>8860-322-323</Text>
              <Text style={styles.contactDesc}>Premium 24/7 Support Desk</Text>
            </View>
            <TouchableOpacity style={styles.callBtn}>
              <MaterialIcons name="call" size={20} color="#000" />
            </TouchableOpacity>
          </LinearGradient>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

// HELPER COMPONENTS
const TableRow = ({ label, bid, ask, low, high }) => (
  <View style={styles.tRow}>
    <View style={{ flex: 2 }}>
      <Text style={styles.tMain}>{label}</Text>
      <Text style={styles.tSub}>H: {high}</Text>
    </View>
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={styles.tBid}>{bid}</Text>
      <Text style={styles.tSub}>L: {low}</Text>
    </View>
    <View style={{ flex: 1, alignItems: "flex-end" }}>
      <Text style={styles.tAsk}>{ask}</Text>
    </View>
  </View>
);

const ProductRow = ({ name, buy, sell }) => (
  <View style={styles.pRow}>
    <Text style={[styles.tMain, { flex: 2 }]}>{name}</Text>
    <Text style={[styles.pBuy, { flex: 1, textAlign: "center" }]}>{buy}</Text>
    <Text style={[styles.pSell, { flex: 1, textAlign: "right" }]}>{sell}</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: {
    paddingBottom: Platform.OS === "ios" ? 120 : 100,
  },
  header: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    marginTop: 20,
  },
  brandName: {
    fontSize: 22,
    fontWeight: "900",
    color: COLORS.secondary,
    letterSpacing: -1,
  },
  liveContainer: { flexDirection: "row", alignItems: "center", marginTop: 2 },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.danger,
    marginRight: 6,
  },
  liveText: { fontSize: 12, color: COLORS.textSub, fontWeight: "600" },
  headerIcons: { flexDirection: "row" },
  iconBtn: { padding: 5 },
  sliderContainer: { height: 260, width: width },
  slide: { width: width, height: 260 },
  slideImage: { width: "100%", height: "100%", resizeMode: "cover" },
  slideOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 25,
    height: 120,
    justifyContent: "flex-end",
  },
  slideTitle: { color: "#FFF", fontSize: 24, fontWeight: "bold" },
  slideSub: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 5,
  },
  pagination: {
    position: "absolute",
    bottom: 15,
    alignSelf: "center",
    flexDirection: "row",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.4)",
    marginHorizontal: 4,
  },
  activeDot: { backgroundColor: COLORS.primary, width: 20 },
  ratesGrid: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-between",
  },
  rateCard: {
    backgroundColor: "#FFF",
    width: "31%",
    padding: 12,
    borderRadius: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  rateLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: COLORS.textSub,
    marginBottom: 5,
  },
  rateVal: { fontSize: 16, fontWeight: "bold", color: COLORS.secondary },
  bidAskRow: {
    flexDirection: "row",
    marginTop: 8,
    justifyContent: "space-between",
  },
  bidTxt: { fontSize: 10, color: COLORS.success, fontWeight: "bold" },
  askTxt: { fontSize: 10, color: COLORS.danger, fontWeight: "bold" },
  dividerTxt: { fontSize: 10, color: "#DDD" },
  sectionCard: {
    backgroundColor: "#FFF",
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 20,
    padding: 20,
    elevation: 2,
  },
  cardHeaderTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: COLORS.secondary,
    letterSpacing: 1,
    marginBottom: 15,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    paddingBottom: 10,
  },
  hCell: { fontSize: 11, fontWeight: "bold", color: COLORS.textSub },
  tRow: {
    flexDirection: "row",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  tMain: { fontSize: 14, fontWeight: "bold", color: COLORS.secondary },
  tSub: { fontSize: 11, color: COLORS.textSub, marginTop: 2 },
  tBid: { fontSize: 14, fontWeight: "bold", color: COLORS.success },
  tAsk: { fontSize: 14, fontWeight: "bold", color: COLORS.danger },
  pRow: {
    flexDirection: "row",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    alignItems: "center",
  },
  pBuy: { fontSize: 14, fontWeight: "bold", color: COLORS.success },
  pSell: { fontSize: 14, fontWeight: "bold", color: COLORS.danger },
  productRateRow: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    alignItems: "center",
  },
  productName: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.secondary,
  },
  productBuy: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.success,
  },
  productSell: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.danger,
  },
  coinRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    alignItems: "center",
  },
  coinSizeCell: {
    flexDirection: "row",
    alignItems: "center",
  },
  coinDot: {
    marginRight: 10,
  },
  coinSize: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.secondary,
  },
  coinPrice: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textMain,
  },
  contactCard: {
    marginHorizontal: 15,
    marginTop: 20,
    padding: 25,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contactPhone: { fontSize: 20, fontWeight: "bold", color: "#FFF" },
  contactDesc: { color: "rgba(255,255,255,0.7)", fontSize: 12, marginTop: 5 },
  callBtn: {
    backgroundColor: COLORS.primary,
    width: 45,
    height: 45,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    marginHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: -5,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  timeText: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.secondary,
    marginLeft: 8,
    fontVariant: ["tabular-nums"],
  },
  liveRate: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.danger,
    marginLeft: 8,
  },
  tableHe: {
    display: "flex",
    flexDirection: "row",
    gap: 80,
    paddingRight: 15,
    fontSize: 14,
  },
});

export default HomeScreen;
