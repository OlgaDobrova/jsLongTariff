"use strict";
//Это Урок №3 обязательное задание

const title = prompt("Как называется ваш проект?", "введите название");
const screens = prompt(
  "Какие типы экранов нужно разработать?",
  "Простые, Сложные, Интерактивные"
);
let screenPrice = prompt(
  "Сколько будет стоить данная работа?",
  "введите число"
);
screenPrice = parseInt(screenPrice) ? parseInt(screenPrice) : 0;
let adaptive = confirm("Нужен ли адаптив на сайте?");
let name1 = prompt("Какой дополнительный тип услуги нужен?");
let price1 = prompt("Сколько это будет стоить?");
price1 = parseInt(price1) ? parseInt(price1) : 0;
let name2 = prompt("Какой дополнительный тип услуги нужен?");
let price2 = prompt("Сколько это будет стоить?");
price2 = parseInt(price2) ? parseInt(price2) : 0;
let fullPrice = screenPrice + price1 + price2;
const rollback = Math.floor(Math.random() * 100 + 1); //откат посреднику
console.log("случайный откат = " + rollback);
let servicePercentPrice = fullPrice - rollback;
console.log("итоговая стоимость " + servicePercentPrice);
switch (true) {
  case fullPrice >= 30000:
    console.log("скидка 10%");
    break;
  case fullPrice < 30000 && fullPrice >= 1500:
    console.log("скидка 5%");
    break;
  case fullPrice < 1500 && fullPrice >= 0:
    console.log("скидка не предусмотрена");
    break;
  default:
    console.log("Что то пошло не так");
}
