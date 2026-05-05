// The Comic Cove - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollToTop();
    initCart();
    initNewsletterForm();
    initContactForm();
});

// Mobile Navigation
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            mobileNav.classList.toggle('active');
            this.innerHTML = isExpanded ? '&#9776;' : '&#10005;';
        });
        
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
                mobileNav.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.innerHTML = '&#9776;';
            }
        });
    }
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollTopBtn');
    
    if (scrollBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });
        
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Shopping Cart
function initCart() {
    let cart = JSON.parse(localStorage.getItem('comicCoveCart')) || [];
    const cartIcon = document.querySelector('.trolley-icon');
    
    if (cartIcon) {
        const cartCount = document.createElement('span');
        cartCount.className = 'cart-count';
        cartIcon.style.position = 'relative';
        cartIcon.appendChild(cartCount);
        
        function updateCartDisplay() {
            cartCount.textContent = cart.length;
            cartCount.style.display = cart.length > 0 ? 'flex' : 'none';
        }
        
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            if (cart.length === 0) {
                alert('Your cart is empty');
                return;
            }
            const total = cart.reduce((sum, item) => sum + item.price, 0);
            alert('Cart Summary:\n\n' + cart.map(item => item.name + ': P' + item.price).join('\n') + '\n\nTotal: P' + total.toFixed(2));
        });
        
        updateCartDisplay();
    }
}

// Newsletter Form
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.includes('@')) {
                showNotification('Thanks for subscribing!');
                emailInput.value = '';
            }
        });
    }
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('inputName');
            const email = document.getElementById('inputEmail');
            const subject = document.getElementById('inputSubject');
            const message = document.getElementById('inputMessage');
            let isValid = true;
            
            if (name && !name.value.trim()) {
                name.classList.add('is-invalid');
                isValid = false;
            }
            if (email && (!email.value.trim() || !email.value.includes('@'))) {
                email.classList.add('is-invalid');
                isValid = false;
            }
            if (subject && !subject.value) {
                subject.classList.add('is-invalid');
                isValid = false;
            }
            if (message && message.value.trim().length < 10) {
                message.classList.add('is-invalid');
                isValid = false;
            }
            
            if (isValid) {
                if (formSuccess) {
                    formSuccess.style.display = 'block';
                    contactForm.reset();
                    setTimeout(function() {
                        formSuccess.style.display = 'none';
                    }, 5000);
                }
                showNotification('Message sent successfully!');
            }
        });
    }
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(function() {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        setTimeout(function() {
            notification.remove();
        }, 300);
    }, 3000);
}