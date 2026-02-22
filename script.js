/* ===========================
   Product Data Array
   =========================== */

var products = [
    {
        id: 1,
        name: "Air Force 1 (AF1)",
        brand: "Nike",
        price: 119.99,
        image: "./img/nike/Nike Air Force 1 (AF1).jpg",
        images: ["./img/nike/Nike Air Force 1 (AF1).jpg", "./img/nike/Nike Air Max 90.webp"],
        sizes: [6, 7, 8, 9, 10, 11, 12, 13],
        colors: ["White", "Black", "Red"],
        rating: 4.5,
        reviews: [
            { author: "John D.", rating: 5, text: "Classic and timeless!" },
            { author: "Sarah M.", rating: 4, text: "Very comfortable." }
        ]
    },
    {
        id: 2,
        name: "Air Jordan 1",
        brand: "Nike",
        price: 179.99,
        image: "./img/nike/Nike Air Jordan 1.jpeg",
        images: ["./img/nike/Nike Air Jordan 1.jpeg", "./img/nike/Nike Air Max 90.webp"],
        sizes: [6, 7, 8, 9, 10, 11, 12],
        colors: ["Black", "Red", "White", "Gold"],
        rating: 4.8,
        reviews: [
            { author: "Mike K.", rating: 5, text: "Incredible quality!" }
        ]
    },
    {
        id: 3,
        name: "Air Max 90",
        brand: "Nike",
        price: 129.99,
        image: "./img/nike/Nike Air Max 90.webp",
        images: ["./img/nike/Nike Air Max 90.webp", "./img/nike/Nike Air Force 1 (AF1).jpg"],
        sizes: [6, 7, 8, 9, 10, 11, 12],
        colors: ["White", "Gray", "Blue"],
        rating: 4.3,
        reviews: []
    },
    {
        id: 4,
        name: "Dunk Low",
        brand: "Nike",
        price: 109.99,
        image: "./img/nike/Nike Dunk Low.avif",
        images: ["./img/nike/Nike Dunk Low.avif", "./img/nike/Nike Air Jordan 1.jpeg"],
        sizes: [6, 7, 8, 9, 10, 11, 12, 13],
        colors: ["White", "Black"],
        rating: 4.6,
        reviews: [
            { author: "Emma R.", rating: 5, text: "Perfect for skateboarding!" }
        ]
    },
    {
        id: 5,
        name: "Samba",
        brand: "Adidas",
        price: 99.99,
        image: "./img/adidas/Adidas Samba.webp",
        images: ["./img/adidas/Adidas Samba.webp", "./img/adidas/Adidas Superstar.webp"],
        sizes: [6, 7, 8, 9, 10, 11, 12],
        colors: ["White", "Black"],
        rating: 4.4,
        reviews: []
    },
    {
        id: 6,
        name: "Stan Smith",
        brand: "Adidas",
        price: 99.99,
        image: "./img/adidas/Adidas Stan Smith.webp",
        images: ["./img/adidas/Adidas Stan Smith.webp", "./img/adidas/Adidas Samba.webp"],
        sizes: [6, 7, 8, 9, 10, 11, 12],
        colors: ["White", "Green", "Blue"],
        rating: 4.7,
        reviews: [
            { author: "Alex T.", rating: 5, text: "Minimalist perfection!" }
        ]
    },
    {
        id: 7,
        name: "Superstar",
        brand: "Adidas",
        price: 109.99,
        image: "./img/adidas/Adidas Superstar.webp",
        images: ["./img/adidas/Adidas Superstar.webp", "./img/adidas/Adidas Stan Smith.webp"],
        sizes: [6, 7, 8, 9, 10, 11, 12],
        colors: ["White", "Black"],
        rating: 4.5,
        reviews: []
    },
    {
        id: 8,
        name: "Speedcat",
        brand: "Puma",
        price: 89.99,
        image: "./img/puma/Puma Speedcat.webp",
        images: ["./img/puma/Puma Speedcat.webp", "./img/puma/Puma Suede Classic.webp"],
        sizes: [6, 7, 8, 9, 10, 11, 12],
        colors: ["Red", "Black", "White"],
        rating: 4.2,
        reviews: []
    },
    {
        id: 9,
        name: "Suede Classic",
        brand: "Puma",
        price: 94.99,
        image: "./img/puma/Puma Suede Classic.webp",
        images: ["./img/puma/Puma Suede Classic.webp", "./img/puma/Puma Speedcat.webp"],
        sizes: [6, 7, 8, 9, 10, 11, 12],
        colors: ["Black", "Brown", "Olive"],
        rating: 4.4,
        reviews: []
    }
];

// Promo codes
const promoCodes = {
    'SAVE10': 0.10,
    'SUMMER20': 0.20,
    'SNEAKER15': 0.15,
    'WELCOME5': 0.05
};

/* ===========================
   Dark Mode
   =========================== */

class ThemeManager {
    constructor() {
        this.isDarkMode = this.loadTheme();
        this.applyTheme();
    }

    loadTheme() {
        const saved = localStorage.getItem('solemate-theme');
        return saved ? JSON.parse(saved) : false;
    }

    saveTheme(isDark) {
        localStorage.setItem('solemate-theme', JSON.stringify(isDark));
    }

    applyTheme() {
        if (this.isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }

    toggle() {
        this.isDarkMode = !this.isDarkMode;
        this.applyTheme();
        this.saveTheme(this.isDarkMode);
        this.updateToggleIcon();
    }

    updateToggleIcon() {
        const btn = document.getElementById('themeToggle');
        const icon = btn.querySelector('i');
        if (this.isDarkMode) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

/* ===========================
   Wishlist Class
   =========================== */

class Wishlist {
    constructor() {
        this.items = this.loadWishlist();
    }

    loadWishlist() {
        const saved = localStorage.getItem('solemate-wishlist');
        return saved ? JSON.parse(saved) : [];
    }

    saveWishlist() {
        localStorage.setItem('solemate-wishlist', JSON.stringify(this.items));
    }

    addItem(product) {
        if (!this.items.find(item => item.id === product.id)) {
            this.items.push(product);
            this.saveWishlist();
            this.updateWishlistUI();
            Toast.show(`♥ Added "${product.name}" to wishlist!`, 'success', 3000);
            return true;
        }
        return false;
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveWishlist();
        this.updateWishlistUI();
    }

    isInWishlist(productId) {
        return this.items.some(item => item.id === productId);
    }

    updateWishlistUI() {
        const wishlistCount = document.getElementById('wishlistCount');
        wishlistCount.textContent = this.items.length;
        this.renderWishlistItems();
    }

    renderWishlistItems() {
        const wishlistContainer = document.getElementById('wishlistItems');

        if (this.items.length === 0) {
            wishlistContainer.innerHTML = '<p class="empty-wishlist">Your wishlist is empty</p>';
            return;
        }

        wishlistContainer.innerHTML = this.items.map(item => `
            <div class="wishlist-item">
                <img src="${item.image}" alt="${item.name}" class="wishlist-item-img">
                <div class="wishlist-item-details">
                    <p class="wishlist-item-brand">${item.brand}</p>
                    <h4 class="wishlist-item-name">${item.name}</h4>
                    <p class="wishlist-item-price">$${item.price.toFixed(2)}</p>
                    <div class="wishlist-item-rating">
                        ${Array(5).fill(0).map((_, i) =>
            `<span class="star ${i < Math.floor(item.rating || 0) ? 'filled' : ''}">★</span>`
        ).join('')}
                        <span class="rating-value">${(item.rating || 0).toFixed(1)}</span>
                    </div>
                </div>
                <div class="wishlist-item-actions">
                    <button class="btn-primary btn-sm" onclick="cart.addItem(wishlist.items.find(p => p.id === ${item.id}), null, null)">
                        Add to Cart
                    </button>
                    <button class="btn-remove" onclick="wishlist.removeItem(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
}

const backToTopBtn = document.getElementById('backToTopBtn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* ===========================
   Back to Top Button
   =========================== */

class Toast {
    static show(message, type = 'info', duration = 3000) {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icons = {
            success: '✓',
            error: '✕',
            info: 'ℹ'
        };

        toast.innerHTML = `
            <span class="toast-icon">${icons[type]}</span>
            <span class="toast-message">${message}</span>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-out forwards';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
}

class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.currentFilter = 'all';
        this.selectedPromo = null;
        this.discount = 0;
    }

    loadCart() {
        const saved = localStorage.getItem('solemate-cart');
        return saved ? JSON.parse(saved) : [];
    }

    saveCart() {
        localStorage.setItem('solemate-cart', JSON.stringify(this.items));
    }

    addItem(product, selectedSize, selectedColor) {
        const existingItem = this.items.find(item =>
            item.id === product.id && item.size === selectedSize && item.color === selectedColor
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                size: selectedSize || product.sizes[0],
                color: selectedColor || product.colors[0],
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartUI();
        this.showAddToCartNotification(product.name);
    }

    removeItem(productId, size, color) {
        this.items = this.items.filter(item =>
            !(item.id === productId && String(item.size) === String(size) && String(item.color) === String(color))
        );
        this.saveCart();
        this.updateCartUI();
    }

    updateQuantity(productId, size, color, quantity) {
        const item = this.items.find(item =>
            item.id === productId && String(item.size) === String(size) && String(item.color) === String(color)
        );
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
            this.updateCartUI();
        }
    }

    applyPromo(code) {
        code = code.toUpperCase();
        if (promoCodes[code]) {
            this.discount = promoCodes[code];
            this.selectedPromo = code;
            this.updateCartUI();
            return { success: true, message: `Promo code "${code}" applied! ${Math.round(this.discount * 100)}% off` };
        }
        return { success: false, message: 'Invalid promo code' };
    }

    removePromo() {
        this.discount = 0;
        this.selectedPromo = null;
        this.updateCartUI();
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getDiscount() {
        return this.getTotal() * this.discount;
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    updateCartUI() {
        const cartCount = document.getElementById('cartCount');
        const itemCount = this.getItemCount();
        cartCount.textContent = itemCount;

        this.renderCartItems();
        this.updateCartSummary();
    }

    renderCartItems() {
        const cartItemsContainer = document.getElementById('cartItems');

        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            return;
        }

        cartItemsContainer.innerHTML = this.items.map((item, index) => {
            // Escape quotes in size and color
            const size = String(item.size || '').replace(/'/g, "\\'");
            const color = String(item.color || '').replace(/'/g, "\\'");

            return `
            <div class="cart-item" data-item-index="${index}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-brand">${item.brand}</p>
                    <p class="cart-item-specs">Size: ${item.size} | Color: ${item.color}</p>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="cart-item-controls">
                        <button class="quantity-btn minus-btn" data-index="${index}" onclick="event.preventDefault(); cart.updateQuantity(${item.id}, '${size}', '${color}', ${item.quantity - 1})">−</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn plus-btn" data-index="${index}" onclick="event.preventDefault(); cart.updateQuantity(${item.id}, '${size}', '${color}', ${item.quantity + 1})">+</button>
                        <button class="remove-btn" data-index="${index}" onclick="event.preventDefault(); cart.removeItem(${item.id}, '${size}', '${color}');" title="Remove from cart">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        }).join('');
    }
    updateCartSummary() {
        const subtotal = this.getTotal();
        const discount = this.getDiscount();
        const afterDiscount = subtotal - discount;
        const shipping = afterDiscount > 0 ? (afterDiscount > 100 ? 0 : 10) : 0;
        const total = afterDiscount + shipping;

        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('discount').textContent = `-$${discount.toFixed(2)}`;
        document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }

    showAddToCartNotification(productName) {
        Toast.show(`✓ Added "${productName}" to cart!`, 'success', 3000);
    }
}

/* ===========================
   Product Rendering & Filtering
   =========================== */

function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    let html = '';

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            html += '<span class="star filled">★</span>';
        } else if (i === fullStars && hasHalf) {
            html += '<span class="star half">★</span>';
        } else {
            html += '<span class="star">★</span>';
        }
    }
    return html;
}

function renderProducts(filteredProducts = products) {
    const productsGrid = document.getElementById('productsGrid');
    const template = document.getElementById('productTemplate');

    productsGrid.innerHTML = '';

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666; padding: 2rem;">No products found</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const clone = template.content.cloneNode(true);

        clone.querySelector('.product-card').setAttribute('data-product-id', product.id);
        clone.querySelector('.product-img').src = product.image;
        clone.querySelector('.product-img').alt = product.name;
        clone.querySelector('.product-brand').textContent = product.brand;
        clone.querySelector('.product-name').textContent = product.name;
        clone.querySelector('.product-price').textContent = `$${product.price.toFixed(2)}`;

        // Set rating stars
        const starsContainer = clone.querySelector('.stars');
        starsContainer.innerHTML = renderStars(product.rating);
        clone.querySelector('.rating-count').textContent = `(${product.reviews.length})`;

        // Quick view on image or name click
        clone.querySelector('.product-img').addEventListener('click', () => {
            openQuickView(product);
        });

        clone.querySelector('.product-name').addEventListener('click', () => {
            openQuickView(product);
        });

        clone.querySelector('.quick-view-mini-btn').addEventListener('click', () => {
            openQuickView(product);
        });

        // Wishlist button
        const wishlistBtn = clone.querySelector('.wishlist-mini-btn');
        if (wishlist.isInWishlist(product.id)) {
            wishlistBtn.classList.add('active');
            wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
        }
        wishlistBtn.addEventListener('click', () => {
            if (wishlist.isInWishlist(product.id)) {
                wishlist.removeItem(product.id);
                wishlistBtn.classList.remove('active');
                wishlistBtn.innerHTML = '<i class="far fa-heart"></i>';
            } else {
                wishlist.addItem(product);
                wishlistBtn.classList.add('active');
                wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
            }
        });

        // Add to cart button
        clone.querySelector('.add-to-cart-btn').addEventListener('click', () => {
            openQuickView(product);
        });

        productsGrid.appendChild(clone);
    });
}

/* ===========================
   Quick View Modal
   =========================== */

let currentQuickViewProduct = null;
let currentSelectedSize = null;
let currentSelectedColor = null;

function openQuickView(product) {
    currentQuickViewProduct = product;
    currentSelectedSize = product.sizes[0];
    currentSelectedColor = product.colors[0];

    // Add to recently viewed
    recentlyViewed.addItem(product);

    document.getElementById('quickviewImage').src = product.image;
    document.getElementById('quickviewBrand').textContent = product.brand;
    document.getElementById('quickviewName').textContent = product.name;
    document.getElementById('quickviewPrice').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('quickviewDescription').textContent = `Premium ${product.brand} sneaker featuring quality craftsmanship and timeless style. Perfect for collectors and everyday wear.`;

    // Render rating
    const ratingDiv = document.getElementById('quickviewRating');
    ratingDiv.innerHTML = `
        <div class="rating-display">
            ${renderStars(product.rating)}
            <span class="rating-value">${product.rating.toFixed(1)}</span>
            <span class="review-count">${product.reviews.length} reviews</span>
        </div>
    `;

    // Render size options
    const sizeOptions = document.getElementById('sizeOptions');
    sizeOptions.innerHTML = product.sizes.map(size => `
        <button class="size-option ${size === currentSelectedSize ? 'active' : ''}" data-size="${size}" onclick="currentSelectedSize = ${size}; this.parentElement.querySelectorAll('.size-option').forEach(b => b.classList.remove('active')); this.classList.add('active');">
            ${size}
        </button>
    `).join('');

    // Render color options
    const colorOptions = document.getElementById('colorOptions');
    colorOptions.innerHTML = product.colors.map(color => `
        <button class="color-option ${color === currentSelectedColor ? 'active' : ''}" data-color="${color}" title="${color}" onclick="currentSelectedColor = '${color}'; this.parentElement.querySelectorAll('.color-option').forEach(b => b.classList.remove('active')); this.classList.add('active');" style="background-color: ${getColorCode(color)};"></button>
    `).join('');

    // Render reviews
    const reviewsList = document.getElementById('reviewsList');
    if (product.reviews.length > 0) {
        reviewsList.innerHTML = product.reviews.map(review => `
            <div class="review-item">
                <div class="review-header">
                    <strong>${review.author}</strong>
                    <div class="review-stars">
                        ${renderStars(review.rating)}
                    </div>
                </div>
                <p class="review-text">${review.text}</p>
            </div>
        `).join('');
    } else {
        reviewsList.innerHTML = '<p style="color: #999; text-align: center;">No reviews yet. Be the first to review!</p>';
    }

    // Update wishlist button
    const wishlistBtn = document.getElementById('quickviewWishlist');
    if (wishlist.isInWishlist(product.id)) {
        wishlistBtn.classList.add('active');
        wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
    } else {
        wishlistBtn.classList.remove('active');
        wishlistBtn.innerHTML = '<i class="far fa-heart"></i>';
    }

    document.getElementById('quickviewModal').classList.add('active');
}

function closeQuickView() {
    document.getElementById('quickviewModal').classList.remove('active');
    currentQuickViewProduct = null;
}

function getColorCode(colorName) {
    const colors = {
        'White': '#f5f5f5',
        'Black': '#1a1a1a',
        'Red': '#d32f2f',
        'Blue': '#1976d2',
        'Green': '#388e3c',
        'Gold': '#ffd700',
        'Gray': '#757575',
        'Brown': '#795548',
        'Olive': '#6b8e23'
    };
    return colors[colorName] || '#cccccc';
}

/* ===========================
   Search & Sort Functions
   =========================== */

let currentBrandFilter = 'all';
let searchTerm = '';
let sortOption = 'none';
let minPriceFilter = 0;
let maxPriceFilter = 200;

function getFilteredAndSortedProducts() {
    let result = products;

    // Apply brand filter
    if (currentBrandFilter !== 'all') {
        result = result.filter(p => p.brand === currentBrandFilter);
    }

    // Apply search filter
    if (searchTerm) {
        result = result.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    // Apply price filter
    result = result.filter(p => p.price >= minPriceFilter && p.price <= maxPriceFilter);

    // Apply sorting
    if (sortOption === 'price-low') {
        result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
        result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name') {
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'rating') {
        result = [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
}

function scrollCarousel(trackId, distance) {
    const track = document.getElementById(trackId);
    track.scrollBy({ left: distance, behavior: 'smooth' });
}

function updateProductDisplay() {
    const filtered = getFilteredAndSortedProducts();
    renderProducts(filtered);
}

/* ===========================
   Recently Viewed Products
   =========================== */

class RecentlyViewed {
    constructor() {
        this.items = this.loadRecentlyViewed();
    }

    loadRecentlyViewed() {
        const saved = localStorage.getItem('solemate-recently-viewed');
        return saved ? JSON.parse(saved) : [];
    }

    saveRecentlyViewed() {
        localStorage.setItem('solemate-recently-viewed', JSON.stringify(this.items));
    }

    addItem(product) {
        // Remove if already exists
        this.items = this.items.filter(p => p.id !== product.id);
        // Add to beginning
        this.items.unshift(product);
        // Keep only last 8
        this.items = this.items.slice(0, 8);
        this.saveRecentlyViewed();
        this.renderCarousel();
    }

    renderCarousel() {
        const section = document.getElementById('recentlyViewed');
        const track = document.getElementById('recentlyViewedTrack');

        if (this.items.length === 0) {
            section.style.display = 'none';
            return;
        }

        section.style.display = 'block';
        track.innerHTML = this.items.map(item => `
            <div class="carousel-product" onclick="openQuickView(products.find(p => p.id === ${item.id}))">
                <img src="${item.image}" alt="${item.name}">
                <div class="carousel-product-info">
                    <p class="carousel-product-name">${item.name}</p>
                    <p class="carousel-product-price">$${item.price.toFixed(2)}</p>
                </div>
            </div>
        `).join('');
    }
}

/* ===========================
   DOM Elements & Event Listeners
   =========================== */

var cart = new ShoppingCart();
var wishlist = new Wishlist();
var recentlyViewed = new RecentlyViewed();
var themeManager = new ThemeManager();

document.addEventListener('DOMContentLoaded', () => {
    // Render initial products
    renderProducts();

    // Initialize cart UI
    cart.updateCartUI();
    wishlist.updateWishlistUI();
    recentlyViewed.renderCarousel();

    // ===== Hamburger Menu =====
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const offcanvasMenu = document.getElementById('offcanvasMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            offcanvasMenu.classList.toggle('active');
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerMenu.classList.remove('active');
                offcanvasMenu.classList.remove('active');
            });
        });
    }

    // ===== Dark Mode Toggle =====
    const themeToggleBtn = document.getElementById('themeToggle');
    themeToggleBtn.addEventListener('click', () => {
        themeManager.toggle();
    });

    // ===== Price Range Filter =====
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const priceRangeSlider = document.getElementById('priceRange');
    const priceDisplay = document.getElementById('priceDisplay');
    const priceDisplayMax = document.getElementById('priceDisplayMax');

    let minPriceFilter = 0;
    let maxPriceFilter = 200;

    function updatePriceDisplay() {
        priceDisplay.textContent = minPriceFilter;
        priceDisplayMax.textContent = maxPriceFilter;
        updateProductDisplay();
    }

    minPriceInput.addEventListener('input', (e) => {
        minPriceFilter = Math.min(parseInt(e.target.value), maxPriceFilter);
        priceRangeSlider.value = maxPriceFilter;
        updatePriceDisplay();
    });

    maxPriceInput.addEventListener('input', (e) => {
        maxPriceFilter = Math.max(parseInt(e.target.value), minPriceFilter);
        priceRangeSlider.value = maxPriceFilter;
        updatePriceDisplay();
    });

    priceRangeSlider.addEventListener('input', (e) => {
        maxPriceFilter = parseInt(e.target.value);
        updatePriceDisplay();
    });

    // ===== Recently Viewed Carousel =====
    const recentlyViewedPrev = document.getElementById('recentlyViewedPrev');
    const recentlyViewedNext = document.getElementById('recentlyViewedNext');

    if (recentlyViewedPrev && recentlyViewedNext) {
        recentlyViewedPrev.addEventListener('click', () => scrollCarousel('recentlyViewedTrack', -200));
        recentlyViewedNext.addEventListener('click', () => scrollCarousel('recentlyViewedTrack', 200));
    }

    // ===== Search Functionality =====
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value;
        updateProductDisplay();
    });

    // ===== Sort Functionality =====
    const sortSelect = document.getElementById('sortSelect');
    sortSelect.addEventListener('change', (e) => {
        sortOption = e.target.value;
        updateProductDisplay();
    });

    // ===== Promo Code =====
    const promoInput = document.getElementById('promoInput');
    const applyPromoBtn = document.getElementById('applyPromoBtn');
    const promoMessage = document.getElementById('promoMessage');

    applyPromoBtn.addEventListener('click', () => {
        const code = promoInput.value.trim();
        if (code) {
            const result = cart.applyPromo(code);
            promoMessage.textContent = result.message;
            promoMessage.className = `promo-message ${result.success ? 'success' : 'error'}`;
            if (result.success) {
                promoInput.value = '';
                Toast.show(result.message, 'success', 4000);
            }
        }
    });

    promoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            applyPromoBtn.click();
        }
    });

    // ===== Filter buttons =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            currentBrandFilter = e.target.dataset.filter;
            updateProductDisplay();
        });
    });

    // ===== Quick View Modal =====
    const quickviewModal = document.getElementById('quickviewModal');
    const closeQuickviewBtn = document.getElementById('closeQuickview');
    const quickviewAddToCartBtn = document.getElementById('quickviewAddToCart');
    const quickviewWishlistBtn = document.getElementById('quickviewWishlist');

    closeQuickviewBtn.addEventListener('click', closeQuickView);

    quickviewModal.addEventListener('click', (e) => {
        if (e.target === quickviewModal) {
            closeQuickView();
        }
    });

    quickviewAddToCartBtn.addEventListener('click', () => {
        if (currentQuickViewProduct) {
            cart.addItem(currentQuickViewProduct, currentSelectedSize, currentSelectedColor);
            closeQuickView();
        }
    });

    quickviewWishlistBtn.addEventListener('click', () => {
        if (currentQuickViewProduct) {
            if (wishlist.isInWishlist(currentQuickViewProduct.id)) {
                wishlist.removeItem(currentQuickViewProduct.id);
                quickviewWishlistBtn.classList.remove('active');
                quickviewWishlistBtn.innerHTML = '<i class="far fa-heart"></i>';
            } else {
                wishlist.addItem(currentQuickViewProduct);
                quickviewWishlistBtn.classList.add('active');
                quickviewWishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
            }
        }
    });

    // ===== Cart modal controls =====
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const continueShopping = document.getElementById('continueShopping');
    const shopBtn = document.getElementById('shopBtn');

    cartBtn.addEventListener('click', () => {
        cartModal.classList.add('active');
    });

    const closeCart = () => {
        cartModal.classList.remove('active');
    };

    closeCartBtn.addEventListener('click', closeCart);
    continueShopping.addEventListener('click', closeCart);

    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            closeCart();
        }
    });

    shopBtn.addEventListener('click', () => {
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });

    // ===== Checkout & Validation =====
    const checkoutBtn = document.getElementById('checkout');
    const checkoutModal = document.getElementById('checkoutModal');
    const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
    const cancelCheckoutBtn = document.getElementById('cancelCheckoutBtn');
    const checkoutForm = document.getElementById('checkoutForm');

    function closeCheckout() {
        checkoutModal.classList.remove('active');
        checkoutForm.reset();
        document.querySelectorAll('.error-message').forEach(el => el.classList.remove('show'));
    }

    checkoutBtn.addEventListener('click', () => {
        if (cart.items.length > 0) {
            checkoutModal.classList.add('active');
        } else {
            Toast.show('✗ Your cart is empty', 'error', 3000);
        }
    });

    closeCheckoutBtn.addEventListener('click', closeCheckout);
    cancelCheckoutBtn.addEventListener('click', closeCheckout);

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;
        const nameInput = document.getElementById('checkoutName');
        const phoneInput = document.getElementById('checkoutPhone');
        const addressInput = document.getElementById('checkoutAddress');

        const nameError = document.getElementById('nameError');
        const phoneError = document.getElementById('phoneError');
        const addressError = document.getElementById('addressError');

        // Reset errors
        [nameError, phoneError, addressError].forEach(el => el.classList.remove('show'));

        // Validate Name 
        if (nameInput.value.trim().length < 2) {
            nameError.textContent = 'Please enter a valid full name';
            nameError.classList.add('show');
            isValid = false;
        }

        // Validate Phone (Vietnam format roughly +84 or 09, length 10-11)
        const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
        if (!phoneRegex.test(phoneInput.value.replace(/\s+/g, ''))) {
            phoneError.textContent = 'Please enter a valid phone number (e.g. 0912345678)';
            phoneError.classList.add('show');
            isValid = false;
        }

        // Validate Address
        if (addressInput.value.trim().length < 10) {
            addressError.textContent = 'Please provide a complete delivery address';
            addressError.classList.add('show');
            isValid = false;
        }

        if (isValid) {
            Toast.show('✓ Thank you for your purchase! Order confirmed.', 'success', 4000);
            cart.items = [];
            cart.saveCart();
            cart.updateCartUI();
            closeCheckout();
            closeCart();
        }
    });

    // ===== Wishlist Modal =====
    const wishlistBtn = document.getElementById('wishlistBtn');
    const wishlistModal = document.getElementById('wishlistModal');
    const closeWishlistBtn = document.getElementById('closeWishlistBtn');

    wishlistBtn.addEventListener('click', () => {
        wishlistModal.classList.add('active');
    });

    closeWishlistBtn.addEventListener('click', () => {
        wishlistModal.classList.remove('active');
    });

    wishlistModal.addEventListener('click', (e) => {
        if (e.target === wishlistModal) {
            wishlistModal.classList.remove('active');
        }
    });

    // ===== Keyboard Shortcuts =====
    const keyboardHelpModal = document.getElementById('keyboardHelpModal');
    const closeKeyboardHelpBtn = document.getElementById('closeKeyboardHelp');

    document.addEventListener('keydown', (e) => {
        // Close modals with Escape
        if (e.key === 'Escape') {
            cartModal.classList.remove('active');
            closeQuickView();
            wishlistModal.classList.remove('active');
            keyboardHelpModal.classList.remove('active');
        }
        // Show keyboard help with ?
        if (e.key === '?' && !cartModal.classList.contains('active') && !document.activeElement.matches('input')) {
            keyboardHelpModal.classList.toggle('active');
        }
        // Open cart with C
        if (e.key.toLowerCase() === 'c' && !document.activeElement.matches('input')) {
            cartModal.classList.toggle('active');
        }
        // Open wishlist with W
        if (e.key.toLowerCase() === 'w' && !document.activeElement.matches('input')) {
            wishlistModal.classList.toggle('active');
        }
        // Focus search with F
        if (e.key.toLowerCase() === 'f' && !document.activeElement.matches('input')) {
            e.preventDefault();
            searchInput.focus();
        }
    });

    closeKeyboardHelpBtn.addEventListener('click', () => {
        keyboardHelpModal.classList.remove('active');
    });

    keyboardHelpModal.addEventListener('click', (e) => {
        if (e.target === keyboardHelpModal) {
            keyboardHelpModal.classList.remove('active');
        }
    });

    // ===== Back to Top =====
    const backToTopBtn = document.getElementById('backToTopBtn');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== Scroll Reveal Animations =====
    function reveal() {
        var reveals = document.querySelectorAll('.reveal');
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 50;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    }
    window.addEventListener('scroll', reveal);

    // Trigger once on load
    reveal();

});
