const canvasPopupBox = document.querySelector(".canvas-popup-box");
const drawBoxPopup = document.querySelector(".drawbox-popup");

const addCanvasBtn = document.querySelector(".add-box2");
const canvasCloseIcon = document.querySelector(".drawbox-popup header i");

addCanvasBtn.addEventListener("click", () => {
  canvasPopupBox.style.opacity = "1";
  drawBoxPopup.style.opacity = "1";
  canvasPopupBox.style.pointerEvents = "visible";
  drawBoxPopup.style.pointerEvents = "visible";
});

canvasCloseIcon.addEventListener("click", () => {
  canvasPopupBox.style.opacity = "0";
  drawBoxPopup.style.opacity = "0";
  canvasPopupBox.style.pointerEvents = "none";
  drawBoxPopup.style.pointerEvents = "none";
});
