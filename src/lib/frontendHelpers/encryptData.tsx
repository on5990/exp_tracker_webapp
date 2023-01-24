import CryptoJS from "crypto-js";
// json data --> encrypted string
export function encryptData(data: Object): string {
  const stringData = JSON.stringify(data);
  const ivWordArray = CryptoJS.enc.Utf8.parse(
    process.env.NEXT_PUBLIC_IV as string
  );
  const encryptedData = CryptoJS.AES.encrypt(
    stringData,
    process.env.NEXT_PUBLIC_ENCRYPTION_KEY as string,
    { iv: ivWordArray }
  );
  return encryptedData.toString();
}
export default encryptData;
