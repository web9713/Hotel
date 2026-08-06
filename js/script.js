/* =========================================================
   BCA HOTEL — Master Script
   Vanilla JS. No dependencies except optional EmailJS SDK.
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Preloader ---------- */
  var preloader = document.getElementById('preloader');
  window.addEventListener('load', function () {
    setTimeout(function () {
      if (preloader) preloader.classList.add('done');
    }, 350);
  });
  // Fallback in case 'load' already fired
  setTimeout(function () {
    if (preloader && !preloader.classList.contains('done')) preloader.classList.add('done');
  }, 2500);

  /* ---------- Sticky Navbar ---------- */
  var navbar = document.getElementById('navbar');
  function handleScrollNav() {
    if (!navbar) return;
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }
  handleScrollNav();
  window.addEventListener('scroll', handleScrollNav, { passive: true });

  /* ---------- Mobile Menu ---------- */
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Active nav link ---------- */
  var current = (window.location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) a.classList.add('active');
  });

  /* ---------- Hero Slider ---------- */
  var slides = document.querySelectorAll('.hero-slide');
  var dotsWrap = document.getElementById('heroDots');
  if (slides.length) {
    var idx = 0;
    if (dotsWrap) {
      slides.forEach(function (_, i) {
        var b = document.createElement('button');
        if (i === 0) b.classList.add('active');
        b.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        b.addEventListener('click', function () { goToSlide(i); });
        dotsWrap.appendChild(b);
      });
    }
    function goToSlide(i) {
      slides[idx].classList.remove('active');
      if (dotsWrap) dotsWrap.children[idx].classList.remove('active');
      idx = i;
      slides[idx].classList.add('active');
      if (dotsWrap) dotsWrap.children[idx].classList.add('active');
    }
    setInterval(function () {
      goToSlide((idx + 1) % slides.length);
    }, 5500);
  }

  /* ---------- Counter Animation ---------- */
  var counters = document.querySelectorAll('.num[data-count]');
  if (counters.length) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { counterObserver.observe(c); });
  }
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var duration = 1600;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  /* ---------- Scroll Reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Back To Top ---------- */
  var fabTop = document.getElementById('fabTop');
  if (fabTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) fabTop.classList.add('show');
      else fabTop.classList.remove('show');
    }, { passive: true });
    fabTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Gallery Filter + Lightbox ---------- */
  var filterBtns = document.querySelectorAll('.gallery-filters button');
  var galleryItems = document.querySelectorAll('.gallery-item');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.getAttribute('data-filter');
      galleryItems.forEach(function (item) {
        if (f === 'all' || item.getAttribute('data-cat') === f) item.classList.remove('hide');
        else item.classList.add('hide');
      });
    });
  });

  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var visibleImgs = [];
  var lbIndex = 0;
  function refreshVisible() {
    visibleImgs = Array.prototype.filter.call(galleryItems, function (item) {
      return !item.classList.contains('hide');
    });
  }
  galleryItems.forEach(function (item, i) {
    item.addEventListener('click', function () {
      refreshVisible();
      lbIndex = visibleImgs.indexOf(item);
      openLightbox();
    });
  });
  function openLightbox() {
    if (!lightbox || !visibleImgs.length) return;
    var img = visibleImgs[lbIndex].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
  }
  var lbClose = document.getElementById('lightboxClose');
  var lbPrev = document.getElementById('lightboxPrev');
  var lbNext = document.getElementById('lightboxNext');
  if (lbClose) lbClose.addEventListener('click', function () { lightbox.classList.remove('open'); });
  if (lightbox) lightbox.addEventListener('click', function (e) { if (e.target === lightbox) lightbox.classList.remove('open'); });
  if (lbPrev) lbPrev.addEventListener('click', function () {
    lbIndex = (lbIndex - 1 + visibleImgs.length) % visibleImgs.length; openLightbox();
  });
  if (lbNext) lbNext.addEventListener('click', function () {
    lbIndex = (lbIndex + 1) % visibleImgs.length; openLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') lightbox.classList.remove('open');
    if (e.key === 'ArrowLeft' && lbPrev) lbPrev.click();
    if (e.key === 'ArrowRight' && lbNext) lbNext.click();
  });

  /* ---------- Testimonials Slider ---------- */
  var testiSlides = document.querySelectorAll('.testi-slide');
  if (testiSlides.length) {
    var tIdx = 0;
    function showTesti(i) {
      testiSlides[tIdx].classList.remove('active');
      tIdx = (i + testiSlides.length) % testiSlides.length;
      testiSlides[tIdx].classList.add('active');
    }
    var tPrev = document.getElementById('testiPrev');
    var tNext = document.getElementById('testiNext');
    if (tPrev) tPrev.addEventListener('click', function () { showTesti(tIdx - 1); });
    if (tNext) tNext.addEventListener('click', function () { showTesti(tIdx + 1); });
    setInterval(function () { showTesti(tIdx + 1); }, 6000);
  }

  /* ---------- Menu Tabs (Restaurant page) ---------- */
  var menuTabs = document.querySelectorAll('.menu-tabs button');
  var menuPanels = document.querySelectorAll('.menu-panel');
  menuTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      menuTabs.forEach(function (t) { t.classList.remove('active'); });
      menuPanels.forEach(function (p) { p.classList.remove('active'); });
      tab.classList.add('active');
      document.getElementById(tab.getAttribute('data-target')).classList.add('active');
    });
  });

  /* ---------- FAQ Accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Newsletter form (front-end only) ---------- */
  var newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = newsletterForm.querySelector('.nl-msg');
      if (msg) { msg.textContent = 'Thank you — you are on the list.'; msg.style.color = 'var(--gold)'; }
      newsletterForm.reset();
    });
  }

  /* ---------- Contact form (front-end validation + EmailJS optional) ---------- */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateForm(contactForm)) return;
      var msgBox = document.getElementById('contactMsg');
      sendWithEmailJS(EMAILJS_CONFIG.contactTemplateId, gatherFields(contactForm), msgBox, contactForm);
    });
  }

  /* ---------- Booking form (validation + EmailJS) ---------- */
  var bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    var checkin = bookingForm.querySelector('[name="checkin"]');
    var checkout = bookingForm.querySelector('[name="checkout"]');
    var today = new Date().toISOString().split('T')[0];
    if (checkin) checkin.setAttribute('min', today);
    if (checkin && checkout) {
      checkin.addEventListener('change', function () {
        checkout.setAttribute('min', checkin.value);
      });
    }
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateForm(bookingForm)) return;
      if (checkin.value && checkout.value && checkout.value <= checkin.value) {
        var field = checkout.closest('.field');
        field.classList.add('invalid');
        field.querySelector('.error-text').textContent = 'Check-out must be after check-in.';
        return;
      }
      var msgBox = document.getElementById('bookingMsg');
      sendWithEmailJS(EMAILJS_CONFIG.bookingTemplateId, gatherFields(bookingForm), msgBox, bookingForm);
    });
  }

  function gatherFields(form) {
    var data = {};
    new FormData(form).forEach(function (value, key) { data[key] = value; });
    return data;
  }

  function validateForm(form) {
    var valid = true;
    form.querySelectorAll('[required]').forEach(function (input) {
      var field = input.closest('.field');
      var errorEl = field ? field.querySelector('.error-text') : null;
      var isValid = input.checkValidity() && input.value.trim() !== '';
      if (!isValid) {
        valid = false;
        if (field) field.classList.add('invalid');
        if (errorEl && !errorEl.textContent) errorEl.textContent = 'This field is required.';
      } else if (field) {
        field.classList.remove('invalid');
      }
    });
    return valid;
  }

  /* Clear invalid state as user types */
  document.querySelectorAll('.field input, .field select, .field textarea').forEach(function (input) {
    input.addEventListener('input', function () {
      var field = input.closest('.field');
      if (field) field.classList.remove('invalid');
    });
  });

  /* ---------- Lazy Loading (native + fallback class) ---------- */
  document.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
    img.addEventListener('error', function () {
      img.style.background = '#1c1a17';
    });
  });

});

/* =========================================================
   EmailJS Integration
   Replace the placeholders below with your own EmailJS
   Service ID, Template IDs and Public Key from
   https://dashboard.emailjs.com
   ========================================================= */
var EMAILJS_CONFIG = {
  publicKey: 'edOO0w7Ejq5L2_kEZ',
  serviceId: 'service_j679egi',
  bookingTemplateId: 'template_7l4z3qb',
  contactTemplateId: 'template_gc1qc6p'
};

function sendWithEmailJS(templateId, fields, msgBox, form) {
  if (typeof emailjs === 'undefined') {
    showFormMessage(msgBox, 'error', 'Booking service is not configured yet. Please call us directly or try again later.');
    return;
  }
  var submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending...'; }

  emailjs.init(EMAILJS_CONFIG.publicKey);
  emailjs.send(EMAILJS_CONFIG.serviceId, templateId, fields)
    .then(function () {
      showFormMessage(msgBox, 'success', 'Thank you! Your request has been sent. Our team will contact you shortly, and a confirmation email is on its way to your inbox.');
      form.reset();
    })
    .catch(function () {
      showFormMessage(msgBox, 'error', 'Something went wrong while sending your request. Please try again or contact us directly by phone.');
    })
    .finally(function () {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = submitBtn.getAttribute('data-label') || 'Submit'; }
    });
}

function showFormMessage(msgBox, type, text) {
  if (!msgBox) return;
  msgBox.className = 'form-msg ' + type;
  msgBox.textContent = text;
  msgBox.style.display = 'block';
  msgBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
