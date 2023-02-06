import CryptoJS from "crypto-js";
// json data --> encrypted string
export function encryptData(data: Object): string {
  // console.log("NEXT PUBLIC IV", process.env.NEXT_PUBLIC_IV);
  // console.log(
  //   "NEXT PUBLIC ENCRYPTION KEY",
  //   process.env.NEXT_PUBLIC_ENCRYPTION_KEY
  // );
  const stringData = JSON.stringify(data);
  // console.log("STRING DATA", stringData);
  const ivWordArray = CryptoJS.enc.Utf8.parse(
    process.env.NEXT_PUBLIC_IV as string
  );
  // console.log("ARRAY", ivWordArray);
  const encryptedData = CryptoJS.AES.encrypt(
    stringData,
    process.env.NEXT_PUBLIC_ENCRYPTION_KEY as string,
    { iv: ivWordArray }
  );
  // console.log("ENCRYPTED DATA", encryptData);
  return encryptedData.toString();
}
export default encryptData;
