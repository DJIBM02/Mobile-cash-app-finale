import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(
    React.useCallback(() => {
      const checkLoginStatus = async () => {
        try {
          const loggedInStatus = await AsyncStorage.getItem("isLoggedIn");
          setIsLoggedIn(loggedInStatus === "true");
        } catch (error) {
          console.error("Failed to retrieve login status:", error);
        } finally {
          setLoading(false);
        }
      };

      checkLoginStatus();
    }, [])
  );

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
