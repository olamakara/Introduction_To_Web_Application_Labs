document.getElementsByClassName("container")[0].addEventListener("mousedown", deleteMoves);

function deleteMoves() {
    var descriptionElement = document.getElementById("action-description");
    while (descriptionElement.lastChild) {
        descriptionElement.removeChild(descriptionElement.lastChild);
    }
}

let counter = 0;
let flaga = false;  // false -> brak propagation

let one = document.getElementById('one');
let two = document.getElementById('two');
let three = document.getElementById('three');
one.addEventListener('click', someOff);
two.addEventListener('click', someOff);
three.addEventListener('click', someOff);

function someOff() {
    var countingElement = document.getElementById('counter');
    if (countingElement.innerText > 30) {
        two.onclick = 'none';
        two.style.backgroundColor = '#B2B2B2';
    }

    if (countingElement.innerText > 50) {
        three.onclick = 'none';
        three.style.backgroundColor = '#6D8299';
    }
}

function addOne() {
    clickDiv("różowy", 1);
}

function addTwo() {
    clickDiv("pomarańczowy", 2);
}

function addFive() {
    clickDiv("żółty", 5);
}

function resetCounter() {
    counter = 0;
    var element = document.getElementById("counter");
    element.innerText = counter;
    var descriptionElement = document.getElementById("action-description");
    descriptionElement.remove();
    var moveElement = document.getElementById("move");
    var newChild = document.createElement("div");
    newChild.id = "action-description";
    moveElement.appendChild(newChild);
    if (two.onclick = 'none') {
        two.addEventListener('click', addTwo);
        two.style.backgroundColor = '#FFE4C0';
    }
    if (three.onclick = 'none') {
        three.addEventListener('click', addFive);
        three.style.backgroundColor = '#F0FFC2';
    }
}

function clickDiv(color, number) {
    counter += number;
    var countingElement = document.getElementById("counter");
    countingElement.innerText = counter;
    var descriptionElement = document.getElementById("action-description");
    var newChild = document.createElement("div");
    newChild.innerText = "nacisnąłeś " + color + " o wartości " + number;
    descriptionElement.appendChild(newChild);
}

function propagation() {
    var element = document.getElementById("start-stop");
    if (flaga) {
        flaga = false;
        element.innerText = "Start Propagation";
        two.removeEventListener("click", stop);
        three.removeEventListener("click", stop);
    } else {
        flaga = true;
        element.innerText = "Stop Propagation";
        two.addEventListener("click", stop);
        three.addEventListener("click", stop);
    }
}

function stop(event) {
    event.stopPropagation();
}