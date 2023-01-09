// For Note popup box
const popupBox = document.querySelector(".popup-box");
const NotePopup = document.querySelector(".notebox-popup");
const notePopTitle = NotePopup.querySelector("header h2");
const titleTag = NotePopup.querySelector("input");
const descTag = NotePopup.querySelector("textarea");
const subNoteBtn = NotePopup.querySelector("button");
const closeIcon = document.querySelector(".notebox-popup header i");
// For open note popup box
const addNoteBtn = document.querySelector(".add-box");
// content body
const contentBody = document.querySelector(".content");
// notes array & other variables declaring
const allData = JSON.parse(localStorage.getItem("allData") || "[]");
let isUpdate = false,
  updateId;
// calling the notes for render when screen loading
showAllData();
// event calling for open the note popupbox
addNoteBtn.addEventListener("click", () => {
  popupBox.style.opacity = "1";
  NotePopup.style.opacity = "1";
  popupBox.style.pointerEvents = "visible";
  NotePopup.style.pointerEvents = "visible";
  titleTag.value = "";
  descTag.value = "";
});

//  event calling for close the note popupbox
closeIcon.addEventListener("click", () => {
  isUpdate = false;
  popupBox.style.opacity = "0";
  NotePopup.style.opacity = "0";
  popupBox.style.pointerEvents = "none";
  NotePopup.style.pointerEvents = "none";
  notePopTitle.innerText = "Add a new Note";
  subNoteBtn.innerText = "Add Note";
});

// event calling for add note to notes array
subNoteBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let noteTitle = titleTag.value;
  let noteDesc = descTag.value;

  // only go through this if input field & desc field  not empty
  if (noteTitle || noteDesc) {
    // gathering current date
    let dateObj = new Date(),
      month = dateObj.toLocaleString("default", { month: "long" }),
      day = dateObj.getDate(),
      year = dateObj.getFullYear();

    // store all the required value in a object
    let noteInfo = {
      type: "note",
      title: noteTitle,
      description: noteDesc,
      date: `${month} ${day}, ${year}`,
    };

    //checking update popup open or normal
    if (!isUpdate) {
      allData.push(noteInfo);
    } else {
      isUpdate = false;
      allData[updateId] = noteInfo;
    }

    // localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("allData", JSON.stringify(allData));
    closeIcon.click();
    showAllData();
  }
});

// function to show notes on screen
function showAllData() {
  document.querySelectorAll(".data-box").forEach((data) => {
    data.remove();
  });

  allData.forEach((data, index) => {
    if (data.type === "note") {
      const noteCard = `<li class="data-box">
      <h3>${data.title}</h3>
      <p>
        ${data.description}
      </p>
      <div class="note-box-bottom">
        <p>${data.date}</p>
        <div class="settings">
            <i onclick="editNote(${index},'${data.title}','${data.description}')" class="fas fa-pen"></i>
            <i onclick='deleteData(${index})' class="fas fa-trash-alt"></i>
        </div>
      </div>
    </li>`;
      contentBody.insertAdjacentHTML("beforeend", noteCard);
    } else {
      const imageCard = `<li class="data-box">
      <img src=${data.dataURI} alt="">
      <div class="image-box-bottom">
        <p>${data.date}</p>
        <div class="settings">
          <i onclick="editImage(${index},'${data.dataURI}')"class="fas fa-pen"></i>
          <i onclick='deleteData(${index})' class="fas fa-trash-alt"></i>
        </div>
      </div>
    </li>`;
      contentBody.insertAdjacentHTML("beforeend", imageCard);
    }
  });
}

// function for open menu
// function showMenu(elem) {
//   console.log("elem", elem.parentElement);
//   elem.parentElement.classList.add("show");
//   document.addEventListener("click", (e) => {
//     if (e.target.tagName != "I" || e.target != elem) {
//       elem.parentElement.classList.remove("show");
//     }
//   });
// }

// function for delete note
function deleteData(id) {
  allData.splice(id, 1);
  localStorage.setItem("allData", JSON.stringify(allData));
  showAllData();
}

// function for edit note
function editNote(id, title, desc) {
  isUpdate = true;
  updateId = id;
  addNoteBtn.click();
  notePopTitle.innerText = "Update Note";
  subNoteBtn.innerText = "Update Note";
  titleTag.value = title;
  descTag.value = desc;
}

// function for edit canvas
function editImage(id, dataURL) {
  isCanvasUpdate = true;
  updateId = id;
  addCanvasBtn.click();
  drawBoxPopupTitle.innerText = "Update Canvas";
  addImg.innerText = "Update";
  var imageObj = new Image();
  imageObj.onload = function () {
    ctx.drawImage(this, 0, 0);
  };
  imageObj.src = dataURL;
}
