const carouselTopicos = document.getElementById('carousel-topicos');
let currentIndexTopicos = 0;

function showCardTopicos(index) {
    const cardWidth = document.querySelector('.card-topicos').offsetWidth + 10;
    carouselTopicos.style.transform = `translateX(-${index * cardWidth}px)`;
    currentIndexTopicos = index;
}

function nextCardTopicos() {
    currentIndexTopicos = Math.min(currentIndexTopicos + 1, carouselTopicos.children.length - 2);
    showCardTopicos(currentIndexTopicos);
}

function prevCardTopicos() {
    currentIndexTopicos = Math.max(currentIndexTopicos - 1, 0);
    showCardTopicos(currentIndexTopicos);
}