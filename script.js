/* ===========================
   Product Data Array
   =========================== */

const products = [
    {
        id: 1,
        name: "Air Force 1 (AF1)",
        brand: "Nike",
        price: 119.99,
        image: "./img/nike/Nike Air Force 1 (AF1).jpg"
    },
    {
        id: 2,
        name: "Air Jordan 1",
        brand: "Nike",
        price: 179.99,
        image: "./img/nike/Nike Air Jordan 1.jpeg"
    },
    {
        id: 3,
        name: "Air Max 90",
        brand: "Nike",
        price: 129.99,
        image: "./img/nike/Nike Air Max 90.webp"
    },
    {
        id: 4,
        name: "Dunk Low",
        brand: "Nike",
        price: 109.99,
        image: "./img/nike/Nike Dunk Low.avif"
    },
    {
        id: 5,
        name: "Samba",
        brand: "Adidas",
        price: 99.99,
        image: "./img/adidas/Adidas Samba.webp"
    },
    {
        id: 6,
        name: "Stan Smith",
        brand: "Adidas",
        price: 99.99,
        image: "./img/adidas/Adidas Stan Smith.webp"
    },
    {
        id: 7,
        name: "Superstar",
        brand: "Adidas",
        price: 109.99,
        image: "./img/adidas/Adidas Superstar.webp"
    },
    {
        id: 8,
        name: "Speedcat",
        brand: "Puma",
        price: 89.99,
        image: "./img/puma/Puma Speedcat.webp"
    },
    {
        id: 9,
        name: "Suede Classic",
        brand: "Puma",
        price: 94.99,
        image: "./img/puma/Puma Suede Classic.webp"
    }
];

/* ===========================
   Back to Top Button
   =========================== */

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
   Toast Notification System
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
    }

    loadCart() {
        const saved = localStorage.getItem('solemate-cart');
        return saved ? JSON.parse(saved) : [];
    }

    saveCart() {
        localStorage.setItem('solemate-cart', JSON.stringify(this.items));
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartUI();
        this.showAddToCartNotification(product.name);
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
            this.updateCartUI();
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
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

        cartItemsContainer.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-brand">${item.brand}</p>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        <button class="remove-btn" onclick="cart.removeItem(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    updateCartSummary() {
        const subtotal = this.getTotal();
        const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 10) : 0;
        const total = subtotal + shipping;

        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }

    showAddToCartNotification(productName) {
        Toast.show(`Added "${productName}" to cart!`, 'success', 3000);
    }
}

/* ===========================
   Product Rendering & Filtering
   =========================== */

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
        
        // Quick view on image or name click
        clone.querySelector('.product-img').addEventListener('click', () => {
            openQuickView(product);
        });

        clone.querySelector('.product-name').addEventListener('click', () => {
            openQuickView(product);
        });
        
        // Add to cart button
        clone.querySelector('.add-to-cart-btn').addEventListener('click', () => {
            cart.addItem(product);
        });

        productsGrid.appendChild(clone);
    });
}

/* ===========================
   Quick View Modal
   =========================== */

let currentQuickViewProduct = null;

function openQuickView(product) {
    currentQuickViewProduct = product;
    document.getElementById('quickviewImage').src = product.image;
    document.getElementById('quickviewBrand').textContent = product.brand;
    document.getElementById('quickviewName').textContent = product.name;
    document.getElementById('quickviewPrice').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('quickviewDescription').textContent = `Premium ${product.brand} sneaker featuring quality craftsmanship and timeless style. Perfect for collectors and everyday wear.`;
    
    document.getElementById('quickviewModal').classList.add('active');
}

function closeQuickView() {
    document.getElementById('quickviewModal').classList.remove('active');
    currentQuickViewProduct = null;
}

/* ===========================
   Search & Sort Functions
   =========================== */

let currentBrandFilter = 'all';
let searchTerm = '';
let sortOption = 'none';

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

    // Apply sorting
    if (sortOption === 'price-low') {
        result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
        result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name') {
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
}

function updateProductDisplay() {
    const filtered = getFilteredAndSortedProducts();
    renderProducts(filtered);
}

/* ===========================
   DOM Elements & Event Listeners
   =========================== */

let cart = new ShoppingCart();

document.addEventListener('DOMContentLoaded', () => {
    // Render initial products
    renderProducts();
    
    // Initialize cart UI
    cart.updateCartUI();

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

    // ===== Filter buttons =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            e.target.classList.add('active');
            // Filter products
            currentBrandFilter = e.target.dataset.filter;
            updateProductDisplay();
        });
    });

    // ===== Quick View Modal =====
    const quickviewModal = document.getElementById('quickviewModal');
    const closeQuickviewBtn = document.getElementById('closeQuickview');
    const quickviewAddToCartBtn = document.getElementById('quickviewAddToCart');

    closeQuickviewBtn.addEventListener('click', closeQuickView);

    quickviewModal.addEventListener('click', (e) => {
        if (e.target === quickviewModal) {
            closeQuickView();
        }
    });

    quickviewAddToCartBtn.addEventListener('click', () => {
        if (currentQuickViewProduct) {
            cart.addItem(currentQuickViewProduct);
            closeQuickView();
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

    // Close cart when clicking outside
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            closeCart();
        }
    });

    // Shop Now button
    shopBtn.addEventListener('click', () => {
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });

    // Checkout button
    const checkoutBtn = document.getElementById('checkout');
    checkoutBtn.addEventListener('click', () => {
        if (cart.items.length > 0) {
            Toast.show('Thank you for your purchase!', 'success', 3000);
            cart.items = [];
            cart.saveCart();
            cart.updateCartUI();
            closeCart();
        } else {
            Toast.show('Your cart is empty', 'error', 3000);
        }
    });
});

/* ===========================
   Keyboard Navigation
   =========================== */

document.addEventListener('keydown', (e) => {
    // Close cart with Escape key
    if (e.key === 'Escape') {
        const cartModal = document.getElementById('cartModal');
        const quickviewModal = document.getElementById('quickviewModal');
        
        if (cartModal.classList.contains('active')) {
            cartModal.classList.remove('active');
        }
        if (quickviewModal.classList.contains('active')) {
            closeQuickView();
        }
    }
});
