import dayjs from "dayjs";
import "dayjs/locale/ja.js";
dayjs.locale("ja");

const params = process.argv.slice(2);
let month = null;
let year = null;

for (let i = 0; i < params.length; i++) {
  const param = params[i];
  if (param === "-m" && i + 1 < params.length) {
    month = parseInt(params[i + 1], 10);
    i++;
  } else if (param === "-y" && i + 1 < params.length) {
    year = parseInt(params[i + 1], 10);
    i++;
  }
}

if (month === null) {
  const today = dayjs();
  month = today.month() + 1;
}
if (year === null) {
  const today = dayjs();
  year = today.year();
}

const first_day = dayjs()
  .year(year)
  .month(month - 1)
  .startOf("month");
const last_day = dayjs()
  .year(year)
  .month(month - 1)
  .endOf("month");

const currentMonth = first_day.format("M");
const currentYear = first_day.format("YYYY");

const consoleWidth = 20;

const spacesToAdd = Math.floor(
  (consoleWidth - `${currentMonth} 月 ${currentYear}`.length) / 2,
);
const centeredText =
  " ".repeat(spacesToAdd) + `${currentMonth} 月 ${currentYear}`;

console.log(centeredText);
console.log(`日 月 火 水 木 金 土`);

for (let i = 0; i < first_day.day(); i++) {
  process.stdout.write("   ");
}

let current_day = first_day;
while (current_day.isBefore(last_day) || current_day.isSame(last_day, "day")) {
  const dayOfMonth = current_day.format("D");
  const cell = dayOfMonth.padStart(2, " ");
  process.stdout.write(cell + " ");
  if (current_day.day() === 6) {
    console.log("");
  }
  current_day = current_day.add(1, "day");
}
