const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    navigation.classList.toggle('open', !expanded);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      navigation.classList.remove('open');
    });
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const revealTargets = document.querySelectorAll(
  '.about-grid, .section-heading, .work-card, .service-row, .toolkit, .step, .contact-card'
);

revealTargets.forEach((element) => element.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        activeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((element) => observer.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add('visible'));
}

// Original portfolio gallery: independent Personal Concept Projects.
const galleryProjects = [
  { image: 'buy-1-get-1.svg', category: 'Promotional Design', filter: 'promo', title: 'Buy 1 Get 1 Milk Tea', description: 'Poster promosi dengan headline kuat, penawaran mudah dipahami, dan visual produk yang menonjol.' },
  { image: 'matcha-series.svg', category: 'Social Media', filter: 'social', title: 'Matcha Series Campaign', description: 'Konten pengenalan Matcha Series dengan nuansa segar untuk feed dan story media sosial.' },
  { image: 'strawberry-series.svg', category: 'Social Media', filter: 'social', title: 'Strawberry Series', description: 'Eksplorasi visual varian strawberry dengan palet warna cerah dan mood playful.' },
  { image: 'premium-menu.svg', category: 'Menu Design', filter: 'menu', title: 'The Tea Edit — Premium Menu', description: 'Tata letak menu editorial yang rapi, mudah dipindai, dan menonjolkan kategori produk.' },
  { image: 'cup-packaging.svg', category: 'Packaging', filter: 'branding', title: 'Made to Go — Cup & Bag', description: 'Konsep kemasan cup dan paper bag dengan identitas visual yang konsisten.' },
  { image: 'brand-identity.svg', category: 'Branding', filter: 'branding', title: 'Sancha Brand Identity', description: 'Eksplorasi logo, tipografi, dan elemen identitas untuk karakter brand artisan tea.' },
  { image: 'product-photography.svg', category: 'Product Visual', filter: 'photo', title: 'Sip Slow — Product Visual', description: 'Konsep art direction produk dengan fokus pada warna, tekstur, dan suasana menikmati minuman.' },
  { image: 'summer-campaign.svg', category: 'Campaign', filter: 'campaign', title: 'Good Tea, Better Day', description: 'Arah kampanye musiman untuk membangun mood positif dan memperkuat daya ingat brand.' }
];
const workGrid = document.querySelector('.work-grid');
if (workGrid) {
  workGrid.innerHTML = galleryProjects.map((project, index) => `
    <article class="work-card gallery-card" data-category="${project.filter}">
      <div class="gallery-art">
        <img src="assets/gallery/${project.image}" alt="${project.title} — Personal Concept Project" loading="lazy">
        <span class="gallery-concept-label">Personal Concept Project</span>
      </div>
      <div class="work-info">
        <div><span class="work-type">${project.category.toUpperCase()}</span><h3>${project.title}</h3></div>
        <span class="work-arrow" aria-hidden="true">↗</span>
      </div>
      <p class="work-description">${project.description}</p>
    </article>`).join('');
  const filterBar = document.createElement('div');
  filterBar.className = 'gallery-filters';
  filterBar.setAttribute('aria-label', 'Filter kategori karya');
  filterBar.innerHTML = [
    ['all','Semua'],['promo','Poster Promosi'],['social','Media Sosial'],['menu','Menu'],['branding','Branding & Kemasan'],['photo','Product Visual'],['campaign','Campaign']
  ].map(([value,label],i) => `<button type="button" class="gallery-filter${i===0?' active':''}" data-filter="${value}" aria-pressed="${i===0?'true':'false'}">${label}</button>`).join('');
  workGrid.parentNode.insertBefore(filterBar, workGrid);
  filterBar.addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    filterBar.querySelectorAll('.gallery-filter').forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    workGrid.querySelectorAll('.gallery-card').forEach(card => {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    });
  });
}
