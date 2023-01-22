import CryptoJS from "crypto-js";

// Secured Data
export const SECURED = (data) =>
  CryptoJS.AES.encrypt(
    Array.isArray(data) || typeof data === "object"
      ? JSON.stringify(data)
      : data,
    "secret key 123"
  ).toString();

// UnSecured Data
export const UNSECURED = (code) => {
  let bytes = CryptoJS.AES.decrypt(code, "secret key 123");

  try {
    var originalText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return originalText;
  } catch {
    var originalText2 = bytes.toString(CryptoJS.enc.Utf8);
    return originalText2;
  }
};
// reload functionallty

//

export const Reload = () => window.location.reload();

// json to String
export const Stringify = (json) => JSON.stringify(json);

// string to json
export const Json = (string) => JSON.parse(string);

//check network connection
export const IsOnline = navigator.onLine;
