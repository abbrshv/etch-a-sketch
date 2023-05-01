const root = document.querySelector(":root");
const headerTitle = document.querySelector(".header__title");
const sketchpad = document.querySelector(".sketchpad");
const colorPicker = document.querySelector(".color-picker");
const sizeSlider = document.querySelector(".size-slider");
const sizeValue = document.querySelector(".size-value");
const btnReset = document.querySelector(".btn-reset");
const btnEraser = document.querySelector(".btn-eraser");
const btnRainbow = document.querySelector(".btn-rainbow");
const colorInput = document.getElementById("color");

let drag = false;
let size = 16;
let color = generateRandomColor();

colorInput.value = color;
root.style.setProperty("--color", `${color}`);

document.addEventListener("pointerdown", () => (drag = true));
document.addEventListener("pointerup", () => (drag = false));
colorPicker.addEventListener("input", (e) => {
  color = e.target.value;
  root.style.setProperty("--color", `${e.target.value}`);
});
sizeSlider.addEventListener("input", (e) => {
  size = e.target.value;
  generateGrid(size);
});
btnEraser.addEventListener("click", handleButton);
btnRainbow.addEventListener("click", handleButton);
btnReset.addEventListener("click", () => generateGrid(size));

function handleButton(event) {
  event.target.classList.toggle("active");

  if (event.target === btnRainbow) {
    event.target.classList.toggle("rainbow-mode");
    headerTitle.classList.toggle("rainbow-mode");
  }
}

function generateRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function paint(block) {
  block.style.backgroundColor = btnEraser.classList.contains("active")
    ? "white"
    : btnRainbow.classList.contains("active")
    ? generateRandomColor()
    : color;
}

function generateGrid(size) {
  sketchpad.innerHTML = "";

  sketchpad.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  sketchpad.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  sizeValue.textContent = `${size} x ${size}`;

  for (let i = 0; i < size ** 2; i++) {
    let block = document.createElement("div");
    block.classList.add("sketch-block");
    block.addEventListener("pointerdown", () => paint(block));
    block.addEventListener("pointerenter", () => (drag ? paint(block) : ""));
    sketchpad.appendChild(block);
  }
}

generateGrid(size);
