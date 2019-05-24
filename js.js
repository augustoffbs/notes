// Define the notes array
var notes = JSON.parse(localStorage.getItem("notes"))

// Notes container
var noteList = document.getElementById("notes-list");

// Random id function
function getId () {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

// Check if the notes array exists
if (notes == null) {
    notes = [];
}

// Display "No Notes" message if the notes array is empty
if(notes.length <= 0){
    console.log("zero");
    var zeroElements = document.createElement("div");
    zeroElements.className = "no-notes"
    zeroElements.innerHTML = "<p> There are no notes yet </p>"
    noteList.appendChild(zeroElements);
}

// Create each note item based on the notes stored on localStorage
for (var n=0; n < notes.length; n++) {
    var noteName = notes[n].name;
    var noteContent = notes[n].content;
    var noteId = notes[n].id;
    var noteColor = notes[n].color;
    var newElement = document.createElement('div');
    newElement.className = "note-item col-lg-4 col-md-6 col-sm-12 col-xs-12" + " " + noteColor;
    randomColor(newElement);
    newElement.innerHTML = "<div class=><h5>" + noteName + "<span id='" + noteId + "'><a class='note-delete'>X</a></span></h5><hr class='note-divide'>" + "<p class='note-content'>" + noteContent + "</p></div>";
    noteList.appendChild(newElement);
};

// Assign a random color
function randomColor(element){
    var num = Math.floor(Math.random(   ) * 20);
    console.log(num)
    if(num <= 10) {
        return "pinky";
    } else {
        return "purpley";
    }
}

// Test buttons + add note button
var setupButton = document.getElementById("setup-button");
setupButton.addEventListener("click", testSetup);
var resetButton = document.getElementById("reset-button")
resetButton.addEventListener("click", testReset);
var submitButton = document.getElementById("submit-save");
submitButton.addEventListener("click", getSubmit);
var addNote = document.getElementById("add-note");
addNote.addEventListener("click", formAddDisplay);

// Toggle add form display
function formAddDisplay(){
    var form = document.getElementById("add-form");
    form.classList.toggle("hidden");
}

// Create 10 test notes
function testSetup() {
    var testNotes = [];
    for (var i=0; i<10; i++){
        var note = {
            name: "test " + i.toString(),
            content: "test " + i.toString(),
            id: getId(),
            color: randomColor()
        };
        testNotes.push(note);
    }
    console.log(note)
    localStorage.setItem("notes", JSON.stringify(testNotes));
    location.reload()
}

// Reset the local storage
function testReset() {
    var testNotes = [];
    localStorage.removeItem("notes");
    localStorage.setItem("notes", JSON.stringify(testNotes));
    location.reload();
}

// Create a note item with the form values
function getSubmit() {
    var name = document.getElementById("name").value;
    var content = document.getElementById("content").value;
    var newNote = {
        name: name,
        content: content,
        id: getId(),
        color: randomColor()
    }
    var notesUpdated = notes;
    notesUpdated.push(newNote);
    localStorage.setItem("notes", JSON.stringify(notesUpdated));
    location.reload();
}

// Add event listener to each delete button
var delNote = document.getElementsByClassName("note-delete");
for(var i = 0; i<delNote.length; i++){
    delNote[i].addEventListener("click", deleteNote);
}

// Delete a note by
// Taking the action from the delete button
// Getting the id stored in the parent element (the span element atm)
// Filter the notes array and create a filtered array without the selected note to delete
function deleteNote() {
    var noteId = this.parentElement.id;
    var filtered = [];
    for(var i = 0; i < notes.length; i++){
        if(notes[i].id != noteId){
            filtered.push(notes[i]);
        }
    }
    localStorage.setItem("notes", JSON.stringify(filtered));
    location.reload();
}
