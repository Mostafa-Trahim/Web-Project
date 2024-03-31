// var createPostButton = document.getElementById("createPostbutton");

// createPostButton.addEventListener("click", function() {
//     window.location.href = "./post.html"
//     console.log(error);
// });
// const axios = require('axios');

// // import axios from 'axios';
// import axios from 'axios';


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

const RegisterSubmit = (formData) => {
  const username = formData.get('username');
  const email = formData.get('email');
  const password = formData.get('password');

  // const warningMessage = document.getElementById('warningMessage');

  // console.log(username, email, password);
  try {
    const res = axios.post('http://localhost:3000/auth/register', {
    username,
    email,
    password
  })
  // redirect to home page
  window.location.href = "./index.html";
  } catch (error) { 
    console.error(error);
    // warningMessage.innerText = error;
  }
}

document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent the default form submission behavior
  const formData = new FormData(this);
  RegisterSubmit(formData);
});

document.getElementById('registerBtn').addEventListener('click', function(e) {
  e.preventDefault(); // Prevent the default button click behavior
  const formData = new FormData(document.getElementById('registerForm'));
  RegisterSubmit(formData);
});
