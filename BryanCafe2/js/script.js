
function clearRegistrationForm() {
    document.querySelector(".registrationForm").reset();
}

function getCurrentYear() {
    return new Date().getFullYear();
}

function validateRegistrationForm() {
    // Get form field values
    let password = document.querySelector("#password").value;
    let confirmPassword = document.querySelector("#confirmPassword").value;
    let isNoErrors = true;

    // Validate password and confirm password match
    if (password !== confirmPassword) {
        alert("Password and Confirm Password do not match. Please try again.");
        isNoErrors = false;
    }

    // Uncomment this section if phone number validation is needed
    
    let phoneNumber = document.forms["registrationForm"]["phoneNumber"].value;
    if (phoneNumber !== '' && isNaN(phoneNumber)) {
        alert("Invalid telephone number. Please try again.");
        isNoErrors = false;
    }
    

    return isNoErrors;
}
