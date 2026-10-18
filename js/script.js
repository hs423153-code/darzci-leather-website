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


// MOBILE: slide the cards strip left-to-right so the active card is visible
scrollActiveTravelCard(index);


}


function scrollActiveTravelCard(index){

if(window.innerWidth > 1000) return;

const strip = document.querySelector(".travel-cards");

const card = cards[index];

if(!strip || !card) return;

// scroll only the strip horizontally (page does not jump up/down)
const left =
card.offsetLeft -
(strip.clientWidth - card.offsetWidth) / 2;

strip.scrollTo({
left: left,
behavior: "smooth"
});

}


// show first destination background right away (was blank till first slide)
updateTravel(0);


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

function setMenu(open){

    if(!mainNav || !mobileToggle) return;

    mainNav.classList.toggle("active", open);

    mobileToggle.classList.toggle("active", open);

    if(menuBackdrop){
        menuBackdrop.classList.toggle("active", open);
    }

    document.body.classList.toggle("menu-open", open);

    mobileToggle.setAttribute("aria-expanded", open ? "true" : "false");

}

if(mobileToggle && mainNav){

    mobileToggle.setAttribute("aria-label", "Menu");

    // Close button inside the drawer
    // (the header sits under the drawer when it is open)
    if(!mainNav.querySelector(".drawer-close")){

        const closeBtn = document.createElement("button");

        closeBtn.type = "button";
        closeBtn.className = "drawer-close";
        closeBtn.setAttribute("aria-label", "Close menu");
        closeBtn.innerHTML = "<span></span><span></span>";

        mainNav.insertBefore(closeBtn, mainNav.firstChild);

    }

    mobileToggle.addEventListener("click", () => {
        setMenu(!mainNav.classList.contains("active"));
    });

    // close on X button or when a link is tapped
    mainNav.addEventListener("click", (e) => {

        if(e.target.closest(".drawer-close") || e.target.closest("a")){
            setMenu(false);
        }

    });

}

if(menuBackdrop){
    menuBackdrop.addEventListener("click", () => setMenu(false));
}

document.addEventListener("keydown", (e) => {
    if(e.key === "Escape") setMenu(false);
});

window.addEventListener("resize", () => {
    if(window.innerWidth > 768) setMenu(false);
});

/* ==========================================
      DARZCI TESTIMONIAL SLIDER V2
      - desktop: centered card, auto slide
      - mobile : one card at a time, auto slide + swipe
        (moves with transform, same way on every phone)
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const wrapper = document.querySelector(".testi-wrapper");
    const track   = document.querySelector(".testi-track");
    const cards   = document.querySelectorAll(".testi-card");

    if(!wrapper || !track || cards.length === 0) return;

    let current = 0;

    const AUTO_MS = 8000;

    function isMobile(){
        return window.innerWidth <= 768;
    }

    function setActive(){

        cards.forEach(card=>card.classList.remove("active"));

        cards[current].classList.add("active");

    }

    function updateSlider(){

        setActive();

        const cardWidth = cards[0].offsetWidth;

        if(isMobile()){

            // MOBILE: one full-width card per step
            const gap =
            parseFloat(getComputedStyle(track).columnGap) || 16;

            track.style.transform =
            `translateX(-${current * (cardWidth + gap)}px)`;

        }else{

            // DESKTOP: active card in the center
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

    function goTo(index){

        if(index >= cards.length) index = 0;

        if(index < 0) index = cards.length - 1;

        current = index;

        updateSlider();

    }

    function nextSlide(){
        goTo(current + 1);
    }

    function prevSlide(){
        goTo(current - 1);
    }

    // ---- auto slide ----
    let autoSlide = setInterval(nextSlide, AUTO_MS);

    function restartAuto(){

        clearInterval(autoSlide);

        autoSlide = setInterval(nextSlide, AUTO_MS);

    }

    updateSlider();

    // layout may still be settling (fonts / images) -> place again once loaded
    window.addEventListener("load", updateSlider);

    let lastWidth = window.innerWidth;

    window.addEventListener("resize", () => {

        if(window.innerWidth === lastWidth) return;

        lastWidth = window.innerWidth;

        updateSlider();

    });

    // ---- swipe (mobile) ----
    let startX = 0;
    let startY = 0;
    let touching = false;

    wrapper.addEventListener("touchstart", (e) => {

        if(!isMobile()) return;

        const t = e.touches[0];

        startX = t.clientX;
        startY = t.clientY;

        touching = true;

    }, {passive:true});

    wrapper.addEventListener("touchend", (e) => {

        if(!touching) return;

        touching = false;

        const t = e.changedTouches[0];

        const dx = t.clientX - startX;
        const dy = t.clientY - startY;

        // ignore small moves and mostly-vertical scrolls
        if(Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;

        if(dx < 0){
            nextSlide();
        }else{
            prevSlide();
        }

        restartAuto();

    }, {passive:true});

    wrapper.addEventListener("touchcancel", () => {
        touching = false;
    }, {passive:true});

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
"product.html?category=bagpack";

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