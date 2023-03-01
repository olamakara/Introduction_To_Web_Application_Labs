window.addEventListener("click", viewMessage);

const messageWindow = document.getElementById("message");
const ballContainer = document.getElementById("ball-container");
ballContainer.addEventListener("click", clickBox);
ballContainer.addEventListener("click", stopProp);

function stopProp(event) {
    event.stopPropagation();
}

function viewMessage() {
    messageWindow.style.display = "inline-block";
}

function clickBox(event) {
    messageWindow.style.display = "none";

    const ball = document.getElementById("ball");
    // ball div: 50 x 50 (25 + 5 + 10) <-> (half ball + border + margin)
    var ballPositionX = event.clientX - 40;
    var ballPositionY = event.clientY - 40;

    ball.style.left = ballPositionX + "px";
    ball.style.top = ballPositionY + "px";
}