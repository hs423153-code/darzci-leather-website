/* ==========================================
        DARZCI CART.JS  (Amazon-style cart)
========================================== */

// =============================
// GET CART
// =============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// =============================
// ELEMENTS
// =============================

const cartProducts = document.getElementById("cartProducts");
const summaryLine  = document.getElementById("summaryLine");
const bottomLine   = document.getElementById("bottomLine");
const total        = document.getElementById("total");
const whatsappBtn  = document.getElementById("whatsappOrder");


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
// SUBTOTAL LINES  (top-right box + bottom of list)
// =============================

function setSubtotalLines(itemCount, amount){

    const label = itemCount === 1 ? "item" : "items";

    const html =
    `Subtotal (${itemCount} ${label}): <strong>₹${amount.toLocaleString()}</strong>`;

    if(summaryLine) summaryLine.innerHTML = html;
    if(bottomLine)  bottomLine.innerHTML  = html;

    if(total) total.innerText = `₹${amount.toLocaleString()}`;

}


// =============================
// RENDER CART
// =============================

function renderCart(){

    if(!cartProducts) return;

    cartProducts.innerHTML = "";

    let grandTotal = 0;
    let itemCount  = 0;

    let whatsappMessage =
`Hello Darzci,

I want to order:

`;


    if(cart.length===0){

        cartProducts.innerHTML = `

        <div class="empty-cart">

            <h2>Your Darzci Cart is empty</h2>

            <p>Add some handcrafted products.</p>

            <a href="product.html" class="empty-cart-btn">
                Continue Shopping
            </a>

        </div>

        `;

        setSubtotalLines(0,0);

        whatsappBtn.href="#";

        return;

    }


    cart.forEach((product,index)=>{

        const itemPrice =
        getPrice(product.price);

        const itemTotal =
        itemPrice * product.quantity;

        grandTotal += itemTotal;
        itemCount  += product.quantity;


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

        <div class="cart-price-inline">
            ₹${itemTotal.toLocaleString()}
        </div>

        <p class="cart-stock">In stock</p>

        <p class="cart-delivery">
            Eligible for <strong>FREE Delivery</strong>
        </p>

        <p class="cart-unit">
            Unit price : ${product.price}
        </p>

        <div class="cart-actions">

            <div class="qty-box">

                <button
                onclick="decreaseQty(${index})"
                aria-label="Decrease quantity">

                    −

                </button>

                <span>${product.quantity}</span>

                <button
                onclick="increaseQty(${index})"
                aria-label="Increase quantity">

                    +

                </button>

            </div>

            <span class="action-sep"></span>

            <button
            class="remove-btn"
            onclick="removeCartItem(${index})">

                Delete

            </button>

        </div>

    </div>


    <div class="cart-price">

        ₹${itemTotal.toLocaleString()}

    </div>

</div>

`;

    });


    setSubtotalLines(itemCount, grandTotal);

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
        PRODUCT CARD (You May Also Like / Best Sellers)
========================================== */

function createRecommendationCard(product){

return `

<div class="product-card">

${product.bestseller
? '<span class="bestseller-badge">Best Seller</span>'
: ""}

<a href="${product.link}" class="card-image-link">

<img
src="${product.image}"
alt="${product.name}">

</a>

<h3>

<a href="${product.link}">

${product.name || "Premium Leather Product"}

</a>

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

renderBestSeller();