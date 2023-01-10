const canvasPopupBox = document.querySelector(".canvas-popup-box");
const drawBoxPopup = document.querySelector(".drawbox-popup");
const drawBoxPopupTitle = drawBoxPopup.querySelector("header h2");
const addCanvasBtn = document.querySelector(".add-box2");
const canvasCloseIcon = document.querySelector(".drawbox-popup header i");
let isCanvasUpdate = false;
addCanvasBtn.addEventListener("click", () => {
  canvasPopupBox.style.opacity = "1";
  drawBoxPopup.style.opacity = "1";
  canvasPopupBox.style.pointerEvents = "visible";
  drawBoxPopup.style.pointerEvents = "visible";
});

canvasCloseIcon.addEventListener("click", () => {
  isCanvasUpdate = false;
  canvasPopupBox.style.opacity = "0";
  drawBoxPopup.style.opacity = "0";
  canvasPopupBox.style.pointerEvents = "none";
  drawBoxPopup.style.pointerEvents = "none";
  clearCanvas.click();
  drawBoxPopupTitle.innerText = "Add a New Canvas";
  addImg.innerText = "Add";
});

// code for drawing
const canvas = document.querySelector("canvas");
const toolBtns = document.querySelectorAll(".tool");
const fillColorLi = document.querySelector(".fill-color ");
const fillColor = document.querySelector("#fill-color");
const sizeSlider = document.querySelector("#size-slider");
const colorBtns = document.querySelectorAll(".row-colors .option");
const colorPicker = document.querySelector("#color-picker");
const clearCanvas = document.querySelector(".clear-canvas");
const addImg = document.querySelector(".add-img");
const ctx = canvas.getContext("2d");
const mobileCanvas = canvas.getBoundingClientRect();

let isDrawing = false,
  prevMouseX,
  prevMouseY,
  prevTouchX,
  prevTouchY,
  snapshot,
  brushWidth = 5,
  selectedTool = "brush",
  selectedColor = "#000";

const setCanvasBackground = () => {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = selectedColor;
};

window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  setCanvasBackground();
});

const drawRect = (e) => {
  if (!fillColor.checked) {
    return ctx.strokeRect(
      e.offsetX,
      e.offsetY,
      prevMouseX - e.offsetX,
      prevMouseY - e.offsetY
    );
  }

  ctx.fillRect(
    e.offsetX,
    e.offsetY,
    prevMouseX - e.offsetX,
    prevMouseY - e.offsetY
  );
};

const drawMobileRect = (e) => {
  if (!fillColor.checked) {
    return ctx.strokeRect(
      e.targetTouches[0].pageX - mobileCanvas.left,
      e.targetTouches[0].pageY - mobileCanvas.top,
      prevTouchX - e.targetTouches[0].pageX,
      prevTouchY - e.targetTouches[0].pageY
    );
  }
  ctx.fillRect(
    e.targetTouches[0].pageX - mobileCanvas.left,
    e.targetTouches[0].pageY - mobileCanvas.top,
    prevTouchX - e.targetTouches[0].pageX,
    prevTouchY - e.targetTouches[0].pageY
  );
};
const drawCircle = (e) => {
  ctx.beginPath();
  let radius = Math.sqrt(
    Math.pow(prevMouseX - e.offsetX, 2) + Math.pow(prevMouseY - e.offsetY, 2)
  );
  ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
  fillColor.checked ? ctx.fill() : ctx.stroke();
};
const drawMobileCircle = (e) => {
  ctx.beginPath();
  let radius = Math.sqrt(
    Math.pow(prevTouchX - e.targetTouches[0].pageX, 2) +
      Math.pow(prevTouchY - e.targetTouches[0].pageY, 2)
  );
  ctx.arc(prevTouchX, prevTouchY, radius, 0, 2 * Math.PI);
  fillColor.checked ? ctx.fill() : ctx.stroke();
};

const drawTriangle = (e) => {
  ctx.beginPath();
  ctx.moveTo(prevMouseX, prevMouseY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
  ctx.closePath();
  fillColor.checked ? ctx.fill() : ctx.stroke();
};
const drawMobileTriangle = (e) => {
  ctx.beginPath();
  ctx.moveTo(prevTouchX, prevTouchY);
  ctx.lineTo(
    e.targetTouches[0].pageX - mobileCanvas.left,
    e.targetTouches[0].pageY - mobileCanvas.top
  );
  ctx.lineTo(
    prevTouchX * 2 - e.targetTouches[0].pageX - mobileCanvas.left,
    e.targetTouches[0].pageY - mobileCanvas.top
  );
  ctx.closePath();
  fillColor.checked ? ctx.fill() : ctx.stroke();
};

const startDrawing = (e) => {
  isDrawing = true;
  prevMouseX = e.offsetX;
  prevMouseY = e.offsetY;
  ctx.beginPath();
  ctx.lineWidth = brushWidth;
  ctx.strokeStyle = selectedColor;
  ctx.fillStyle = selectedColor;
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};
const startMobileDrawing = (e) => {
  isDrawing = true;
  prevTouchX = e.targetTouches[0].pageX - mobileCanvas.left;
  prevTouchY = e.targetTouches[0].pageY - mobileCanvas.top;
  ctx.beginPath();
  ctx.lineWidth = brushWidth;
  ctx.strokeStyle = selectedColor;
  ctx.fillStyle = selectedColor;
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};
const drawing = (e) => {
  if (!isDrawing) return;
  ctx.putImageData(snapshot, 0, 0);
  if (selectedTool === "brush" || selectedTool === "eraser") {
    ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  } else if (selectedTool === "rectangle") {
    drawRect(e);
  } else if (selectedTool === "circle") {
    drawCircle(e);
  } else {
    drawTriangle(e);
  }
};
const mobileDrawing = (e) => {
  if (!isDrawing) return;
  ctx.putImageData(snapshot, 0, 0);
  if (selectedTool === "brush" || selectedTool === "eraser") {
    ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
    ctx.lineTo(
      e.targetTouches[0].pageX - mobileCanvas.left,
      e.targetTouches[0].pageY - mobileCanvas.top
    );
    ctx.stroke();
  } else if (selectedTool === "rectangle") {
    drawMobileRect(e);
  } else if (selectedTool === "circle") {
    drawMobileCircle(e);
  } else {
    drawMobileTriangle(e);
  }
};
toolBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".options .active").classList.remove("active");
    btn.classList.add("active");
    selectedTool = btn.id;
    if (selectedTool === "brush" || selectedTool === "eraser") {
      fillColor.checked = false;
      document.querySelector(".fill-color span").style.color = "#fff";
    }
  });
});
fillColorLi.addEventListener("click", () => {
  if (selectedTool === "brush" || selectedTool === "eraser")
    return (fillColor.checked = false);
  if (fillColor.checked) {
    document.querySelector(".fill-color span").style.color = "#4a98f7";
  } else {
    document.querySelector(".fill-color span").style.color = "#fff";
  }
});
colorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".options .selected").classList.remove("selected");
    btn.classList.add("selected");
    selectedColor = window
      .getComputedStyle(btn)
      .getPropertyValue("background-color");
  });
});

colorPicker.addEventListener("change", () => {
  colorPicker.parentElement.style.background = colorPicker.value;
  colorPicker.parentElement.click();
});

let idGenerate = () => {
  let res = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return res() + res();
};

addImg.addEventListener("click", () => {
  let id = idGenerate();
  let dateObj = new Date(),
    month = dateObj.toLocaleString("default", { month: "long" }),
    day = dateObj.getDate(),
    year = dateObj.getFullYear();
  let dataURI = canvas.toDataURL();
  // store all the required value in a object
  let imageInfo = {
    type: "image",
    id: id,
    dataURI: dataURI,
    date: `${month} ${day}, ${year}`,
  };
  if (!isCanvasUpdate) {
    allData.push(imageInfo);
  } else {
    isCanvasUpdate = false;
    allData[updateId] = imageInfo;
  }

  localStorage.setItem("allData", JSON.stringify(allData));
  canvasCloseIcon.click();
  showAllData();
});

clearCanvas.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clearing whole canvas
  setCanvasBackground();
});

sizeSlider.addEventListener("change", () => (brushWidth = sizeSlider.value));
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("touchstart", startMobileDrawing);
canvas.addEventListener("touchmove", mobileDrawing);
canvas.addEventListener("touchend", () => (isDrawing = false));
