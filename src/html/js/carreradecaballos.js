/*
function actualizarImagenCaballo(selectId, caballoId) {
    const select = document.getElementById(selectId);
    const caballo = document.getElementById(caballoId);
    select.addEventListener('change', function() {
        caballo.src = `../../../../assets/images/${this.value}`;
    });
}
*/
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado');
    const pista = document.getElementById('pista');
    const caballos = [
        document.getElementById('caballo1'),
        document.getElementById('caballo2'),
        document.getElementById('caballo3'),
        document.getElementById('caballo4'),
        document.getElementById('caballo5')
    ];
    const distanciaMeta = pista.offsetWidth - caballos[0].offsetWidth;
    const imagenesCaballos = ['caballo1.png', 'bus.png', 'caballo2.png', 'goku.gif'];

    let saldoJugador = 1000;
    let apuestas = [0, 0, 0, 0, 0];
    const apuestaMinima = 100;

    function mostrarApuestaPersonalizada() {
        for (let i = 1; i <= 5; i++) {
            const select = document.getElementById(`select-apuesta-${i}`);
            const inputPersonalizado = document.getElementById(`apuesta-personalizada-${i}`);
            select.addEventListener('change', function() {
                if (this.value === 'personalizada') {
                    inputPersonalizado.style.display = 'block';
                } else {
                    inputPersonalizado.style.display = 'none';
                }
            });
        }
    }

    function actualizarSaldoJugador() {
        document.getElementById('saldo-jugador').textContent = saldoJugador;
    }

    function realizarApuesta() {
        let apuestaTotal = 0;
        for (let i = 1; i <= 5; i++) {
            const select = document.getElementById(`select-apuesta-${i}`);
            const inputPersonalizada = document.getElementById(`apuesta-personalizada-${i}`);
            let apuesta = 0;

            switch(select.value) {
                case 'minima':
                    apuesta = apuestaMinima;
                    break;
                case 'personalizada':
                    apuesta = parseInt(inputPersonalizada.value) || 0;
                    if (apuesta < apuestaMinima) {
                        alert(`La apuesta mínima es ${apuestaMinima}`);
                        return;
                    }
                    break;
                case 'maxima':
                    apuesta = saldoJugador;
                    break;
            }

            apuestas[i-1] = apuesta;
            apuestaTotal += apuesta;
        }

        if (apuestaTotal > saldoJugador) {
            alert("No tienes suficiente saldo para realizar esta apuesta.");
            return;
        }

        saldoJugador -= apuestaTotal;
        actualizarSaldoJugador();
    }

    function procesarResultadoApuesta(ganador) {
        const apuestaGanadora = apuestas[ganador - 1];
        const ganancias = apuestaGanadora * 5;
        saldoJugador += ganancias;
        actualizarSaldoJugador();
        alert(`¡Has ganado ${ganancias}! Tu nuevo saldo es ${saldoJugador}.`);
        apuestas = [0, 0, 0, 0, 0];
    }

    /*
    function actualizarImagenCaballo(selectId, caballoId) {
        const select = document.getElementById(selectId);
        const caballo = document.getElementById(caballoId);
        select.addEventListener('change', function() {
            caballo.src = `../../../../assets/images/${this.value}`;
        });
    }
    */
/*
    function actualizarImagenCaballo(selectId, caballoId) {
        const select = document.getElementById(selectId);
        const caballo = document.getElementById(caballoId);
        select.addEventListener('change', function() {
            const nuevaRuta = `../../../../assets/images/caballos/${this.value}`;
            console.log('Intentando cargar imagen:', nuevaRuta);
            caballo.src = nuevaRuta;
        });
    }
*/
    function caballosAlInicio(){
        caballos.forEach(caballo => {
            caballo.style.left = '0px';
        });
    }

    /*
    function actualizarBuses() {
        caballos.forEach(caballo => {
            caballo.src = '../../../../assets/images/caballos/bus.png';
        });
    }
    */
/*
    async function carrera() {
        const botones = document.querySelectorAll("button");
        botones.forEach(boton => boton.disabled = true);
        await new Promise(resolve => setTimeout(resolve, 3000));
        botones.forEach(boton => boton.disabled = false);
    }
*/
    function iniciarCarrera(callback) {
        console.log('Iniciando carrera');
        caballosAlInicio();
        const interval = setInterval(() => {
            let ganador = null;
            caballos.forEach((caballo, index) => {
                const avance = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
                const nuevaPosicion = parseInt(caballo.style.left) + avance;

                caballo.style.left = nuevaPosicion + 'px';
                if (nuevaPosicion >= distanciaMeta && !ganador) {
                    ganador = `${index + 1}`;
                    clearInterval(interval);
                    const listaGanadores = document.getElementById('ganadores-lista');
                    const nuevoGanador = document.createElement('div');
                    nuevoGanador.className = 'ganador';
                    nuevoGanador.innerText = `C${ganador}`;
                    if (listaGanadores.children.length >= 10) {
                        listaGanadores.removeChild(listaGanadores.firstChild);
                    }
                    listaGanadores.appendChild(nuevoGanador);
                    console.log(`Carrera terminada. Ganador: C${ganador}`);
                    procesarResultadoApuesta(parseInt(ganador));
                    if (callback) callback();
                    caballosAlInicio();
                }
            });
        }, 50);
    }

    function cambiarImagenesAleatorias() {
        console.log('Cambiando imágenes de los caballos');
        const imagenesDisponibles = [...imagenesCaballos];
        caballos.forEach(caballo => {
            const indiceAleatorio = Math.floor(Math.random() * imagenesDisponibles.length);
            caballo.src = `../../../../assets/caballos/${imagenesDisponibles[indiceAleatorio]}`;
           /* if (caballo.src === "../../../assets/images/caballos/goku.gift"){
                document.querySelector("img").classList.add('pararGift');
            }
            */
            imagenesDisponibles.splice(indiceAleatorio, 0);
        });
    }

    function cicloCarreras() {
        iniciarCarrera(() => {
            cambiarImagenesAleatorias();
            setTimeout(cicloCarreras, 10000);
        });
    }

    /*
    document.getElementById('carreradebuses').addEventListener('click', actualizarBuses);
    document.getElementById('iniciar').addEventListener('click', () => iniciarCarrera());
    */
    mostrarApuestaPersonalizada();

    /*
    actualizarImagenCaballo('select-caballo1', 'caballo1');
    actualizarImagenCaballo('select-caballo2', 'caballo2');
    actualizarImagenCaballo('select-caballo3', 'caballo3');
    actualizarImagenCaballo('select-caballo4', 'caballo4');
    actualizarImagenCaballo('select-caballo5', 'caballo5');
*/
    document.getElementById('realizar-apuesta').addEventListener('click', realizarApuesta);
    actualizarSaldoJugador();
    cicloCarreras();
});



