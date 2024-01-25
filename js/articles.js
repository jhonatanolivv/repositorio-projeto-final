// * 'Are you sure' button

function checker () {
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

