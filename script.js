"use strict";
//Это Урок №10 основное задание

const booksBlock = document.querySelector("aside");
const books = document.querySelectorAll(".book");
const chapters_0 = books[0].querySelectorAll("li");
const chapters_5 = books[5].querySelectorAll("li");
const newElem = document.createElement("li");

//Восстановить порядок книг.
booksBlock.prepend(books[1]); //перемещение в начало списка
booksBlock.append(books[2]); // перемещение в конец списка
books[3].before(books[4]); //эл-т 4 до эл-та 3
//Заменить картинку заднего фона на другую из папки image
document.querySelector("body").style.backgroundImage = "url(./image/adv.jpg)";
//Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
books[4].querySelector("h2 a").innerText = "Книга 3. this и Прототипы Объектов";
//Удалить рекламу со страницы
document.querySelector(".adv").remove();
//Восстановить порядок глав во второй и пятой книге (внимательно инспектируйте индексы элементов, поможет dev tools)
chapters_0[10].before(chapters_0[2]);
chapters_0[9].before(chapters_0[7]);
chapters_0[4].before(chapters_0[6], chapters_0[8]);
chapters_5[3].before(chapters_5[9]);
chapters_5[6].before(chapters_5[2]);
chapters_5[8].before(chapters_5[5]);
//в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
newElem.textContent = "Глава 8: За пределами ES6";
books[2].append(newElem);
books[2].querySelectorAll("li")[9].before(books[2].querySelectorAll("li")[10]);
