/*
function actualizarImagenCaballo(selectId, caballoId) {
    const select = document.getElementById(selectId);
    const caballo = document.getElementById(caballoId);
    select.addEventListener('change', function() {
        caballo.src = `../../../../assets/images/${this.value}`;
    });
}
*/
function actualizarImagenCaballo(selectId, caballoId) {
    const select = document.getElementById(selectId);
    const caballo = document.getElementById(caballoId);
    select.addEventListener('change', function() {
        const nuevaRuta = `../../../../assets/images/${this.value}`;
        console.log('Intentando cargar imagen:', nuevaRuta);
        caballo.src = nuevaRuta;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('')
    actualizarImagenCaballo('select-caballo1', 'caballo1');
    actualizarImagenCaballo('select-caballo2', 'caballo2');
    actualizarImagenCaballo('select-caballo3', 'caballo3');

    const pista = document.getElementById('pista');
    const caballos = [
        document.getElementById('caballo1'),
        document.getElementById('caballo2'),
        document.getElementById('caballo3')
    ];
    const distanciaMeta = pista.offsetWidth - caballos[0].offsetWidth;

    document.getElementById('iniciar').addEventListener('click', iniciarCarrera);

    function iniciarCarrera() {
        caballos.forEach(caballo => {
            caballo.style.left = '0px';
        });
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
                    listaGanadores.appendChild(nuevoGanador);
                }
            });
        }, 50);
    }
});