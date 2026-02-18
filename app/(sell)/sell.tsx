import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const SellScreen = () => {
  const [step, setStep] = useState(1);
  const [jewelryType, setJewelryType] = useState("");
  const [weight, setWeight] = useState("");
  const [purity, setPurity] = useState("");
  const [images, setImages] = useState([]);

  const jewelryTypes = [
    "Necklace/Chain",
    "Earrings",
    "Rings",
    "Bangles",
    "Bracelet",
    "Mangalsutra",
    "Nose Pin",
    "Pendant",
  ];

  const purityOptions = ["24K", "22K", "18K", "14K", "10K"];

  const calculateValue = () => {
    const goldRate = 6450; // Current gold rate per gram
    const weightNum = parseFloat(weight) || 0;
    const purityMap = {
      "24K": 1,
      "22K": 0.916,
      "18K": 0.75,
      "14K": 0.585,
      "10K": 0.417,
    };
    const purityFactor = purityMap[purity] || 0;

    return Math.round(weightNum * purityFactor * goldRate * 0.95); // 95% of market value
  };

  const handleNext = () => {
    if (step === 1 && !jewelryType) {
      Alert.alert("Error", "Please select jewelry type");
      return;
    }
    if (step === 2 && (!weight || !purity)) {
      Alert.alert("Error", "Please enter weight and purity");
      return;
    }
    setStep(step + 1);
  };

  const handleSubmit = () => {
    const estimatedValue = calculateValue();
    Alert.alert(
      "Success",
      `Your jewelry has been submitted for evaluation.\nEstimated value: ₹${estimatedValue.toLocaleString()}\nOur executive will contact you within 24 hours.`,
      [{ text: "OK" }],
    );
    // Reset form
    setStep(1);
    setJewelryType("");
    setWeight("");
    setPurity("");
    setImages([]);
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Select Jewelry Type</Text>
      <View style={styles.jewelryGrid}>
        {jewelryTypes.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.jewelryTypeCard,
              jewelryType === type && styles.jewelryTypeCardSelected,
            ]}
            onPress={() => setJewelryType(type)}
          >
            <Icon
              name={
                type.includes("Necklace")
                  ? "blur-on"
                  : type.includes("Earring")
                    ? "hearing"
                    : type.includes("Ring")
                      ? "lens"
                      : type.includes("Bangle")
                        ? "all-inclusive"
                        : "watch"
              }
              size={30}
              color={jewelryType === type ? "#D4AF37" : "#666"}
            />
            <Text
              style={[
                styles.jewelryTypeText,
                jewelryType === type && styles.jewelryTypeTextSelected,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Enter Details</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Weight (in grams)*</Text>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
          placeholder="e.g., 15.5"
          keyboardType="decimal-pad"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Gold Purity*</Text>
        <View style={styles.purityContainer}>
          {purityOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.purityChip,
                purity === option && styles.purityChipSelected,
              ]}
              onPress={() => setPurity(option)}
            >
              <Text
                style={[
                  styles.purityText,
                  purity === option && styles.purityTextSelected,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Upload Photos (Optional)</Text>
        <Text style={styles.inputHint}>
          Add clear photos from different angles
        </Text>
        <View style={styles.imageUploadContainer}>
          {images.map((img, index) => (
            <View key={index} style={styles.uploadedImage}>
              <Image source={{ uri: img }} style={styles.imagePreview} />
              <TouchableOpacity
                style={styles.removeImageBtn}
                onPress={() => setImages(images.filter((_, i) => i !== index))}
              >
                <Icon name="close" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
          {images.length < 4 && (
            <TouchableOpacity style={styles.uploadBtn}>
              <Icon name="add-a-photo" size={24} color="#666" />
              <Text style={styles.uploadText}>Add Photo</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  const renderStep3 = () => {
    const estimatedValue = calculateValue();

    return (
      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Review & Submit</Text>

        <View style={styles.reviewCard}>
          <View style={styles.reviewRow}>
            <Text style={styles.reviewLabel}>Jewelry Type:</Text>
            <Text style={styles.reviewValue}>{jewelryType}</Text>
          </View>
          <View style={styles.reviewRow}>
            <Text style={styles.reviewLabel}>Weight:</Text>
            <Text style={styles.reviewValue}>{weight} grams</Text>
          </View>
          <View style={styles.reviewRow}>
            <Text style={styles.reviewLabel}>Purity:</Text>
            <Text style={styles.reviewValue}>{purity}</Text>
          </View>
          <View style={styles.reviewRow}>
            <Text style={styles.reviewLabel}>Current Gold Rate:</Text>
            <Text style={styles.reviewValue}>₹6,450/g</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.reviewRow}>
            <Text style={styles.reviewLabel}>Estimated Value:</Text>
            <Text style={styles.estimatedValue}>
              ₹{estimatedValue.toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={styles.noteContainer}>
          <Icon name="info" size={20} color="#D4AF37" />
          <Text style={styles.noteText}>
            Note: This is an estimated value based on current gold rates. Final
            value will be confirmed after physical verification.
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sell Gold Jewelry</Text>
      </View>

      {/* Progress Steps */}
      <View style={styles.progressContainer}>
        {[1, 2, 3].map((num) => (
          <View key={num} style={styles.progressStep}>
            <View
              style={[
                styles.progressCircle,
                step >= num && styles.progressCircleActive,
              ]}
            >
              <Text
                style={[
                  styles.progressText,
                  step >= num && styles.progressTextActive,
                ]}
              >
                {num}
              </Text>
            </View>
            <Text
              style={[
                styles.progressLabel,
                step >= num && styles.progressLabelActive,
              ]}
            >
              {num === 1 ? "Type" : num === 2 ? "Details" : "Review"}
            </Text>
            {num < 3 && (
              <View
                style={[
                  styles.progressLine,
                  step > num && styles.progressLineActive,
                ]}
              />
            )}
          </View>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}

        <View style={styles.buttonContainer}>
          {step > 1 && (
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => setStep(step - 1)}
            >
              <Text style={styles.secondaryButtonText}>Back</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={step === 3 ? handleSubmit : handleNext}
          >
            <Text style={styles.primaryButtonText}>
              {step === 3 ? "Submit for Evaluation" : "Continue"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Benefits Section */}
        <View style={styles.benefitsContainer}>
          <Text style={styles.benefitsTitle}>Why Sell With Us?</Text>
          {[
            "Best price guaranteed",
            "Free home pickup",
            "Instant payment",
            "Transparent pricing",
            "Secure & insured process",
          ].map((benefit, index) => (
            <View key={index} style={styles.benefitItem}>
              <Icon name="check-circle" size={20} color="#4CAF50" />
              <Text style={styles.benefitText}>{benefit}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  progressStep: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  progressCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  progressCircleActive: {
    backgroundColor: "#D4AF37",
    borderColor: "#D4AF37",
  },
  progressText: {
    fontSize: 14,
    color: "#999",
    fontWeight: "bold",
  },
  progressTextActive: {
    color: "#fff",
  },
  progressLabel: {
    fontSize: 12,
    color: "#999",
    marginTop: 5,
    position: "absolute",
    bottom: -20,
    width: 60,
    textAlign: "center",
    left: -14,
  },
  progressLabelActive: {
    color: "#D4AF37",
    fontWeight: "600",
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#ddd",
    marginHorizontal: 10,
  },
  progressLineActive: {
    backgroundColor: "#D4AF37",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  stepContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  jewelryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  jewelryTypeCard: {
    width: "30%",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "transparent",
  },
  jewelryTypeCardSelected: {
    borderColor: "#D4AF37",
    backgroundColor: "#FFF9E6",
  },
  jewelryTypeText: {
    fontSize: 12,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
  },
  jewelryTypeTextSelected: {
    color: "#D4AF37",
    fontWeight: "600",
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  inputHint: {
    fontSize: 12,
    color: "#999",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#eee",
  },
  purityContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  purityChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  purityChipSelected: {
    backgroundColor: "#FFF9E6",
    borderColor: "#D4AF37",
  },
  purityText: {
    fontSize: 14,
    color: "#666",
  },
  purityTextSelected: {
    color: "#D4AF37",
    fontWeight: "600",
  },
  imageUploadContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  uploadedImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    marginBottom: 10,
    position: "relative",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  removeImageBtn: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#F44336",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadBtn: {
    width: 80,
    height: 80,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#eee",
    borderStyle: "dashed",
  },
  uploadText: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  reviewCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
  },
  reviewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  reviewLabel: {
    fontSize: 14,
    color: "#666",
  },
  reviewValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  estimatedValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#D4AF37",
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },
  noteContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF9E6",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  noteText: {
    flex: 1,
    fontSize: 12,
    color: "#666",
    marginLeft: 10,
    lineHeight: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: "#D4AF37",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginLeft: 10,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginRight: 10,
  },
  secondaryButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
  benefitsContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  benefitText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 10,
  },
});

export default SellScreen;
