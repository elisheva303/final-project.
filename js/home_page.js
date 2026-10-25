window.onload = () => {
    const userName = sessionStorage.getItem("currentUser");
    const manData = JSON.parse(localStorage.getItem("man"));
    const displayElement = document.querySelector("#welcome-message");

    if (userName) {
        displayElement.textContent = `שלום לך, ${userName}`;
        displayElement.style.color = "white";
        displayElement.style.marginTop = "2vw";
        if (manData && manData.users) {
            const user = manData.users.find(u => u.name === userName);
            if (user) {
                document.querySelector(".win-glow").textContent = user.good || 0;
                document.querySelector(".loss-glow").textContent = user.bed || 0;
            }
        }
    } else {
        displayElement.textContent = "אורח, נא להתחבר";
        displayElement.style.color = "white";
    }
};