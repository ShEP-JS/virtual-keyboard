const body = document.querySelector("body");
const title = document.createElement("h1");
title.classList.add("title");
title.textContent = "RSS Виртуальная клавиатура";
body.appendChild(title);
const textArea = document.createElement("textarea");
textArea.setAttribute("id", "rows", "cols", "autofocus");
textArea.id = "textarea";
textArea.rows = "8";
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
      button.classList.add("shift");
      button.classList.add("leftshift");
    }
    if (i === 55) {
      button.classList.add("leftctrl");
    }
    if (i === 60) {
      button.classList.add("rightctrl");
    }
    if (i === 57) {
      button.classList.add("leftalt");
    }
    if (i === 59) {
      button.classList.add("rightalt");
    }
    if (i === 54) {
      button.classList.add("shift");
      button.classList.add("rightshift");
    }
    if (i === 53) {
      button.setAttribute("arrow", "🠕");
      button.classList.add("arrowup");
      button.classList.add("darkbutton");
    }
    if (i === 62) {
      button.setAttribute("arrow", "🠗");
      button.classList.add("arrowdown");
      button.classList.add("darkbutton");
    }
    if (i === 61) {
      button.setAttribute("arrow", "🠔");
      button.classList.add("arrowleft");
      button.classList.add("darkbutton");
    }
    if (i === 63) {
      button.setAttribute("arrow", "🠖");
      button.classList.add("arrowright");
      button.classList.add("darkbutton");
    }
    if (data[i] === "Del") {
      button.classList.add("darkbutton");
    }

    if (data[i] === "Ctrl" || data[i] === "Win" || data[i] === "Alt") {
      button.classList.add("funcbutton");
    }
    if (
      data[i] === "Ctrl" ||
      data[i] === "Win" ||
      data[i] === "Alt" ||
      data[i] === "Backspace" ||
      data[i] === "Enter" ||
      data[i] === "Shift" ||
      data[i] === "CapsLock" ||
      data[i] === "Tab" ||
      data[i] === "Del"
    ) {
      button.classList.add("notprint");
    }

    keyboard.appendChild(button);
  }
}

function setButtons() {
  const buttons = document.querySelectorAll(".button");
  for (let i = 0; i < data.length; i++) {
    const button = buttons[i];
    button.textContent = `${data[i]}`;
    button.setAttribute("buttonname", button.innerText);
    button.setAttribute("upperCaseName", button.innerText.toUpperCase());
  }
}

async function getButtonsInfo(create) {
  let info;
  if (lang === "ru") {
    info = "dataRu.json";
  } else {
    info = "dataEn.json";
  }
  const res = await fetch(info);
  data = await res.json();
  if (create) {
    createButtons();
  }
  setButtons();
}

function CapsLock() {
  const buttons = document.querySelectorAll(".button");
  const capsActive = document
    .querySelector(".capslock")
    .classList.contains("active");
  const shiftActive = document.querySelectorAll(".shift.active").length > 0;
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
      if (capsActive && !shiftActive) {
        buttons[i].textContent = buttons[i].textContent.toUpperCase();
      } else if (!capsActive && shiftActive) {
        buttons[i].textContent = buttons[i].textContent.toUpperCase();
      } else if (capsActive && shiftActive) {
        buttons[i].textContent = buttons[i].textContent.toLowerCase();
      } else if (!capsActive && !shiftActive) {
        buttons[i].textContent = buttons[i].textContent.toLowerCase();
      }
    }
  }

  shiftButtons(capsActive);
}

function shiftActiveEn() {
  const buttons = document.querySelectorAll(".button");
  buttons[0].textContent = "~";
  buttons[1].textContent = "!";
  buttons[2].textContent = "@";
  buttons[3].textContent = "#";
  buttons[4].textContent = "$";
  buttons[5].textContent = "%";
  buttons[6].textContent = "^";
  buttons[7].textContent = "&";
  buttons[8].textContent = "*";
  buttons[9].textContent = "(";
  buttons[10].textContent = ")";
  buttons[11].textContent = "_";
  buttons[12].textContent = "+";
  buttons[25].textContent = "{";
  buttons[26].textContent = "}";
  buttons[27].textContent = "|";
  buttons[39].textContent = ":";
  buttons[40].textContent = `"`;
  buttons[50].textContent = "<";
  buttons[51].textContent = ">";
  buttons[52].textContent = "?";
}
function shiftActiveRu(capsActive) {
  const buttons = document.querySelectorAll(".button");
  buttons[0].textContent = capsActive ? "Ё".toLowerCase() : "Ё";
  buttons[1].textContent = "!";
  buttons[2].textContent = `"`;
  buttons[3].textContent = "№";
  buttons[4].textContent = ";";
  buttons[5].textContent = "%";
  buttons[6].textContent = ":";
  buttons[7].textContent = "?";
  buttons[8].textContent = "*";
  buttons[9].textContent = "(";
  buttons[10].textContent = ")";
  buttons[11].textContent = "_";
  buttons[12].textContent = "+";
  buttons[25].textContent = capsActive ? "Х".toLowerCase() : "Х";
  buttons[26].textContent = capsActive ? "Ъ".toLowerCase() : "Ъ";
  buttons[27].textContent = "/";
  buttons[39].textContent = capsActive ? "Ж".toLowerCase() : "Ж";
  buttons[40].textContent = capsActive ? "Э".toLowerCase() : "Э";
  buttons[50].textContent = capsActive ? "Б".toLowerCase() : "Б";
  buttons[51].textContent = capsActive ? "Ю".toLowerCase() : "Ю";
  buttons[52].textContent = ",";
}
function shiftInActive(capsActive) {
  const buttons = document.querySelectorAll(".button");
  buttons[0].textContent = capsActive
    ? data[0].toUpperCase()
    : data[0].toLowerCase();
  buttons[1].textContent = data[1];
  buttons[2].textContent = data[2];
  buttons[3].textContent = data[3];
  buttons[4].textContent = data[4];
  buttons[5].textContent = data[5];
  buttons[6].textContent = data[6];
  buttons[7].textContent = data[7];
  buttons[8].textContent = data[8];
  buttons[9].textContent = data[9];
  buttons[10].textContent = data[10];
  buttons[11].textContent = data[11];
  buttons[12].textContent = data[12];
  buttons[25].textContent = capsActive
    ? data[25].toUpperCase()
    : data[25].toLowerCase();
  buttons[26].textContent = capsActive
    ? data[26].toUpperCase()
    : data[26].toLowerCase();
  buttons[27].textContent = data[27];
  buttons[39].textContent = capsActive
    ? data[39].toUpperCase()
    : data[39].toLowerCase();
  buttons[40].textContent = capsActive
    ? data[40].toUpperCase()
    : data[40].toLowerCase();
  buttons[50].textContent = capsActive
    ? data[50].toUpperCase()
    : data[50].toLowerCase();
  buttons[51].textContent = capsActive
    ? data[51].toUpperCase()
    : data[51].toLowerCase();
  buttons[52].textContent = data[52];
}

function shiftButtons(capsActive) {
  let shiftActive = document.querySelectorAll(".shift.active").length > 0;
  if (shiftActive) {
    if (lang === "en") {
      shiftActiveEn();
    } else {
      shiftActiveRu(capsActive);
    }
  } else {
    shiftInActive(capsActive);
  }
}

let text = [];

function processTarget(target, action) {
  const position = textArea.selectionStart;
  let newPosition = position;
  if (target.getAttribute("arrow") !== null) {
    text.splice(position, 0, target.getAttribute("arrow"));
    newPosition += 1;
  } else if (!target.classList.contains("notprint")) {
    text.splice(position, 0, target.textContent);
    newPosition += 1;
  } else if (target.textContent === "Backspace") {
    if (newPosition <= 0) {
      newPosition = 0;
    } else {
      text.splice(position - 1, 1);
      newPosition -= 1;
    }
    document.getElementById("textarea").focus();
  } else if (target.textContent === "Del") {
    text.splice(position, 1);
    document.getElementById("textarea").focus();
  } else if (target.textContent === "Tab") {
    text.splice(position, 0, "\t");
    newPosition += 1;
  } else if (target.textContent === "Enter") {
    text.splice(position, 0, "\n");
    newPosition += 1;
  }

  textArea.value = text.join("");
  console.log(textArea.value.length, text.length);
  textArea.selectionStart = newPosition;
  textArea.selectionEnd = newPosition;
  console.log(textArea.selectionStart, textArea.selectionEnd);
  target.classList.add("new");
  setTimeout(() => {
    target.classList.remove("new");
  }, 100);
  if (target.textContent === "CapsLock") {
    target.classList.toggle("active");
    CapsLock();
  }
  if (target.textContent === "Shift") {
    if (action === "click") {
      target.classList.toggle("active");
      CapsLock();
    } else if (action === "keydown" && !target.classList.contains("active")) {
      target.classList.add("active");
      CapsLock();
    } else if (action === "keyup" && target.classList.contains("active")) {
      target.classList.remove("active");
      CapsLock();
    }
  }

  if (
    target.classList.contains("leftctrl") ||
    target.classList.contains("leftalt")
  ) {
    target.classList.toggle("active");
    langChange();
  }
}
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("button")) {
    return;
  }

  processTarget(e.target, "click");
});

function langChange() {
  if (
    document.querySelector(".leftctrl").classList.contains("active") &&
    document.querySelector(".leftalt").classList.contains("active")
  ) {
    if (lang === "ru") {
      lang = "en";
    } else {
      lang = "ru";
    }
    document.querySelector(".leftctrl").classList.remove("active");
    document.querySelector(".leftalt").classList.remove("active");
  }

  getButtonsInfo(false);
}

const infoOc = document.createElement("h2");
infoOc.classList.add("subtitle");
infoOc.textContent = "Клавиатура создана в операционной системе Windows";
body.appendChild(infoOc);

const infoLang = document.createElement("h2");
infoLang.classList.add("subtitle");
infoLang.textContent = "Для переключения языка комбинация: левыe ctrl + alt";
body.appendChild(infoLang);

function setLocalStorage() {
  localStorage.setItem("language", lang);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("language")) {
    lang = localStorage.getItem("language");
  }
}
window.addEventListener("load", () => {
  getLocalStorage();
  getButtonsInfo(true);
});

function specialKeyDown(e) {
  let target;
  if (e.code === "ShiftLeft") {
    target = document.querySelector(".leftshift");
  }
  if (e.code === "ShiftRight") {
    target = document.querySelector(".rightshift");
  }
  if (e.code === "AltRight") {
    target = document.querySelector(".rightalt");
  }
  if (e.code === "AltLeft") {
    target = document.querySelector(".leftalt");
  }
  if (e.code === "ControlRight") {
    target = document.querySelector(".rightctrl");
  }
  if (e.code === "ControlLeft") {
    target = document.querySelector(".leftctrl");
  }
  return target;
}
window.addEventListener("keydown", (e) => {
  const buttons = document.querySelectorAll(".button");
  let target;
  if (e.key === "Shift" || e.key === "Control" || e.key === "Alt") {
    target = specialKeyDown(e);
  } else {
    for (let i = 0; i < buttons.length; i += 1) {
      if (
        e.key === buttons[i].getAttribute("buttonname") ||
        e.key === buttons[i].getAttribute("upperCaseName") ||
        buttons[i].classList.contains(e.key.toLowerCase()) ||
        (e.key === "Delete" && buttons[i].getAttribute("buttonname") === "Del")
      ) {
        target = buttons[i];
        break;
      }
    }
  }

  if (target != null) {
    e.preventDefault();
    processTarget(target, "keydown");
  }
});

window.addEventListener("keyup", (e) => {
  let target;
  if (e.key === "Shift") {
    target = specialKeyDown(e);
  }

  if (target != null) {
    e.preventDefault();
    processTarget(target, "keyup");
  }
});
