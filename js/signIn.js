let sessionToken = false;
document.getElementById("submit").addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username === "admin" && password === "admin123") {
        sessionToken = true;
        window.location.href = "home.html";
    } else {
        document.getElementById("alert").innerHTML = `Invalid username or password.` + `<br>` + ` Try default username and password.`;
        sessionToken = false;
    }
});

const checkSession = () => {
    if (!sessionToken) {
        window.location.href = "index.html";
    } else {
        window.location.href = "home.html";
    }
}