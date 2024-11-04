let initialMoney = 1500;
let costPerSpin = 150;
let reelRunning = [false, false, false]; // Estado de cada carrete

const iconMap = ["banana", "seven", "cherry", "plum", "orange", "bell", "bar", "lemon", "melon"];
const iconValues = {
    "banana": 10,
    "seven": 100,
    "cherry": 50,
    "plum": 20,
    "orange": 15,
    "bell": 75,
    "bar": 30,
    "lemon": 25,
    "melon": 40
};

function updateMoneyDisplay() {
    document.getElementById("monto").innerText = initialMoney;
}

function startGame() {
    if (initialMoney < costPerSpin) {
        alert("No tienes suficiente dinero para jugar.");
        return;
    }

    initialMoney -= costPerSpin;
    updateMoneyDisplay();

    reelRunning = [true, true, true]; // Activa todos los carretes
    rollAll(); // Inicia la animación de todos los carretes
}

function stopReel(index) {
    reelRunning[index] = false; // Detiene el carrete seleccionado
}

async function rollAll() {
    const reels = [document.getElementById('reel1'), document.getElementById('reel2'), document.getElementById('reel3')];
    const results = [];

    for (let i = 0; i < reels.length; i++) {
        results.push(await roll(reels[i], i));
    }

    calculateWinnings(results);
}

async function roll(reel, index) {
    return new Promise((resolve) => {
        let position = 0;
        const interval = setInterval(() => {
            if (!reelRunning[index]) { // Detiene el carrete si está marcado como detenido
                clearInterval(interval);
                resolve(position % iconMap.length); // Devuelve el índice del ícono final
            } else {
                position++;
                reel.style.backgroundPositionY = `${-position * 79}px`; // Cambia la posición
            }
        }, 100);
    });
}

function calculateWinnings(results) {
    const icons = results.map(i => iconMap[i]);
    let winnings = 0;

    if (icons[0] === icons[1] && icons[1] === icons[2]) {
        winnings = iconValues[icons[0]] * 10; // Premio grande por coincidencia de tres
    } else if (icons[0] === icons[1] || icons[1] === icons[2] || icons[0] === icons[2]) {
        winnings = iconValues[icons[1]] * 5; // Premio menor por coincidencia de dos
    }

    initialMoney += winnings;
    updateMoneyDisplay();

    alert(`Ganaste ${winnings}!`); // Informa el premio al jugador
}
