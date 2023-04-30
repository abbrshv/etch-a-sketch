const sketchpad = document.querySelector(".sketchpad");
const colorPicker = document.querySelector(".color-picker");
const sizeSlider = document.querySelector(".size-slider");
const sizeValue = document.querySelector(".size-value");
const btnReset = document.querySelector(".btn-reset");
const btnRainbow = document.querySelector(".btn-rainbow");

let drag = false;
let color = "#000000";
let size = 16;
let rainbowToggled = false;

document.addEventListener("pointerdown", () => (drag = true));
document.addEventListener("pointerup", () => (drag = false));
colorPicker.addEventListener("input", (e) => (color = e.target.value));
sizeSlider.addEventListener("input", (e) => {
  size = e.target.value;
  generateGrid(size);
});
btnRainbow.addEventListener("click", () => (rainbowToggled = !rainbowToggled));
btnReset.addEventListener("click", () => generateGrid(size));

function generateRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function paint(block) {
  block.style.backgroundColor = rainbowToggled ? generateRandomColor() : color;
}

function generateGrid(size) {
  sketchpad.innerHTML = "";

  sketchpad.style.border = "1px solid black"; //move to CSS
  sketchpad.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  sketchpad.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  sizeValue.textContent = `Size: ${size} x ${size}`;

  for (let i = 0; i < size ** 2; i++) {
    let block = document.createElement("div");
    block.classList.add("sketch-block");
    block.addEventListener("pointerdown", () => paint(block));
    block.addEventListener("pointerenter", () => (drag ? paint(block) : ""));
    sketchpad.appendChild(block);
  }
}

generateGrid(size);
