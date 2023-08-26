"use strict";
//Это Урок №5 обязательное задание

let title, screens, screenPrice, adaptive;
let name1, name2, price;
const rollback = 10; //откат посреднику
let allServicePrices, fullPrice, servicePercentPrice;

// проверка: это число? -> true/false
const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
  title = prompt("Как называется ваш проект?", "Калькулятор вёрстки");
  screens = prompt(
    "Какие типы экранов нужно разработать?",
    "Простые, Сложные, Интерактивные"
  );
  screenPrice = prompt("Сколько будет стоить данная работа?", "введите число");
  while (!isNumber(screenPrice)) {
    screenPrice = prompt(
      "Сколько будет стоить данная работа?",
      "введите число (убедитесь, что нет пробелов, букв и спец.символов)"
    );
  }
  screenPrice = parseFloat(screenPrice);
  adaptive = confirm("Нужен ли адаптив на сайте?");
};

const getAllServicePrices = function () {
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      name1 = prompt(
        "Какой дополнительный тип услуги нужен?",
        "Вставка кода метрики"
      );
    } else if (i === 1) {
      name2 = prompt(
        "Какой дополнительный тип услуги нужен?",
        "Вставка слайдера"
      );
    }
    price = prompt("Сколько это будет стоить?", "введите число");
    while (!isNumber(price)) {
      price = prompt(
        "Сколько это будет стоить?",
        "введите число (убедитесь, что нет пробелов, букв и спец.символов)"
      );
    }
    sum += parseFloat(price);
  }
  return sum;
};

const getFullPrice = function (sum1, sum2) {
  let sum = 0;
  if (isNumber(sum1) && isNumber(sum2)) {
    sum = parseFloat(sum1) + parseFloat(sum2);
  }
  return sum;
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

asking();
allServicePrices = getAllServicePrices(); // сумма всех дополнительных услуг - запрос значений в ф-ции
fullPrice = getFullPrice(screenPrice, allServicePrices); // сумма верстки и всех доп. услуг
servicePercentPrice = getServicePercentPrices(fullPrice, rollback); // итоговая сумма за вычетом процента отката

// Типы вводимых данных
console.log(showTypeOff(getTitle(title)));
console.log(showTypeOff(screenPrice));
console.log(showTypeOff(adaptive));
// вывод строки с типами экранов для разработки screens
console.log(screens.toLowerCase().split(", "));
// сообщение о скидке пользователю
console.log(getRollbackMessage(fullPrice));
// вывод итоговой суммы за вычетом процента отката
console.log(servicePercentPrice);
