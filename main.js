const locations = [
  {
    name: 'Minneapolis Downtown',
    address: '123 Nicollet Mall',
    city: 'Minneapolis, MN 55403',
    phone: '(612) 555-0101',
    hours: 'Mon-Sun: 11AM - 10PM',
    lat: 44.9778,
    lng: -93.2650
  },
  {
    name: 'St. Paul East Side',
    address: '456 East 7th Street',
    city: 'St. Paul, MN 55106',
    phone: '(651) 555-0102',
    hours: 'Mon-Sun: 11AM - 10PM',
    lat: 44.9537,
    lng: -93.0900
  },
  {
    name: 'Bloomington Mall',
    address: '789 Mall of America',
    city: 'Bloomington, MN 55425',
    phone: '(952) 555-0103',
    hours: 'Mon-Sun: 10AM - 9PM',
    lat: 44.8548,
    lng: -93.2422
  },
  {
    name: 'Rochester Center',
    address: '321 Broadway Avenue',
    city: 'Rochester, MN 55904',
    phone: '(507) 555-0104',
    hours: 'Mon-Sun: 11AM - 10PM',
    lat: 44.0234,
    lng: -92.4802
  },
  {
    name: 'Duluth Lakeside',
    address: '567 Canal Park Drive',
    city: 'Duluth, MN 55802',
    phone: '(218) 555-0105',
    hours: 'Mon-Sun: 11AM - 10PM',
    lat: 46.7833,
    lng: -92.1001
  }
];

const menuItems = [
  {
    id: 1,
    name: 'Tacos al Pastor',
    price: 12.99,
    category: 'tacos',
    description: 'Marinated pork with pineapple, onions, and cilantro on corn tortillas',
    icon: '🌮',
    url: 'images/taco.png'
  },
  {
    id: 2,
    name: 'Carne Asada Tacos',
    price: 13.99,
    category: 'tacos',
    description: 'Grilled steak with fresh salsa, onions, and lime',
    icon: '🌮'
    , url: 'images/taco.png'
  },
  {
    id: 3,
    name: 'Fish Tacos',
    price: 14.99,
    category: 'tacos',
    description: 'Beer-battered fish with cabbage slaw and chipotle mayo',
    icon: '🌮'
    , url: 'images/taco.png'
  },
  {
    id: 4,
    name: 'Chicken Burrito',
    price: 11.99,
    category: 'burritos',
    description: 'Grilled chicken, rice, beans, cheese, and salsa wrapped in a flour tortilla',
    icon: '🌯'
    , url: 'images/burrito.png'
  },
  {
    id: 5,
    name: 'Steak Burrito',
    price: 13.99,
    category: 'burritos',
    description: 'Seasoned steak, rice, black beans, guacamole, and sour cream',
    icon: '🌯'
    , url: 'images/burrito.png'
  },
  {
    id: 6,
    name: 'Veggie Burrito',
    price: 10.99,
    category: 'burritos',
    description: 'Grilled vegetables, rice, beans, cheese, and fresh salsa',
    icon: '🌯'
    , url: 'images/burrito.png'
  },
  {
    id: 7,
    name: 'Cheese Enchiladas',
    price: 10.99,
    category: 'enchiladas',
    description: 'Three cheese enchiladas topped with red sauce and melted cheese',
    icon: '🫔'
    , url: 'images/enchilada.png'
  },
  {
    id: 8,
    name: 'Chicken Enchiladas',
    price: 12.99,
    category: 'enchiladas',
    description: 'Chicken enchiladas with green tomatillo sauce and sour cream',
    icon: '🫔'
    , url: 'images/enchilada.png'
  },
  {
    id: 9,
    name: 'Beef Enchiladas',
    price: 13.99,
    category: 'enchiladas',
    description: 'Ground beef enchiladas with red sauce and melted cheese',
    icon: '🫔'
    , url: 'images/enchilada.png'
  },
  {
    id: 10,
    name: 'Horchata',
    price: 3.99,
    category: 'drinks',
    description: 'Traditional rice drink with cinnamon and vanilla',
    icon: '🥤'
    , url: 'images/horchata.png'
  },
  {
    id: 11,
    name: 'Jamaica',
    price: 3.99,
    category: 'drinks',
    description: 'Refreshing hibiscus flower tea',
    icon: '🥤'
    , url: 'images/horchata.png'
  },
  {
    id: 12,
    name: 'Tamarindo',
    price: 3.99,
    category: 'drinks',
    description: 'Sweet and tangy tamarind drink',
    icon: '🥤'
    , url: 'images/horchata.png'
  }
];

let cart = [];
let currentCategory = 'all';

function renderMenuItems(category = 'all') {
  const menuGrid = document.getElementById('menuGrid');
  const filteredItems = category === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === category);

  menuGrid.innerHTML = filteredItems.map(item => `
    <div class="menu-item" data-category="${item.category}">
      <div class="menu-item-image">
        <span>
          <img src="${item.url}" alt="${item.name}" loading="lazy" />
        </span>
      </div>
      <div class="menu-item-content">
        <div class="menu-item-header">
          <h3 class="menu-item-name">${item.name}</h3>
          <span class="menu-item-price">$${item.price.toFixed(2)}</span>
        </div>
        <p class="menu-item-description">${item.description}</p>
        <div class="menu-item-footer">
          <span class="menu-item-category">${item.category}</span>
          <button class="btn-add-cart" data-id="${item.id}">Add to Cart</button>
        </div>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const itemId = parseInt(e.target.dataset.id);
      addToCart(itemId);
    });
  });
}

function addToCart(itemId) {
  const item = menuItems.find(i => i.id === itemId);
  const existingItem = cart.find(i => i.id === itemId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  updateCart();
  showCartNotification();
}

function removeFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  updateCart();
}

function updateQuantity(itemId, change) {
  const item = cart.find(i => i.id === itemId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateCart();
    }
  }
}

function updateCart() {
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const cartCount = document.querySelector('.cart-count');

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  cartCount.textContent = totalItems;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <span class="empty-icon">🛒</span>
        <p>Your cart is empty</p>
      </div>
    `;
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-image">
          <span>${item.icon}</span>
        </div>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          <div class="cart-item-controls">
            <button class="quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
            <span class="quantity-value">${item.quantity}</span>
            <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
            <button class="btn-remove" data-id="${item.id}">Remove</button>
          </div>
        </div>
      </div>
    `).join('');

    document.querySelectorAll('.quantity-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemId = parseInt(e.target.dataset.id);
        const action = e.target.dataset.action;
        updateQuantity(itemId, action === 'increase' ? 1 : -1);
      });
    });

    document.querySelectorAll('.btn-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemId = parseInt(e.target.dataset.id);
        removeFromCart(itemId);
      });
    });
  }

  cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
}

function showCartNotification() {
  const cartBtn = document.getElementById('cartBtn');
  cartBtn.style.transform = 'scale(1.1)';
  setTimeout(() => {
    cartBtn.style.transform = 'scale(1)';
  }, 200);
}

function openCart() {
  const cartSidebar = document.getElementById('cartSidebar');
  const cartOverlay = document.getElementById('cartOverlay');
  cartSidebar.classList.add('open');
  cartOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  const cartSidebar = document.getElementById('cartSidebar');
  const cartOverlay = document.getElementById('cartOverlay');
  cartSidebar.classList.remove('open');
  cartOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

function openPickupModal() {
  const modal = document.getElementById('pickupModal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePickupModal() {
  const modal = document.getElementById('pickupModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function handleCheckout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  alert('Thank you for your order! This is a mockup, so no actual payment is processed.');
  cart = [];
  updateCart();
  closeCart();
}

function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinksContainer = document.querySelector('.nav-links');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }

      if (window.innerWidth <= 768) {
        navLinksContainer.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      }
    });
  });

  mobileMenuBtn.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
  });

  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

function initCategoryFilters() {
  const categoryBtns = document.querySelectorAll('.category-btn');

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;
      currentCategory = category;
      renderMenuItems(category);
    });
  });
}

let map;
let markers = [];

function initMap() {
  const mapElement = document.getElementById('map');
  if (!mapElement) return;

  const minnesotaCenter = { lat: 45.5, lng: -93.0 };

  map = new google.maps.Map(mapElement, {
    zoom: 7,
    center: minnesotaCenter,
    styles: [
      {
        featureType: 'all',
        elementType: 'geometry',
        stylers: [{ color: '#fef8f3' }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#c9e9f7' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#ffffff' }]
      },
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      }
    ]
  });

  locations.forEach((location, index) => {
    const marker = new google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map: map,
      title: location.name,
      label: {
        text: (index + 1).toString(),
        color: 'white',
        fontWeight: 'bold'
      },
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 20,
        fillColor: '#2d6e4e',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 3
      }
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="padding: 12px; font-family: Inter, sans-serif;">
          <h3 style="margin: 0 0 8px 0; color: #2d6e4e; font-size: 16px; font-weight: 700;">${location.name}</h3>
          <p style="margin: 4px 0; color: #666; font-size: 14px;">${location.address}<br>${location.city}</p>
          <p style="margin: 4px 0; color: #1a1a1a; font-size: 13px; font-weight: 600;">${location.hours}</p>
          <p style="margin: 4px 0; color: #d83838; font-size: 13px; font-weight: 600;">${location.phone}</p>
        </div>
      `
    });

    marker.addListener('click', () => {
      markers.forEach(m => m.infoWindow.close());
      infoWindow.open(map, marker);

      document.querySelectorAll('.location-item').forEach(item => {
        item.classList.remove('active');
      });
      document.querySelector(`[data-location="${index}"]`).classList.add('active');
    });

    markers.push({ marker, infoWindow });
  });

  const locationItems = document.querySelectorAll('.location-item');
  locationItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      locationItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      map.setCenter({ lat: locations[index].lat, lng: locations[index].lng });
      map.setZoom(12);

      markers.forEach(m => m.infoWindow.close());
      markers[index].infoWindow.open(map, markers[index].marker);
    });
  });
}

window.initMap = initMap;

function init() {
  renderMenuItems();
  updateCart();
  initNavigation();
  initCategoryFilters();

  document.getElementById('cartBtn').addEventListener('click', openCart);
  document.getElementById('cartClose').addEventListener('click', closeCart);
  document.getElementById('cartOverlay').addEventListener('click', closeCart);
  document.getElementById('checkoutBtn').addEventListener('click', handleCheckout);

  document.querySelector('.btn-pickup').addEventListener('click', openPickupModal);
  document.getElementById('pickupClose').addEventListener('click', closePickupModal);

  document.querySelector('#pickupModal .modal-content .btn-primary').addEventListener('click', () => {
    const selectedLocation = document.querySelector('input[name="location"]:checked');
    if (selectedLocation) {
      alert(`Pick-up location set to: ${selectedLocation.value}`);
      closePickupModal();
    } else {
      alert('Please select a location');
    }
  });

  document.querySelectorAll('.hero-actions .btn').forEach((btn, index) => {
    btn.addEventListener('click', () => {
      if (index === 0) {
        openPickupModal();
      } else {
        const menuSection = document.getElementById('menu');
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = menuSection.offsetTop - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', init);
