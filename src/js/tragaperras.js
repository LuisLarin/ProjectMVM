// Definimos la clase Fruta para crear objetos fruta
class Fruta {
    constructor(id, nombre, imagen, valor) {
        this.id = id;          // Identificador unico de la fruta
        this.nombre = nombre;  // Nombre de la fruta
        this.imagen = imagen;  // Ruta de la imagen de la fruta
        this.valor = valor;    // Valor en puntos de la fruta
    }
}

// Lista de frutas disponibles en la tragaperras
const frutas = [
    new Fruta(1, 'Cereza', '../../../../assets/images/cereza.png', 10),
    new Fruta(2, 'Limon', '../../../../assets/images/limon.png', 20),
    new Fruta(3, 'Naranja', '../../../../assets/images/naranja.png', 30),
    new Fruta(4, 'Uva', '../../../../assets/images/uva.png', 40),
    new Fruta(5, 'Bolsa', '../../../../assets/images/bolsa.png', 100),
    new Fruta(6, 'Diamante', '../../../../assets/images/diamante.png', 200),
    new Fruta(7, 'Siete', '../../../../assets/images/siete.png', 500)
];

let puntuacion = 1000;        // Puntuacion inicial del jugador
const costePorGiro = 10;      // Coste de cada giro

// Funcion para obtener una fruta aleatoria
function obtenerFrutaAleatoria() {
    return frutas[Math.floor(Math.random() * frutas.length)];
}

// Funcion para crear una matriz 3x3 de frutas aleatorias
function inicializarMatriz() {
    const matriz = [];
    for (let i = 0; i < 3; i++) {
        matriz.push([]);
        for (let j = 0; j < 3; j++) {
            matriz[i].push(obtenerFrutaAleatoria());
        }
    }
    return matriz;
}

// Funcion para actualizar la interfaz visual con la matriz actual
function actualizarInterfaz(matriz) {
    const reels = document.querySelectorAll('.reel');
    reels.forEach((reel, i) => {
        const imgs = reel.querySelectorAll('img');
        imgs.forEach((img, j) => {
            img.src = matriz[j][i].imagen;
            img.alt = matriz[j][i].nombre;
            img.dataset.id = matriz[j][i].id;
        });
    });
}

// Funcion para animar el giro de los rodillos
function animarGiro(duracion) {
    return new Promise(resolve => {
        let matriz = inicializarMatriz();
        const intervalo = setInterval(() => {
            // Actualizamos cada posición con una nueva fruta aleatoria
            for (let i = 0; i < matriz.length; i++) {
                for (let j = 0; j < matriz[i].length; j++) {
                    matriz[i][j] = obtenerFrutaAleatoria();
                }
            }
            actualizarInterfaz(matriz);
        }, 100);

        setTimeout(() => {
            clearInterval(intervalo);
            resolve(matriz);
        }, duracion);
    });
}

// Funcion principal para realizar un giro
async function girar() {
    const boton = document.querySelector('button');
    boton.disabled = true;  // Desactivamos el boton durante el giro

    const matrizFinal = await animarGiro(3000);  // Animamos durante 3 segundos

    boton.disabled = false;  // Reactivamos el boton
    return matrizFinal[1];   // Devolvemos solo la fila del medio
}

// Funcion para verificar si hay ganancia y calcularla
function verificarGanancia(filaDelMedio) {
    const mensajeResultado = document.getElementById('result');
    const elementoPuntuacion = document.getElementById('score');
    let ganancia = 0;

    // Comprobamos si hay coincidencias consecutivas
    if (filaDelMedio[0].id === filaDelMedio[1].id && filaDelMedio[1].id === filaDelMedio[2].id) {
        // Tres frutas iguales
        ganancia = filaDelMedio[0].valor * 3;
        mensajeResultado.textContent = `Felicidades! Has ganado ${ganancia} puntos con tres ${filaDelMedio[0].nombre}s.`;
    } else if (filaDelMedio[0].id === filaDelMedio[1].id || filaDelMedio[1].id === filaDelMedio[2].id) {
        // Dos frutas iguales consecutivas
        const frutaRepetida = filaDelMedio[0].id === filaDelMedio[1].id ? filaDelMedio[0] : filaDelMedio[1];
        ganancia = frutaRepetida.valor * 2;
        mensajeResultado.textContent = `Has ganado ${ganancia} puntos con dos ${frutaRepetida.nombre}s consecutivos.`;
    } else {
        // Ninguna coincidencia consecutiva
        mensajeResultado.textContent = "Lo siento, no has ganado esta vez. Intentalo de nuevo!";
    }

    puntuacion += ganancia - costePorGiro;
    elementoPuntuacion.textContent = `Puntuacion: ${puntuacion}`;

    return ganancia > 0;
}

// Funcion principal para jugar a la tragaperras
async function jugarTragaperras() {
    if (puntuacion < costePorGiro) {
        alert("Te has quedado sin puntos! Recarga la pagina para jugar de nuevo.");
        return;
    }

    puntuacion -= costePorGiro; // Restamos el coste del giro inmediatamente
    actualizarPuntuacion();      // Actualizamos la puntuación mostrada

    const filaDelMedio = await girar();
    verificarGanancia(filaDelMedio);
}

// Funcion para actualizar la puntuacion mostrada
function actualizarPuntuacion() {
    const elementoPuntuacion = document.getElementById('score');
    elementoPuntuacion.textContent = `Puntuacion: ${puntuacion}`;
}

// Inicializamos la interfaz cuando se carga la pagina
document.addEventListener('DOMContentLoaded', () => {
    const elementoPuntuacion = document.getElementById('score');
    elementoPuntuacion.textContent = `Puntuacion: ${puntuacion}`;
    
    const matrizInicial = inicializarMatriz();
    actualizarInterfaz(matrizInicial);

    // Añadimos el evento click al botón de girar
    const botonGirar = document.querySelector('button');
    botonGirar.addEventListener('click', jugarTragaperras);
});
