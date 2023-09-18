"use script";
//Это Урок №15 основное задание

const DomElement = function (selector, width, height, bg, fontSize) {
  this.selector = selector.trim();
  this.width = +width;
  this.height = +height;
  this.bg = bg.trim();
  this.fontSize = +fontSize;
  this.myCreateElement = function (e, text) {
    const body = document.querySelector("body");
    const newElem = document.createElement(e);

    body.append(newElem);
    newElem.style.width = this.width + "px";
    newElem.style.height = this.height + "px";
    newElem.style.backgroundColor = this.bg;
    newElem.style.marginBottom = "30px";
    newElem.style.display = "flex";
    newElem.style.alignItems = "center";
    newElem.style.justifyContent = "center";
    newElem.innerHTML = "<span style='color: #ffffff; '></span>";
    newElem.querySelector("span").style.fontSize = this.fontSize + "px";
    if (e == "div") {
      newElem.classList.add(text);
      newElem.querySelector("span").textContent =
        "<" + e + ' class="' + text + '">';
    } else {
      newElem.id = text;
      newElem.querySelector("span").textContent =
        "<" + e + ' id="' + text + '">';
    }
  };
  this.start = function () {
    switch (this.selector[0]) {
      case ".": {
        this.myCreateElement("div", this.selector.substring(1));
        break;
      }
      case "#": {
        console.log("id " + this.selector);
        this.myCreateElement("p", this.selector.substring(1));
        break;
      }
    }
  };
};

const newElement1 = new DomElement(" .block", 500, 100, "red", 32);
const newElement2 = new DomElement(" #best", 500, 100, "blue", 32);

newElement1.start();
newElement2.start();
