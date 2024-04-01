// const axios = require('axios');
// import axios from 'axios';

const BackendUrl = 'http://localhost:3000';

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
    const res = await axios.post(`${BackendUrl}/auth/register`, {
    username,
    email,
    password
  })
  // redirect to home page
  window.location.href = "./index.html";
  // window.location.href = "#LoginModal";
  } catch (error) { 
    console.error("cyka error : " + error);
    const warningMessage = document.getElementById('RegisterWarningMessage');
    warningMessage.innerText = "Failed to Create User!";
  }
}

const LoginSubmit = async (formData) => {
  const username = formData.get('username');
  const password = formData.get('password');

  // console.log(username, password);

  //validate form if it's empty return error and put in on the warningMessage
  if (username.trim() === '' || password.trim() === '') {
    const warningMessage = document.getElementById('LoginWarningMessage');
    warningMessage.innerText = 'Please fill all fields!';
    return false;
  } else {
    const warningMessage = document.getElementById('LoginWarningMessage');
    warningMessage.innerText = '';
  }
  // const warningMessage = document.getElementById('warningMessage');

  // console.log(username, email, password);
  try {
    const res = await axios.post(`${BackendUrl}/auth/login`, {
    username,
    password
  })
  console.log(res.data);
  // set user to local storage

  localStorage.setItem("user", JSON.stringify(res.data));

  console.log(res.data.token);

  // set token to local storage
  localStorage.setItem("token", res.data.token);

  // redirect to home page
  window.location.href = "./index.html"; 

  } catch (error) { 
    console.error("cyka error : " + error);
    const warningMessage = document.getElementById('LoginWarningMessage');
    warningMessage.innerText = "Invalid Credentials!";
  }
}



document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent the default form submission behavior
  const formData = new FormData(this);
  RegisterSubmit(formData);
  showLoggedInUserInfo();
});

document.getElementById('registerBtn').addEventListener('click', function(e) {
  e.preventDefault(); // Prevent the default button click behavior
  const formData = new FormData(document.getElementById('registerForm'));
  RegisterSubmit(formData);
  showLoggedInUserInfo();
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent the default form submission behavior
  const formData = new FormData(this);
  LoginSubmit(formData);
  showLoggedInUserInfo();
});

document.getElementById('loginBtn').addEventListener('click', function(e) {
  e.preventDefault(); // Prevent the default button click behavior
  const formData = new FormData(document.getElementById('loginForm'));
  LoginSubmit(formData);
  showLoggedInUserInfo();
});

// Add this function to show logged-in user information in the header
function showLoggedInUserInfo() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    // Hide Login/Signup buttons
    document.getElementById("HeaderLoginBtn").style.display = "none";
    document.getElementById("HeadeRegisterBtn").style.display = "none";
    document.getElementById("SignUpCardPop").style.display = "none";
    // Show username in the header
    const headerRight = document.querySelector(".Header-right");
    const headerIcons = document.querySelector(".Header-icons")
    const usernameElement = document.createElement("span");
    usernameElement.textContent = `${user.username}!`;
    usernameElement.style.fontWeight = "bold"
    usernameElement.style.cursor = "pointer"
    const logoutButton = document.createElement("button");
    logoutButton.textContent = "Logout";
    logoutButton.setAttribute('class', 'btn btn-danger text-white me-2')
    logoutButton.onclick = function() {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "./index.html";
    };
    headerIcons.appendChild(usernameElement);
    headerIcons.appendChild(logoutButton);
    
    // headerRight.appendChild(usernameElement);
    // headerRight.appendChild(logoutButton);
  }
}

// Call this function when the page loads to check if the user is logged in
window.onload = showLoggedInUserInfo;

