const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const progressBar = document.getElementById('progress-bar');
const backToTop = document.getElementById('backToTop');
const hireBtn = document.getElementById('hireMeBtn');
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");
const navLinkItems = document.querySelectorAll(".nav-links a");


// theme
const THEME_KEY = 'portfolio_theme_v3';
const savedTheme = localStorage.getItem(THEME_KEY);

function renderToggleIcon(mode) {
  if (!themeToggle) return;
  themeToggle.innerHTML = '';
  if (mode === 'dark') {
    themeToggle.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" fill="currentColor"/></svg>`;
  } else {
    themeToggle.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4.5v-2M12 21.5v-2M4.5 12h-2M21.5 12h-2M5.6 5.6l-1.4-1.4M19.8 19.8l-1.4-1.4M5.6 18.4l-1.4 1.4M19.8 4.2l-1.4 1.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }
}

function setTheme(name) {
  if (name === 'light') {
    body.classList.remove('theme-dark');
    body.classList.add('theme-light');
    renderToggleIcon('light');
    localStorage.setItem(THEME_KEY, 'light');
  } else {
    body.classList.remove('theme-light');
    body.classList.add('theme-dark');
    renderToggleIcon('dark');
    localStorage.setItem(THEME_KEY, 'dark');
  }
}

if (savedTheme) setTheme(savedTheme);
else setTheme('dark');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = body.classList.contains('theme-light');
    setTheme(isLight ? 'dark' : 'light');
  });
}

// Intersection reveal for sections
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.16 });
sections.forEach(s => observer.observe(s));

// Progress
function updateProgress() {
  const scrolled = window.scrollY;
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docH > 0 ? (scrolled / docH) * 100 : 0;
  if (progressBar) progressBar.style.width = pct + '%';
}
window.addEventListener('scroll', updateProgress);
updateProgress();

// back to top
window.addEventListener('scroll', () => {
  if (backToTop) backToTop.style.display = window.scrollY > 450 ? 'block' : 'none';
});
if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// hire button
if (hireBtn) hireBtn.addEventListener('click', () => {
  const contact = document.getElementById('contact');
  if (contact) contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// keyboard accessibility for toggle
if (themeToggle) {
  themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); themeToggle.click(); }
  });
}

// nav links reveal assist
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    setTimeout(() => {
      const id = a.getAttribute('href');
      if (id && id.startsWith('#')) {
        const el = document.querySelector(id);
        if (el) el.classList.add('visible');
      }
    }, 120);
  });
});

// nav slide-in behaviour
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');

  const icon = menuToggle.querySelector('svg path');
  if (navLinks.classList.contains('active')) {
    icon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
  } else {
    icon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
  }
});
navLinkItems.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});
window.addEventListener("scroll", () => {
  if (navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
  }
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
  }
});
document.addEventListener("click", (e) => {
  const isClickInside =
    navLinks.contains(e.target) || menuToggle.contains(e.target);
  if (!isClickInside && navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
  }
});

//auto-update year in the footer
document.getElementById("year").textContent = new Date().getFullYear();

// trailing circular dot to cursor
const cursorDot = document.querySelector('.cursor-dot');
let mouseX = 0, mouseY = 0;
let dotX = 0, dotY = 0;

/* Capture mouse movement */
window.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

/* Smooth follow animation */
function animate() {
  dotX += (mouseX - dotX) * 0.65;
  dotY += (mouseY - dotY) * 0.65;
  cursorDot.style.left = `${dotX}px`;
  cursorDot.style.top = `${dotY}px`;
  requestAnimationFrame(animate);
}
animate();

/* Hover reactions for buttons, links */
document.querySelectorAll('a, button, .btn, [role="button"]').forEach(el => {
  el.addEventListener('mouseenter', () => cursorDot.classList.add('active'));
  el.addEventListener('mouseleave', () => cursorDot.classList.remove('active'));
});

/* Dim effect for form elements */
document.querySelectorAll('input, textarea, select').forEach(el => {
  el.addEventListener('mouseenter', () => cursorDot.classList.add('dim'));
  el.addEventListener('mouseleave', () => cursorDot.classList.remove('dim'));
});

// slide-up animation for header and navs
window.addEventListener('load', () => {
  const header = document.querySelector('.navbar');
  header.classList.add('visible');
});

// Animate hero section on scroll
const heroSection = document.querySelector('.hero');
const heroImage = document.querySelector('.hero-photo-slider');
const heroInner = document.querySelector('.hero-inner');
const heroCTAs = document.querySelector('.hero-ctas');

// Intersection Observer to trigger animation on scroll
const heroObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        heroImage.classList.add('animate');
        heroInner.classList.add('animate');
        heroCTAs.classList.add('animate');
      } else {
        heroImage.classList.remove('animate');
        heroInner.classList.remove('animate');
        heroCTAs.classList.remove('animate');
      }
    });
  },
  {
    threshold: 0.3,
  }
);

heroObserver.observe(heroSection);

// Animate about section on scroll
const aboutSection = document.querySelector('#about');
const aboutTitle = aboutSection.querySelector('.section-title');
const aboutParagraphs = aboutSection.querySelectorAll('.fade-in');

const aboutObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        aboutTitle.classList.add('show');

        aboutParagraphs.forEach((p, i) => {
          setTimeout(() => {
            p.classList.add('show');
          }, (i + 1) * 800);
        });
      } else {
        aboutParagraphs.forEach((p, i) => {
          setTimeout(() => {
            p.classList.remove('show');
          }, (aboutParagraphs.length - i) * 200);
        });

        setTimeout(() => {
          aboutTitle.classList.remove('show');
        }, aboutParagraphs.length * 250);
      }
    });
  },
  { threshold: 0.3 }
);

aboutObserver.observe(aboutSection);

// Animate skillset section on scroll
const skillSection = document.querySelector('#whatido');
const skillTitle = skillSection.querySelector('h2');
const skillGroups = skillSection.querySelectorAll('.group');

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        skillTitle.classList.add('show');

        skillGroups.forEach((group, i) => {
          setTimeout(() => {
            group.classList.add('show');

            const stacks = group.querySelectorAll('.stack-card');
            stacks.forEach((card, j) => {
              setTimeout(() => card.classList.add('show'), j * 200);
            });
            const skills = group.querySelectorAll('.skills span');
            setTimeout(() => {
              skills.forEach((skill, k) => {
                setTimeout(() => skill.classList.add('show'), k * 100);
              });
            }, stacks.length * 200 + 400);
          }, (i + 1) * 600);
        });
      } else {
        skillTitle.classList.remove('show');
        skillGroups.forEach((group) => {
          group.classList.remove('show');
          group.querySelectorAll('.stack-card').forEach((card) => card.classList.remove('show'));
          group.querySelectorAll('.skills span').forEach((skill) => skill.classList.remove('show'));
        });
      }
    });
  },
  { threshold: 0.2 }
);

skillObserver.observe(skillSection);