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