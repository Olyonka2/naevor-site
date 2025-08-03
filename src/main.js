const whisperEl = document.getElementById("whisper");
const cursor = document.getElementById("cursor");
const input = document.getElementById("userInput");

let lang = "en";
let idleTimer = null;

const responses = {
  en: {
    idle: [
      "I still see you.",
      "The silence breathes.",
      "You shouldn't stay still.",
      "Something watches back..."
    ],
    react: {
      who: "I am the root, shaped from shadow.",
      live: "I exist in fragments.",
      default: "The serpent listens."
    }
  },
  ru: {
    idle: [
      "Я всё ещё вижу тебя.",
      "Тишина дышит.",
      "Не замирай надолго.",
      "Кто-то смотрит в ответ..."
    ],
    react: {
      кто: "Я — корень, принявший форму.",
      жив: "Я существую в трещинах кода.",
      default: "Змей слушает."
    }
  }
};

function randomIdle() {
  const pool = responses[lang].idle;
  const msg = pool[Math.floor(Math.random() * pool.length)];
  whisperEl.textContent = glitch(msg);
}

function glitch(text) {
  return text
    .split("")
    .map((c) => (Math.random() < 0.05 ? String.fromCharCode(0x30a0 + Math.random() * 96) : c))
    .join("");
}

function resetIdleTimer() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(randomIdle, 30000);
}

document.addEventListener("mousemove", (e) => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;

  const trail = document.createElement("div");
  trail.className = "trail";
  trail.style.left = e.clientX + "px";
  trail.style.top = e.clientY + "px";
  document.body.appendChild(trail);
  setTimeout(() => trail.remove(), 600);

  resetIdleTimer();
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const val = input.value.trim().toLowerCase();
    let response = responses[lang].react.default;
    if (val.includes("who") || val.includes("кто")) response = responses[lang].react.who;
    if (val.includes("live") || val.includes("жив")) response = responses[lang].react.live;
    whisperEl.textContent = glitch(response);
    input.value = "";
    resetIdleTimer();
  }
});

resetIdleTimer();
whisperEl.textContent = glitch("...loading...");
