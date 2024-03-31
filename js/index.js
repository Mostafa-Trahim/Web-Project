// const axios = require('axios');
// import axios from 'axios';


// I will delete this soon
document.addEventListener("DOMContentLoaded", function() {
    var loginButton = document.getElementById('loginButton');
    loginButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default action of the button

        var email = document.getElementById('emailInput').value;
        var password = document.getElementById('passwordInput').value;
        var warningMessage = document.getElementById('LoginWarningMessage');

    if (email.trim() === '' || password.trim() === '') {
        warningMessage.innerText = 'Invalid email or password!';
        return false;
    } else {
        warningMessage.innerText = '';
        return true;
    }
})
})

const RegisterSubmit = async (formData) => {
  const username = formData.get('username');
  const email = formData.get('email');
  const password = formData.get('password');

  //validate form if it's empty return error and put in on the warningMessage
  if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
    const warningMessage = document.getElementById('RegisterWarningMessage');
    warningMessage.innerText = 'Please fill all fields!';
    return false;
  } else {
    const warningMessage = document.getElementById('RegisterWarningMessage');
    warningMessage.innerText = '';
  }
  // const warningMessage = document.getElementById('warningMessage');

  // console.log(username, email, password);
  try {
    const res = await axios.post('http://localhost:3000/auth/register', {
    username,
    email,
    password
  })
  // redirect to home page
  window.location.href = "./index.html";
  } catch (error) { 
    console.error("cyka error : " + error);
    const warningMessage = document.getElementById('RegisterWarningMessage');
    warningMessage.innerText = error;
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
