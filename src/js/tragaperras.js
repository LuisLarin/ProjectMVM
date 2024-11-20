const symbols = [
    '../../../../assets/images/cereza.png',
    '../../../../assets/images/limon.png',
    '../../../../assets/images/naranja.png',
    '../../../../assets/images/uva.png',
    '../../../../assets/images/bolsa.png',
    '../../../../assets/images/diamante.png',
    '../../../../assets/images/siete.png'
];

let score = 1000; // Puntuación inicial

// Función para obtener un símbolo aleatorio
function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// Función para animar el giro de un rodillo
function animateReel(reel, finalSymbol) {
    return new Promise((resolve) => {
        let counter = 0;
        const intervalId = setInterval(() => {
            reel.src = getRandomSymbol();
            counter++;
            if (counter > 20) {
                clearInterval(intervalId);
                reel.src = finalSymbol;
                resolve();
            }
        }, 50);
    });
}

// Función para girar los rodillos
async function spin() {
    const reels = [
        document.querySelector('#reel1 img'),
        document.querySelector('#reel2 img'),
        document.querySelector('#reel3 img')
    ];

    const finalSymbols = reels.map(() => getRandomSymbol());

    // Desactivar el botón durante la animación
    document.querySelector('button').disabled = true;

    // Animar cada rodillo
    await Promise.all(reels.map((reel, index) => animateReel(reel, finalSymbols[index])));

    // Reactivar el botón
    document.querySelector('button').disabled = false;

    return finalSymbols;
}

// Función para verificar si el jugador ha ganado
function checkWin(reels) {
    const resultElement = document.getElementById('result');
    const scoreElement = document.getElementById('score');
    let winAmount = 0;

    if (reels[0] === reels[1] && reels[1] === reels[2]) {
        winAmount = 500;
        resultElement.textContent = `¡Felicidades! ¡Has ganado el premio mayor de ${winAmount} puntos!`;
    } else if (reels[0] === reels[1] || reels[1] === reels[2] || reels[0] === reels[2]) {
        winAmount = 100;
        resultElement.textContent = `¡Has ganado un premio menor de ${winAmount} puntos!`;
    } else {
        resultElement.textContent = "Lo siento, no has ganado esta vez. ¡Inténtalo de nuevo!";
    }

    score += winAmount - 10; // Restar 10 puntos por cada giro
    scoreElement.textContent = `Puntuación: ${score}`;

    return winAmount > 0;
}

// Función principal para jugar
async function playSlotMachine() {
    if (score < 10) {
        alert("¡Te has quedado sin puntos! Recarga la página para jugar de nuevo.");
        return;
    }

    const result = await spin();
    checkWin(result);
}

// Inicializar la puntuación
document.addEventListener('DOMContentLoaded', () => {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Puntuación: ${score}`;
});
