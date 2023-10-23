"use strict";

let select = document.querySelector("select");
let res = document.querySelector(".res");

const appData = {
  arrayCars: [],
  car: {},
  init: function () {
    const getCarMethodBind = this.getCar.bind(this);

    if (localStorage.getItem("car") !== null) {
      this.car = JSON.parse(localStorage.getItem("car"));
      this.render();
    }

    this.getArray("cars.json", "cars");
    select.addEventListener("change", getCarMethodBind);
  },
  getArray: function (fileJson, fileKey) {
    fetch(fileJson)
      .then((response) => response.json())
      .then((objCars) => objCars[fileKey])
      .then((arrCars) => {
        this.arrayCars = arrCars;
        this.fillingList();
      })
      .catch((error) => console.log(error));
  },
  fillingList: function () {
    this.arrayCars.forEach((item) => {
      let el = document.createElement("option");

      el.textContent = item.brand;
      select.append(el);
    });
  },
  getCar: function (e) {
    if (e.target.selectedIndex == 0 || this.arrayCars.length == 0) {
      this.car = {};
      this.render();
      return;
    }
    this.arrayCars.forEach((item) => {
      if (item.brand == e.target[e.target.selectedIndex].textContent) {
        this.car = item;
        localStorage.setItem("car", JSON.stringify(this.car));
        this.render();
      }
    });
  },
  render: function () {
    if (Object.keys(this.car).length == 0) {
      res.textContent = "Выберите тачку";
    } else {
      res.innerHTML = `
        <div>
          <div>Тачка ${this.car.brand} ${this.car.model}</div>
          <div>Цена: ${this.car.price}$</div>
        </div>
      `;
    }
  },
};

appData.init();
