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

// CART COUNT
function updateCartCount() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }

}

updateCartCount();


const form =
document.getElementById("contactForm");

const status =
document.getElementById("formStatus");

form.addEventListener("submit",async function(e){

e.preventDefault();

const data = new FormData(form);

const response = await fetch(form.action,{
method:"POST",
body:data
});

if(response.ok){

status.innerHTML=`

<div class="success-box">

<h3>✅ Thank You!</h3>

<p>

Your inquiry has been sent successfully.

Our team will contact you soon.

</p>

</div>

`;

form.reset();

}else{

status.innerHTML=`

<div class="error-box">

❌ Something went wrong.

Please try again.

</div>

`;

}

});
