import dayjs from "dayjs";
import "dayjs/locale/ja.js";
import minimist from "minimist";
dayjs.locale("ja");

const args = minimist(process.argv.slice(2));
let month = args.m ? args.m : null;
let year = args.y ? args.y : null;

const today = dayjs();
month = month || today.month() + 1;
year = year || today.year();

const firstDay = dayjs()
  .year(year)
  .month(month - 1)
  .startOf("month");
const lastDay = dayjs()
  .year(year)
  .month(month - 1)
  .endOf("month");

const currentMonth = firstDay.format("M");
const currentYear = firstDay.format("YYYY");

const consoleWidth = 20;

const spacesToAdd = Math.floor(
  (consoleWidth - (currentMonth + "月 " + currentYear).length) / 2,
);
const centeredText =
  " ".repeat(spacesToAdd) + currentMonth + "月 " + currentYear;

console.log(centeredText);
console.log("日 月 火 水 木 金 土");

for (let i = 0; i < firstDay.day(); i++) {
  process.stdout.write("   ");
}

for (
  let currentDay = firstDay;
  currentDay.isBefore(lastDay) || currentDay.isSame(lastDay, "day");
  currentDay = currentDay.add(1, "day")
) {
  const dayOfMonth = currentDay.format("D");
  const cell = dayOfMonth.padStart(2, " ");
  process.stdout.write(cell + " ");
  (currentDay.day() === 6 || currentDay.isSame(lastDay, "day")) &&
    console.log();
}
