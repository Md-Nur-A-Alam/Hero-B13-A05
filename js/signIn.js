let sessionToken = false;
const signInFunc = () => {
    const usernameText = document.getElementById("username");
    const username = usernameText.value.trim();
    const passwordText = document.getElementById("password");
    const password = passwordText.value.trim();
    if (username === "admin" && password === "admin123") {
        sessionToken = true;
        alert("Login successful!");
        window.location.href = "home.html";
    } else {
        document.getElementById("alert").innerHTML = `**Invalid username or password.**<br>**Try default username and password.**`;
        usernameText.value = "";
        passwordText.value = "";
        sessionToken = false;
    }

};

const checkSession = () => {
    if (!sessionToken || sessionToken === false) {
        window.location.href = "index.html";
    } else {
        window.location.href = "home.html";
    }
}