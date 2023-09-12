"use strict";
//Это Урок №12 основное задание
const title = document.getElementsByTagName("h1")[0];
const buttonPlus = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");

const inputRange = document.querySelector(".rollback input[type='range']");
const spanRange = document.querySelector(".rollback .range-value");

const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];

const total = document.getElementsByClassName("total-input")[0]; //Стоимость верстки
const totalCount = document.getElementsByClassName("total-input")[1]; //Количество экранов
const totalCountOther = document.getElementsByClassName("total-input")[2]; //Стоимость доп. услуг
const fullTotalCount = document.getElementsByClassName("total-input")[3]; //Итоговая стоимость
const totalCountRollback = document.getElementsByClassName("total-input")[4]; //Стоимость с учетом отката

let screens = document.querySelectorAll(".screen");

const appData = {
  screens: [], //массив объектов {id : 0, название : '', стоимость : '', кол-во : ''}
  screenPrice: 0,
  screenCount: 0,
  adaptive: true,
  price: 0,
  rollback: 0,
  servicePricesPercent: 0, //расчет доп.услуги - % от стоимости
  servicePricesNumber: 0, //расчет доп.услуги - фикс. сумма
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {}, //доп.услуги - % от стоимости - объект {название:стоимость}
  servicesNumber: {}, //доп.услуги - фикс. сумма - объект {название:стоимость}
  init: function () {
    appData.addTitle(); //добавление имени всему проекту

    startBtn.addEventListener("click", appData.start); //запуск метода start по клику на кнопку Рассчитать
    buttonPlus.addEventListener("click", appData.addScreenBlocks); //добавление блока с типом экрана по клику на кнопку +
    inputRange.addEventListener("input", appData.showRollback); //отображение на экране % отката посреднику в зависимости от положения "ползунка"
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  start: function () {
    appData.addScreens(); //Заполнение св-ва screens объектами со страницы
    if (appData.screens.length != 0) {
      appData.addServices(); //Заполнение св-ва services (доп. услуги) объектами со страницы
      appData.addRollback(); //Заполнение св-ва rollback (откат посреднику) данными из "ползунка"
      appData.addPrices(); //Рассчет цен

      // console.log(appData);
      appData.showResult(); //Вывод результатов на страницу
    } else {
      alert(
        "Обязательно должен быть выбран хотя бы один тип экрана в выпадающем списке и введено количество таких экранов, отличное от нуля!"
      );
    }
  },
  showResult: function () {
    total.value = appData.screenPrice;
    totalCount.value = appData.screenCount;
    totalCountOther.value =
      appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
    totalCountRollback.value = appData.servicePercentPrice;
  },
  showRollback: function () {
    spanRange.textContent = inputRange.value + "%";
  },
  addScreenBlocks: function () {
    let screens = document.querySelectorAll(".screen");
    const cloneScreen = screens[0].cloneNode(true);

    screens[screens.length - 1].after(cloneScreen);
  },
  addScreens: function () {
    let screens = document.querySelectorAll(".screen");
    appData.screens = [];

    screens.forEach(function (screen, index) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      if (+select.value != 0 && +input.value != 0) {
        appData.screens.push({
          id: index,
          name: selectName,
          price: +select.value * +input.value,
          count: input.value,
        });
      }
    });
  },
  addServices: function () {
    appData.servicesPercent = {};
    appData.servicesNumber = {};

    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector('input[type="checkbox"]');
      const label = item.querySelector("label");
      const input = item.querySelector('input[type="text"]');

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });
    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector('input[type="checkbox"]');
      const label = item.querySelector("label");
      const input = item.querySelector('input[type="text"]');

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  addRollback: function () {
    appData.rollback = +inputRange.value;
  },
  addPrices: function () {
    appData.screenCount = 0;
    appData.screenPrice = 0;
    appData.servicePricesNumber = 0;
    appData.servicePricesPercent = 0;

    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
      appData.screenCount += +screen.count;
    }

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent +=
        appData.screenPrice * (appData.servicesPercent[key] / 100);
    }

    appData.fullPrice =
      appData.screenPrice +
      appData.servicePricesPercent +
      appData.servicePricesNumber;

    appData.servicePercentPrice =
      appData.fullPrice * (1 - appData.rollback / 100);
  },
};

appData.init();
