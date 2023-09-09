"use strict";
//Это Урок №11 основное задание

const button = document.getElementById("btn");
const square = document.getElementById("square");
const circle = document.getElementById("circle");
const eButton = document.getElementById("e_btn");
const inputRange = document.getElementById("range");
const spanRange = document.getElementById("range-span");

const logger = function (e) {
  spanRange.textContent = e.target.value;
  circle.style.width = e.target.value + "%";
  circle.style.height = e.target.value + "%";
};

const color = function (e) {
  const input = document.getElementById("text");
  square.style.backgroundColor = input.value;
  console.log(input.value);
};

//По нажатию на кнопку брать цвет из input и красить в него квадрат
button.addEventListener("click", color);

//В кружке (который внутри квадрата) кнопке дать свойство style="display: none; "
eButton.style.display = "none";

//Повесить на input[type=range] обработчик события input и реализовать такой функционал:
//при каждом изменении положения ползунка значение input[type=range] необходимо заносить
// в свойства ширины и высоты кружка (который внутри квадрата) (height и width) (в процентах!!)
inputRange.addEventListener("input", logger);
