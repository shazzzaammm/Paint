class MouseStroke {
  constructor(x, y, w, c) {
    this.history = [{ x: x, y: y }];
    this.w = w;
    this.c = c;
  }
  addPoint(x, y) {
    this.history.push({ x: x, y: y });
  }

  display() {
    noFill();
    stroke(this.c.r, this.c.g, this.c.b);
    strokeWeight(this.w);
    beginShape();
    for (let i = 0; i < this.history.length; i++) {
      vertex(this.history[i].x, this.history[i].y);
    }
    endShape();
  }
}

const drawHistory = [];
const thickUp = document.querySelector(".thick-up");
const thickDown = document.querySelector(".thick-down");
const colorPicker = document.getElementById("color");
colorPicker.value = "#FFFFFF";
let lineWidth = 10;
let color = { r: 255, g: 255, b: 255 };
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  background(0);
  drawHistory.forEach((n) => {
    n.display();
  });
  noStroke();
  fill(color.r, color.g, color.b);
  circle(mouseX, mouseY, lineWidth);
}

function mouseDragged() {
  if (mouseY > 20) drawHistory[drawHistory.length - 1].addPoint(mouseX, mouseY);
}

function mousePressed() {
  if (mouseY > 20)
    drawHistory.push(new MouseStroke(mouseX, mouseY, lineWidth, color));
}

function mouseReleased() {
  if (drawHistory[drawHistory.length - 1].history.length < 2) {
    drawHistory.pop();
  }
}

function keyPressed() {
  if (keyIsDown(17) && keyIsDown(90)) {
    drawHistory.pop();
  }
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}
//#region listeners
thickDown.addEventListener("click", function () {
  if (lineWidth > 1) {
    lineWidth--;
  }
});
thickUp.addEventListener("click", function () {
  lineWidth++;
});
colorPicker.addEventListener("input", function () {
  color = hexToRgb(colorPicker.value);
});
//#endregion
