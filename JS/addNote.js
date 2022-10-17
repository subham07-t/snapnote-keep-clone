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
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false,
  updateId;
// calling the notes for render when screen loading
showNotes();

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
      title: noteTitle,
      description: noteDesc,
      date: `${month} ${day}, ${year}`,
    };

    //checking update popup open or normal
    if (!isUpdate) {
      notes.push(noteInfo);
    } else {
      isUpdate = false;
      notes[updateId] = noteInfo;
    }

    localStorage.setItem("notes", JSON.stringify(notes));
    closeIcon.click();
    showNotes();
  }
});

// function to show notes on screen
function showNotes() {
  document.querySelectorAll(".note-box").forEach((note) => {
    note.remove();
  });
  notes.forEach((note, index) => {
    const noteCard = `<li class="note-box">
                          <h3>${note.title}</h3>
                          <p>
                            ${note.description}
                          </p>
                          <div class="note-box-bottom">
                            <p>${note.date}</p>
                            <div class="settings">
                              <i onclick="showMenu(this)" class="fas fa-ellipsis-h"></i>
                              <ul class="menu">
                                <li onclick="editNote(${index},'${note.title}','${note.description}')"><i class="fas fa-pen"></i>Edit</li>
                                <li onclick='deleteNote(${index})'><i class="fas fa-trash-alt"></i>Delete</li>
                              </ul>
                            </div>
                          </div>
                        </li>`;
    contentBody.insertAdjacentHTML("beforeend", noteCard);
  });
}

// function for open menu
function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}

// function for delete note
function deleteNote(id) {
  notes.splice(id, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
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
