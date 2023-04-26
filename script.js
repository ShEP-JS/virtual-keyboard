const body = document.querySelector("body");
const title = document.createElement("h1");
title.classList.add("title");
title.textContent = "RSS Виртуальная клавиатура";
body.appendChild(title);
const textArea = document.createElement("textarea");
textArea.setAttribute("id", "rows", "cols");
textArea.id = "textarea";
textArea.rows = "10";
textArea.cols = "33";
body.appendChild(textArea);
const keyboard = document.createElement("div");
keyboard.classList.add("keyboard");
body.appendChild(keyboard);
let lang = "en";
function createButtons() {
  for (let i = 0; i < data.length; i++) {
    let button = document.createElement("div");
    button.classList.add("button");
    button.textContent = `${data[i]}`;
    if (data[i] === "Backspace" || data[i] === "Enter" || data[i] === "Shift") {
      button.classList.add("bigbutton");
    }
    if (data[i] === "CapsLock") {
      button.classList.add("bigbutton");
      button.classList.add("capslock");
    }
    if (data[i] === " ") {
      button.classList.add("space");
    }
    if (data[i] === "Tab") {
      button.classList.add("tab");
    }
    if (i === 42) {
      button.classList.add("leftshift");
    }
    if (i === 54) {
      button.classList.add("rightshift");
    }
    if (i === 53) {
      button.classList.add("uparrow");
      button.classList.add("darkbutton");
    }
    if (i === 62) {
      button.classList.add("downarrow");
      button.classList.add("darkbutton");
    }
    if (i === 61) {
      button.classList.add("leftarrow");
      button.classList.add("darkbutton");
    }
    if (i === 63) {
      button.classList.add("rightarrow");
      button.classList.add("darkbutton");
    }
    if (data[i] === "Del") {
      button.classList.add("darkbutton");
    }
    if (data[i] === "Ctrl" || data[i] === "Win" || data[i] === "Alt") {
      button.classList.add("funcbutton");
    }
    button.setAttribute("buttonname", button.innerText);
    button.setAttribute("upperCaseName", button.innerText.toUpperCase());
    keyboard.appendChild(button);
  }
}
let data;
async function getButtonsInfo() {
  let info;
  if (lang === "ru") {
    info = `dataRu.json`;
  } else {
    info = `dataEn.json`;
  }
  const res = await fetch(info);
  data = await res.json();
  createButtons();
}
getButtonsInfo();

let textAreaContent = [];
window.addEventListener("keydown", (e) => {
  if (e.code == "CapsLock") {
    console.log(e.code);
    document.querySelector(".capslock").classList.toggle("active");
    CapsLock();
  } else {
    const buttons = document.querySelectorAll(".button");
    for (let i = 0; i < buttons.length; i += 1) {
      if (
        e.key == buttons[i].getAttribute("buttonname") ||
        e.key == buttons[i].getAttribute("upperCaseName")
      ) {
        console.log(buttons);
        buttons[i].classList.add("active");
        textAreaContent.push(buttons[i].textContent);
        textArea.textContent = textAreaContent.join("");
      }
      if (e.code == "ShiftLeft") {
        document.querySelector(".rightshift").classList.remove("active");
      }
      if (e.code == "ShiftRight") {
        document.querySelector(".leftshift").classList.remove("active");
      }
    }
  }
});

window.addEventListener("keyup", (e) => {
  const buttons = document.querySelectorAll(".button");
  for (let i = 0; i < buttons.length; i += 1) {
    if (
      (e.key == buttons[i].getAttribute("buttonname") &&
        buttons[i].getAttribute("buttonname") !== "CapsLock") ||
      e.key == buttons[i].getAttribute("upperCaseName")
    ) {
      console.log(buttons);
      buttons[i].classList.remove("active");
      buttons[i].classList.add("remove");
    }
    if (e.code == "ShiftLeft") {
      document.querySelector(".rightshift").classList.remove("active");
      document.querySelector(".rightshift").classList.remove("remove");
    }
    if (e.code == "ShiftRight") {
      document.querySelector(".leftshift").classList.remove("active");
      document.querySelector(".leftshift").classList.remove("remove");
    }
    setTimeout(() => {
      buttons[i].classList.remove("remove");
    }, 100);
  }
});

window.addEventListener("click", (e) => {
  if (e.target.textContent == "CapsLock") {
    console.log(e.code);
    document.querySelector(".capslock").classList.toggle("active");
    CapsLock();
  }
  const buttons = document.querySelectorAll(".button");
  for (let i = 0; i < buttons.length; i++) {
    if (e.target.textContent === buttons[i].getAttribute("buttonname")) {
      buttons[i].classList.add("new");
      textAreaContent.push(e.target.textContent);
      textArea.textContent = textAreaContent.join("");
      setTimeout(() => {
        buttons[i].classList.remove("new");
      }, 100);
    }
  }
});

function CapsLock() {
  const buttons = document.querySelectorAll(".button");
  for (let i = 0; i < buttons.length; i++) {
    if (
      buttons[i].getAttribute("buttonname") !== "Backspace" &&
      buttons[i].getAttribute("buttonname") !== "Tab" &&
      buttons[i].getAttribute("buttonname") !== "CapsLock" &&
      buttons[i].getAttribute("buttonname") !== "Enter" &&
      buttons[i].getAttribute("buttonname") !== "Shift" &&
      buttons[i].getAttribute("buttonname") !== "Del" &&
      buttons[i].getAttribute("buttonname") !== "Alt" &&
      buttons[i].getAttribute("buttonname") !== "Win" &&
      buttons[i].getAttribute("buttonname") !== "Ctrl"
    ) {
      if (document.querySelector(".capslock").classList.contains("active")) {
        buttons[i].textContent = buttons[i].textContent.toUpperCase();
      } else {
        buttons[i].textContent = buttons[i].textContent.toLowerCase();
      }
    }
  }
}

CapsLock();
