const root = document.documentElement;
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
root.style.setProperty("--color", color);

document.addEventListener("pointerdown", () => (drag = true));
document.addEventListener("pointerup", () => (drag = false));
colorPicker.addEventListener("input", handleColorPickerInput);
sizeSlider.addEventListener("input", handleSizeSliderInput);
btnEraser.addEventListener("click", handleButton);
btnRainbow.addEventListener("click", handleButton);
btnReset.addEventListener("click", handleReset);

function handleColorPickerInput(event) {
  color = event.target.value;
  root.style.setProperty("--color", color);
}

function handleSizeSliderInput(event) {
  size = event.target.value;
  generateGrid(size);
}

function handleButton(event) {
  event.target.classList.toggle("active");

  if (event.target === btnRainbow) {
    btnRainbow.classList.toggle("rainbow-mode");
    headerTitle.classList.toggle("rainbow-mode");
  }
}

function handleReset() {
  generateGrid(size);
}

function generateRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function paint(block) {
  const isEraserActive = btnEraser.classList.contains("active");
  const isRainbowActive = btnRainbow.classList.contains("active");

  block.style.backgroundColor = isEraserActive
    ? "white"
    : isRainbowActive
    ? generateRandomColor()
    : color;
}

function generateGrid(size) {
  const gridSize = size ** 2;
  const blockFragment = document.createDocumentFragment();

  sketchpad.innerHTML = "";
  sketchpad.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  sketchpad.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  sizeValue.textContent = `${size} x ${size}`;

  for (let i = 0; i < gridSize; i++) {
    const block = document.createElement("div");
    block.classList.add("sketch-block");
    block.addEventListener("pointerdown", () => paint(block));
    block.addEventListener("pointerenter", () => (drag ? paint(block) : ""));
    blockFragment.appendChild(block);
  }

  sketchpad.appendChild(blockFragment);
}

generateGrid(size);
