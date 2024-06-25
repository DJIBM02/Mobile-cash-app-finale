import React, { useState, useEffect } from "react";
import { Text, ActivityIndicator } from "react-native";
import { getCountryFromIP, getCurrencySymbol } from "./locationService";
import "nativewind";

const CurrencyDisplay = ({ accountBalance }) => {
  const [currency, setCurrency] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrency = async () => {
      setLoading(true);
      const country = await getCountryFromIP();
      if (country) {
        setCurrency(getCurrencySymbol(country));
      }
      setLoading(false);
    };

    fetchCurrency();
  }, []);

  if (loading) {
    return <ActivityIndicator size='small' color='#ffffff' />;
  }

  return (
    <Text className='text-xl font-pregular text-gray-100 mb-1 ml-7'>
      Solde:{" "}
      <Text className='text-xl font-pmedium text-white'>
        {accountBalance} {currency}
      </Text>
    </Text>
  );
};

export default CurrencyDisplay;
