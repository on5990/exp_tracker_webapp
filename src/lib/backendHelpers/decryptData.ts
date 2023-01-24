import CryptoJS from "crypto-js";
export function decryptData(encryptedData: string): any {
  const ivWordArray = CryptoJS.enc.Utf8.parse(
    process.env.NEXT_PUBLIC_IV as string
  );
  const decryptedData = CryptoJS.AES.decrypt(
    encryptedData,
    process.env.NEXT_PUBLIC_ENCRYPTION_KEY as string,
    { iv: ivWordArray }
  ).toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedData);
}
