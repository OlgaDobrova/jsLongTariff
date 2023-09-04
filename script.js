"use strict";
//Это Урок №7 обязательное задание

const appData = {
  title: "",
  screens: "",
  screenPrice: 0,
  adaptive: true,
  name1: "",
  name2: "",
  price: 0,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  asking: function () {
    appData.title = prompt("Как называется ваш проект?", "Калькулятор вёрстки");
    appData.screens = prompt(
      "Какие типы экранов нужно разработать?",
      "Простые, Сложные, Интерактивные"
    );
    // console.log(appData.screens);
    appData.screenPrice = prompt(
      "Сколько будет стоить данная работа?",
      "введите число"
    );
    while (!appData.isNumber(appData.screenPrice)) {
      appData.screenPrice = prompt(
        "Сколько будет стоить данная работа?",
        "введите число (убедитесь, что нет пробелов, букв и спец.символов)"
      );
    }
    appData.screenPrice = parseFloat(appData.screenPrice);
    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  getAllServicePrices: function () {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        appData.name1 = prompt(
          "Какой дополнительный тип услуги нужен?",
          "Вставка кода метрики"
        );
      } else if (i === 1) {
        appData.name2 = prompt(
          "Какой дополнительный тип услуги нужен?",
          "Вставка слайдера"
        );
      }
      appData.price = prompt("Сколько это будет стоить?", "введите число");
      while (!appData.isNumber(appData.price)) {
        appData.price = prompt(
          "Сколько это будет стоить?",
          "введите число (убедитесь, что нет пробелов, букв и спец.символов)"
        );
      }
      sum += parseFloat(appData.price);
    }
    return sum;
  },
  getFullPrice: function (sum1, sum2) {
    let sum = 0;
    if (appData.isNumber(sum1) && appData.isNumber(sum2)) {
      sum = parseFloat(sum1) + parseFloat(sum2);
    }
    return sum;
  },
  getTitle: function (str) {
    str = str.trim().toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
  },
  getServicePercentPrices: function (sum, num) {
    return sum * (1 - num / 100);
  },
  getRollbackMessage: function (price) {
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
  },
  logger: function () {
    for (let key in appData) {
      console.log(key + ": " + appData[key]);
    }
  },
  start: function () {
    appData.asking();
    appData.allServicePrices = appData.getAllServicePrices(); // сумма всех дополнительных услуг - запрос значений в ф-ции
    appData.fullPrice = appData.getFullPrice(
      appData.screenPrice,
      appData.allServicePrices
    ); // сумма верстки и всех доп. услуг
    appData.servicePercentPrice = appData.getServicePercentPrices(
      appData.fullPrice,
      appData.rollback
    );
    appData.logger();
  },
};

appData.start();
