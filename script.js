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
      button.classList.add("uparrow");
      button.classList.add("darkbutton");
    }
    if (i === 62) {
      button.setAttribute("arrow", "🠗");
      button.classList.add("downarrow");
      button.classList.add("darkbutton");
    }
    if (i === 61) {
      button.setAttribute("arrow", "🠔");
      button.classList.add("leftarrow");
      button.classList.add("darkbutton");
    }
    if (i === 63) {
      button.setAttribute("arrow", "🠖");
      button.classList.add("rightarrow");
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
getButtonsInfo(true);

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
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("button")) {
    return;
  }
  if (e.target.getAttribute("arrow") !== null) {
    text.push(e.target.getAttribute("arrow"));
  } else if (!e.target.classList.contains("notprint")) {
    text.push(e.target.textContent);
  } else if (e.target.textContent === "Backspace") {
    text = text.slice(0, -1);
  } else if (e.target.textContent === "Tab") {
    text.push("    ");
  } else if (e.target.textContent === "Enter") {
    text.push("\n");
  }
  console.log(text);
  textArea.value = text.join("");

  e.target.classList.add("new");
  setTimeout(() => {
    e.target.classList.remove("new");
  }, 100);
  if (e.target.textContent === "CapsLock" || e.target.textContent === "Shift") {
    e.target.classList.toggle("active");
    CapsLock();
  }
  if (
    e.target.classList.contains("leftctrl") ||
    e.target.classList.contains("leftalt")
  ) {
    e.target.classList.toggle("active");
    langChange();
  }
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
