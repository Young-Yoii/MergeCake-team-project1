const slider = document.querySelector('#slider');
const slides = document.querySelector('.slides');
const slide = document.querySelectorAll('.slide');

let currentSlide = 0;

const size = slides.scrollWidth * 2;

setInterval(function() {
    console.log(currentSlide);
    let from = -(size * currentSlide);
    let to = from - size;
    slides.animate({
        marginLeft : [from + "px", to + "px"]
    }, {
        duration : 500,
        easing: "ease",
        iteration : 1,
        fill : "both"
    });
    currentSlide++;
    if (currentSlide === (slide.length)){
        currentSlide = 0;
    }
}, 3000);