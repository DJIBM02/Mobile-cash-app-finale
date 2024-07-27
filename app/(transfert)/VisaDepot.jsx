// @ts-nocheck
import React, { useRef, useCallback, useState } from "react";
import { StyleSheet, Platform, View, Button, Text } from "react-native";
import CreditCard from "react-native-credit-card-form-ui";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import ReactNativeModal from "react-native-modal";
import { useIP } from "../../data/IPContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const creditCardRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalMessageColor, setModalMessageColor] = useState("green");
  const IpAddress = useIP();

  const handleSubmit = useCallback(async () => {
    if (creditCardRef.current) {
      const { error, data } = creditCardRef.current.submit();
      console.log("CARD DATA: ", data);

      if (error) {
        setModalMessage("Please fill in the credit card details correctly.");
        setModalMessageColor("red");
        setModalVisible(true);
        return;
      }

      const cardData = {
        name: data.holder?.trim() || "",
        number: data.number?.replace(/\s/g, "").trim() || "",
        expdate: data.expiration
          ? `${data.expiration.split("/")[0].trim()}/${data.expiration
              .split("/")[1]
              .trim()}`
          : "",
        cvv: data.cvv?.trim() || "",
      };

      console.log("FORMATTED CARD DATA: ", cardData);

      if (
        !cardData.name ||
        !cardData.number ||
        !cardData.cvv ||
        !cardData.expdate
      ) {
        setModalMessage(
          "All fields are required. Please fill in the form completely."
        );
        setModalMessageColor("red");
        setModalVisible(true);
        return;
      }

      try {
        setLoading(true);
        console.log("REQUEST DATA: ", cardData);
        const token = await AsyncStorage.getItem("token");
        const response = await axios.post(
          `${IpAddress}/api/creditcard/add`, // Ensure this matches your API endpoint
          cardData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("API RESPONSE: ", response.data);

        setModalMessage("Credit card added successfully!");
        setModalMessageColor("green");
        setModalVisible(true);
      } catch (apiError) {
        console.error("API ERROR: ", apiError);
        console.log("RESPONSE STATUS: ", apiError.response?.status);
        console.log("RESPONSE DATA: ", apiError.response?.data);
        setModalMessage("Failed to add credit card. Please try again.");
        setModalMessageColor("red");
        setModalVisible(true);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  return (
    <SafeAreaView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={20}
      style={styles.container}
    >
      <CreditCard ref={creditCardRef} />
      <View style={styles.buttonContainer}>
        <Button
          title={loading ? "Submitting..." : "Submit"}
          onPress={handleSubmit}
          color='#4CAF50'
          disabled={loading}
        />
      </View>

      {/* Custom Modal */}
      <ReactNativeModal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={{ ...styles.modalMessage, color: modalMessageColor }}>
            {modalMessage}
          </Text>
          <Button
            title='Close'
            onPress={() => setModalVisible(false)}
            color='#4CAF50'
          />
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#161622",
    width: "100%",
    height: "100%",
    padding: 20,
  },
  buttonContainer: {
    marginTop: 20,
    minWidth: 150,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    overflow: "hidden",
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#161622",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
});
