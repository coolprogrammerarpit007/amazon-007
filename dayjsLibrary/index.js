`use strict`;

// Importing the external dayjs library
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
const today = dayjs();
console.log(today.format(`YYYY-MM-DD HH:mm:ss`));

const futureDate = today.add(5, `day`);
console.log(futureDate);
console.log(`<Day: ${today.$D}><Month ${today.$M + 1}>`);
