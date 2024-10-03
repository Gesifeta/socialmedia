import dotenv from "dotenv"
dotenv.config();

//show logout button
function showLogoutButton() {
    const logoutButton = document.getElementById('logout');
    logoutButton.style.display = 'block';
    return hideLoginButton();
}

//hide logout button
function hideLogoutButton() {
    const logoutButton = document.getElementById('logout');
    logoutButton.style.display = 'none';
    return showLoginButton();
}
//show login button
function showLoginButton() {
    const loginButton = document.getElementById('login');
    loginButton.style.display = 'flex';
    return hideLogoutButton();
}
//register user
async function registerUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
const confirmPassword = document.getElementById('confirmPassword').value;
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    const user={
        username:username,
        password:password
    }
const API_URI= process.env.API_URI
    // Send a POST request to the server to register the user
    const response= await fetch(`${API_URI}/user/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    if (!response.ok) {
        throw new Error('Failed to register user');
    }
    const json= await response.json()
     if(json.error){
        alert(json.error)
     }else{
        hideLoginButton()
        alert(json.message)
     }       
}
//hide login button
function hideLoginButton() {
    const loginButton = document.getElementById('login');
    loginButton.style.display = 'none';
    return showLogoutButton();
}
//logout
function logout() {
    // Clear the token from local storage
    localStorage.removeItem('token');
    // Hide the logout button
    hideLogoutButton();
    // Redirect to the login page
    window.location.href = 'login.html';
}

// Check if the user is authenticated
function isAuthenticated() {
    // Check if the token exists in local storage
    const token = localStorage.getItem('token');
    return token !== null;
}

// Show or hide the logout button based on authentication status
function updateLogoutButton() {
    if (isAuthenticated()) {
        showLogoutButton();
    } else {
        hideLogoutButton();
    }
}
// Call the updateLogoutButton function on page load
window.addEventListener('load', updateLogoutButton);

//logout button
const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', logout);