'use strict';

// ═══════════════════════════════════════════════════════
//  DATA
// ═══════════════════════════════════════════════════════
const CATEGORIES = [
  { id: 'all',          name: '🔥 Todo',               emoji: '🔥' },
  { id: 'hamburguesas', name: 'Hamburguesas',           emoji: '🍔' },
  { id: 'hotdogs',      name: 'Hot Dogs',               emoji: '🌭' },
  { id: 'papas',        name: 'Papas a la Francesa',    emoji: '🍟' },
  { id: 'nachos',       name: 'Nachos',                 emoji: '🧀' },
  { id: 'alitas',       name: 'Alitas',                 emoji: '🍗' },
  { id: 'refrescos',    name: 'Refrescos',              emoji: '🥤' },
];

const PRODUCTS = [
  // Hamburguesas
  { id:1,  cat:'hamburguesas', image:'img/burger.png', name:'Doble Smash Burger',      price:175, badge:'MÁS VENDIDA', desc:'Doble carne ahumada, queso americano derretido, lechuga, jitomate y salsa secreta de la casa.' },
  { id:2,  cat:'hamburguesas', image:'img/burger.png', name:'Classic Cheeseburger',    price:145, badge:null,          desc:'Carne de res premium, queso cheddar, pepinillos, cebolla caramelizada y mostaza artesanal.' },
  { id:3,  cat:'hamburguesas', image:'img/burger.png', name:'Bacon BBQ Burger',        price:195, badge:'NUEVA',       desc:'Carne jugosa, tocino crujiente, aros de cebolla dorados, queso pepper jack y salsa BBQ ahumada.' },
  { id:4,  cat:'hamburguesas', image:'img/burger.png', name:'Jalapeño Fire Burger',    price:165, badge:'PICANTE',     desc:'Carne especiada al carbón, jalapeños frescos, queso fundido y mayonesa chipotle.' },

  // Hot Dogs
  { id:5,  cat:'hotdogs', image:'img/dog.png', name:'Hot Dog Clásico',       price:85,  badge:null,      desc:'Salchicha de res en pan tostado, tocino, jalapeño, mostaza, cátsup y mayonesa callejera.' },
  { id:6,  cat:'hotdogs', image:'img/dog.png', name:'Chicago Dog',           price:95,  badge:null,      desc:'Salchicha de res con pepinillo, jitomate, cebolla morada, pepperoncini y sal de apio.' },
  { id:7,  cat:'hotdogs', image:'img/dog.png', name:'Chili Dog',             price:105, badge:'NUEVA',   desc:'Hot dog con chili casero, queso cheddar rallado y cebolla finamente picada.' },
  { id:8,  cat:'hotdogs', image:'img/dog.png', name:'Street Dog Especial',   price:115, badge:'ESPECIAL',desc:'Salchicha XL envuelta en tocino, aguacate, cebolla asada y jalapeños toreados.' },

  // Papas - AHORA CON IMAGEN
  { id:9,  cat:'papas', image:'img/papas.png', name:'Papas Fritas Clásicas',  price:65,  badge:null,         desc:'Papas a la francesa doradas y crujientes, sazonadas con sal gruesa y especias de la casa.' },
  { id:10, cat:'papas', image:'img/papas.png', name:'Papas con Queso',        price:85,  badge:'FAVORITA',   desc:'Papas fritas cubiertas con queso cheddar fundido y cebollín fresco picado.' },
  { id:11, cat:'papas', image:'img/papas.png', name:'Papas Loaded',           price:115, badge:'ESPECIAL',   desc:'Papas con chili, queso derretido, crema, tocino crujiente y jalapeños frescos.' },

  // Nachos
  { id:12, cat:'nachos', image:'img/nachos.png', name:'Nachos Supremos',       price:155, badge:'PARA COMPARTIR', desc:'Totopos artesanales con queso fundido, jalapeños, jitomate, frijoles y crema espesa.' },
  { id:13, cat:'nachos', image:'img/nachos.png', name:'Nachos con Pollo',      price:175, badge:null,              desc:'Totopos con pollo al chipotle, guacamole fresco, pico de gallo y crema.' },
  { id:14, cat:'nachos', image:'img/nachos.png', name:'Nachos Picosos',        price:145, badge:'HOT',             desc:'Totopos con salsa habanero, queso Oaxaca, jalapeño en rajas y cilantro fresco.' },

  // Alitas
  { id:15, cat:'alitas', image:'img/alitas.png', name:'Alitas Buffalo 6 pzas',          price:135, badge:'HOT',   desc:'Alitas crujientes bañadas en salsa buffalo con aderezo ranch y apio fresco.' },
  { id:16, cat:'alitas', image:'img/alitas.png', name:'Alitas Miel BBQ 6 pzas',         price:135, badge:null,    desc:'Alitas con glaseado de miel y BBQ, doradas a la perfección.' },
  { id:17, cat:'alitas', image:'img/alitas.png', name:'Alitas a la Plancha 10 pzas',    price:185, badge:'COMBO', desc:'Alitas naturales al carbón con especias secretas de la casa y limón.' },

  // Refrescos - TAMAÑO PEQUEÑO
  { id:18, cat:'refrescos', image:'img/coca.png', name:'Coca-Cola 500ml',         price:45, badge:null, desc:'Coca-Cola clásica bien fría en botella de vidrio.', small: true },
  { id:19, cat:'refrescos', image:'img/sprite.png', name:'Sprite 500ml',            price:45, badge:null, desc:'Sprite refrescante bien fría, perfecta para acompañar tu platillo.', small: true },
  { id:20, cat:'refrescos', image:'img/cerveza.png', name:'Cerveza Artesanal 355ml', price:75, badge:null, desc:'Cerveza oscura artesanal local, tostada y aromática.', small: true },
];

const STATUS_LABELS = {
  preparing: { label:'Preparando',       cls:'status-preparing' },
  ready:     { label:'Listo para recoger', cls:'status-ready'    },
  delivery:  { label:'En Camino',         cls:'status-delivery'  },
  delivered: { label:'Entregado',         cls:'status-delivered' },
};

const STATUS_ORDER = ['preparing','ready','delivery','delivered'];

// ═══════════════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════════════
let cart      = JSON.parse(localStorage.getItem('leq_cart')    || '[]');
let orders    = JSON.parse(localStorage.getItem('leq_orders')  || '[]');
let activeCat = 'all';
let payMethod = 'card';
let currentPage = 'home';
let openTrackingId = null;

// ═══════════════════════════════════════════════════════
//  PERSIST
// ═══════════════════════════════════════════════════════
function saveCart()   { localStorage.setItem('leq_cart',   JSON.stringify(cart));   }
function saveOrders() { localStorage.setItem('leq_orders', JSON.stringify(orders)); }

// ═══════════════════════════════════════════════════════
//  NAVIGATION
// ═══════════════════════════════════════════════════════
function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById(page).classList.add('active');
  document.querySelector(`[data-page="${page}"]`).classList.add('active');
  currentPage = page;
  window.scrollTo(0,0);

  if (page === 'cart')   renderCart();
  if (page === 'orders') renderOrders();
}

function scrollToMenu() {
  document.getElementById('cat-pills').scrollIntoView({ behavior:'smooth', block:'start' });
}

// ═══════════════════════════════════════════════════════
//  PRODUCT CARD HTML
// ═══════════════════════════════════════════════════════
function productCardHTML(product) {
  const badge = product.badge
    ? `<span class="badge">${product.badge}</span>`
    : '';
  
  // Usar imagen si existe, sino emoji
  // Si es refresco (small), usar clase diferente para tamaño reducido
  const imgClass = product.small ? 'food-img-small' : 'food-img-img';
  const imgContent = product.image 
    ? `<img src="${product.image}" alt="${product.name}" class="${imgClass}">`
    : `<div class="food-img">${product.emoji}</div>`;
  
  return `
    <div class="product-card glass">
      ${imgContent}
      ${badge}
      <h3>${product.name}</h3>
      <p>${product.desc}</p>
      <div class="card-footer">
        <span class="price">$${product.price}</span>
        <button class="btn-add" onclick="addToCart(${product.id})" title="Agregar">+</button>
      </div>
    </div>`;
}

// ═══════════════════════════════════════════════════════
//  HOME — CATEGORIES + PRODUCTS
// ═══════════════════════════════════════════════════════
function renderCategoryPills() {
  const wrap = document.getElementById('cat-pills');
  wrap.innerHTML = CATEGORIES.map(cat => `
    <button
      class="cat-pill ${activeCat === cat.id ? 'active' : ''}"
      onclick="filterCategory('${cat.id}')"
    >
      ${cat.emoji !== '🔥' ? `<span>${cat.emoji}</span>` : ''}
      ${cat.name}
    </button>`).join('');
}

function filterCategory(id) {
  activeCat = id;
  renderCategoryPills();
  const catObj = CATEGORIES.find(c => c.id === id);
  document.getElementById('section-label').textContent =
    id === 'all' ? 'Menú Completo' : catObj.name;
  renderProductGrid();
}

function renderProductGrid() {
  const products = activeCat === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.cat === activeCat);
  const grid = document.getElementById('product-grid');
  if (products.length === 0) {
    grid.innerHTML = `<div class="empty-state"><div class="big-icon">🍽️</div>No se encontraron productos.</div>`;
  } else {
    grid.innerHTML = products.map(productCardHTML).join('');
  }
}

// ═══════════════════════════════════════════════════════
//  SEARCH
// ═══════════════════════════════════════════════════════
function handleSearch(query) {
  const q = query.toLowerCase().trim();
  const results = q
    ? PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.cat.toLowerCase().includes(q))
    : PRODUCTS;

  const countEl = document.getElementById('search-count');
  countEl.textContent = q
    ? `${results.length} resultado(s) para "${query}"`
    : '';

  const grid = document.getElementById('search-grid');
  if (results.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="big-icon">🔍</div>
        <p>Sin resultados. Intenta con otra palabra.</p>
      </div>`;
  } else {
    grid.innerHTML = results.map(productCardHTML).join('');
  }
}

// ═══════════════════════════════════════════════════════
//  CART
// ═══════════════════════════════════════════════════════
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ 
      id: productId, 
      name: product.name, 
      price: product.price, 
      image: product.image || null,
      emoji: product.emoji || null,
      small: product.small || false,
      qty: 1 
    });
  }
  saveCart();
  updateCartBadge();
  showToast(`${product.name} agregado al carrito`);
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  updateCartBadge();
  renderCart();
}

function changeQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(productId);
  else { saveCart(); renderCart(); }
}

function updateCartBadge() {
  const total = cart.reduce((s,i) => s + i.qty, 0);
  const badge = document.getElementById('cart-badge');
  if (total > 0) {
    badge.textContent = total > 9 ? '9+' : total;
    badge.classList.add('visible');
  } else {
    badge.classList.remove('visible');
  }
}

function selectPay(method) {
  payMethod = method;
  document.getElementById('pay-card').classList.toggle('selected', method === 'card');
  document.getElementById('pay-cash').classList.toggle('selected', method === 'cash');
}

function renderCart() {
  const isEmpty = cart.length === 0;
  document.getElementById('cart-empty').style.display = isEmpty ? 'flex' : 'none';
  document.getElementById('cart-full').style.display  = isEmpty ? 'none' : 'block';
  if (isEmpty) return;

  // Items
  document.getElementById('cart-items-list').innerHTML = cart.map(item => {
    // Usar imagen o emoji en el carrito
    const imgClass = item.small ? 'cart-item-img-small' : 'cart-item-img-img';
    const imgContent = item.image
      ? `<img src="${item.image}" alt="${item.name}" class="${imgClass}">`
      : `<div class="cart-item-img">${item.emoji}</div>`;
    
    return `
    <div class="cart-item glass">
      ${imgContent}
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <div class="item-price">$${item.price}</div>
      </div>
      <div class="cart-item-actions">
        <button class="btn-remove" onclick="removeFromCart(${item.id})" title="Eliminar">🗑</button>
        <div class="qty-ctrl">
          <button onclick="changeQty(${item.id},-1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${item.id},+1)">+</button>
        </div>
      </div>
    </div>`;
  }).join('');

  // Totals
  const sub  = cart.reduce((s,i) => s + i.price * i.qty, 0);
  const tax  = sub * 0.08;
  const grand = sub + tax;
  document.getElementById('summary-sub').textContent   = `$${sub.toFixed(2)}`;
  document.getElementById('summary-tax').textContent   = `$${tax.toFixed(2)}`;
  document.getElementById('summary-total').textContent = `$${grand.toFixed(2)}`;
}

function placeOrder() {
  const name = document.getElementById('order-name').value.trim();
  if (!name) { showToast('Por favor ingresa tu nombre'); return; }
  if (cart.length === 0) { showToast('Tu carrito está vacío'); return; }

  const sub   = cart.reduce((s,i) => s + i.price * i.qty, 0);
  const total = sub * 1.08;
  const statuses = ['preparing','ready','delivery','delivered'];
  const order = {
    id:          Date.now(),
    customerName: name,
    paymentMethod: payMethod,
    items:       cart.map(i => ({ ...i })),
    subtotal:    sub,
    total:       total,
    status:      'preparing',
    createdAt:   new Date().toISOString(),
  };

  orders.unshift(order);
  saveOrders();
  cart = [];
  saveCart();
  updateCartBadge();

  // Simulate status progression for demo
  simulateOrderProgress(order.id);

  document.getElementById('order-name').value = '';
  selectPay('card');
  showToast('¡Pedido realizado con éxito!');
  navigate('orders');
}

function simulateOrderProgress(orderId) {
  const delays = [8000, 18000, 32000]; // ms to next status
  const steps  = ['ready','delivery','delivered'];
  steps.forEach((status, i) => {
    setTimeout(() => {
      const order = orders.find(o => o.id === orderId);
      if (!order) return;
      order.status = status;
      saveOrders();
      if (currentPage === 'orders') renderOrders();
    }, delays[i]);
  });
}

// ═══════════════════════════════════════════════════════
//  ORDERS
// ═══════════════════════════════════════════════════════
function renderOrders() {
  const emptyEl = document.getElementById('orders-empty');
  const listEl  = document.getElementById('orders-list');

  if (orders.length === 0) {
    emptyEl.style.display = 'flex';
    listEl.innerHTML = '';
    return;
  }
  emptyEl.style.display = 'none';

  listEl.innerHTML = orders.map(order => {
    const sc = STATUS_LABELS[order.status] || STATUS_LABELS.preparing;
    const dateStr = new Date(order.createdAt).toLocaleDateString('es-MX', {
      day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit'
    });
    const itemsStr = order.items.map(i => `${i.qty}x ${i.name}`).join(', ');
    const isOpen = openTrackingId === order.id;

    return `
      <div class="order-card glass" id="oc-${order.id}">
        <div class="order-card-top">
          <div>
            <div class="order-id">Pedido #${String(order.id).slice(-4)}</div>
            <div class="order-name">${order.customerName}</div>
            <div class="order-date">${dateStr}</div>
          </div>
          <div class="order-total">$${order.total.toFixed(2)}</div>
        </div>
        <div class="order-items-text">${itemsStr}</div>
        <div class="order-card-bottom">
          <div class="status-badge ${sc.cls}">
            ${statusIcon(order.status)} ${sc.label}
          </div>
          <button class="btn-track" onclick="toggleTracking(${order.id})">
            🚚 ${isOpen ? 'Ocultar mapa' : 'Ver seguimiento'}
          </button>
        </div>
        <div class="tracking-map ${isOpen ? 'open' : ''}" id="map-${order.id}">
          ${buildTrackingMap(order)}
        </div>
      </div>`;
  }).join('');
}

function statusIcon(status) {
  return { preparing:'⏱️', ready:'📦', delivery:'🚚', delivered:'✅' }[status] || '⏱️';
}

function toggleTracking(orderId) {
  openTrackingId = openTrackingId === orderId ? null : orderId;
  renderOrders();
}

// ═══════════════════════════════════════════════════════
//  TRACKING MAP (SVG)
// ═══════════════════════════════════════════════════════
function buildTrackingMap(order) {
  const stepIdx = STATUS_ORDER.indexOf(order.status);
  const progress = [0.05, 0.30, 0.72, 1.00][stepIdx] || 0.05;

  // Cubic bezier approximation: P0=(40,130) P1=(100,100) P2=(200,40) P3=(260,30)
  function bezier(t) {
    const p = [[40,130],[100,100],[200,40],[260,30]];
    const mt = 1-t;
    return {
      x: mt*mt*mt*p[0][0] + 3*mt*mt*t*p[1][0] + 3*mt*t*t*p[2][0] + t*t*t*p[3][0],
      y: mt*mt*mt*p[0][1] + 3*mt*mt*t*p[1][1] + 3*mt*t*t*p[2][1] + t*t*t*p[3][1],
    };
  }
  const truck = bezier(progress);

  // Completed path length approximation (fixed at 220 units)
  const dashOff = 220 - 220 * progress;

  const STEPS = [
    { key:'preparing', icon:'⏱️', label:'Recibido'  },
    { key:'ready',     icon:'📦', label:'Preparando'},
    { key:'delivery',  icon:'🚚', label:'En Camino' },
    { key:'delivered', icon:'✅', label:'Entregado' },
  ];

  const stepsHTML = STEPS.map((s,i) => {
    const done = i <= stepIdx;
    const curr = i === stepIdx;
    const lineCls = i < stepIdx ? 'done' : '';
    return `
      <div class="step ${done ? 'done' : ''} ${curr ? 'curr' : ''}">
        <div class="step-dot">${s.icon}</div>
        <div class="step-label">${s.label}</div>
      </div>`;
  }).join('');

  return `
    <div class="map-area">
      <!-- fake map tiles SVG -->
      <svg viewBox="0 0 300 160" preserveAspectRatio="xMidYMid slice"
           style="position:absolute;inset:0;width:100%;height:100%;opacity:.22">
        ${[30,60,90,110,135].map(y=>`<line x1="0" y1="${y}" x2="300" y2="${y}" stroke="#3a4a6b" stroke-width="1.5"/>`).join('')}
        ${[40,80,120,160,200,240,280].map(x=>`<line x1="${x}" y1="0" x2="${x}" y2="160" stroke="#3a4a6b" stroke-width="1.5"/>`).join('')}
        <line x1="0" y1="160" x2="120" y2="0" stroke="#3a4a6b" stroke-width="1"/>
        <line x1="180" y1="160" x2="300" y2="20" stroke="#3a4a6b" stroke-width="1"/>
        <rect x="45" y="35" width="30" height="20" fill="#252d44" rx="2"/>
        <rect x="85" y="65" width="25" height="18" fill="#252d44" rx="2"/>
        <rect x="130" y="40" width="22" height="16" fill="#252d44" rx="2"/>
        <rect x="165" y="50" width="28" height="20" fill="#252d44" rx="2"/>
        <rect x="205" y="30" width="24" height="15" fill="#252d44" rx="2"/>
      </svg>

      <!-- Route SVG -->
      <svg viewBox="0 0 300 160" preserveAspectRatio="xMidYMid slice"
           style="position:absolute;inset:0;width:100%;height:100%">

        <!-- Glow -->
        <path d="M 40,130 C 100,100 200,40 260,30"
              fill="none" stroke="#d4a843" stroke-width="5" stroke-opacity=".15" stroke-linecap="round"/>

        <!-- Remaining (dashed) -->
        <path d="M 40,130 C 100,100 200,40 260,30"
              fill="none" stroke="white" stroke-width="1.5"
              stroke-dasharray="5 7" stroke-opacity=".22" stroke-linecap="round"/>

        <!-- Completed route -->
        <path d="M 40,130 C 100,100 200,40 260,30"
              fill="none" stroke="#d4a843" stroke-width="2.5"
              stroke-linecap="round"
              stroke-dasharray="220"
              stroke-dashoffset="${dashOff.toFixed(1)}"
              style="transition:stroke-dashoffset 1.2s ease-out"/>

        <!-- Origin -->
        <circle cx="40" cy="130" r="7" fill="#e85d28" stroke="white" stroke-width="1.5"/>
        <text x="40" y="148" text-anchor="middle" fill="white" font-size="7" font-weight="bold">LA ESQ.</text>

        <!-- Destination -->
        <circle cx="260" cy="30" r="7" fill="#d4a843" stroke="white" stroke-width="1.5"/>
        <text x="260" y="48" text-anchor="middle" fill="white" font-size="7" font-weight="bold">TU CASA</text>

        <!-- Truck -->
        <circle cx="${truck.x.toFixed(1)}" cy="${truck.y.toFixed(1)}" r="11" fill="#d4a843"/>
        <text x="${truck.x.toFixed(1)}" y="${(truck.y+4).toFixed(1)}" text-anchor="middle" font-size="10">🚚</text>

        <!-- Pulse ring -->
        <circle cx="${truck.x.toFixed(1)}" cy="${truck.y.toFixed(1)}" r="11"
                fill="none" stroke="#d4a843" stroke-width="1.5" opacity="0.5">
          <animate attributeName="r" values="11;20;11" dur="1.8s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.5;0;0.5" dur="1.8s" repeatCount="indefinite"/>
        </circle>
      </svg>

      <!-- Labels -->
      <div class="map-order-id">🚚 Pedido #${String(order.id).slice(-4)}</div>
      <div class="map-eta">~25 min</div>
    </div>

    <!-- Progress steps -->
    <div class="tracking-steps">${stepsHTML}</div>`;
}

// ═══════════════════════════════════════════════════════
//  TOAST
// ═══════════════════════════════════════════════════════
let toastTimer = null;
function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
}

// ═══════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════
function init() {
  renderCategoryPills();
  renderProductGrid();
  handleSearch('');
  updateCartBadge();
}

init();