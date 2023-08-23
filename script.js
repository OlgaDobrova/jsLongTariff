"use strict";
//Это Урок №4 обязательное задание

const title = prompt("Как называется ваш проект?", "введите название");
const screens = prompt(
  "Какие типы экранов нужно разработать?",
  "Простые, Сложные, Интерактивные"
);
let screenPrice = prompt(
  "Сколько будет стоить данная работа?",
  "введите число"
);
const adaptive = confirm("Нужен ли адаптив на сайте?");
const name1 = prompt("Какой дополнительный тип услуги нужен?");
let price1 = prompt("Сколько это будет стоить?");
const name2 = prompt("Какой дополнительный тип услуги нужен?");
let price2 = prompt("Сколько это будет стоить?");
const rollback = 10; //откат посреднику
let allServicePrices, fullPrice, servicePercentPrice;

const sumTransform = function (sum) {
  return parseInt(sum) ? parseInt(sum) : 0;
};

const getAllServicePrices = function (sum1, sum2) {
  return sumTransform(sum1) + sumTransform(sum2);
};

const getFullPrice = function (sum1, sum2) {
  return getAllServicePrices(sum1, sum2);
};

const getTitle = function (str) {
  str = str.trim().toLowerCase();
  str = str.charAt(0).toUpperCase() + str.slice(1);
  return str;
};

const getServicePercentPrices = function (sum, num) {
  return sum * (1 - num / 100);
};

const showTypeOff = function (variable) {
  return variable + " " + typeof variable;
};

const getRollbackMessage = function (price) {
  switch (true) {
    case price >= 30000:
      return "скидка 10%";
    case price < 30000 && price >= 1500:
      return "скидка 5%";
    case price < 1500 && price >= 0:
      return "скидка не предусмотрена";
    default:
      return "Что-то пошло не так";
  }
};

// сумма всех дополнительных услуг
allServicePrices = getAllServicePrices(price1, price2);
// сумма верстки и всех доп. услуг
fullPrice = getFullPrice(screenPrice, allServicePrices);
// итоговая сумма за вычетом процента отката
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

// Типы вводимых данных
console.log(showTypeOff(getTitle(title)));
console.log(showTypeOff(sumTransform(screenPrice)));
console.log(showTypeOff(adaptive));
// вывод строки с типами экранов для разработки screens
console.log(screens.toLowerCase().split(", "));
// сообщение о скидке пользователю
console.log(getRollbackMessage(fullPrice));
// вывод итоговой суммы за вычетом процента отката
console.log(servicePercentPrice);
