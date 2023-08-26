const notesForm = document.querySelector("#notesForm");
const displayNoteContainer = document.querySelector("#displayNotes");
showNotes();

// Form Handling
notesForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(notesForm);
  const note = formData.get("note");
  const title = formData.get("title");
  addNote(title, note);
});

// Show Notes
function showNotes() {
  const notes = JSON.parse(localStorage.getItem("notes"));
  displayNoteContainer.innerHTML = "";
  notes?.forEach((note, index) => {
    displayNoteContainer.innerHTML += `<div class="card" style="width: 16rem;">
    <div class="card-body text-center">
    <h5>${note.title}</h5>
      <p class="card-text">
    ${note.data}
      </p>
      <button data-noteindex='${index}' onclick="removeNote(this.dataset.noteindex)" class="btn btn-primary">
   Delete Note
      </button>
    </div>
  </div>`;
  });
}

// Add Notes
function addNote(title, data) {
  if (title === "" || data === "") return null;
  const noteObj = {
    title,
    data,
  };
  const notes = JSON.parse(localStorage.getItem("notes"));
  if (notes !== null) {
    localStorage.setItem("notes", JSON.stringify([...notes, noteObj]));
    alert("Note added successfully!");
    showNotes();
    return;
  }
  localStorage.setItem("notes", JSON.stringify([noteObj]));
  alert("Note added successfully!");
  showNotes();
}

// Remove Note
function removeNote(noteIndex) {
  if (noteIndex === "") return null;
  const notes = JSON.parse(localStorage.getItem("notes"));
  const confirmation = confirm(
    `Are your sure you want to delete the note ${notes.at(noteIndex).data}`
  );
  if (confirmation) {
    notes.splice(noteIndex, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
  }
}
