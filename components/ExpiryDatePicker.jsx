import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import "nativewind";

const ExpiryDatePicker = ({ value, onChange }) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    const month = currentDate.getMonth() + 1; // getMonth() returns 0-indexed month
    const year = currentDate.getFullYear().toString().slice(-2); // get last two digits of the year
    onChange(`${month < 10 ? "0" + month : month}/${year}`);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setShow(true)}>
        <Text
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            padding: 10,
          }}
        >
          {value || "MM/YY"}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={date}
          mode='date'
          display='spinner'
          onChange={handleChange}
          minimumDate={new Date()} // restrict to future dates
          style={{ width: 320, height: 260 }}
        />
      )}
    </View>
  );
};

export default ExpiryDatePicker;
