const body = document.querySelector("body");
const title = document.createElement("h1");
title.classList.add("title");
title.textContent = "RSS Виртуальная клавиатура";
body.appendChild(title);
const textArea = document.createElement("textarea");
textArea.setAttribute("id", "rows", "cols", "autofocus");
textArea.id = "textarea";
textArea.rows = "10";
textArea.cols = "33";
body.appendChild(textArea);
const keyboard = document.createElement("div");
keyboard.classList.add("keyboard");
body.appendChild(keyboard);
let data;
let lang = "en";
function createButtons() {
  for (let i = 0; i < data.length; i += 1) {
    const button = document.createElement("div");
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

async function getButtonsInfo() {
  let info;
  if (lang === "ru") {
    info = "dataRu.json";
  } else {
    info = "dataEn.json";
  }
  const res = await fetch(info);
  data = await res.json();
  createButtons();
}
getButtonsInfo();

function CapsLock() {
  const buttons = document.querySelectorAll(".button");
  for (let i = 0; i < buttons.length; i += 1) {
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
let textAreaContent = [];
window.addEventListener("keydown", (e) => {
  if (e.code === "CapsLock") {
    console.log(e.code);
    document.querySelector(".capslock").classList.toggle("active");
    CapsLock();
  } else {
    const buttons = document.querySelectorAll(".button");
    for (let i = 0; i < buttons.length; i += 1) {
      if (
        e.key === buttons[i].getAttribute("buttonname") ||
        e.key === buttons[i].getAttribute("upperCaseName")
      ) {
        buttons[i].classList.add("active");
        if (buttons[i].textContent !== "Backspace") {
          textAreaContent.push(buttons[i].textContent);
        } else if (buttons[i].textContent === "Backspace") {
          textAreaContent = textAreaContent.slice(0, -1);
        }
        textArea.value = textAreaContent.join("");
        e.preventDefault();
      }
      if (e.code === "ShiftLeft") {
        document.querySelector(".rightshift").classList.remove("active");
      }
      if (e.code === "ShiftRight") {
        document.querySelector(".leftshift").classList.remove("active");
      }
    }
  }
});

window.addEventListener("keyup", (e) => {
  const buttons = document.querySelectorAll(".button");
  for (let i = 0; i < buttons.length; i += 1) {
    if (
      (e.key === buttons[i].getAttribute("buttonname") &&
        buttons[i].getAttribute("buttonname") !== "CapsLock") ||
      e.key === buttons[i].getAttribute("upperCaseName")
    ) {
      buttons[i].classList.remove("active");
      buttons[i].classList.add("remove");
    }
    if (e.code === "ShiftLeft") {
      document.querySelector(".rightshift").classList.remove("active");
      document.querySelector(".rightshift").classList.remove("remove");
    }
    if (e.code === "ShiftRight") {
      document.querySelector(".leftshift").classList.remove("active");
      document.querySelector(".leftshift").classList.remove("remove");
    }
    setTimeout(() => {
      buttons[i].classList.remove("remove");
    }, 100);
  }
});

window.addEventListener("click", (e) => {
  setFocus();
  if (e.target.textContent === "CapsLock") {
    document.querySelector(".capslock").classList.toggle("active");
    CapsLock();
    return;
  }
  const buttons = document.querySelectorAll(".button");
  console.log(e.target.textContent);
  for (let i = 0; i < buttons.length; i += 1) {
    if (
      e.target.textContent === buttons[i].getAttribute("buttonname") ||
      e.target.textContent === buttons[i].getAttribute("upperCaseName")
    ) {
      buttons[i].classList.add("new");
      if (
        buttons[i].textContent !== "Backspace" &&
        buttons[i].textContent !== "Tab"
      ) {
        textAreaContent.push(e.target.textContent);
      } else if (buttons[i].textContent === "Backspace") {
        textAreaContent = textAreaContent.slice(0, -1);
      } else if (buttons[i].textContent === "Tab") {
        textAreaContent.push("  ");
      }
      textArea.value = textAreaContent.join("");
      setTimeout(() => {
        buttons[i].classList.remove("new");
      }, 100);
    }
  }
});

function setFocus() {
  document.getElementById("textarea").focus();
}
setFocus();

body.addEventListener("onload", setFocus());
