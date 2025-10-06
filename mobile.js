// Mobile menu renderer — uses same items/images as the main site
const menuItems = [
  { id:1, name:'Tacos al Pastor', price:12.99, category:'tacos', description:'Marinated pork with pineapple, onions, and cilantro on corn tortillas', url:'images/taco.png' },
  { id:2, name:'Carne Asada Tacos', price:13.99, category:'tacos', description:'Grilled steak with fresh salsa, onions, and lime', url:'images/taco.png' },
  { id:3, name:'Fish Tacos', price:14.99, category:'tacos', description:'Beer-battered fish with cabbage slaw and chipotle mayo', url:'images/tacos.jpg' },
  { id:4, name:'Chicken Burrito', price:11.99, category:'burritos', description:'Grilled chicken, rice, beans, cheese, and salsa wrapped in a flour tortilla', url:'images/burrito.png' },
  { id:5, name:'Steak Burrito', price:13.99, category:'burritos', description:'Seasoned steak, rice, black beans, guacamole, and sour cream', url:'images/burrito.png' },
  { id:6, name:'Veggie Burrito', price:10.99, category:'burritos', description:'Grilled vegetables, rice, beans, cheese, and fresh salsa', url:'images/burrito.png' },
  { id:7, name:'Cheese Enchiladas', price:10.99, category:'enchiladas', description:'Three cheese enchiladas topped with red sauce and melted cheese', url:'images/enchilada.png' },
  { id:8, name:'Chicken Enchiladas', price:12.99, category:'enchiladas', description:'Chicken enchiladas with green tomatillo sauce and sour cream', url:'images/enchilada.png' },
  { id:9, name:'Beef Enchiladas', price:13.99, category:'enchiladas', description:'Ground beef enchiladas with red sauce and melted cheese', url:'images/enchilada.png' },
  { id:10, name:'Horchata', price:3.99, category:'drinks', description:'Traditional rice drink with cinnamon and vanilla', url:'images/horchata.png' },
  { id:11, name:'Jamaica', price:3.99, category:'drinks', description:'Refreshing hibiscus flower tea', url:'images/horchata.png' },
  { id:12, name:'Tamarindo', price:3.99, category:'drinks', description:'Sweet and tangy tamarind drink', url:'images/horchata.png' }
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
