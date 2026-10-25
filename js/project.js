const loginBtn = document.querySelector("#loginBtn");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");

loginBtn.addEventListener("click", (e) => {
    e.preventDefault(); 

    const man = JSON.parse(localStorage.getItem("man")) || { users: [] };
    const inputName = usernameInput.value;
    const inputPassword = passwordInput.value;

    const existingUser = man.users.find(u => u.name === inputName);

    if (existingUser) {
        if (existingUser.password === inputPassword) {
            sessionStorage.setItem("currentUser", inputName);
            window.location.href = "home_page.html"; 
        } else {
            alert("סיסמה שגויה");
        }
    } else {
        alert("משתמש לא קיים. יש להירשם קודם.");
    }
});