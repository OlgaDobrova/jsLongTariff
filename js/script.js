//описание ф-ции filterByType, входные аргументы: type - , ...values - массив из всех переданных аргументов после type
//здесь values - это массив, в котором несколько отдельных элементов
//в ф-ции идет перебор массива values, если тип элемента массива равен type, то элемент массива будет включен в новый массив filterByType
const filterByType = (type, ...values) =>
  values.filter((value) => typeof value === type);
//const - описание ф-ции hideAllResponseBlocks без входных аргументов
(hideAllResponseBlocks = () => {
  //responseBlocksArray - это созданный массив из коллекции NodeList всех элементов div со страницы с классом dialog__response-block (чтобы можно было что? У массива больше методов)
  const responseBlocksArray = Array.from(
    document.querySelectorAll("div.dialog__response-block")
  );
  //все элементы массива responseBlocksArray скрыли (поставили св-во display = "none")
  responseBlocksArray.forEach((block) => (block.style.display = "none"));
}),
  //const - описание ф-ции showResponseBlock с 3мя входными аргументами
  (showResponseBlock = (blockSelector, msgText, spanSelector) => {
    //вызов ф-ции hideAllResponseBlocks - скрыли на странице все эл-ты с классом dialog__response-block
    hideAllResponseBlocks();
    //на странице эл-ту с селектором blockSelector (1ый аргумент) поставили св-во display = "block" - показали его
    document.querySelector(blockSelector).style.display = "block";
    //если spanSelector существует (3ий аргумент)
    if (spanSelector) {
      //то на странице эл-ту с селектором spanSelector (3ий аргумент) текст заменить на msgText (2ой аргумент)
      document.querySelector(spanSelector).textContent = msgText;
    }
  }),
  //const - описание ф-ции showError с 1м входным аргументом
  //внутри вызов ф-ции showResponseBlock - показали эл-т с классом dialog__response-block_error,
  //эл-ту с id="error" вывели текст msgText (1ый аргумент)
  (showError = (msgText) =>
    showResponseBlock(".dialog__response-block_error", msgText, "#error")),
  //const - описание ф-ции showResults с 1м входным аргументом
  //внутри вызов ф-ции showResponseBlock - показали эл-т с классом dialog__response-block_ok,
  //эл-ту с id="ok" вывели текст msgText (1ый аргумент)
  (showResults = (msgText) =>
    showResponseBlock(".dialog__response-block_ok", msgText, "#ok")),
  //const - описание ф-ции showNoResults без входных аргументов
  //внутри вызов ф-ции showResponseBlock - показали эл-т с классом dialog__response-block_no-results
  (showNoResults = () =>
    showResponseBlock(".dialog__response-block_no-results")),
  //const - описание ф-ции tryFilterByType с 2мя входными аргументам: тип - это строка, строка для фильтрации - это строка
  (tryFilterByType = (type, values) => {
    //try - выполняется последовательно (при встрече с ошибкой прерывается, переходит к catch)
    try {
      //Функция eval() оценивает код JavaScript, представленный в виде строки, и возвращает значение завершения
      //Массив отфильтрованных значений из ф-ции filterByType возвращен в виде строки с разделителем ', '

      //Здесь используется строка - `filterByType('${type}', ${values})` . В результате - строка - filterByType('number', 45,'rr',true,5)
      // Т.е. ${values} - это не одна строка, а разные эл-ты, разделенные запятыми
      //если использовать `filterByType('${type}', '${values}')` , т.е ${values} обернуть в кавычки, то в результате - строка - filterByType('number', '45,"rr",true,5')

      const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");

      //тернарный оператор - если строка имеет длину, то выводится сообщение с данными, иначе - сообщение об их отсутствии
      const alertMsg = valuesArray.length
        ? `Данные с типом ${type}: ${valuesArray}`
        : `Отсутствуют данные типа ${type}`;
      //вызов ф-ции showResults с 1м аргументом - сообщением
      showResults(alertMsg);
    } catch (e) {
      //catch - обработка ошибки - вызов ф-ции showError с 1м аргументом - сообщением с ошибкой
      showError(`Ошибка: ${e}`);
    }
  });

//filterButton - элемент со страницы с id="filter-btn" - кнопка Фильтровать
const filterButton = document.querySelector("#filter-btn");

//Слушаем событие - клик по кнопке Фильтровать
filterButton.addEventListener("click", (e) => {
  //typeInput - элемент со страницы с id="type" - select с типами данных
  const typeInput = document.querySelector("#type");
  //dataInput - элемент со страницы с id="data" - input с вводимой строкой
  const dataInput = document.querySelector("#data");

  //если в input ничего не введено
  if (dataInput.value === "") {
    //то у поля появляется сообщение (снизу - прикольно...)
    //Метод setCustomValidity() устанавливает для элемента пользовательское сообщение о достоверности
    dataInput.setCustomValidity("Поле не должно быть пустым!");
    //вызов ф-ции showNoResults без аргументов
    showNoResults();
  } else {
    //Иначе
    // очистка пользовательского сообщения
    dataInput.setCustomValidity("");
    //отменяется стандартное поведение - клик по кнопке в форме - отмена попытки отправки формы и перезагрузки страницы
    e.preventDefault();
    //вызов ф-ции tryFilterByType с аргументами: тип - значение выбранного типа данных, строка - значение из input
    tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
  }
});
