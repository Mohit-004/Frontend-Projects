//Get notes from local Storage

let notes = JSON.parse(localStorage.getItem("notes")) || [];

//Save notes to localstorage
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}


function displayNotes(filteredNotes = notes) {

  const container =
    document.getElementById("notesContainer");

  // No notes found
  if (filteredNotes.length === 0) {
    container.innerHTML = `
      <p class="empty-message">
        No notes found
      </p>
    `;
    return;
  }

  // Generate notes HTML
  const notesHTML = filteredNotes
    .map((note, index) => `
      <div class="note">

        <p>${note.text}</p>

        <small>
          ${note.date}
        </small>

        <div class="note-buttons">

          <button onclick="editNote(${index})">
            ✏ Edit
          </button>

          <button onclick="deleteNote(${index})">
            🗑 Delete
          </button>

        </div>

      </div>
    `)
    .join("");

  // Update DOM once
  container.innerHTML = notesHTML;
}