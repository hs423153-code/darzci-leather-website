/* ==========================================
        DARZCI CART.JS
========================================== */

// =============================
// GET CART
// =============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// =============================
// ELEMENTS
// =============================

const cartProducts = document.getElementById("cartProducts");
const subtotal = document.getElementById("subtotal");
const total = document.getElementById("total");
const whatsappBtn = document.getElementById("whatsappOrder");


// =============================
// SAVE CART
// =============================

function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}


// =============================
// FORMAT PRICE
// =============================

function getPrice(price){

    return Number(
        String(price).replace(/[^0-9]/g,"")
    ) || 0;

}


// =============================
// RENDER CART
// =============================

function renderCart(){

    if(!cartProducts) return;

    cartProducts.innerHTML = "";

    let grandTotal = 0;

    let whatsappMessage =
`Hello Darzci,

I want to order:

`;



    if(cart.length===0){

        cartProducts.innerHTML = `

        <div class="empty-cart">

            <h2>Your Cart is Empty</h2>

            <p>Add some handcrafted products.</p>

        </div>

        `;

        subtotal.innerText="₹0";
        total.innerText="₹0";

        whatsappBtn.href="#";

        return;

    }



    cart.forEach((product,index)=>{

        const itemPrice =
        getPrice(product.price);

        const itemTotal =
        itemPrice * product.quantity;

        grandTotal += itemTotal;



        whatsappMessage +=
`${product.name}
Qty : ${product.quantity}
Price : ${product.price}

`;



        cartProducts.innerHTML += `

<div class="cart-item">

<div class="cart-image">

<a href="product-detail.html?id=${product.id}">

<img
src="${product.image}"
alt="${product.name}">

</a>

</div>



<div class="cart-details">

<h2>

<a
class="cart-product-link"
href="product-detail.html?id=${product.id}">

${product.name}

</a>

</h2>

<p>

Price :
${product.price}

</p>

<div class="qty-box">

<button
onclick="decreaseQty(${index})">

-

</button>

<span>

${product.quantity}

</span>

<button
onclick="increaseQty(${index})">

+

</button>

</div>

<button
class="remove-btn"
onclick="removeCartItem(${index})">

Remove

</button>

</div>

<div class="cart-price">

₹${itemTotal.toLocaleString()}

</div>

</div>

`;

    });



    subtotal.innerText =
    `₹${grandTotal.toLocaleString()}`;

    total.innerText =
    `₹${grandTotal.toLocaleString()}`;

    whatsappMessage +=

`Total : ₹${grandTotal}`;

    whatsappBtn.href =
`https://wa.me/8528631775?text=${encodeURIComponent(whatsappMessage)}`;

}



// =============================
// INCREASE
// =============================

function increaseQty(index){

    cart[index].quantity++;

    saveCart();

    renderCart();

    renderRecommendations();

    renderBestSeller();

}



// =============================
// DECREASE
// =============================

function decreaseQty(index){

    if(cart[index].quantity>1){

        cart[index].quantity--;

    }

    else{

        cart.splice(index,1);

    }

    saveCart();

    renderCart();

    renderRecommendations();

    renderBestSeller();

}



// =============================
// REMOVE
// =============================

function removeCartItem(index){

    cart.splice(index,1);

    saveCart();

    renderCart();

    renderRecommendations();

    renderBestSeller();

}
renderCart();

renderRecommendations();

function generateStars(rating){

    let stars = "";

    for(let i = 1; i <= 5; i++){

        if(i <= Math.floor(rating)){
            stars += "★";
        }else{
            stars += "☆";
        }

    }

    return stars;

}


/* ==========================================
        YOU MAY ALSO LIKE
========================================== */


function createRecommendationCard(product){

return `

<div class="product-card">

${product.bestseller
? '<span class="bestseller-badge">BESTSELLER</span>'
: ""}

<a href="${product.link}">

<img
src="${product.image}"
alt="${product.name}">

</a>

<h3>

${product.name || "Premium Leather Product"}

</h3>

<div class="product-rating">

<span class="stars">

${generateStars(product.rating)}

</span>

<span class="review-count">

(${product.reviews})

</span>

</div>

<p class="price">

${product.price}

</p>

<a
href="${product.link}"
class="btn">

View

</a>

</div>

`;

}


function renderRecommendations() {

    const recommendationGrid =
    document.getElementById("recommendationGrid");

    if (!recommendationGrid) return;

    recommendationGrid.innerHTML = "";

    // Empty cart
    if (cart.length === 0) return;

    // Cart IDs
    const cartIds = cart.map(item => item.id);

    // Cart Categories
    const cartCategories = [...new Set(cart.map(item => item.category))];

    // Same category products
    let recommendations = products.filter(product =>
        cartCategories.includes(product.category) &&
        !cartIds.includes(product.id)
    );

    // Random
    recommendations.sort(() => Math.random() - 0.5);

    // Only 4
    recommendations = recommendations.slice(0, 4);

    // Render
    recommendations.forEach(product => {
        recommendationGrid.innerHTML += createRecommendationCard(product);
    });

}


/* ==========================================
        BEST SELLERS
========================================== */

const bestSellerGrid =
document.getElementById("bestSellerGrid");

function renderBestSeller(){

    if(!bestSellerGrid) return;

    bestSellerGrid.innerHTML = "";

    // Bestseller Products

    const bestProducts =
    products.filter(product => product.bestseller);

    bestProducts.forEach(product=>{

        bestSellerGrid.innerHTML +=
        createRecommendationCard(product);

    });

}



/* ==========================================
        INITIALIZE
========================================== */

renderCart();

renderRecommendations();

renderBestSeller();l
