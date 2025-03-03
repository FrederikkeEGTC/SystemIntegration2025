let uri = "my test string";
let encoded = encodeURI(uri);
let decoded = decodeURI(encoded);

console.log("URI decode: ", decoded);

const originalString = "Hello!";
const encodedString = btoa(originalString);
console.log("Encoded:", encodedString);

const decodedString = atob(encodedString);
console.log("Decoded:", decodedString);