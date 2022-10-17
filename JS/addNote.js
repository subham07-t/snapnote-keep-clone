const addNoteBtn = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const NotePopup = document.querySelector(".notebox-popup");
const closeIcon = document.querySelector(".notebox-popup header i");

addNoteBtn.addEventListener("click", () => {
  popupBox.style.opacity = "1";
  NotePopup.style.opacity = "1";
  popupBox.style.pointerEvents = "visible";
  NotePopup.style.pointerEvents = "visible";
});
closeIcon.addEventListener("click", () => {
  popupBox.style.opacity = "0";
  NotePopup.style.opacity = "0";
  popupBox.style.pointerEvents = "none";
  NotePopup.style.pointerEvents = "none";
});
