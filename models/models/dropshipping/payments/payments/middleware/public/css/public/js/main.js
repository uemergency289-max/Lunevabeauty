document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initCartDrawer();
  initSEOAndSchema();
});

// Sticky Glass Navbar state on scroll
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Client-Side Dynamic Cart Engine
const LunevaCart = {
  items: JSON.parse(localStorage.getItem('luneva_cart')) || [],

  addItem(productId, name, price, image, variant = null) {
    const existingIndex = this.items.findIndex(item => item.productId === productId && item.variant === variant);
    if (existingIndex > -1) {
      this.items[existingIndex].quantity += 1;
    } else {
      this.items.push({ productId, name, price, image, variant, quantity: 1 });
    }
    this.saveCart();
    this.updateUI();
  },

  removeItem(productId, variant = null) {
    this.items = this.items.filter(item => !(item.productId === productId && item.variant === variant));
    this.saveCart();
    this.updateUI();
  },

  getTotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  saveCart() {
    localStorage.setItem('luneva_cart', JSON.stringify(this.items));
  },

  updateUI() {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
      const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
      badge.textContent = count;
    }
  }
};

function initCartDrawer() {
  LunevaCart.updateUI();
}

// JSON-LD Schema Generator for E-Commerce SEO
function initSEOAndSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "LunevaBeauty",
    "url": window.location.origin,
    "logo": `${window.location.origin}/images/logo.png`,
    "description": "Premium Luxury Beauty & Skincare E-Commerce Platform",
    "priceRange": "$$$"
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schemaData);
  document.head.appendChild(script);
}
