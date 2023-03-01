let counter = 0;
var element = document.getElementById("lista");

function addElement() {
    counter += 1;
    const newElement = document.createElement("li");
    newElement.innerText = `item ${counter}`;
    element.appendChild(newElement);
}

function subElement() {
    if (counter > 0) {
        counter -= 1;
        const li = document.querySelectorAll("#lista li");
        li[0].remove();
    }

}