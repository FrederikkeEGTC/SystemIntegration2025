console.log(new Date()); //UTC - Standard: ISO 8601 (largest unit to smallest, supported in javascript, python, java)

console.log(Date()); //Local date

console.log(Date.now()); // Unix Epoch - time in sconds since 1. jan 1070

const date = new Date();
const danishDate = new Intl.DateTimeFormat("da-dk").format(date);
console.log(danishDate);

const americanDate = new Intl.DateTimeFormat("en-us").format(date);
console.log(americanDate);