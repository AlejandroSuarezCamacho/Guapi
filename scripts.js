const navbar = document.getElementById("navbar");
const logo = document.getElementById("logo");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        navbar.classList.add("scrolled");
        logo.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
        logo.classList.remove("scrolled");
    }
});

/* Scroll */
const lenis = new Lenis({
    duration: 1.3,      // velocidad (mayor = más lento)
    smoothWheel: true,  // activa el scroll suave con rueda del ratón
    smoothTouch: false, // puedes cambiar a true si quieres en móviles
});

// Bucle de animación
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault(); // evita el salto instantáneo

        const targetId = anchor.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            // Usa Lenis para hacer scroll suave hacia el destino
            lenis.scrollTo(target, {
                offset: 0,       // ajusta si tienes navbar fija
                immediate: false // true = salto directo
            });
        }
    });
});


const imageIds = ['infocard', 'dock', 'gorgonaCard', 'marimba'];
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('closeBtn');
const modalImage = document.getElementById('modalImage');
const menu1 = document.getElementById('menu1');
const menu2 = document.getElementById('menu2');

// Agregar event listener a todas las imágenes
imageIds.forEach(id => {
    const img = document.getElementById(id);
    if (img) {
        img.addEventListener('click', function () {
            // Obtener la URL de la imagen clickeada
            const imageSrc = img.src;

            // Mostrar la imagen en el modal
            if (modalImage) {
                modalImage.src = imageSrc;
            }

            modal.classList.add('visible');
        });
    }
});

menu1.addEventListener('click', function () { 
    const menuRest1 = "/img/cards-attractions/Rest1.png";
    modalImage.src = menuRest1;
    modal.classList.add('visible');
});

menu2.addEventListener('click', function () { 
    const menuRest2 = "/img/cards-attractions/Rest2.png";
    modalImage.src = menuRest2;
    modal.classList.add('visible');
});

// Cerrar modal con el botón
closeBtn.addEventListener('click', function () {
    modal.classList.remove('visible');
});

// Cerrar modal al hacer click fuera
modal.addEventListener('click', function (e) {
    if (e.target === modal) {
        modal.classList.remove('visible');
    }
});

/* Parllaxa */

const heroContainer = document.querySelector('.hero-container');
const heroTitle = document.querySelector('.hero-title');
const heroText = document.querySelector('.hero-text');
const scrollElement = document.querySelector('.scroll');

// Altura del hero (generalmente 100vh)
const heroHeight = window.innerHeight;
// Píxeles a los que desaparece (puedes ajustar esto)
const disappearAt = heroHeight * 0.8;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Efecto parallax - movimiento más lento que el scroll
    const parallaxOffset = scrollY * 0.5;
    heroTitle.style.transform = `translateY(${parallaxOffset}px)`;
    heroText.style.transform = `translateY(${parallaxOffset}px)`;
    scrollElement.style.transform = `translateY(${parallaxOffset}px) rotate(270deg)`;

    // Desaparición sin animación
    if (scrollY > disappearAt) {
        heroContainer.style.display = 'none';
    } else {
        heroContainer.style.display = 'flex';
    }
});

/* Hotel */

const imageJS = document.getElementById('hotel');
const originalSrc = imageJS.src;
const hoverSrc = imageJS.dataset.hover;

imageJS.addEventListener('mouseenter', () => {
    imageJS.src = "/img/cards-attractions/hotel2.png";
});

imageJS.addEventListener('mouseleave', () => {
    imageJS.src = "/img/cards-attractions/hotel.png";
});

/* Restaurante 1 */

const imageRest1 = document.getElementById('card-der2');
const originalRest1 = imageJS.src;
const hoverRest1 = imageJS.dataset.hover;

imageRest1.addEventListener('mouseenter', () => {
    imageRest1.src = "/img/cards-attractions/delicias2.png";
});

imageRest1.addEventListener('mouseleave', () => {
    imageRest1.src = "/img/cards-attractions/delicias.png";
});

/* Restaurante 2 */

    const imageRest2 = document.getElementById('card-der3');
    const originalRest2 = imageJS.src;
    const hoverRest2 = imageJS.dataset.hover;

    imageRest2.addEventListener('mouseenter', () => {
        imageRest2.src = "/img/cards-attractions/ricuras2.png";
    });

    imageRest2.addEventListener('mouseleave', () => {
        imageRest2.src = "/img/cards-attractions/ricuras.png";
    });


// carrusel (para nada hecho con ayuda de ia :D)

let currentSlide = 0;
let slides = [];
let indicators = [];

function initCarousel() {
    slides = document.querySelectorAll('.carousel-slide');
    const indicatorsContainer = document.getElementById('indicators');

    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.onclick = () => goToSlide(index);
        indicatorsContainer.appendChild(indicator);
    });

    indicators = document.querySelectorAll('.indicator');
}

function moveSlide(direction) {
    currentSlide += direction;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    const offset = -currentSlide * 100;
    track.style.transform = `translateX(${offset}%)`;

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

initCarousel();