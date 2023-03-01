const contactInfo = document.getElementsByClassName('contact-info');
let counter = 0;

function addContact() {
    var name = document.getElementById("fname");
    var phone = document.getElementById("fnumber");
    var flaga = false;

    if (!phoneNumberCheck(phone)) {
        phone.style.backgroundColor = "#FF7D7D";
        flaga = true;
    } else {
        phone.style.backgroundColor = "#fff";
    }

    if (!nameCheck(name)) {
        name.style.backgroundColor = "#FF7D7D";
        flaga = true;
    } else {
        name.style.backgroundColor = "#fff";
    }

    if (flaga) {
        return;
    }

    const contactsBook = document.getElementById("contacts");
    const newChild = contactInfo[0].cloneNode(true);
    newChild.style.display = 'flex';
    newChild.firstElementChild.innerText = name.value + "\n" + phone.value;
    
    newChild.lastElementChild.id = counter;
    newChild.id = counter;
    counter += 1;

    contactsBook.append(newChild);
    name.value = "";
    phone.value = "";

}

function phoneNumberCheck(phoneNumber) {
    var regEx = /^ *(\+)? *((?:[0-9] *){2})?(?:[0-9] *){9}$/;
    if (phoneNumber.value.match(regEx)) {
        return true;
    } else {
        return false;
    }
}

function nameCheck(contactName) {
    var regEx = /^[A-Z]{1}[a-ż]* [A-Z]{1}[a-ż]*(\-)?([A-Z]{1}[a-ż]*)?$/;
    if (contactName.value.match(regEx)) {
        return true;
    } else {
        return false;
    }
}

function deleteContact(elem) {
    elem.parentElement.remove();
}