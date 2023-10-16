"use strict";

let user = {};
let xhrGet = new XMLHttpRequest();

xhrGet.open("GET", "db.json");
xhrGet.send();
xhrGet.onload = () => {
  let xhrSend = new XMLHttpRequest();

  user = xhrGet.response;
  xhrSend.open("POST", "https://jsonplaceholder.typicode.com/posts"); //конфигурация запроса
  xhrSend.setRequestHeader("Content-Type", "application/json");
  xhrSend.responseType = "json";
  xhrSend.send(user);
  xhrSend.onload = () => {
    console.log(`Статус - ${xhrSend.status}`);
    console.log(xhrSend.response);
  };
  xhrSend.onprogress = function (event) {
    // выведем прогресс
    console.log(`Загружено ${event.loaded} байт из ${event.total}`);
  };

  xhrSend.onerror = function () {
    console.log(error);
  };
};
