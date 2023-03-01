var imageArray = ['jeden.jpg', 'dwa.jpg', 'trzy.jpg'];
var borderColor = ['green', 'orange', 'blue']
let counter = 1;

function changePhoto() {
    
    var element = document.getElementById('image');
    element.src = imageArray[counter % 3];
    element.style.borderColor = borderColor[counter % 3];
    counter += 1;

}