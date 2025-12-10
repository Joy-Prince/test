document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add scroll header effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(15, 23, 42, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
        } else {
            header.style.background = 'rgba(15, 23, 42, 0.8)';
            header.style.boxShadow = 'none';
        }
    });

    // Add to Cart Scroll Effect
    const cartButtons = document.querySelectorAll('.product-card .btn-primary');
    const cartIcon = document.getElementById('cart-icon');

    // Cart State
    let cart = [];
    const cartDropdown = document.getElementById('cart-dropdown');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCountSpan = document.getElementById('cart-count');
    const cartIconLink = document.getElementById('cart-icon');

    // Toggle Dropdown
    cartIconLink.addEventListener('click', (e) => {
        e.preventDefault();
        cartDropdown.classList.toggle('active');
    });

    const updateCartDisplay = () => {
        // Update Badge
        cartCountSpan.textContent = cart.length;

        // Update Dropdown Content
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
        } else {
            cart.forEach((item, index) => {
                const itemEl = document.createElement('div');
                itemEl.classList.add('cart-item');
                itemEl.innerHTML = `
                    <div class="item-info">
                        <h4>${item.name}</h4>
                        <span class="item-price">${item.price}</span>
                    </div>
                    <button class="remove-btn" data-index="${index}">×</button>
                `;
                cartItemsContainer.appendChild(itemEl);
            });

            // Add remove listeners
            document.querySelectorAll('.remove-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const index = parseInt(e.target.dataset.index);
                    cart.splice(index, 1);
                    updateCartDisplay();
                });
            });
        }
    };

    cartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            // Get Product Details
            const card = button.closest('.product-card');
            const name = card.querySelector('h3').innerText;
            const price = card.querySelector('.price').innerText;

            // Add to Cart
            cart.push({ name, price });
            updateCartDisplay();

            // Open Dropdown to show the "one by one" addition
            cartDropdown.classList.add('active');

            // Scroll to the cart icon
            cartIcon.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Highlight the cart icon briefly
            cartIcon.style.color = '#c14242';
            setTimeout(() => {
                cartIcon.style.color = '';
            }, 1000);
        });
    });
});
