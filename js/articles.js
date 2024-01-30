//* Dark Mode Toggle

const chk = document.getElementById('chk');

// Função para aplicar o modo escuro
function aplicarModoEscuro(elementos) {
  if (Array.isArray(elementos)) {
    // Se for um array, iterar sobre cada elemento
    elementos.forEach(elemento => {
      elemento.classList.toggle('dark');
    });
  } else {
    // Se for um único elemento, apenas toggle no elemento
    elementos.classList.toggle('dark');
  }
  document.body.classList.toggle('dark');
  
}

// Função para salvar o estado no localStorage
function salvarEstadoModoEscuro(estado) {
  localStorage.setItem('modoEscuro', estado);
}

// Função para carregar o estado do localStorage
function carregarEstadoModoEscuro() {
  const estadoSalvo = localStorage.getItem('modoEscuro');
  if (estadoSalvo === 'true') {
    chk.checked = true;
    aplicarModoEscuro(itensEscuros);
  }
}

// Adiciona um listener para a mudança no checkbox
chk.addEventListener('change', () => {
  aplicarModoEscuro(itensEscuros);
  salvarEstadoModoEscuro(chk.checked);
});

// Carrega o estado do modo escuro ao carregar a página
document.addEventListener('DOMContentLoaded', carregarEstadoModoEscuro);

// Criar a lista de elementos escuros
const elementoHtml = document.documentElement, btnSelects = document.getElementsByClassName('header-link'), headerInput = document.getElementsByClassName('search-box');
  
const itensEscuros = [elementoHtml, ...Array.from(btnSelects), ...Array.from(headerInput)];

// Adiciona um listener para a mudança no checkbox
chk.addEventListener('change', () => {
  aplicarModoEscuro();
  salvarEstadoModoEscuro(chk.checked);
});

// Carrega o estado do modo escuro ao carregar a página
document.addEventListener('DOMContentLoaded', carregarEstadoModoEscuro);


//* Rating Stars

const stars = document.querySelectorAll(".stars i");
console.log(stars);

stars.forEach((star, index1) => {
  star.addEventListener("click", () => {

    stars.forEach((star, index2) => {

      index1 >= index2 ? star.classList.add('active') : star.classList.remove('active');
    });
  });
});

// * 'Are you sure' button

function checker() {
  let result = confirm('Are you sure?');
  if (result === false) {
    event.preventDefault();
  }
};

// * Carousel

const track = document.querySelector('.carousel-inner');
const slide = Array.from(track.children);
const nextButton = document.querySelector('.carousel-control-next');
const prevButton = document.querySelector('.carousel-control-prev');
const dotsNav = document.querySelector('.carousel-indicators');
const dots = Array.from(dotsNav.children);

const slideSize = slides[0].getBoundingClientRect().width;

// * Slides
slide[0].style.left = 0;
slide[1].style.left = slideWidth + 'px';
slide[2].style.left = slideWidth * 2 + 'px';