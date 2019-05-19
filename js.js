var notes = JSON.parse(localStorage.getItem("notes"))

var noteList = document.getElementById("notes-list");

function getId () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  };

if (notes == null) {
    notes = [];
}

if(notes.length <= 0){
    console.log("zero");
    var zeroElements = document.createElement("div");
    zeroElements.className = "no-notes"
    zeroElements.innerHTML = "<p> There are no notes yet </p>"
    noteList.appendChild(zeroElements);
}

for (var n=0; n < notes.length; n++) {
    var noteName = notes[n].name;
    var noteContent = notes[n].content;
    var noteId = notes[n].id;
    var newElement = document.createElement('div');
    newElement.className = "note-item col-sm-2";
    newElement.innerHTML = "<div><h5>" + noteName + "<span id='" + noteId + "'><a class='note-delete'>X</a></span></h5>" + "<p class='note-content'>" + noteContent + "</p></div>";
    noteList.appendChild(newElement);
};

var setupButton = document.getElementById("setup-button");
setupButton.addEventListener("click", testSetup);
var resetButton = document.getElementById("reset-button")
resetButton.addEventListener("click", testReset);
var submitButton = document.getElementById("submit-save");
submitButton.addEventListener("click", getSubmit);
var addNote = document.getElementById("add-note");
addNote.addEventListener("click", formAddDisplay);

function formAddDisplay(){
    var form = document.getElementById("add-form");
    form.classList.toggle("hidden");
}

function testSetup() {
    var testNotes = [];
    for (var i=0; i<10; i++){
        var note = {
            name: "test " + i.toString(),
            content: "test " + i.toString()
        };
        testNotes.push(note);
    }
    console.log(note)
    localStorage.setItem("notes", JSON.stringify(testNotes));
    location.reload()
}

function testReset() {
    var testNotes = [];
    localStorage.setItem("notes", JSON.stringify(testNotes));
    location.reload();
}

function getSubmit() {
    var name = document.getElementById("name").value;
    var content = document.getElementById("content").value;
    var newNote = {
        name: name,
        content: content,
        id: getId()
    }
    var notesUpdated = notes;
    notesUpdated.push(newNote);
    localStorage.setItem("notes", JSON.stringify(notesUpdated));
    location.reload();
}

var delNote = document.getElementsByClassName("note-delete");
for(var i = 0; i<delNote.length; i++){
    delNote[i].addEventListener("click", deleteNote);
}

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