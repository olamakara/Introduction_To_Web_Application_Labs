var start = false;
let counter = 0;

function begin() {
    start = true;
}

function add() {
    if (start) {
        counter += 1;
        var element = document.getElementById("counter");
        element.innerText = counter;
    }
}

function stop() {
    start = false;
    counter = 0;
    document.getElementById("counter").innerText = counter;
}