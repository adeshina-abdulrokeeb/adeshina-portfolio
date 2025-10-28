const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const progressBar = document.getElementById('progress-bar');
const backToTop = document.getElementById('backToTop');
const hireBtn = document.getElementById('hireMeBtn');

// Theme Management
const THEME_KEY = 'portfolio_theme_v1';
const savedTheme = localStorage.getItem(THEME_KEY);

function setTheme(themeName) {
  if (themeName === 'light') {
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

// Decide initial theme
if (savedTheme) {
  setTheme(savedTheme);
} else {
  setTheme('dark'); 
}

// Icon rendering for theme toggle button
function renderToggleIcon(mode) {
  if (!themeToggle) return;
  themeToggle.innerHTML = '';
  if (mode === 'dark') {
    themeToggle.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" fill="currentColor"/>
      </svg>`;
  } else {
    themeToggle.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 4.5v-2M12 21.5v-2M4.5 12h-2M21.5 12h-2M5.6 5.6l-1.4-1.4M19.8 19.8l-1.4-1.4M5.6 18.4l-1.4 1.4M19.8 4.2l-1.4 1.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
  }
}

themeToggle.addEventListener('click', () => {
  const isLight = body.classList.contains('theme-light');
  setTheme(isLight ? 'dark' : 'light');
});

// Section reveal on scroll
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.18 });

sections.forEach(s => observer.observe(s));

// Progress Bar Management
function updateProgress() {
  const scrolled = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
}
window.addEventListener('scroll', updateProgress);
updateProgress();

// Back to Top Button
window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 450 ? 'block' : 'none';
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Hire button scroll to contact section
hireBtn.addEventListener('click', () => {
  const contact = document.getElementById('contact');
  if (contact) contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Accessibility: Allow theme toggle via keyboard
themeToggle.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    themeToggle.click();
  }
});

// Navigation link smooth scroll and section reveal
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', (e) => {
    setTimeout(() => {
      if (a.hash) {
        const el = document.querySelector(a.hash);
        if (el) el.classList.add('visible');
      }
    }, 120);
  });
});