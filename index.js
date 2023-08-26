const notesForm = document.querySelector("#notesForm");
const displayNoteContainer = document.querySelector("#displayNotes");
showNotes();
// Form Handling
notesForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(notesForm);
  const note = formData.get("note");
  addNote(note);
});

// Show Notes
function showNotes() {
  const notes = JSON.parse(localStorage.getItem("notes"));
  displayNoteContainer.innerHTML = "";
  notes?.forEach((note) => {
    displayNoteContainer.innerHTML += `<div class="card" style="width: 18rem;">
    <div class="card-body">
      <p class="card-text">
    ${note}
      </p>
      <button data-note="${note}" id="delete-btn" onclick="removeNote(this.dataset.note)" class="btn btn-primary">
   Delete Note
      </button>
    </div>
  </div>`;
  });
}

// Add Notes
function addNote(note) {
  if (note === "") return null;
  const notes = JSON.parse(localStorage.getItem("notes"));
  if (notes !== null) {
    localStorage.setItem("notes", JSON.stringify([...notes, note]));
    showNotes();
    return;
  }
  localStorage.setItem("notes", JSON.stringify([note]));
  showNotes();
}

// Remove Note
function removeNote(note) {
  if (note === "") return null;
  const notes = JSON.parse(localStorage.getItem("notes"));
  const updatedData = notes.filter((storedNote) => {
    return storedNote !== note;
  });
  localStorage.setItem("notes", JSON.stringify(updatedData));
  showNotes();
}
