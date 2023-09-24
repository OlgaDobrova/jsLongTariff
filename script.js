"use strict";

const surname = document.getElementById("surname"); //Фамилия
const myname = document.getElementById("name"); //Имя
const patronymic = document.getElementById("patronymic"); //Отчество
const jobTitle = document.getElementById("job-title"); //должность
const inputCheckbox = document.querySelector('input[type="checkbox"]'); //образование
const institution = document.getElementById("institution"); //Учебное заведение
const speciality = document.getElementById("speciality"); //Специальность
const submit = document.getElementById("submit");

const tbody = document.querySelector("table tbody");
// const deleteBtn = document.querySelector(".delete-btn");

//Родительский класс - учитель
class Teacher {
  constructor(surname, myname, patronymic, institution, speciality) {
    this.surname = surname;
    this._myname = myname;
    this._patronymic = patronymic;
    this._institution = institution;
    this._speciality = speciality;
    this.deleted = false;
  }
}
//Математик
class Mathematician extends Teacher {
  constructor(surname, myname, patronymic, institution, speciality, deleted) {
    super(surname, myname, patronymic, institution, speciality, deleted);
    this.jobTitle = "mathematics";
    this.hoursPerWeek = 36;
  }
}
//Физик
class Physicist extends Teacher {
  constructor(surname, myname, patronymic, institution, speciality, deleted) {
    super(surname, myname, patronymic, institution, speciality, deleted);
    this.jobTitle = "physics";
    this.hoursPerWeek = 24;
  }
}
//Информатик
class Informatics extends Teacher {
  constructor(surname, myname, patronymic, institution, speciality, deleted) {
    super(surname, myname, patronymic, institution, speciality, deleted);
    this.jobTitle = "informatics";
    this.hoursPerWeek = 12;
  }
}

const appData = {
  jobTitle: "", //должность из select
  teacher: {}, //объект - учитель
  teacherArray: [], // массив объектов - все учителя
  init: function () {
    const startMetodBind = this.start.bind(this);

    if (localStorage.getItem("teacherArray") !== null) {
      this.teacherArray = JSON.parse(localStorage.getItem("teacherArray"));
      this.show();
    }
    submit.addEventListener("click", startMetodBind);
  },
  start: function (event) {
    event.preventDefault();
    this.jobTitle = jobTitle[jobTitle.selectedIndex].value;
    console.dir(surname);
    switch (this.jobTitle) {
      case "math": {
        this.teacher = new Mathematician(
          surname.value,
          myname.value,
          patronymic.value,
          institution.value,
          speciality.value
        );
        break;
      }
      case "phys": {
        this.teacher = new Physicist(
          surname.value,
          myname.value,
          patronymic.value,
          institution.value,
          speciality.value
        );
        break;
      }
      case "inf": {
        this.teacher = new Informatics(
          surname.value,
          myname.value,
          patronymic.value,
          institution.value,
          speciality.value
        );
        break;
      }
    }

    this.teacherArray.push(this.teacher);
    localStorage.setItem("teacherArray", JSON.stringify(this.teacherArray));

    surname.value = "";
    myname.value = "";
    patronymic.value = "";
    institution.value = "";
    speciality.value = "";
    console.log(this.teacherArray);

    this.show();
  },
  show: function () {
    tbody.innerHTML = "";
    this.teacherArray.forEach(function (item, index) {
      const tr = document.createElement("tr");

      tbody.append(tr);
      tr.innerHTML = `
        <td>${item.jobTitle}</td>
        <td>${item.hoursPerWeek}</td>
        <td>${item.surname}</td>
        <td>${item.myname}</td>
        <td>${item.patronymic}</td>
        <td></td>
        <td>${item.institution}</td>
        <td>${item.speciality}</td>
        <td class="delete"><div class="delete-btn">-</div></td>
        `;
    });
  },
};

appData.init();
