"use strict";

const surname = document.getElementById("surname");
const myname = document.getElementById("name");
const patronymic = document.getElementById("patronymic"); //Отчество
const jobTitle = document.getElementById("job-title"); //должность
const inputCheckbox = document.querySelector('input[type="checkbox"]');
const institution = document.getElementById("institution"); //Учебное заведение
const speciality = document.getElementById("speciality"); //Специальность
const submit = document.getElementById("submit");

const tbody = document.querySelector("table tbody");
const deleteBtn = document.querySelector(".delete-btn");

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
  jobTitle: "",
  hoursPerWeek: 0,
  surname: "",
  myname: "",
  patronymic: "",
  institution: "",
  speciality: "",
  teacher: {},
  teacherArray: [],
  init: function () {
    const startMetodBind = this.start.bind(this);

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

    surname.value = "";
    myname.value = "";
    patronymic.value = "";
    institution.value = "";
    speciality.value = "";
    console.log(this.teacherArray);

    this.show();
  },
  show: function () {
    const tr = document.createElement("tr");
    console.log(tr);
    tbody.append(tr);
    tr.innerHTML = `
      <td>${this.teacher.jobTitle}</td>
      <td>${this.teacher.hoursPerWeek}</td>
      <td>${this.teacher.surname}</td>
      <td>${this.teacher.myname}</td>
      <td>${this.teacher.patronymic}</td>
      <td></td>
      <td>${this.teacher.institution}</td>
      <td>${this.teacher.speciality}</td>
      <td class="delete"><div class="delete-btn">-</div></td>
      `;
  },
};

appData.init();
