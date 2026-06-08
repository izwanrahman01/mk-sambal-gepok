// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  scrollTopBtn.classList.toggle('show', window.scrollY > 500);

  // Active section highlight
  const sections = document.querySelectorAll('.section[id]');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });

  // Parallax on hero image
  const hero = document.querySelector('.hero-image');
  if (hero && window.scrollY < window.innerHeight) {
    hero.style.transform = `translateY(${window.scrollY * 0.15}px)`;
  }
});

scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navLinks.classList.remove('open');
}));

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    showToast('✅ Message sent! We will get back to you soon.');
    contactForm.reset();
  });
}

// ===== TOAST =====
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// ===== SCROLL ANIMATIONS (staggered) =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

// Observe fade-in elements
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Observe menu cards with staggered delay
document.querySelectorAll('.menu-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
  observer.observe(card);
});

// Observe gallery items with stagger
document.querySelectorAll('.gallery-item').forEach((item, i) => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(20px)';
});

const galleryObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const items = document.querySelectorAll('.gallery-item');
      items.forEach((item, idx) => {
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, idx * 120);
      });
      galleryObserver.disconnect();
    }
  });
}, { threshold: 0.2 });

const galleryGrid = document.querySelector('.gallery-grid');
if (galleryGrid) galleryObserver.observe(galleryGrid);

// Observe promo cards with stagger
document.querySelectorAll('.promo-card').forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
});

const promoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.promo-card').forEach((card, i) => {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
          card.style.transition = '0.6s cubic-bezier(0.22, 1, 0.36, 1)';
        }, i * 150);
      });
      promoObserver.disconnect();
    }
  });
}, { threshold: 0.2 });

const promoGrid = document.querySelector('.promo-grid');
if (promoGrid) promoObserver.observe(promoGrid);

// ===== COUNTER ANIMATION for hero stats =====
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const duration = 2000;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const stats = document.querySelectorAll('.hero-stats .stat h3');
      stats.forEach(stat => {
        const text = stat.textContent.trim();
        if (text.includes('4.8')) {
          // Animate to 4.8
          let current = 0;
          const timer = setInterval(() => {
            current += 0.1;
            if (current >= 4.8) { current = 4.8; clearInterval(timer); }
            stat.textContent = current.toFixed(1) + '★';
          }, 40);
        } else if (text.includes('1000')) {
          animateCounter(stat, 1000, '+');
        } else if (text === '4') {
          animateCounter(stat, 4, '');
        }
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ===== TILT EFFECT on menu cards (subtle) =====
document.querySelectorAll('.menu-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-8px) perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
