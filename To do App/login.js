// Clear previous session
localStorage.removeItem("loggedInUser");

// Load users
let users = JSON.parse(localStorage.getItem("users")) || {};

// Elements
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const showRegisterBtn = document.getElementById("showRegisterBtn");
const backToLoginBtn = document.getElementById("backToLoginBtn");
const loginError = document.getElementById("loginError");
const registerMsg = document.getElementById("registerMsg");

// --- Toggle forms ---
showRegisterBtn.addEventListener("click", () => {
    registerForm.style.display = "block";
    loginForm.style.display = "none";
    showRegisterBtn.style.display = "none";
});

backToLoginBtn.addEventListener("click", () => {
    registerForm.style.display = "none";
    loginForm.style.display = "block";
    showRegisterBtn.style.display = "block";
});

// --- Login ---
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const usernameInput = document.getElementById("loginUsername").value.trim();
    const passwordInput = document.getElementById("loginPassword").value;

    if (Object.keys(users).length === 0) {
        loginError.textContent = "No users exist! Please create an account.";
        loginError.style.display = "block";
        return;
    }

    // Case-insensitive username match
    const usernameKey = Object.keys(users).find(u => u.toLowerCase() === usernameInput.toLowerCase());
    if (usernameKey && users[usernameKey].password === passwordInput) {
        localStorage.setItem("loggedInUser", usernameKey);
        window.location.href = "index.html";
    } else {
        loginError.textContent = "Invalid username or password";
        loginError.style.display = "block";
        setTimeout(() => loginError.style.display = "none", 3000);
    }
});

// --- Register ---
registerForm.addEven
