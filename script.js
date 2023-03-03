const sketchpad = document.querySelector(".sketchpad");

for (let i = 0; i < 16 * 16; i++) {
  let block = document.createElement("div");
  block.style.border = "1px solid black";
  block.classList.add("sketch-block");
  sketchpad.appendChild(block);
}

sketchpad.style.width = "256px";
sketchpad.style.height = "256px";
sketchpad.style.display = "grid";
sketchpad.style.gridTemplateColumns = "repeat(16, 1fr)";
sketchpad.style.gridTemplateRows = "repeat(16, 1fr)";

const sketchBlocks = document.querySelectorAll(".sketch-block");
let drag = false;

document.addEventListener("pointerdown", () => drag = true);
document.addEventListener("pointerup", () => drag = false);

sketchBlocks.forEach((block) => block.addEventListener("pointerenter", () => paint(block)));

function paint(block) {
  if (drag) {
    block.style.backgroundColor = "black";
  }
}

console.log(drag)