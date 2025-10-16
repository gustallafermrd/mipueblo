// Mobile menu renderer — uses same items/images as the main site
const menuItems = [
  {
    id: 1,
    name: '3 Campechanos Tacos',
    price: 15.00,
    category: 'tacos',
    description: 'Steak and chorizo. These tacos made with yellow corn tortilla, stuffed with cilantro and raw onions. Served with rice, beans, grilled onions, limes, chilis toreados and taco sauce. ',
    icon: '🌮',
    url: 'images/taco.png'
  },
  {
    id: 2,
    name: '3 Pastor Tacos',
    price: 15.00,
    category: 'tacos',
    description: 'Marinated pork. These tacos made with yellow corn tortilla, stuffed with cilantro and raw onions. Served with rice, beans, grilled onions, limes, chilis toreados and taco sauce.',
    icon: '🌮'
    , url: 'images/taco.png'
  },
  {
    id: 3,
    name: '3 Carnitas Tacos',
    price: 15.00,
    category: 'tacos',
    description: 'Pork. These tacos made with yellow corn tortilla, stuffed with cilantro and raw onions. Served with rice, beans, grilled onions, limes, chilis toreados and taco sauce.',
    icon: '🌮'
    , url: 'images/taco.png'
  },
  {
    id: 4,
    name: 'Burrito Bandera',
    price: 16.50,
    category: 'burritos',
    description: 'Burrito filled with steak, grilled chicken, carnitas, rice and beans. Topped with cilantro, green, red and cheese sauce.',
    icon: '🌯'
    , url: 'images/burrito.png'
  },
  {
    id: 5,
    name: 'Burrito Chile Verde',
    price: 16.50,
    category: 'burritos',
    description: 'Burrito filled with carnitas, rice, and beans. Topped with green sauce and queso dip.',
    icon: '🌯'
    , url: 'images/burrito.png'
  },
  {
    id: 6,
    name: 'Burrito Mi Pueblo',
    price: 16.50,
    category: 'burritos',
    description: 'Grande burrito filled steak, grilled chicken, shrimp, chorizo, carnitas, rice, beans, onions, tomatoes, bell peppers, zucchini and mushrooms. Topped with cheese sauce. Served with a guacamole salad.',
    icon: '🌯'
    , url: 'images/burrito.png'
  },
  {
    id: 7,
    name: 'Fajitas GTO | Guanajuato',
    price: 22.50,
    category: 'fajitas',
    description: 'Steak, chicken and shrimp fajitas. All fajitas are cooked with grilled onions, zucchini, bell peppers, tomatoes, and mushrooms. Served with rice, beans, lettuce, pico de gallo, sour cream and guacamole. Choice of flour or corn tortillas.',
    icon: '🫔'
    , url: 'images/fajitas.jpg'
  },
  {
    id: 8,
    name: 'Shrimp Fajitas',
    price: 21.50,
    category: 'fajitas',
    description: 'All fajitas are cooked with grilled onions, zucchini, bell peppers, tomatoes, and mushrooms. Served with rice, beans, lettuce, pico de gallo, sour cream and guacamole. Choice of flour or corn tortillas.',
    icon: '🫔'
    , url: 'images/fajitas.jpg'
  },
  {
    id: 9,
    name: 'Steak, Chicken or Mixed Fajitas',
    price: 18.50,
    category: 'fajitas',
    description: 'All fajitas are cooked with grilled onions, zucchini, bell peppers, tomatoes, and mushrooms. Served with rice, beans, lettuce, pico de gallo, sour cream and guacamole. Choice of flour or corn tortillas.',
    icon: '🫔'
    , url: 'images/fajitas.jpg'
  },
  {
    id: 10,
    name: 'Horchata',
    price: 5.00,
    category: 'drinks',
    description: 'Traditional rice drink with cinnamon and vanilla',
    icon: '🥤'
    , url: 'images/horchata.png'
  },
  {
    id: 11,
    name: 'Jamaica',
    price: 5.00,
    category: 'drinks',
    description: 'Refreshing hibiscus flower tea',
    icon: '🥤'
    , url: 'images/jamaica.jpg'
  },
  {
    id: 12,
    name: 'Mexican Coke',
    price: 5.00,
    category: 'drinks',
    description: 'Sweet and tangy tamarind drink',
    icon: '🥤'
    , url: 'images/coke.jpg'
  }
];

const categories = ['all','tacos','burritos','enchiladas','drinks'];

const menuList = document.getElementById('menuList');
const categoryScroll = document.getElementById('categoryScroll');
const searchInput = document.getElementById('searchInput');

function createCategoryButtons(){
  categories.forEach(cat=>{
    const btn = document.createElement('button');
    btn.className = 'category-btn' + (cat==='all'? ' active':'');
    btn.textContent = cat==='all'? 'All' : capitalize(cat);
    btn.dataset.category = cat;
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.category-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      renderMenu(cat, searchInput.value.trim());
    });
    categoryScroll.appendChild(btn);
  });
}

function capitalize(s){return s.charAt(0).toUpperCase()+s.slice(1)}

function renderMenu(category='all', search=''){
  const q = search.toLowerCase();
  const items = menuItems.filter(it=> (category==='all' || it.category===category) && (it.name.toLowerCase().includes(q) || it.description.toLowerCase().includes(q)));
  menuList.innerHTML = items.map(it=>`
    <article class="menu-card" data-category="${it.category}">
      <div class="thumb">
        <img src="${it.url}" alt="${it.name}" loading="lazy" onerror="this.onerror=null;this.src='images/tacos.avif'" />
      </div>
      <div class="meta">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div class="title">${it.name}</div>
          <div class="price">$${it.price.toFixed(2)}</div>
        </div>
        <div class="desc">${it.description}</div>
        <div class="actions">
          <button class="btn-order">Order</button>
          <button class="btn-details">Details</button>
        </div>
      </div>
    </article>
  `).join('');
}

searchInput.addEventListener('input', ()=>{
  const active = document.querySelector('.category-btn.active')?.dataset.category || 'all';
  renderMenu(active, searchInput.value.trim());
});

// init
createCategoryButtons();
renderMenu();

// accessibility: focus first card on load
window.addEventListener('load', ()=>{
  const first = document.querySelector('.menu-card');
  if(first) first.tabIndex = -1;
});
