import axios from "axios";

export const getCountryFromIP = async () => {
  try {
    const response = await axios.get(
      "https://ipinfo.io/json?token=78805c34cfc3a0"
    );
    return response.data.country;
  } catch (error) {
    console.error("Error fetching location:", error);
    return null;
  }
};

export const getCurrencySymbol = (countryCode) => {
  const currencyMap = {
    US: "$", // United States Dollar
    FR: "€", // Euro
    CM: "FCFA", // Central African CFA franc
    DZD: "DZ",
    AOA: "AO",
    BJ: "XOF",
    BW: "BWP",
    BF: "XOF",
    BI: "BIF",
    CV: "CVE",
    CF: "XAF",
    TD: "XAF",
    KM: "KMF",
    CD: "CDF",
    CG: "XAF",
    DJ: "DJF",
    EG: "EGP",
    GQ: "XAF",
    ER: "ERN",
    SZ: "SZL",
    ET: "ETB",
    GA: "XAF",
    GM: "GMD",
    GH: "GHS",
    GN: "GNF",
    GW: "XOF",
    CI: "XOF",
    KE: "KES",
    LS: "LSL",
    LR: "LRD",
    LY: "LYD",
    MG: "MGA",
    MW: "MWK",
    ML: "XOF",
    MR: "MRU",
    MU: "MUR",
    MA: "MAD",
    MZ: "MZN",
    NA: "NAD",
    NE: "XOF",
    NG: "NGN",
    RW: "RWF",
    ST: "STN",
    SN: "XOF",
    SC: "SCR",
    SL: "SLL",
    SO: "SOS",
    ZA: "ZAR",
    SS: "SSP",
    SD: "SDG",
    TZ: "TZS",
    TG: "XOF",
    TN: "TND",
    UG: "UGX",
    ZM: "ZMW",
    ZW: "ZWL",
    CA: "CAD",
    MX: "MXN",
    BR: "BRL",
    AR: "ARS",
    GB: "GBP",
    DE: "EUR",
    FR: "EUR",
    IT: "EUR",
    RU: "RUB",
    CN: "CNY",
    JP: "JPY",
    IN: "INR",
    AU: "AUD",
    NZ: "NZD",
    SA: "SAR",
    KR: "KRW",
    TR: "TRY",
    ID: "IDR", // Add more countries and their currencies as needed
  };

  return currencyMap[countryCode] || "XAF"; // Default to dollar
};
