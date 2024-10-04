function getUsernameFromParamsURL() {
    return new URLSearchParams(window.location.search).get("username")
}
function authenticatUser() {
    const username = getUsernameFromParamsURL();

    const mainContainer = document.getElementById("main-container")
    const loginButtonGroup = document.getElementById("login")
    const logoutButtonGroup = document.getElementById("logout")
    const welcomeContainer = document.getElementById("welcome-container")
    if (username) {
        //hide login button
        loginButtonGroup.style.display = "none"
        //show logout button
        logoutButtonGroup.style.display = "block"
        //show welcome message
        //create h1 element for welcome message
        const profileWelcome = document.createElement("h1")
        profileWelcome.style.fontSize = "3rem"
        profileWelcome.textContent = `Welcome ${username}`

        //add create post button
        const createPostButton = document.createElement("button")
        createPostButton.textContent = "Create Post"
        createPostButton.classList.add("btn-secondary")
        createPostButton.onclick = () => {
            window.location.href = "/post"
        }
        welcomeContainer.innerHTML = profileWelcome.innerText;
        mainContainer.appendChild(createPostButton)


    }
}
function logout() {
    window.location.href = "/login"
}
window.onload = () => {
    authenticatUser()
}