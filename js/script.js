"use strict";
//Это Урок №14 основное задание
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
    const startMethodBind = this.start.bind(this);
    const addScreenBlocks = this.addScreenBlocks;
    const showRollback = this.showRollback;
    const resetMethodBind = this.reset.bind(this);

    this.addTitle(); //добавление имени всему проекту

    startBtn.addEventListener("click", startMethodBind); //запуск метода start по клику на кнопку Рассчитать
    buttonPlus.addEventListener("click", addScreenBlocks); //добавление блока с типом экрана по клику на кнопку +
    inputRange.addEventListener("input", showRollback); //отображение на экране % отката посреднику в зависимости от положения "ползунка"
    resetBtn.addEventListener("click", resetMethodBind); //запуск метода reset по клику на кнопку Сброс
  },
  addTitle: () => {
    document.title = title.textContent;
  },
  reset: function () {
    let startDisabled = document.querySelectorAll(".start-disabled");
    let screens = document.querySelectorAll(".screen");
    let checkbox = document.querySelectorAll('input[type="checkbox"]');

    //удаляем все типы экранов, кроме первого. Первый обнуляем.
    screens.forEach((screen, key) => {
      if (key == 0) {
        let select = screen.querySelector("select");
        const input = screen.querySelector("input");
        select.selectedIndex = 0;
        input.value = "";
      } else {
        screen.remove();
      }
    });
    //обнуляем блок Дополнительно
    checkbox.forEach((check) => {
      check.checked = false;
    });
    //обнуляем блок Откат посреднику
    inputRange.value = 0;
    spanRange.textContent = "0%";
    //обнуляем блок вывода результатов
    total.value = 0;
    totalCount.value = 0;
    totalCountOther.value = 0;
    fullTotalCount.value = 0;
    totalCountRollback.value = 0;
    //разблокируем блок ввода данных
    startDisabled.forEach((item) => {
      item.disabled = false;
    });
    //скрываем кнопку Сброс
    resetBtn.style.display = "none";
    //показываем кнопку Рассчитать
    startBtn.style.display = "block";
  },
  start: function () {
    // console.log(this);
    this.addScreens(); //Заполнение св-ва screens объектами со страницы
    if (this.screens.length != 0) {
      let startDisabled = document.querySelectorAll(".start-disabled");
      //блокируем блок ввода данных
      startDisabled.forEach((item) => {
        item.disabled = true;
      });
      //скрываем кнопку Рассчитать
      startBtn.style.display = "none";
      //Показываем кнопку Сброс
      resetBtn.style.display = "block";

      this.addServices(); //Заполнение св-ва services (доп. услуги) объектами со страницы
      this.addRollback(); //Заполнение св-ва rollback (откат посреднику) данными из "ползунка"
      this.addPrices(); //Рассчет цен

      // console.log(appData);
      this.showResult(); //Вывод результатов на страницу
    } else {
      alert(
        "Ошибка!" +
          "\n" +
          "В блоке Расчет по типу экрана все поля должены быть заполнены!" +
          "\n" +
          "Количество экранов должно быть отлично от нуля!"
      );
    }
  },
  showResult: function () {
    // console.log(this);
    total.value = this.screenPrice;
    totalCount.value = this.screenCount;
    totalCountOther.value =
      this.servicePricesPercent + this.servicePricesNumber;
    fullTotalCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
  },
  showRollback: () => {
    spanRange.textContent = inputRange.value + "%";
  },
  addScreenBlocks: () => {
    let screens = document.querySelectorAll(".screen");
    const cloneScreen = screens[0].cloneNode(true);

    screens[screens.length - 1].after(cloneScreen);
  },
  addScreens: function () {
    // console.log(this);
    let screensAuxiliary = [];
    let screens = document.querySelectorAll(".screen");

    screens.forEach(function (screen, index) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      if (+select.value != 0 && +input.value != 0) {
        screensAuxiliary.push({
          id: index,
          name: selectName,
          price: +select.value * +input.value,
          count: input.value,
          isError: false,
        });
      } else {
        screensAuxiliary.push({
          id: index,
          name: selectName,
          price: +select.value * +input.value,
          count: input.value,
          isError: true,
        });
      }
    });
    this.screens = screensAuxiliary;
    for (let screen of this.screens) {
      if (screen.isError == true) {
        this.screens = [];
      }
    }
  },
  addServices: function () {
    // console.log(this);
    let servicesPercentAuxiliary = {};
    let servicesNumberAuxiliary = {};

    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector('input[type="checkbox"]');
      const label = item.querySelector("label");
      const input = item.querySelector('input[type="text"]');
      if (check.checked) {
        servicesPercentAuxiliary[label.textContent] = +input.value;
      }
    });
    this.servicesPercent = servicesPercentAuxiliary;

    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector('input[type="checkbox"]');
      const label = item.querySelector("label");
      const input = item.querySelector('input[type="text"]');

      if (check.checked) {
        servicesNumberAuxiliary[label.textContent] = +input.value;
      }
    });
    this.servicesNumber = servicesNumberAuxiliary;
  },
  addRollback: function () {
    this.rollback = +inputRange.value;
  },
  addPrices: function () {
    // console.log(this);
    this.screenCount = 0;
    this.screenPrice = 0;
    this.servicePricesNumber = 0;
    this.servicePricesPercent = 0;

    for (let screen of this.screens) {
      // console.log(this);
      if (screen.isError == false) {
        this.screenPrice += +screen.price;
        this.screenCount += +screen.count;
      }
    }

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (let key in this.servicesPercent) {
      this.servicePricesPercent +=
        this.screenPrice * (this.servicesPercent[key] / 100);
    }

    this.fullPrice =
      this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;

    this.servicePercentPrice = this.fullPrice * (1 - this.rollback / 100);
  },
};

appData.init();
