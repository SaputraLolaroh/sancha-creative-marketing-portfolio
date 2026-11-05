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


const galleryProjects = [
 {image:'assets/images/poster_flyer.jpeg',category:'Poster & Flyer',filter:'promo',title:'Promotional Flyer Design',description:'Materi flyer promosi dengan fokus pada hierarki informasi dan daya tarik visual.'},
 {image:'assets/images/poster_medial%20sosial.jpeg',category:'Social Media Campaign',filter:'social',title:'Social Media Poster',description:'Poster digital untuk kebutuhan komunikasi dan promosi di kanal sosial.'},
 {image:'assets/images/poster_menu.jpeg',category:'Menu Design',filter:'menu',title:'Menu Design',description:'Desain menu untuk menyajikan pilihan produk secara terstruktur dan mudah dibaca.'},
 {image:'assets/images/media%20sosial_feed%20instagram.jpeg',category:'Instagram Feed',filter:'social',title:'Instagram Feed System',description:'Eksplorasi tata letak feed dengan konsistensi visual untuk komunikasi brand.'},
 {image:'assets/images/media%20sosial_carousel.jpeg',category:'Carousel Content',filter:'social',title:'Social Media Carousel',description:'Konten carousel untuk menyampaikan informasi secara bertahap dan menarik.'},
 {image:'assets/images/media%20sosial_insta%20story.jpeg',category:'Instagram Story',filter:'social',title:'Instagram Story Layout',description:'Format vertikal untuk promosi singkat dan interaksi audiens.'},
 {image:'assets/images/Galeri%20Desain%20Sancha%20Artisan%20Milk%20Tea.png',category:'Creative Design Collection',filter:'collection',title:'Sancha Design Collection',description:'Kompilasi eksplorasi visual untuk kebutuhan komunikasi dan promosi artisan milk tea.'},
 {image:'assets/images/Galeri%20Kreatif%20Sancha%20Milk%20Tea.png',category:'Creative Direction',filter:'collection',title:'Sancha Creative Direction',description:'Kumpulan arah visual dan pendekatan kreatif untuk identitas konten F&B.'}
];
const workGrid=document.querySelector('.work-grid');
if(workGrid){
 workGrid.innerHTML=galleryProjects.map(function(p){return '<article class="work-card gallery-card" data-category="'+p.filter+'"><a class="gallery-art" href="'+p.image+'" target="_blank" rel="noopener noreferrer" aria-label="Lihat gambar penuh: '+p.title+'"><img src="'+p.image+'" alt="'+p.title+'" loading="lazy"><span class="gallery-concept-label">Personal Concept Project</span><span class="gallery-open">VIEW PROJECT ↗</span></a><div class="work-info"><div><span class="work-type">'+p.category.toUpperCase()+'</span><h3>'+p.title+'</h3></div><span class="work-arrow" aria-hidden="true">↗</span></div><p class="work-description">'+p.description+'</p></article>';}).join('');
 const filterBar=document.createElement('div');filterBar.className='gallery-filters';filterBar.setAttribute('aria-label','Filter kategori karya');
 filterBar.innerHTML=[['all','Semua'],['promo','Poster & Flyer'],['social','Media Sosial'],['menu','Menu'],['collection','Creative Direction']].map(function(v,i){return '<button type="button" class="gallery-filter'+(i===0?' active':'')+'" data-filter="'+v[0]+'" aria-pressed="'+(i===0?'true':'false')+'">'+v[1]+'</button>';}).join('');
 workGrid.parentNode.insertBefore(filterBar,workGrid);
 filterBar.addEventListener('click',function(event){const button=event.target.closest('[data-filter]');if(!button)return;filterBar.querySelectorAll('.gallery-filter').forEach(function(item){const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});workGrid.querySelectorAll('.gallery-card').forEach(function(card){card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;});});
}
