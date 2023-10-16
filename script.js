"use strict";

const getData = (file) => {
  return fetch(file).then((response) => response.json());
};

const sendData = ({ url, data = {}, method = "GET" }) => {
  return fetch(url, {
    method: method,
    body: data,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => response.json());
};

getData("db.json")
  .then((user) => {
    sendData({
      url: "https://jsonplaceholder.typicode.com/posts",
      data: JSON.stringify(user),
      method: "POST",
    }).then((user) => console.log(user));
  })
  .catch((error) => console.log(error));
