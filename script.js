"use strict";
//Это Урок №16 обязательное задание

class First {
  constructor() {} // это метод, в него складываем св-ва класса
  hello() {
    console.log("Привет, я метод родителя!");
  }
}

class Second extends First {
  //класс Second наследуеся от класса First
  hello() {
    super.hello(); //вызывает метод родительского класса
    console.log("А я - наследуемый метод!");
  }
}

const second = new Second(); // новый объект класса Second

second.hello(); // вызов метода объекта
