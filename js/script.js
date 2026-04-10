const translations = {
  ar: {
    typingTexts: ['مطور Front-End 💻', 'مصمم واجهات UI/UX 🎨', 'متعلم شغوف 🚀', 'حاصل على درجة علوم الحاسوب 🎓'],
    toastMsg: '✅ تم الإرسال بنجاح!',
    navLangBtn: 'EN'
  },
  en: {
    typingTexts: ['Front-End Developer 💻', 'UI/UX Designer 🎨', 'Passionate Learner 🚀', 'CS Graduate 🎓'],
    toastMsg: '✅ Message sent successfully!',
    navLangBtn: 'AR'
  }
};

let currentLang = 'ar';

// ─── TYPING EFFECT ───
let typingIdx = 0, charIdx = 0, isDeleting = false;
function typeEffect() {
  const texts = translations[currentLang].typingTexts;
  const el = document.getElementById('typingText');
  if (!el) return;
  const current = texts[typingIdx % texts.length];
  if (isDeleting) {
    el.textContent = current.substring(0, charIdx--);
    if (charIdx < 0) { isDeleting = false; typingIdx++; setTimeout(typeEffect, 500); return; }
  } else {
    el.textContent = current.substring(0, charIdx++);
    if (charIdx > current.length) { isDeleting = true; setTimeout(typeEffect, 1500); return; }
  }
  setTimeout(typeEffect, isDeleting ? 50 : 80);
}
typeEffect();

// ─── LANG TOGGLE ───
function toggleLang() {
  currentLang = currentLang === 'ar' ? 'en' : 'ar';
  const body = document.body;
  body.setAttribute('data-lang', currentLang);
  body.style.direction = currentLang === 'ar' ? 'rtl' : 'ltr';
  body.style.fontFamily = currentLang === 'ar' ? "'Cairo', sans-serif" : "'Inter', sans-serif";

  document.querySelectorAll('[data-ar]').forEach(el => {
    const val = el.getAttribute('data-' + currentLang);
    if (val) el.textContent = val;
  });

  const langLabel = translations[currentLang].navLangBtn;
  document.querySelectorAll('#langBtn, #langBtnMob').forEach(b => { if(b) b.textContent = langLabel; });

  document.querySelectorAll('[data-placeholder-ar]').forEach(el => {
    el.placeholder = el.getAttribute('data-placeholder-' + currentLang);
  });

  document.getElementById('toast').textContent = translations[currentLang].toastMsg;

  typingIdx = 0; charIdx = 0; isDeleting = false;
  setTimeout(typeEffect, 300);
}

// ─── DARK / LIGHT MODE ───
const themeBtn = document.getElementById('themeBtn');
const themeIcon = document.getElementById('themeIcon');

function applyTheme(mode) {
  if (mode === 'light') {
    document.body.classList.add('light-mode');
    if (themeIcon) themeIcon.className = 'fas fa-moon';
  } else {
    document.body.classList.remove('light-mode');
    if (themeIcon) themeIcon.className = 'fas fa-sun';
  }
  localStorage.setItem('theme', mode);
}

function toggleTheme() {
  const isLight = document.body.classList.contains('light-mode');
  applyTheme(isLight ? 'dark' : 'light');
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

// ─── SCROLL PROGRESS ───
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  const bar = document.getElementById('scrollProgress');
  if (bar) bar.style.width = pct + '%';
});

// ─── NAV SCROLL ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
  const bt = document.getElementById('backTop');
  if (bt) bt.classList.toggle('visible', window.scrollY > 400);
});

// ─── HAMBURGER ───
document.getElementById('hamburger')?.addEventListener('click', () => {
  document.getElementById('navLinks')?.classList.toggle('open');
});
document.querySelectorAll('#navLinks a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('navLinks')?.classList.remove('open'));
});

// ─── ACTIVE NAV ───
const sections = document.querySelectorAll('[id]');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
  document.querySelectorAll('.nav-links a[href]').forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--gold)' : '';
  });
});

// ─── INTERSECTION OBSERVER (skill cards + project cards) ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = parseInt(el.getAttribute('data-delay') || 0);
      setTimeout(() => {
        el.classList.add('visible');
        el.querySelectorAll('.skill-bar').forEach(bar => {
          bar.style.width = bar.getAttribute('data-width') + '%';
        });
      }, delay);
      observer.unobserve(el);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.skill-card, .project-card, .cert-card').forEach(el => observer.observe(el));

// ─── SCROLL ANIMATE (Animate.css) ───
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const anims = (el.getAttribute('data-anim') || 'animate__fadeInUp').split(' ');
      el.classList.add('animate__animated', ...anims, 'animated');
      scrollObserver.unobserve(el);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.scroll-animate').forEach(el => scrollObserver.observe(el));

// ─── INIT PLACEHOLDERS ───
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-placeholder-ar]').forEach(el => {
    el.placeholder = el.getAttribute('data-placeholder-ar');
  });
});


// ===== EmailJS Init =====
(function () {
  emailjs.init("oVXYqYkQdJ9_V4aL6");
})();


// ===== Contact Form =====
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = this;
  const btn = form.querySelector("button[type='submit']");
  const toast = document.getElementById("toast");

  const name = form.querySelector("input[name='from_name']").value.trim();
  const email = form.querySelector("input[name='from_email']").value.trim();
  const message = form.querySelector("textarea[name='message']").value.trim();

  const originalText = btn.innerHTML;

  // ===== Validation =====
  if (name.length < 3) {
    showToast("❌ الاسم لازم يكون 3 حروف على الأقل");
    return;
  }

  if (!validateEmail(email)) {
    showToast("❌ البريد الإلكتروني غير صحيح");
    return;
  }

  if (message.length < 10) {
    showToast("❌ الرسالة لازم تكون 10 حروف على الأقل");
    return;
  }

  // ===== Send =====
  btn.innerHTML = "⏳ جاري الإرسال...";
  btn.disabled = true;

  emailjs.sendForm(
    "service_nibyoxn",
    "template_g27ec48",
    form
  )
    .then(() => {
      form.reset();
      showToast("✅ تم إرسال الرسالة بنجاح!");
    })
    .catch((error) => {
      console.error(error);
      showToast("❌ " + error.text);
    })
    .finally(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
    });

});


// ===== Toast Function =====
function showToast(message) {
  const toast = document.getElementById("toast");

  toast.innerHTML = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}


// ===== Email Validation =====
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}