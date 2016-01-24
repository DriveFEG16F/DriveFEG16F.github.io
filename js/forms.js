
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateForm(obj) {
    //Get the trimmed name
    var nameInput = obj;
    var animalName = $(nameInput).val();
    //console.log(animalName);
    animalName = trim($(nameInput).val())

    if (animalName) {
        //Update the form with the trimmed value, just before the form is sent
        //nameInput.value = animalName
        //$(nameInput).val(animalName);
        //console.log(animalName);
        $(nameInput).val(animalName);
        return true;
    } else {
        //Trimmed value is empty
        return false;
    }
}

function trim(value) {
    return value.replace(/^\s+|\s+$/g, "");
}