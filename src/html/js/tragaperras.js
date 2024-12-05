// Definimos la clase Fruta para crear objetos fruta
class Fruta {
    constructor(id, nombre, imagen, valor) {
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.valor = valor;
    }
}

// Lista de frutas disponibles en la tragaperras
const frutas = [
    new Fruta(1, 'Cereza', '../../assets/images/cereza.png', 10),
    new Fruta(2, 'Limon', '../../assets/images/limon.png', 20),
    new Fruta(3, 'Naranja', '../../assets/images/naranja.png', 30),
    new Fruta(4, 'Uva', '../../assets/images/uva.png', 40),
    new Fruta(5, 'Bolsa', '../../assets/images/bolsa.png', 100),
    new Fruta(6, 'Diamante', '../../assets/images/diamante.png', 200),
    new Fruta(7, 'Siete', '../../assets/images/siete.png', 500)
];

let puntuacion = 1000;
const costePorGiro = 10;
let tiradasConsecutivas = 0;
const bonusPorTiradas = 50;

function obtenerFrutaAleatoria() {
    return frutas[Math.floor(Math.random() * frutas.length)];
}

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

function animarGiro(duracion) {
    return new Promise(resolve => {
        let matriz = inicializarMatriz();
        const intervalo = setInterval(() => {
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

async function girar() {
    const botonGirar = document.querySelector('button');
    botonGirar.disabled = true;

    const matrizFinal = await animarGiro(3000);

    botonGirar.disabled = false;
    return matrizFinal[1];
}

function mostrarLluviaDeDinero() {
    const lluviaDeDinero = document.getElementById('lluvia-de-dinero');
    lluviaDeDinero.style.display = 'block';

    setTimeout(() => {
        lluviaDeDinero.style.display = 'none';
    }, 5000);
}

function verificarGanancia(filaDelMedio, apuesta) {
    const mensajeResultado = document.getElementById('result');
    let ganancia = 0;
 
    mensajeResultado.classList.remove('win-animation', 'lose-animation');
 
    // Verificar coincidencias adyacentes
    for (let i = 0; i < 2; i++) {
        if (filaDelMedio[i].id === filaDelMedio[i + 1].id) {
            const frutaRepetida = filaDelMedio[i];
            ganancia += frutaRepetida.valor * 2 * (apuesta / costePorGiro);
            mensajeResultado.textContent = `Has ganado ${ganancia} puntos con dos ${frutaRepetida.nombre}s adyacentes.`;
            mensajeResultado.classList.add('win-animation');
        }
    }

    // Verificar tres frutas iguales
    if (filaDelMedio[0].id === filaDelMedio[1].id && filaDelMedio[1].id === filaDelMedio[2].id) {
        ganancia = filaDelMedio[0].valor * 3 * (apuesta / costePorGiro);
        mensajeResultado.textContent = `¡Felicidades! Has ganado ${ganancia} puntos con tres ${filaDelMedio[0].nombre}s.`;
        mensajeResultado.classList.add('win-animation');
    }

    // Verificar sietes
    const sietesCount = filaDelMedio.filter(fruta => fruta.nombre === 'Siete').length;
    if (sietesCount >= 2) {
        ganancia += 500 * sietesCount * (apuesta / costePorGiro);
        mensajeResultado.textContent += ` ¡Bonus de ${500 * sietesCount} puntos por ${sietesCount} Sietes!`;
        mensajeResultado.classList.add('win-animation');
        mostrarLluviaDeDinero();
    }

    if (ganancia === 0) {
        mensajeResultado.textContent = "Lo siento, no has ganado esta vez. ¡Inténtalo de nuevo!";
        mensajeResultado.classList.add('lose-animation');
    } else if (apuesta === puntuacion || sietesCount >= 2) {
        mostrarLluviaDeDinero();
    }
 
    puntuacion += ganancia;
    actualizarPuntuacion();
 
    return ganancia > 0;
}

async function jugarTragaperras(apuestaMaxima = false) {
   const botonGirar = document.querySelector('button');
   const botonApuestaMaxima = document.querySelector('.btn-apuesta-maxima');
   
   let costeGiroActual = apuestaMaxima ? puntuacion : costePorGiro;

   if (puntuacion < costeGiroActual) {
       alert("No tienes suficientes puntos para jugar!");
       botonApuestaMaxima.disabled = true;
       return;
   }

   botonGirar.disabled = true;
   botonApuestaMaxima.disabled = true;

   puntuacion -= costeGiroActual;
   actualizarPuntuacion();

   const filaDelMedio = await girar();

   const gano = verificarGanancia(filaDelMedio, costeGiroActual);

   tiradasConsecutivas = gano ? tiradasConsecutivas + 1 : 0;

   if (tiradasConsecutivas > 0 && tiradasConsecutivas % 5 === 0) {
       puntuacion += bonusPorTiradas;
       alert(`¡Bonus! Has ganado ${bonusPorTiradas} puntos extra por ${tiradasConsecutivas} tiradas consecutivas.`);
       actualizarPuntuacion();
   }

   botonGirar.disabled = false;
   botonApuestaMaxima.disabled = puntuacion < costePorGiro;

   if (apuestaMaxima && !gano) {
       botonApuestaMaxima.disabled = true;
   }
}


function actualizarPuntuacion() {
   const elementoPuntuacion = document.getElementById('score');
   elementoPuntuacion.textContent = `Puntuación: ${puntuacion}`;
}

document.addEventListener('DOMContentLoaded', () => {
   const elementoPuntuacion = document.getElementById('score');
   elementoPuntuacion.textContent = `Puntuación: ${puntuacion}`;

   const matrizInicial = inicializarMatriz();
   actualizarInterfaz(matrizInicial);

   const botonGirar = document.querySelector('button');
   botonGirar.addEventListener('click', () => jugarTragaperras());

   const botonApuestaMaxima = document.createElement('button');
   botonApuestaMaxima.textContent = 'Apuesta Máxima';
   botonApuestaMaxima.classList.add('btn-apuesta-maxima');

   botonApuestaMaxima.addEventListener('click', () => {
       jugarTragaperras(true);
       botonApuestaMaxima.disabled = true;
       botonGirar.disabled = true;
   });

   const contenedorControles = document.querySelector('.controls') || document.body;
   contenedorControles.appendChild(botonApuestaMaxima);
});
