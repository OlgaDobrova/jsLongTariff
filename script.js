"use strict";
"use strict";
//Это Урок №7 обязательное задание

const appData = {
  title: "",
  screens: [], //массив объектов {id : 0, название : '', стоимость : '', кол-во : ''}
  screenPrice: 0,
  adaptive: true,
  services: {}, //доп.услуги {название:стоимость}
  price: 0,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  start: function () {
    appData.asking(); //диалог с пользователем
    appData.addPrices(); //рассчет стоимости услуг
    appData.getTitle(); //преобразование имени проекта

    appData.logger();
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  showTypeOff: function (variable) {
    return variable + " " + typeof variable;
  },
  asking: function () {
    appData.title = prompt("Как называется ваш проект?", "калЬкулятоР вЁрстки");

    while (
      appData.isNumber(appData.title) ||
      appData.title == null ||
      appData.title.trim() == ""
    ) {
      appData.title = prompt(
        "Как называется ваш проект?",
        "введите строку (убедитесь, что ввели не число)"
      );
    }

    for (let i = 0; i < 2; i++) {
      let name = prompt("Какие типы экранов нужно разработать?");
      let price = 0;
      while (appData.isNumber(name) || name == null || name.trim() == "") {
        name = prompt(
          "Какие типы экранов нужно разработать?",
          "введите строку (убедитесь, что ввели не число)"
        );
      }

      price = prompt("Сколько будет стоить данная работа?", "введите число");
      while (!appData.isNumber(price)) {
        price = prompt(
          "Сколько будет стоить данная работа?",
          "введите число (убедитесь, что нет пробелов, букв и спец.символов)"
        );
      }
      appData.screens.push({ id: i, name: name, price: parseFloat(price) });
    }

    for (let i = 0; i < 2; i++) {
      let name = prompt("Какой дополнительный тип услуги нужен?");
      let price = 0;
      while (appData.isNumber(name) || name == null || name.trim() == "") {
        name = prompt(
          "Какой дополнительный тип услуги нужен?",
          "введите строку (убедитесь, что ввели не число)"
        );
      }

      price = prompt("Сколько это будет стоить?", "введите число");
      while (!appData.isNumber(price)) {
        price = prompt(
          "Сколько это будет стоить?",
          "введите число (убедитесь, что нет пробелов, букв и спец.символов)"
        );
      }
      appData.services[name] = parseFloat(price);
    }
    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  addPrices: function () {
    for (let screen of appData.screens) {
      appData.screenPrice += parseFloat(screen.price);
    }
    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
    if (
      appData.isNumber(appData.screenPrice) &&
      appData.isNumber(appData.allServicePrices)
    ) {
      appData.fullPrice =
        parseFloat(appData.screenPrice) + parseFloat(appData.allServicePrices);
    }
    appData.servicePercentPrice =
      appData.fullPrice * (1 - appData.rollback / 100);
  },
  getTitle: function () {
    appData.title = appData.title.trim().toLowerCase();
    appData.title =
      appData.title.charAt(0).toUpperCase() + appData.title.slice(1);
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
    console.log(appData.title);
    console.log(appData.screens);
    console.log(appData.services);
    console.log(appData.fullPrice);
    // console.log(appData.getRollbackMessage(appData.fullPrice));
    // вывод итоговой суммы за вычетом процента отката
    console.log(appData.servicePercentPrice);
  },
};

appData.start();
