
const level = document.querySelector(".level");
const colorsArr = [
    document.querySelector(".color_one"),
    document.querySelector(".color_tow"),
    document.querySelector(".color_twree"),
    document.querySelector(".color_four")
];

let count_level = 1;
let isPlayerTurn = false;
const computerSequence = []; 
let playerStep = 0; 
let currentUserName = sessionStorage.getItem("currentUser") || "אורח";
let man = JSON.parse(localStorage.getItem("man")) || { users: [] };
let user = man.users.find(u => u.name === currentUserName);

if (!user) {
    user = { name: currentUserName, bed: 0, good: 0 };
    man.users.push(user);
}

const playNote = (frequency) => {
    try {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        oscillator.type = 'square'; 
        oscillator.frequency.setValueAtTime(frequency, context.currentTime); 
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.1);
        oscillator.stop(context.currentTime + 0.1);
    } catch (e) {
        console.log("Audio not supported yet");
    }
};

const activateColor = (element, index) => {
    if (!element) return;
    const shadows = ["#ff0044", "#00ff66", "#00d4ff", "#ffaa00"];
    element.style.boxShadow = `0 0 20px ${shadows[index]}, 0 0 40px ${shadows[index]}`;
    playNote(200 + ((index + 1) * 100));
    
    const visualDuration = Math.max(200, 500 - (count_level * 30));
    setTimeout(() => {
        element.style.boxShadow = "none";
    }, visualDuration);
};

const updateUIStats = () => {
    const winElement = document.querySelector(".win-glow");
    const lossElement = document.querySelector(".loss-glow");
    if (winElement) winElement.textContent = user.good;
    if (lossElement) lossElement.textContent = user.bed;
};

const saveProgress = () => {
    localStorage.setItem("man", JSON.stringify(man));
    updateUIStats();
};

const resetGame = () => {
    count_level = 1;
    computerSequence.length = 0;
    playerStep = 0;
    isPlayerTurn = false;
    level.textContent = "רמה 1 - לחץ להתחלה";
};


const play = () => {
    isPlayerTurn = false;
    playerStep = 0; 
    const randIndex = Math.floor(Math.random() * 4);
    computerSequence.push(colorsArr[randIndex]);
    level.textContent = "רמה " + count_level;

    const displaySpeed = Math.max(300, 800 - (count_level * 50));
    computerSequence.forEach((element, index) => {
        setTimeout(() => {
            activateColor(element, colorsArr.indexOf(element));
            if (index === computerSequence.length - 1) {
                setTimeout(() => { isPlayerTurn = true; }, displaySpeed / 2);
            }
        }, index * displaySpeed); 
    });
};

const sequence = (clickedElement) => {
    if (!isPlayerTurn) return;

    if (clickedElement === computerSequence[playerStep]) {
        playerStep++;
        if (playerStep === computerSequence.length) {
            isPlayerTurn = false; 
            if (count_level === 10) {
                user.good++;
                saveProgress();
                alert("כל הכבוד! סיימת 10 רמות.");
                resetGame(); 
            } else {
                count_level++;
                setTimeout(play, 1000); 
            }
        }
    } else {
        isPlayerTurn = false; 
        user.bed++;
        saveProgress();

        playNote(150); 
        playNote(100);

        const failSound = new Audio('image/sound.mp3');
        failSound.play().catch(() => console.log("Sound file missing"));
        setTimeout(() => {
            alert("אופס! טעית ברצף ברמה " + count_level);
            resetGame();
        }, 100);
    }
};

level.addEventListener('click', () => {
    if (!isPlayerTurn && computerSequence.length === 0) play();
});

colorsArr.forEach((btn, index) => {
    if (btn) {
        btn.addEventListener('click', () => {
            if (isPlayerTurn) {
                activateColor(btn, index);
                sequence(btn);
            }
        });
    }
});

updateUIStats();