const CryptoJS = require('crypto-js');

exports.urlSafeEncrypt = plainText => {
  const b64 = CryptoJS.AES.encrypt(JSON.stringify(plainText), process.env.PROJECT_JWT_SECRET).toString();
  const e64 = CryptoJS.enc.Base64.parse(b64);
  return e64.toString(CryptoJS.enc.Hex);
};

exports.urlSafeDecrypt = cipherText => {
  const reb64 = CryptoJS.enc.Hex.parse(cipherText);
  const bytes = reb64.toString(CryptoJS.enc.Base64);
  const decrypt = CryptoJS.AES.decrypt(bytes, process.env.PROJECT_JWT_SECRET);
  return JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));
};
