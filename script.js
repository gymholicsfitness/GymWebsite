// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ===== HAMBURGER MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
  // Close on outside click
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });
}

// ===== HERO SLIDER =====
const heroSlider = document.getElementById('heroSlider');
if (heroSlider) {
  const slides = heroSlider.querySelectorAll('.slide');
  const dotsContainer = document.getElementById('sliderDots');
  let current = 0;
  let timer;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    slides[current].classList.remove('active');
    dotsContainer.children[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dotsContainer.children[current].classList.add('active');
    resetTimer();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(next, 5000);
  }

  document.getElementById('nextBtn')?.addEventListener('click', next);
  document.getElementById('prevBtn')?.addEventListener('click', prev);

  // Touch swipe
  let startX = 0;
  heroSlider.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  heroSlider.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  });

  resetTimer();
}

// ===== STATS COUNTER =====
const statNums = document.querySelectorAll('.stat-num');
if (statNums.length) {
  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        let count = 0;
        const step = Math.ceil(target / 60);
        const interval = setInterval(() => {
          count = Math.min(count + step, target);
          el.textContent = count;
          if (count >= target) clearInterval(interval);
        }, 30);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => countObserver.observe(el));
}

// ===== GALLERY FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const photoItems = document.querySelectorAll('.photo-item');
if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      photoItems.forEach(item => {
        if (filter === 'all' || item.dataset.cat === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
if (lightbox && photoItems.length) {
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  let currentLightboxIndex = 0;
  const visibleItems = () => [...photoItems].filter(i => !i.classList.contains('hidden'));

  photoItems.forEach((item, i) => {
    item.addEventListener('click', () => {
      const bg = item.style.backgroundImage.match(/url\(['"]?(.*?)['"]?\)/)?.[1];
      const caption = item.querySelector('.photo-overlay span')?.textContent;
      lightboxImg.src = bg || '';
      lightboxCaption.textContent = caption || '';
      currentLightboxIndex = visibleItems().indexOf(item);
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  document.getElementById('lightboxClose')?.addEventListener('click', () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  });

  document.getElementById('lightboxPrev')?.addEventListener('click', () => {
    const items = visibleItems();
    currentLightboxIndex = (currentLightboxIndex - 1 + items.length) % items.length;
    const item = items[currentLightboxIndex];
    lightboxImg.src = item.style.backgroundImage.match(/url\(['"]?(.*?)['"]?\)/)?.[1] || '';
    lightboxCaption.textContent = item.querySelector('.photo-overlay span')?.textContent || '';
  });

  document.getElementById('lightboxNext')?.addEventListener('click', () => {
    const items = visibleItems();
    currentLightboxIndex = (currentLightboxIndex + 1) % items.length;
    const item = items[currentLightboxIndex];
    lightboxImg.src = item.style.backgroundImage.match(/url\(['"]?(.*?)['"]?\)/)?.[1] || '';
    lightboxCaption.textContent = item.querySelector('.photo-overlay span')?.textContent || '';
  });

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') { lightbox.classList.remove('open'); document.body.style.overflow = ''; }
    if (e.key === 'ArrowLeft') document.getElementById('lightboxPrev')?.click();
    if (e.key === 'ArrowRight') document.getElementById('lightboxNext')?.click();
  });
}

// ===== STAR RATING =====
const stars = document.querySelectorAll('.star');
const ratingVal = document.getElementById('ratingVal');
if (stars.length) {
  stars.forEach(star => {
    star.addEventListener('mouseover', () => {
      const val = parseInt(star.dataset.val);
      stars.forEach((s, i) => s.classList.toggle('active', i < val));
    });
    star.addEventListener('mouseleave', () => {
      const current = parseInt(ratingVal?.value || 0);
      stars.forEach((s, i) => s.classList.toggle('active', i < current));
    });
    star.addEventListener('click', () => {
      const val = parseInt(star.dataset.val);
      if (ratingVal) ratingVal.value = val;
      stars.forEach((s, i) => s.classList.toggle('active', i < val));
    });
  });
}

// ===== FILE UPLOAD PREVIEWS =====
const photoUpload = document.getElementById('photoUpload');
const photoPreview = document.getElementById('photoPreview');
const photoName = document.getElementById('photoName');
if (photoUpload) {
  photoUpload.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    photoName.textContent = file.name;
    const reader = new FileReader();
    reader.onload = ev => {
      photoPreview.innerHTML = `<img src="${ev.target.result}" alt="Preview">`;
    };
    reader.readAsDataURL(file);
  });
}

const videoUpload = document.getElementById('videoUpload');
const videoPreview = document.getElementById('videoPreview');
const videoName = document.getElementById('videoName');
if (videoUpload) {
  videoUpload.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    videoName.textContent = file.name;
    const url = URL.createObjectURL(file);
    videoPreview.innerHTML = `<video src="${url}" controls></video>`;
  });
}

// ===== REVIEW FORM SUBMIT =====
const reviewForm = document.getElementById('reviewForm');
if (reviewForm) {
  reviewForm.addEventListener('submit', e => {
    e.preventDefault();
    const success = document.getElementById('formSuccess');
    if (success) {
      success.classList.add('show');
      reviewForm.reset();
      if (photoPreview) photoPreview.innerHTML = '';
      if (videoPreview) videoPreview.innerHTML = '';
      if (photoName) photoName.textContent = 'No file chosen';
      if (videoName) videoName.textContent = 'No file chosen';
      if (ratingVal) ratingVal.value = 0;
      stars.forEach(s => s.classList.remove('active'));
      setTimeout(() => success.classList.remove('show'), 5000);
    }
  });
}

// ===== CONTACT FORM SUBMIT =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const success = document.getElementById('contactSuccess');
    if (success) {
      success.classList.add('show');
      contactForm.reset();
      setTimeout(() => success.classList.remove('show'), 5000);
    }
  });
}

// ===== FAQ ACCORDION =====
const faqQuestions = document.querySelectorAll('.faq-q');
faqQuestions.forEach(q => {
  q.addEventListener('click', () => {
    const answer = q.nextElementSibling;
    const isOpen = q.classList.contains('open');
    // Close all
    faqQuestions.forEach(fq => {
      fq.classList.remove('open');
      fq.nextElementSibling?.classList.remove('open');
    });
    // Open clicked if it was closed
    if (!isOpen) {
      q.classList.add('open');
      answer?.classList.add('open');
    }
  });
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.program-card, .trainer-card, .value-card, .review-card, .plan-card, .info-card');
if (revealEls.length) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, (entry.target.dataset.delay || 0) * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    el.dataset.delay = i % 4;
    revealObserver.observe(el);
  });
}

// ===== ACTIVE NAV LINK =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === currentPage) a.classList.add('active');
});
