function deletePerson() {
    const ret = new XMLHttpRequest();

    var nominus = document.getElementById("nominus").value; var checker = 0;

    ret.open("DELETE", "http://127.0.0.1:5000/grades/"+nominus, true);
    ret.setRequestHeader("Content-Type", "application/json");
    ret.send();

    ret.onload = function () {
        let x = this.responseText;
        x = JSON.parse(x);
        Object.entries(x).forEach(([nom, grod]) => {
            if (nom == nominus) {
                checker++;
            }
        });
        if(checker == 0){
            document.getElementById("deletedP").innerHTML = this.responseText;
        }
    };
}
function changeGrad() {
    var ret = new XMLHttpRequest();
    var naam = document.getElementById("naam").value;
    var grae = document.getElementById("grae").value;
    ret.open("PUT", "http://127.0.0.1:5000/grades/"+naam, true);
    ret.setRequestHeader("Content-Type", "application/json");

    const body = { "grade": Number(grae) };
    ret.send(JSON.stringify(body));
    ret.onload = function () {
        let x = this.responseText;
        x = JSON.parse(x);
        Object.entries(x).forEach(([nom, grod]) => {
            if (nom == naam) {
                document.getElementById("newGrad").innerHTML = nom + ": " + grod;
            }
        });
    };
}
function newStudent() {
    var ret = new XMLHttpRequest();
    var pupil = document.getElementById("nam").value;
    var scre = document.getElementById("hrad").value;
    ret.open("POST", "http://127.0.0.1:5000/grades", true);
    ret.setRequestHeader("Content-Type", "application/json");
    const corpus = { "name": pupil, "grade": Number(scre) };
    ret.send(JSON.stringify(corpus));
    ret.onload = function () {
        let x = this.responseText;
        x = JSON.parse(x);
        Object.entries(x).forEach(([nom, grod]) => {
            if (nom == pupil) {
                document.getElementById("showStudent").innerHTML = nom + ": " + grod;
            }

        });

    };

}
function showAll() {
    const ret = new XMLHttpRequest();
    ret.open("GET", "http://127.0.0.1:5000/grades", true);
    ret.send();
    ret.onload = function () {
        document.getElementById("showce").innerHTML = this.responseText;
    };
}

function showGrade() {
    const ret = new XMLHttpRequest();
    var name = document.getElementById("name").value;
    ret.open("GET", "http://127.0.0.1:5000/grades/"+name, true);
    ret.send();
    ret.onload = function () {
        document.getElementById("showgr").innerHTML = this.responseText;
    };
}