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
    setTimeout(() => window.location.href = "./index.html" , 2000);

  // Show confirmation message
  const toastLiveExample = document.getElementById('regToast');
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastBootstrap.show()

  
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

  //validate form if it's empty return error and put in on the warningMessage
  if (username.trim() === '' || password.trim() === '') {
    const warningMessage = document.getElementById('LoginWarningMessage');
    warningMessage.innerText = 'Please fill all fields!';
    return false;
  } else {
    const warningMessage = document.getElementById('LoginWarningMessage');
    warningMessage.innerText = '';
  }

  try {
    const res = await axios.post(`${BackendUrl}/auth/login`, {
      username,
      password
    });

    console.log(res.data);
    // set user to local storage
    localStorage.setItem("user", JSON.stringify(res.data));
    console.log(res.data.token);

    // set token to local storage
    localStorage.setItem("token", res.data.token);

    // redirect to home page
    setTimeout(() => window.location.href = "./index.html" , 2000); 

    // Show confirmation message
    const toastLiveExample = document.getElementById('loginToast');
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastBootstrap.show()
    
  } catch (error) { 
    console.error("cyka error : " + error);
    const warningMessage = document.getElementById('LoginWarningMessage');
    warningMessage.innerText = "Invalid Credentials!";
  }
}


const interestImages = {
'Anime & Manga': '/img/icon1.jpg',
'Latest News': '/img/icon2.jpg',
'Humor': '/img/icon3.jpg',
'Memes': '/img/icon4.jpg',
'Gaming': '/img/icon5.jpg',
'WTF': '/img/icon6.jpg',
'Relationship & Dating': '/img/icon7.jpg',
'Sports': '/img/icon8.jpg',
'Wholesome': '/img/icon9.jpg',
};

const getPosts = async () => {
  try {
    const response = await axios.get(`${BackendUrl}/posts`);
    const posts = response.data;
    console.log(posts);
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = '';
    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.className = 'card mb-3 text-white';
      postElement.style = 'background-color: #1d1d1d;';
      const interestImage = interestImages[post.interest];
      postElement.innerHTML = `
        <div class="card-body">
          <p class="card-text"><img src="${interestImage}" alt="${post.interest} Logo" id="InterestLogoImg" class="interest-image" />${post.interest}<div id="testButton" class="btn-group" role="group" aria-label="Basic example">
          <button id="deletePostButton" class="btn btn-warning text-black">Delete</button>
          <button id="editPostbutton" class="btn btn-warning text-black">Edit</button>
        </div></p>
          <h3 class="card-title">${post.title}</h5>
          <img src=${post.url} class="card-img-top" alt="post">
          <div class="PostIcons d-flex gap-5 m-2 p-2 text-secondary" id="PostIcons"> 
            <i class="bi bi-arrow-up-square-fill" id="UpIcon"> Up</i>
            <i class="bi bi-arrow-down-square-fill" id="DownIcon"> Down</i>
            <i class="bi bi-chat-left-text" id="CommentIcon"><span> Comment</span></i>
            <i class="bi bi-share" id="ShareIcon"> <span>Share</span></i>
          </div>
          <div class="comment-box" style="display: none;">
          <textarea class="form-control bg-dark text-light" id="comment" rows="1 placeholder="Add a comment..."></textarea>
          <button class="btn btn-secondary mt-2" id="submit_button">Submit</button>
        </div>
        </div>
      `;



// Find the comment button
const commentButton = postElement.querySelector('.bi-chat-left-text');

// Add a click event listener to the comment button
commentButton.addEventListener('click', () => {
  // Find the comment box
  const commentBox = postElement.querySelector('.comment-box');
  
  // Toggle the display of the comment box
  if (commentBox.style.display === 'none') {
    commentBox.style.display = 'block';
  } else {
    commentBox.style.display = 'none';
  }
});


// Find the submit button
const submitButton = postElement.querySelector('#submit_button');
// Add a click event listener to the submit button
submitButton.addEventListener('click', () => {
  //alert("works") //test if the button works
  // Find the comment box
  const commentBox = postElement.querySelector('.comment-box');
  // Find the comment input
  const commentInput = postElement.querySelector('#comment');
  // Get the comment text
  const commentText = commentInput.value;
  // Get the post ID
  const postId = post.id;
  // Get the user ID
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;
  // use axios to post the comment
  axios.post(`${BackendUrl}/comments`, {
    comment_text: commentText,
    post_id: postId,
    user_id: userId
  })
  //alert the user that the comment was added successfully(can be made better with a toast message)
  .then(() => alert('Comment added successfully!'))
  // Clear the comment input
  commentInput.value = '';
    });

  //put comments  from the database under the submit button
  axios.get(`${BackendUrl}/comments`)
  .then((response) => {     
    const comments = response.data;
    console.log(comments); // test if the comments are fetched
   //get username by userid using axios
    comments.forEach(comment => {
      axios.get(`${BackendUrl}/comments/user/${comment.user_id}`)
      .then((response) => {
        const user = response.data;
        console.log(user); // test if the user is fetched
         // Create a div for each comment that should displayt the commenter name and the comment with bootstrap / only show when commetn box is open
        const commentElement = document.createElement('div');
        commentElement.className = 'card mb-3 text-white';
        commentElement.style = 'background-color: #1d1d1d;';
        //coment shold havae clear borders
        commentElement.innerHTML = `
          <div class="card-body">
            <h5 class="card-title">${user.username}</h5>
            <p class="card-text">${comment.comment_text}</p>
          </div>  
        `;
        //append the comment to the comment box
        const commentBox = postElement.querySelector('.comment-box');
        commentBox.appendChild(commentElement);
        
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
    });
  })

      const icons = postElement.querySelectorAll('i');
      icons.forEach(icon => {
        icon.style.cursor = 'pointer';
        icon.style.gap = '0.5rem';
        icon.style.fontSize = '1.2rem';
        icon.style.display = 'flex';
        icon.style.alignItems = 'center';
        icon.style.padding = '0.5rem';
        icon.style.borderRadius = '0.5rem';
        icon.onmouseover = function() {
          icon.style.backgroundColor = 'whitesmoke';
        };
        icon.onmouseout = function() {
          icon.style.backgroundColor = 'transparent';
        };
        icon.addEventListener('click', () => {

          if (!localStorage.getItem("user")) {
            alert("You must be logged in to interact with posts!");
            return;
          }
          // for each to see which icon is clicked and do the action depending on the icon

          if (icon.id === 'UpIcon') {
            console.log('Up Icon clicked:', icon);
            upvotePost(post.id);
            if (icon.style.color === 'green') {
              icon.style.color = 'gray';
            } else {
            icon.style.color = 'green';
            }
          }
          if (icon.id === 'DownIcon') {
            console.log('Down Icon clicked:', icon);
            downvotePost(post.id);
            if (icon.style.color === 'red') {
              icon.style.color = 'gray';
            } else {
            icon.style.color = 'red';
            }
          }
          if (icon.id === 'CommentIcon') {
            console.log('Comment Icon clicked:', icon);
          }
          if (icon.id === 'ShareIcon') {
            console.log('Share Icon clicked:', icon);
          }
        });
      });
      postsContainer.appendChild(postElement); // I will add btns to react
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

const upvotePost = async (postId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("You must be logged in to upvote a post!");
    return;
  }
  const userId = user.id;
  console.log('Upvoting post:', postId);
  try {
    const res = await axios.post(`${BackendUrl}/posts/${postId}/upvote`, {
      userId
    });
    console.log(res.data);
    // getPosts();
  } catch (error) {
    console.error('Error upvoting post:', error);
  }
};

const downvotePost = async (postId) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("You must be logged in to downvote a post!");
    return;
  }
  const userId = user.id;
  console.log('Downvoting post:', postId);
  try {
    const res = await axios.post(`${BackendUrl}/posts/${postId}/downvote`, {
      userId
    });
    console.log(res.data);
    // getPosts();
  } catch (error) {
    console.error('Error downvoting post:', error);
  }
};

window.onload = getPosts();

document.querySelectorAll('.Sidebar-Categories li').forEach(item => {
  item.addEventListener('click', function() {
      const category = this.querySelector('span').textContent;
      filterPostsByCategory(category);
      console.log('Category clicked:', category);
  });
});

const filterPostsByCategory = async (category) => {
  try {
      const response = await axios.get(`${BackendUrl}/posts?category=${category}`);
      const posts = response.data;
      displayFilteredPosts(posts);
  } catch (error) {
      console.error('Error fetching filtered posts:', error);
  }
};

const displayFilteredPosts = (posts) => {
  const postsContainer = document.getElementById('postsContainer');
  postsContainer.innerHTML = '';
  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.className = 'card mb-3 text-white';
    postElement.style = 'background-color: #1d1d1d;';
    const interestImage = interestImages[post.interest];
    postElement.innerHTML = `
    <div class="card-body">
    <p class="card-text"><img src="${interestImage}" alt="${post.interest} Logo" id="InterestLogoImg" class="interest-image" />${post.interest}<div id="testButton" class="btn-group" role="group" aria-label="Basic example">
    <button id="deletePostButton" class="btn btn-warning text-black">Delete</button>
    <button id="editPostbutton" class="btn btn-warning text-black">Edit</button>
  </div></p>
    <h3 class="card-title">${post.title}</h5>
    <img src=${post.url} class="card-img-top" alt="post">
    <div class="PostIcons d-flex gap-5 m-2 p-2 text-secondary" id="PostIcons"> 
      <i class="bi bi-arrow-up-square-fill" id="UpIcon"> Up</i>
      <i class="bi bi-arrow-down-square-fill" id="DownIcon"> Down</i>
      <i class="bi bi-chat-left-text" id="CommentIcon"><span> Comment</span></i>
      <i class="bi bi-share" id="ShareIcon"> <span>Share</span></i>
    </div>
    <div class="comment-box" style="display: none;">
    <textarea class="form-control bg-dark text-light" id="comment" rows="1 placeholder="Add a comment..."></textarea>
    <button class="btn btn-secondary mt-2" id="submit_button">Submit</button>
  </div>
  </div>
`;



// Find the comment button
const commentButton = postElement.querySelector('.bi-chat-left-text');

// Add a click event listener to the comment button
commentButton.addEventListener('click', () => {
// Find the comment box
const commentBox = postElement.querySelector('.comment-box');

// Toggle the display of the comment box
if (commentBox.style.display === 'none') {
commentBox.style.display = 'block';
} else {
commentBox.style.display = 'none';
}
});


// Find the submit button
const submitButton = postElement.querySelector('#submit_button');
// Add a click event listener to the submit button
submitButton.addEventListener('click', () => {
//alert("works") //test if the button works
// Find the comment box
const commentBox = postElement.querySelector('.comment-box');
// Find the comment input
const commentInput = postElement.querySelector('#comment');
// Get the comment text
const commentText = commentInput.value;
// Get the post ID
const postId = post.id;
// Get the user ID
const user = JSON.parse(localStorage.getItem("user"));
const userId = user.id;
// use axios to post the comment
axios.post(`${BackendUrl}/comments`, {
comment_text: commentText,
post_id: postId,
user_id: userId
})
//alert the user that the comment was added successfully(can be made better with a toast message)
.then(() => alert('Comment added successfully!'))
// Clear the comment input
commentInput.value = '';
});

//put comments  from the database under the submit button
axios.get(`${BackendUrl}/comments`)
.then((response) => {     
const comments = response.data;
console.log(comments); // test if the comments are fetched
//get username by userid using axios
comments.forEach(comment => {
axios.get(`${BackendUrl}/comments/user/${comment.user_id}`)
.then((response) => {
  const user = response.data;
  console.log(user); // test if the user is fetched
   // Create a div for each comment that should displayt the commenter name and the comment with bootstrap / only show when commetn box is open
  const commentElement = document.createElement('div');
  commentElement.className = 'card mb-3 text-white';
  commentElement.style = 'background-color: #1d1d1d;';
  //coment shold havae clear borders
  commentElement.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">${user.username}</h5>
      <p class="card-text">${comment.comment_text}</p>
    </div>  
  `;
  //append the comment to the comment box
  const commentBox = postElement.querySelector('.comment-box');
  commentBox.appendChild(commentElement);
  
})
.catch((error) => {
  console.error('Error fetching user:', error);
});
});
})

const icons = postElement.querySelectorAll('i');
icons.forEach(icon => {
  icon.style.cursor = 'pointer';
  icon.style.gap = '0.5rem';
  icon.style.fontSize = '1.2rem';
  icon.style.display = 'flex';
  icon.style.alignItems = 'center';
  icon.style.padding = '0.5rem';
  icon.style.borderRadius = '0.5rem';
  icon.onmouseover = function() {
    icon.style.backgroundColor = 'whitesmoke';
  };
  icon.onmouseout = function() {
    icon.style.backgroundColor = 'transparent';
  };
  icon.addEventListener('click', () => {

    if (!localStorage.getItem("user")) {
      alert("You must be logged in to interact with posts!");
      return;
    }
    // for each to see which icon is clicked and do the action depending on the icon

    if (icon.id === 'UpIcon') {
      console.log('Up Icon clicked:', icon);
      upvotePost(post.id);
      if (icon.style.color === 'green') {
        icon.style.color = 'gray';
      } else {
      icon.style.color = 'green';
      }
    }
    if (icon.id === 'DownIcon') {
      console.log('Down Icon clicked:', icon);
      downvotePost(post.id);
      if (icon.style.color === 'red') {
        icon.style.color = 'gray';
      } else {
      icon.style.color = 'red';
      }
    }
    if (icon.id === 'CommentIcon') {
      console.log('Comment Icon clicked:', icon);
    }
    if (icon.id === 'ShareIcon') {
      console.log('Share Icon clicked:', icon);
    }
  });
});
postsContainer.appendChild(postElement); // I will add btns to react
});
};


// Creating a post using the form

const createPost = async (formData) => {
  const title = formData.get('title');
  const url = formData.get('url');
  const selectElement = document.querySelector('.form-select');
  const selectedOption = selectElement.selectedOptions[0]; // Get the selected option
  const interest = selectedOption.textContent; // Get the text content of the selected option

  const user = JSON.parse(localStorage.getItem("user"));


  console.log(title, url, interest);

  if (title.trim() === '' || url.trim() === '' || interest.trim() === '') {
    const warningMessage = document.getElementById('CreatePostWarningMessage');
    warningMessage.innerText = 'Please fill all fields!';
    return false;
  }

  try {
    const res = await axios.post(`${BackendUrl}/posts/create`, {
    title,
    url,
    interest,
    userId: user.id
  })
  console.log(res.data);
  getPosts();
  document.getElementById('createPostForm').reset();

  // redirect to home page
  setTimeout(() => window.location.href = "./index.html" , 2000);

  // Show confirmation message
  const toastLiveExample = document.getElementById('createToast');
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastBootstrap.show()
  // close the modal
  
  } catch (error) {
    console.error("cyka error : " + error);
    const warningMessage = document.getElementById('CreatePostWarningMessage');
    warningMessage.innerText = "Failed to create post!";
  }
}


document.getElementById('createPostForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent the default form submission behavior
  const formData = new FormData(this);
  createPost(formData);
});

document.getElementById('createNewPostBtn').addEventListener('click', function(e) {
  e.preventDefault(); // Prevent the default button click behavior
  const formData = new FormData(document.getElementById('createPostForm'));
  createPost(formData);
});




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

// Shuffle posts
document.getElementById('shuffleButton').addEventListener('click', function() {
  shufflePosts();
});

const shufflePosts = async () => {
  try {
    const response = await axios.get(`${BackendUrl}/posts`);
    const posts = response.data;
    const shuffledPosts = shuffleArray(posts);
    displayFilteredPosts(shuffledPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}


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

    // Add event listener to redirect to profile page
    usernameElement.addEventListener('click', function() {
      window.location.href = "profile.html"; // Change "profile.html" to the actual URL of your profile page
    });

    const logoutButton = document.createElement("button");
    logoutButton.textContent = "Logout";
    logoutButton.setAttribute('class', 'btn btn-danger text-white me-2')
    logoutButton.onclick = function() {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setTimeout(() => window.location.href = "./index.html" , 2000);

      // Show confirmation message
      const toastLiveExample = document.getElementById('logoutToast');
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
      toastBootstrap.show()
    };
    headerIcons.appendChild(usernameElement);
    headerIcons.appendChild(logoutButton);
    
    // headerRight.appendChild(usernameElement);
    // headerRight.appendChild(logoutButton);
  }
    if (!user){
      const CreatePostModal = document.getElementById('CreatePosts');
    CreatePostModal.style.display = 'none';
    const CreatePostBtn = document.getElementById('CreatePostBtn');
    CreatePostBtn.style.display = 'none';
  }
}

const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
  })
}

// Call this function when the page loads to check if the user is logged in
window.onload = showLoggedInUserInfo;