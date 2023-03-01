var firstFlague = true;
var secondFlague = true;
// sprawdzic potem czy da sie to jakos uwspolnic
// 8 or more char ^.{8,}$
// at least one special char ^.*[^0-9A-Za-ząćęńóśźżĄĆĘŃÓŚŹŻ].*$
// at least one capital letter ^.*[A-Z]|Ą|Ć|Ę|Ń|Ó|Ś|Ź|Ż$
// at least one digit ^.*[0-9].*$

const newPasswordInput = document.getElementById("new-password");
const repeatPasswordInput = document.getElementById("repeat-new-password");
const ifMatchPasswords = document.getElementById("hidden-alert");

const firstIf = document.getElementById("first-if");
const secondIf = document.getElementById("second-if");
const thirdIf = document.getElementById("third-if");
const fourthIf = document.getElementById("fourth-if");

var firstRegEx = /^.{8,}$/;
var secondRegEx = /^.*[^0-9A-Za-ząćęńóśźżĄĆĘŃÓŚŹŻ].*$/;
var thirdRegEx = /^.*[A-Z]|Ą|Ć|Ę|Ń|Ó|Ś|Ź|Ż$/;
var fourthRegEx = /^.*[0-9].*$/;

newPasswordInput.addEventListener("keyup", checkInput);
repeatPasswordInput.addEventListener("keyup", checkCompatibility);

function changeFirstInputType() {
    // const newPasswordInput = document.getElementById("new-password");
    const firstEye = document.getElementById("first-eye");
    if (firstFlague) {
        newPasswordInput.type = "text";
        firstEye.firstChild.className = "fa-regular fa-eye-slash";
        firstFlague = false;
    } else {
        newPasswordInput.type = "password";
        firstEye.firstChild.className = "fa-regular fa-eye";
        firstFlague = true;
    }
}

function changeSecondInputType() {
    // const repeatPasswordInput = document.getElementById("repeat-new-password");
    const secondEye = document.getElementById("second-eye");
    if (secondFlague) {
        repeatPasswordInput.type = "text";
        secondEye.firstChild.className = "fa-regular fa-eye-slash";
        secondFlague = false;
    } else {
        repeatPasswordInput.type = "password";
        secondEye.firstChild.className = "fa-regular fa-eye";
        secondFlague = true;
    }
}

function checkInput() {
    if (newPasswordInput.value.match(firstRegEx)) {
        firstIf.className = "fa-solid fa-circle-check color-green";
    } else {
        firstIf.className = "fa-solid fa-circle-xmark color-grey";
    }

    if (newPasswordInput.value.match(secondRegEx)) {
        secondIf.className = "fa-solid fa-circle-check color-green";
    } else {
        secondIf.className = "fa-solid fa-circle-xmark color-grey";
    }

    if (newPasswordInput.value.match(thirdRegEx)) {
        thirdIf.className = "fa-solid fa-circle-check color-green";
    } else {
        thirdIf.className = "fa-solid fa-circle-xmark color-grey";
    }

    if (newPasswordInput.value.match(fourthRegEx)) {
        fourthIf.className = "fa-solid fa-circle-check color-green";
    } else {
        fourthIf.className = "fa-solid fa-circle-xmark color-grey";
    }
}

function checkCompatibility() {
    if (newPasswordInput.value == repeatPasswordInput.value) {
        ifMatchPasswords.style.display = "none";
    } else {
        ifMatchPasswords.style.display = "flex";
    }
}
