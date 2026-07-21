
// ================================
// HERO SLIDER
// ================================

const slidesContainer =
document.querySelector(".slides");

const slides =
document.querySelectorAll(".slide");

const nextBtn =
document.querySelector(".next");

const prevBtn =
document.querySelector(".prev");

let currentSlide = 0;

function updateSlider(){

    slidesContainer.style.transform =
    `translateX(-${currentSlide * 100}%)`;

}

function nextSlide(){

    currentSlide++;

    if(currentSlide >= slides.length){
        currentSlide = 0;
    }

    updateSlider();

}

function prevSlide(){

    currentSlide--;

    if(currentSlide < 0){
        currentSlide = slides.length - 1;
    }

    updateSlider();

}

if(slidesContainer && slides.length && nextBtn && prevBtn){

    nextBtn.addEventListener("click",nextSlide);

    prevBtn.addEventListener("click",prevSlide);

    setInterval(nextSlide,5000);

}


// HOVER VIDEO
/* PRODUCT VIDEO HOVER */

const productCards =
document.querySelectorAll(".product-card");

productCards.forEach(card => {

  const video =
  card.querySelector(".product-video");

  if(video){

    card.addEventListener(
      "mouseenter",

      () => {

        video.play();

      }
    );

    card.addEventListener(
      "mouseleave",

      () => {

        video.pause();

        video.currentTime = 0;

      }
    );

  }

});

// TRAVEL WITH DARZCI


const destinations = [


{
name:"Ladakh",


desc:"The Land of High Passes. Built for adventure and endless roads.",


bg:"image/ladakh-card.jpg",


link:"ladakh.html"
},


{
name:"Kashmir",


desc:"Paradise on Earth. Travel through valleys and timeless beauty.",


bg:"image/kashmir-card.jpg",


link:"kashmir.html"
},


{
name:"Goa",


desc:"Sun, sea and freedom. Crafted for coastal journeys.",


bg:"image/goa-card.jpg",


link:"goa.html"
},


{
name:"Rajasthan",


desc:"Royal roads and desert horizons. Travel with character.",


bg:"image/rajasthan-card.jpg",


link:"rajasthan.html"
}


];


const container =
document.getElementById(
"travelContainer"
);


const title =
document.getElementById(
"placeTitle"
);


const desc =
document.getElementById(
"placeDesc"
);


const btn =
document.getElementById(
"travelBtn"
);


const cards =
document.querySelectorAll(
".travel-card"
);


let current = 0;


function updateTravel(index){


current = index;


cards.forEach(card =>
card.classList.remove(
"active"
));


cards[index]
.classList.add(
"active"
);


title.innerText =
destinations[index].name;


desc.innerText =
destinations[index].desc;


btn.href =
destinations[index].link;


container.style.backgroundImage =


`url('${destinations[index].bg}')`;


}


cards.forEach(card=>{


card.addEventListener(
"click",


()=>{


updateTravel(


Number(
card.dataset.index
)


);


}


);


});


setInterval(()=>{


current++;


if(
current >=
destinations.length
){


current = 0;


}


updateTravel(current);


},10000);


// COMPLETE HAMBURGER MENU

const mobileToggle = document.getElementById("mobileToggle");
const mainNav = document.getElementById("mainNav");
const menuBackdrop = document.getElementById("menuBackdrop");

if (mobileToggle && mainNav) {

    mobileToggle.addEventListener("click", () => {

        mainNav.classList.toggle("active");

        if (menuBackdrop) {
            menuBackdrop.classList.toggle("active");
        }

        document.body.classList.toggle("menu-open");

        mobileToggle.innerHTML = mainNav.classList.contains("active")
            ? "✕"
            : "☰";

    });

}

if (menuBackdrop && mainNav && mobileToggle) {

    menuBackdrop.addEventListener("click", () => {

        mainNav.classList.remove("active");

        menuBackdrop.classList.remove("active");

        document.body.classList.remove("menu-open");

        mobileToggle.innerHTML = "☰";

    });

}

/* ==========================================
      DARZCI TESTIMONIAL SLIDER V1
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const wrapper = document.querySelector(".testi-wrapper");
    const track   = document.querySelector(".testi-track");
    const cards   = document.querySelectorAll(".testi-card");

    if(!wrapper || !track || cards.length === 0) return;

    let current = 0;

    function updateSlider(){

        if(window.innerWidth <= 768){

            // MOBILE
            track.style.transform = `translateX(-${current * 100}%)`;

            cards.forEach(card=>card.classList.remove("active"));

            cards[current].classList.add("active");

        }else{

            // DESKTOP
            cards.forEach(card=>card.classList.remove("active"));

            cards[current].classList.add("active");

            const cardWidth = cards[0].offsetWidth;
            const gap = 30;

            const wrapperWidth = wrapper.offsetWidth;

            const centerOffset =
            (wrapperWidth/2) - (cardWidth/2);

            const move =
            current * (cardWidth + gap);

            track.style.transform =
            `translateX(${centerOffset - move}px)`;

        }

    }

    updateSlider();

    let autoSlide = setInterval(nextSlide,8000);

    function nextSlide(){

        current++;

        if(current >= cards.length){
            current = 0;
        }

        updateSlider();

    }

    window.addEventListener("resize",updateSlider);

});





// ===============================
// MOBILE DIRECT LINKS
// DESKTOP DROPDOWN UNCHANGED
// ===============================

const dropdownLinks =
document.querySelectorAll(".dropdown > a");

dropdownLinks.forEach(link=>{

link.addEventListener("click",function(e){

if(window.innerWidth>768) return;

// Women
if(this.textContent.trim()==="Women"){

e.preventDefault();

window.location.href=
"product.html?category=handbags";

}

// Travel
else if(this.textContent.trim()==="Travel"){

e.preventDefault();

window.location.href=
"product.html?category=backpack";

}

// Workspace
else if(this.textContent.trim()==="Workspace"){

e.preventDefault();

window.location.href=
"product.html?category=laptopbags";

}

// Fashion
else if(this.textContent.trim()==="Fashion"){

e.preventDefault();

window.location.href=
"product.html?category=belts";

}

});
});



// CART COUNT
function updateCartCount() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }

}

updateCartCount();