// Sample Product Data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation.",
        price: 99.99,
        image: "images/headphone.png",
        category: "electronics"
    },
    {
        id: 2,
        name: "Running Shoes",
        description: "Comfortable and durable running shoes for all terrains.",
        price: 79.99,
        image: "images/run.jpg",
        category: "sports"
    },
    {
        id: 3,
        name: "Smartwatch",
        description: "Stylish smartwatch with multiple health tracking features.",
        price: 149.99,
        image: "images/s.png",
        category: "electronics"
    },
    {
        id: 4,
        name: "Leather Jacket",
        description: "Premium leather jacket for a classic look.",
        price: 199.99,
        image: "images/product.png",
        category: "fashion"
    },
    {
        id: 5,
        name: "Blender",
        description: "High-speed blender perfect for smoothies and soups.",
        price: 49.99,
        image: "images/product5.png",
        category: "home"
    },
    
];

// Cart Data
let cart = [];

// DOM Elements
const productsContainer = document.getElementById('productsContainer');
const cartCount = document.getElementById('cart-count');
const categories = document.querySelectorAll('.category');
const productModal = document.getElementById('productModal');
const cartModal = document.getElementById('cartModal');
const closeButtons = document.querySelectorAll('.close-button');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalPrice = document.getElementById('modalPrice');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartButton = document.getElementById('cartButton');

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    loadCart();
    updateCartCount();
});

// Function to Display Products
function displayProducts(productsToDisplay) {
    productsContainer.innerHTML = ""; // Clear existing products

    productsToDisplay.forEach(product => {
        // Create Product Card
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        // Product Image
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;

        // Product Details
        const productDetails = document.createElement('div');
        productDetails.classList.add('product-details');

        const title = document.createElement('h3');
        title.textContent = product.name;

        const desc = document.createElement('p');
        desc.textContent = product.description;

        productDetails.appendChild(title);
        productDetails.appendChild(desc);

        // Product Price
        const price = document.createElement('p');
        price.classList.add('product-price');
        price.textContent = `$${product.price.toFixed(2)}`;

        // Product Actions
        const actions = document.createElement('div');
        actions.classList.add('product-actions');

        const viewButton = document.createElement('button');
        viewButton.classList.add('view-button');
        viewButton.textContent = "View";
        viewButton.addEventListener('click', () => openProductModal(product));

        const addCartButton = document.createElement('button');
        addCartButton.classList.add('add-cart-button');
        addCartButton.textContent = "Add to Cart";
        addCartButton.addEventListener('click', () => addToCart(product.id));

        actions.appendChild(viewButton);
        actions.appendChild(addCartButton);

        // Assemble Product Card
        productCard.appendChild(img);
        productCard.appendChild(productDetails);
        productCard.appendChild(price);
        productCard.appendChild(actions);

        // Append to Container
        productsContainer.appendChild(productCard);
    });
}

// Function to Add Product to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
        saveCart();
        alert(`${product.name} has been added to your cart.`);
    }
}

// Function to Update Cart Count
function updateCartCount() {
    cartCount.textContent = cart.length;
}

// Function to Open Product Modal
function openProductModal(product) {
    modalImage.src = product.image;
    modalImage.alt = product.name;
    modalTitle.textContent = product.name;
    modalDescription.textContent = product.description;
    modalPrice.textContent = `$${product.price.toFixed(2)}`;

    productModal.style.display = "block";
}

// Function to Close Modals
function closeModal(event) {
    if (event.target.classList.contains('close-button')) {
        productModal.style.display = "none";
        cartModal.style.display = "none";
    }
}

// Event Listeners for Close Buttons
closeButtons.forEach(button => {
    button.addEventListener('click', closeModal);
});

// Event Listener for Click Outside Modal Content
window.addEventListener('click', (event) => {
    if (event.target == productModal) {
        productModal.style.display = "none";
    }
    if (event.target == cartModal) {
        cartModal.style.display = "none";
    }
});

// Function to Filter Products by Category
categories.forEach(category => {
    category.addEventListener('click', () => {
        const selectedCategory = category.getAttribute('data-category');
        if (selectedCategory === 'all') {
            displayProducts(products);
        } else {
            const filteredProducts = products.filter(product => product.category === selectedCategory);
            displayProducts(filteredProducts);
        }
    });
});

// Function to Load Cart from Local Storage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Function to Save Cart to Local Storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Event Listener for Cart Button to Open Cart Modal
cartButton.addEventListener('click', openCartModal);

// Function to Open Cart Modal
function openCartModal() {
    displayCartItems();
    cartModal.style.display = "block";
}

// Function to Display Cart Items
function displayCartItems() {
    cartItemsContainer.innerHTML = ""; // Clear existing items
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            const itemInfo = document.createElement('p');
            itemInfo.textContent = `${item.name} - $${item.price.toFixed(2)}`;

            const removeButton = document.createElement('button');
            removeButton.textContent = "Remove";
            removeButton.addEventListener('click', () => removeFromCart(index));

            cartItem.appendChild(itemInfo);
            cartItem.appendChild(removeButton);

            cartItemsContainer.appendChild(cartItem);

            total += item.price;
        });
    }

    cartTotal.textContent = total.toFixed(2);
}

// Function to Remove Item from Cart
function removeFromCart(index) {
    if (index > -1 && index < cart.length) {
        cart.splice(index, 1);
        updateCartCount();
        saveCart();
        displayCartItems();
    }
}
