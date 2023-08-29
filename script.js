"use strict";
// Урок 06 - обязательное задание
// Игровой бот - загадывание случайного числа от 1 до 100

//случайное число от 1 до 100
const rollback = Math.floor(Math.random() * 100 + 1);

// проверка: это число? -> true/false
const isNumber = function (num) {
  return isFinite(num);
};
// !isNaN(parseFloat(num)) &&
const showTypeOff = function (variable) {
  return variable + " " + typeof variable;
};

//Сравнение чисел
const comparison = function (x, y) {
  return str;
};

const randomNumberGame = function (e) {
  let number = prompt("Угадайте число от 1 до 100", "введите число");

  const searchingDecisions = function (num) {
    if (!isNaN(parseFloat(num))) {
      let newNum;
      while (!isNumber(num)) {
        num = prompt(
          "Введите число от 1 до 100",
          "введите число (убедитесь, что нет пробелов, букв и спец.символов)"
        );
      }
      num = parseFloat(num);

      switch (true) {
        case num < e:
          newNum = prompt("Загаданное число больше");
          searchingDecisions(newNum);
          break;
        case num > e:
          newNum = prompt("Загаданное число меньше");
          searchingDecisions(newNum);
          break;
        case num == e:
          alert(
            "Поздравляю, Вы угадали!!!" +
              "\n" +
              " Было загадано число " +
              String(e)
          );
          break;
      }
    } else {
      alert("Игра окончена" + "\n" + "Было загадано число " + e);
    }
  };

  searchingDecisions(number);
};

randomNumberGame(rollback);
