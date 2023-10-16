"use strict";

// const getData = (file) => {
//   return fetch(file).then((response) => response.json());
// };

// const sendData = ({ url, data = {}, method = "GET" }) => {
//   return fetch(url, {
//     method: method,
//     body: data,
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   }).then((response) => response.json());
// };

// getData("db.json")
//   .then((user) => {
//     sendData({
//       url: "https://jsonplaceholder.typicode.com/posts",
//       data: JSON.stringify(user),
//       method: "POST",
//     }).then((user) => console.log(user));
//   })
//   .catch((error) => console.log(error));

let user = {};

// let formData = new FormData();
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
