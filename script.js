// Cart functionality with SessionStorage
const CART_STORAGE_KEY = 'cartItems';

// Initialize cart from sessionStorage
let cart = JSON.parse(sessionStorage.getItem(CART_STORAGE_KEY) || '[]');

// Add to Cart functionality
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
  button.addEventListener('click', () => {
    const product = {
      name: button.dataset.product,
      price: parseFloat(button.dataset.price)
    };
    cart.push(product);
    sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    alert('Item added to the cart');
    updateCartDisplay();
  });
});

// View Cart functionality
document.getElementById('viewCartBtn')?.addEventListener('click', () => {
  const modal = document.getElementById('cartModal');
  cart = JSON.parse(sessionStorage.getItem(CART_STORAGE_KEY) || '[]');
  updateCartDisplay();
  modal.style.display = 'block';
});

// Clear Cart functionality
document.getElementById('clearCartBtn')?.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('No items to clear');
  } else {
    cart = [];
    sessionStorage.removeItem(CART_STORAGE_KEY);
    alert('Cart cleared');
    updateCartDisplay();
    document.getElementById('cartModal').style.display = 'none';
  }
});

// Process Order functionality
document.getElementById('processOrderBtn')?.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Cart is empty');
  } else {
    alert('Thank you for your order');
    cart = [];
    sessionStorage.removeItem(CART_STORAGE_KEY);
    updateCartDisplay();
    document.getElementById('cartModal').style.display = 'none';
  }
});

// Update Cart Display
function updateCartDisplay() {
  const cartItems = document.getElementById('cartItems');
  if (cartItems) {
    cartItems.innerHTML = '';
    cart.forEach(item => {
      cartItems.innerHTML += `<p>${item.name} - $${item.price}</p>`;
    });
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('cartTotal').textContent = total.toFixed(2);
  }
}

// Newsletter subscription functionality
document.querySelectorAll('.newsletter-form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput.value) {
      alert('Thank you for subscribing');
      emailInput.value = '';
    }
  });
});

// Contact form with localStorage
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {
      name: contactForm.name.value,
      email: contactForm.email.value,
      message: contactForm.message.value,
      timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    contacts.push(formData);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    
    alert('Thank you for your message');
    contactForm.reset();
  });
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
  const modal = document.getElementById('cartModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});