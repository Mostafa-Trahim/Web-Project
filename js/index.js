// var createPostButton = document.getElementById("createPostbutton");

// createPostButton.addEventListener("click", function() {
//     window.location.href = "./post.html"
//     console.log(error);
// });


document.addEventListener("DOMContentLoaded", function() {
    var loginButton = document.getElementById('loginButton');
    loginButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default action of the button

        var email = document.getElementById('emailInput').value;
        var password = document.getElementById('passwordInput').value;
        var warningMessage = document.getElementById('warningMessage');

    if (email.trim() === '' || password.trim() === '') {
        warningMessage.innerText = 'Invalid email or password!';
        return false;
    } else {
        warningMessage.innerText = '';
        return true;
    }
})
})

document.getElementById('loginButton').addEventListener('click', function(event) {
    event.preventDefault();
    validateLoginForm();
})