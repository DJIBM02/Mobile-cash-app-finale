// @ts-nocheck
import React, { createContext, useContext, useState } from "react";

const IPContext = createContext();

export const IPProvider = ({ children }) => {
  const [ipAddress, setIpAddress] = useState("http://192.168.43.238:3000"); // Default IP address

  return (
    <IPContext.Provider value={{ ipAddress, setIpAddress }}>
      {children}
    </IPContext.Provider>
  );
};

export const useIP = () => {
  const { ipAddress } = useContext(IPContext);
  return ipAddress;
};
