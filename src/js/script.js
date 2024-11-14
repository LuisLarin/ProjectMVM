let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-item');
const juegos = document.querySelectorAll('.juego');
const sections = document.querySelectorAll('#promociones, #CarreraDeCaballos, #Blackjack, #Tragaperras, #RuletaVirtual');

function showSlide(n) {
    slideIndex = n;
    if (slideIndex >= slides.length) { slideIndex = 0; }
    if (slideIndex < 0) { slideIndex = slides.length - 1; }
    document.querySelector('.carousel-inner').style.transform = `translateX(-${slideIndex * 100}%)`;
}

function moveSlide(n) {
    showSlide(slideIndex + n);
}

function autoSlide() {
    moveSlide(1);
}

let autoSlideInterval = setInterval(autoSlide, 2000);

document.querySelectorAll('.carousel-control').forEach(control => {
    control.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(autoSlide, 2000);
    });
});

function lazyLoad() {
    const windowHeight = window.innerHeight;

    juegos.forEach(juego => {
        const rect = juego.getBoundingClientRect();
        if (rect.top <= windowHeight && rect.bottom >= 0 && !juego.classList.contains('visible')) {
            const img = document.createElement('img');
            img.src = juego.getAttribute('data-src');
            img.alt = juego.getAttribute('data-title');
            juego.appendChild(img);
            
            const title = document.createElement('h3');
            title.textContent = juego.getAttribute('data-title');
            juego.appendChild(title);
            
            juego.classList.add('visible');
        }
    });

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= windowHeight && rect.bottom >= 0) {
            section.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', lazyLoad);
window.addEventListener('load', lazyLoad);
