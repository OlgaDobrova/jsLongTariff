const title = "Это Урок №2 обязательное задание";
const screens = "Простые, Сложные, Интерактивные";
const screenPrice = 100;
const rollback = Math.floor(Math.random() * 100 + 1);
let fullPrice = 320000;
let adaptive = true;
let n;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log(
  "Стоимость верстки экранов " + screenPrice + " рублей/ долларов/гривен/юани"
);
console.log(
  "Стоимость разработки сайта " + fullPrice + " рублей/ долларов/гривен/юани"
);
console.log(screens.toLowerCase().split(", "));
console.log("rollback = " + rollback);
n = rollback / 100;
n *= fullPrice;
console.log(n);
