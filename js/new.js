const button = document.querySelector("button");
const username = document.querySelector("#username");
const password = document.querySelector("#password");

let man = JSON.parse(localStorage.getItem("man")) || { users: [] };

button.addEventListener("click", (e) => {
    e.preventDefault();

    const inputName = username.value;
    const inputPassword = password.value;
    if (inputName === "" || inputPassword === "") {
        alert("חובה למלא גם שם משתמש וגם סיסמה!");
        return; 
    }
    if (inputPassword.length < 8) {
        alert("הסיסמה חייבת להכיל לפחות 8 תווים!");
        return; 
    }

    const exists = man.users.some(u => u.name === inputName);

    if (exists) {
        alert("השם הזה כבר תפוס. אנא בחר שם משתמש אחר.");
    } else {
        const user = {
            name: inputName,
            password: inputPassword,
            bed: 0,
            good: 0
        };

        man.users.push(user);
        localStorage.setItem('man', JSON.stringify(man));
        sessionStorage.setItem("currentUser", inputName);
        
        alert("נרשמת בהצלחה!");
        window.location.href = "home_page.html"; 
    }

    username.value = "";
    password.value = "";
});