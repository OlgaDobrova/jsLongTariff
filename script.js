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
const arrayDeleteBtn = document.querySelectorAll(".delete-btn");

//Родительский класс - учитель
class Teacher {
  constructor(
    surname,
    myname,
    patronymic,
    higherEducation,
    institution,
    speciality
  ) {
    this._surname = surname;
    this._myname = myname;
    this._patronymic = patronymic;
    this._higherEducation = higherEducation;
    this._institution = institution;
    this._speciality = speciality;
    this.deleted = false;
  }
  get surname() {
    return this._surname;
  }
}
//Математик
class Mathematician extends Teacher {
  constructor(
    surname,
    myname,
    patronymic,
    higherEducation,
    institution,
    speciality,
    deleted
  ) {
    super(
      surname,
      myname,
      patronymic,
      higherEducation,
      institution,
      speciality,
      deleted
    );
    this.jobTitle = "Математика";
    this.hoursPerWeek = 36;
  }
  get surname() {
    return this._surname;
  }
  get myname() {
    return this._myname;
  }
  get patronymic() {
    return this._patronymic;
  }
  get higherEducation() {
    return this._higherEducation;
  }
  get institution() {
    return this._institution;
  }
  get speciality() {
    return this._speciality;
  }
}
//Физик
class Physicist extends Teacher {
  constructor(
    surname,
    myname,
    patronymic,
    higherEducation,
    institution,
    speciality,
    deleted
  ) {
    super(
      surname,
      myname,
      patronymic,
      higherEducation,
      institution,
      speciality,
      deleted
    );
    this.jobTitle = "Физика";
    this.hoursPerWeek = 24;
  }
  get surname() {
    return this._surname;
  }
  get myname() {
    return this._myname;
  }
  get patronymic() {
    return this._patronymic;
  }
  get higherEducation() {
    return this._higherEducation;
  }
  get institution() {
    return this._institution;
  }
  get speciality() {
    return this._speciality;
  }
}
//Информатик
class Informatics extends Teacher {
  constructor(
    surname,
    myname,
    patronymic,
    higherEducation,
    institution,
    speciality,
    deleted
  ) {
    super(
      surname,
      myname,
      patronymic,
      higherEducation,
      institution,
      speciality,
      deleted
    );
    this.jobTitle = "Информатика";
    this.hoursPerWeek = 12;
  }
  get surname() {
    return this._surname;
  }
  get myname() {
    return this._myname;
  }
  get patronymic() {
    return this._patronymic;
  }
  get higherEducation() {
    return this._higherEducation;
  }
  get institution() {
    return this._institution;
  }
  get speciality() {
    return this._speciality;
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
      console.log(this.teacherArray);
      this.show();
    }
    submit.addEventListener("click", startMetodBind);
  },

  start: function (event) {
    event.preventDefault();

    this.jobTitle = jobTitle[jobTitle.selectedIndex].value;
    switch (this.jobTitle) {
      case "math": {
        this.teacher = new Mathematician(
          surname.value,
          myname.value,
          patronymic.value,
          inputCheckbox.checked,
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
          inputCheckbox.checked,
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
          inputCheckbox.checked,
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
    inputCheckbox.checked = false;
    institution.value = "";
    speciality.value = "";
    console.log(this.teacherArray);

    this.show();
  },
  show: function () {
    console.log(this.teacherArray);
    tbody.innerHTML = "";
    this.teacherArray.forEach(function (item, index) {
      const tr = document.createElement("tr");
      console.log(item.surname);
      tbody.append(tr);
      tr.innerHTML = `
        <td>${item.jobTitle}</td>
        <td>${item.hoursPerWeek}</td>
        <td>${item.surname}</td>
        <td>${item.myname}</td>
        <td>${item.patronymic}</td>
        <td>${item.higherEducation ? "да" : "нет"}</td>
        <td>${item.institution}</td>
        <td>${item.speciality}</td>
        <td class="delete"><div class="delete-btn">-</div></td>
        `;
    });
  },
};

appData.init();
