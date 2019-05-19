var notes = JSON.parse(localStorage.getItem("notes"))

var noteList = document.getElementById("notes-list");

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
    var newElement = document.createElement('div');
    newElement.className = "note-item col-sm-2";
    newElement.innerHTML = "<h5>" + noteName + "</h5>" + "<p>" + noteContent + "</p>";
    noteList.appendChild(newElement);
};

var setupButton = document.getElementById("setup-button");
setupButton.addEventListener("click", testSetup)
var resetButton = document.getElementById("reset-button")
resetButton.addEventListener("click", testReset)

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