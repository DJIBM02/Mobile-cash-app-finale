import { useEffect, useState } from "react";
import { Alert } from "react-native";

const fetcher = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fn();

      setData(response);
    } catch (error) {
      Alert.alert("ERROR", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect =
    (() => {
      fetchData();
    },
    []);
  const refecth = () => fetchData();
  return { data };
};
