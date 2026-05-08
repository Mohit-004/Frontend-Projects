//Get notes from local Storage

let notes = JSON.parse(localStorage.getItem("notes")) || [];

//Save notes to localstorage
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}


function displayNotes(filteredNotes = notes) {
  const container = document.getElementById("notesContainer");

  // Clear old notes
  container.innerHTML = "";

  // If no notes found
  if (filteredNotes.length === 0) {
    container.innerHTML = `
      <p style="margin-top:10px; color:gray;">
        No notes found
      </p>
    `;
    return;
  }

   // Loop through notes
  filteredNotes.forEach((note, index) => {
    container.innerHTML += `
      <div class="note">
        <p>${note.text}</p>

        <small style="color: gray;">
          ${note.date}
        </small>

        <br>

        <button onclick="editNote(${index})">
          ✏ Edit
        </button>

        <button onclick="deleteNote(${index})">
          🗑 Delete
        </button>
      </div>
    `;
  });
}