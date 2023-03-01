let currentLast = 0;
let currentFirst = 2;

const workerOne = document.getElementById("worker1");
const workerTwo = document.getElementById("worker2");
const workerThree = document.getElementById("worker3");
const workersArray = [workerOne, workerTwo, workerThree];

const leftButton = document.getElementById("left-button");
const rightButton = document.getElementById("right-button");
const shuffleButton = document.getElementById("shuffle");
leftButton.addEventListener("click", turnLeft);
rightButton.addEventListener("click", turnRight);
shuffleButton.addEventListener("click", shuffle);

function turnLeft() {
    workersArray[currentLast].style.opacity = "1";
    currentLast = (currentLast + 2) % 3;
    currentFirst = (currentLast + 2) % 3;
    if (currentLast == 0) {
        workerOne.style.opacity = "0";
        workerOne.style.animationName = "three";
        workerTwo.style.animationName = "five";
        workerThree.style.animationName = "five";
    } else if (currentLast == 1) {
        workerTwo.style.opacity = "0";
        workerTwo.style.animationName = "four";
        workerOne.style.animationName = "two";
        workerThree.style.animationName = "seven";
    } else if (currentLast == 2) {
        workerThree.style.opacity = "0";
        workerThree.style.animationName = "six";
        workerOne.style.animationName = "one";
        workerTwo.style.animationName = "one";
    }
}

function turnRight() {
    workersArray[currentFirst].style.opacity = "1";
    currentFirst = (currentFirst + 1) % 3;
    currentLast = (currentFirst + 1) % 3;
    if (currentFirst == 0) {
        workerOne.style.opacity = "0";
        workerOne.style.animationName = "eight";
        workerTwo.style.animationName = "nine";
        workerThree.style.animationName = "nine";
    } else if (currentFirst == 1) {
        workerTwo.style.opacity = "0";
        workerTwo.style.animationName = "ten";
        workerOne.style.animationName = "eleven";
        workerThree.style.animationName = "twelve";
    } else if (currentFirst == 2) {
        workerThree.style.opacity = "0";
        workerThree.style.animationName = "thirteen";
        workerOne.style.animationName = "fourteen";
        workerTwo.style.animationName = "fourteen";
    }
}

function shuffle() {
    let choice = Math.floor(Math.random() * 2);
    if (choice == 0) {
        turnLeft();
    } else {
        turnRight();
    }
}