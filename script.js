const body = document.body;
const progressBar = document.getElementById('progress-bar');
const backToTop = document.getElementById('backToTop');
const hireBtn = document.getElementById('hireMeBtn');
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");
const navLinkItems = document.querySelectorAll(".nav-links a");

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

// // back to top
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// hire button
if (hireBtn) hireBtn.addEventListener('click', () => {
  const contact = document.getElementById('contact');
  if (contact) contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

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
  dotX += (mouseX - dotX) * 0.15;
  dotY += (mouseY - dotY) * 0.15;
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

// // Animate projects section on scroll
const projectsSection = document.querySelector('#projects');
const projectTitle = projectsSection.querySelector('h2');
const projectLead = projectsSection.querySelector('.lead');
const projectFilters = projectsSection.querySelector('.project-filters');
const filterButtons = projectFilters.querySelectorAll('.filter-btn');
const frontendCat = projectsSection.querySelector('.frontend-cat');
const promptCat = projectsSection.querySelector('.prompt-cat');
const frontendProjects = projectsSection.querySelectorAll('.project-frontend');
const promptProjects = projectsSection.querySelectorAll('.project-prompt');
[
  projectTitle,
  projectLead,
  projectFilters,
  ...filterButtons,
  frontendCat,
  ...frontendProjects,
  promptCat,
  ...promptProjects,
].forEach(el => el.classList.add('project-fade'));

const projectObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        projectTitle.classList.add('show');
        setTimeout(() => projectLead.classList.add('show'), 300);
        setTimeout(() => projectFilters.classList.add('show'), 600);
        filterButtons.forEach((btn, i) => {
          setTimeout(() => btn.classList.add('show'), 900 + i * 200);
        });
        setTimeout(() => frontendCat.classList.add('show'), 1600);
        frontendProjects.forEach((proj, i) => {
          setTimeout(() => proj.classList.add('show'), 2000 + i * 200);
        });
        setTimeout(() => promptCat.classList.add('show'), 3000);
        promptProjects.forEach((proj, i) => {
          setTimeout(() => proj.classList.add('show'), 3400 + i * 200);
        });
      } else {
        [
          projectTitle,
          projectLead,
          projectFilters,
          ...filterButtons,
          frontendCat,
          ...frontendProjects,
          promptCat,
          ...promptProjects,
        ].forEach(el => el.classList.remove('show'));
      }
    });
  },
  { threshold: 0.2 }
);
projectObserver.observe(projectsSection);
// Animate tools section on scroll
const toolsSection = document.querySelector("#tools");
const frontendTools = toolsSection.querySelectorAll(".frontend-tools .tool-card");
const aiTools = toolsSection.querySelectorAll(".ai-tools .tool-card");

const toolsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        toolsSection.classList.add("show");

        frontendTools.forEach((card, i) => {
          setTimeout(() => {
            card.classList.add("show");
          }, i * 150);
        });
        aiTools.forEach((card, i) => {
          setTimeout(() => {
            card.classList.add("show");
          }, (frontendTools.length * 150) + (i * 150) + 400);
        });
      } else {
        toolsSection.classList.remove("show");
        [...frontendTools, ...aiTools].forEach((card) =>
          card.classList.remove("show")
        );
      }
    });
  },
  { threshold: 0.25 }
);
toolsObserver.observe(toolsSection);

// Animate contact section on scroll
const contactSection = document.querySelector("#contact");
const contactTitle = contactSection.querySelector(".section-title");
const contactLead = contactSection.querySelector(".lead");
const contactLinks = contactSection.querySelectorAll(".connect");

const contactObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        contactTitle.classList.add("show");
        setTimeout(() => {
          contactLead.classList.add("show");
        }, 400);
        contactLinks.forEach((link, i) => {
          setTimeout(() => {
            link.classList.add("show");
          }, 700 + i * 400);
        });
      } else {
        contactTitle.classList.remove("show");
        contactLead.classList.remove("show");
        contactLinks.forEach((link) => link.classList.remove("show"));
      }
    });
  },
  { threshold: 0.3 }
);
contactObserver.observe(contactSection);

// Scrollspy Navigation Highlight
const allSections = document.querySelectorAll("section[id]");
const allNavLinks = document.querySelectorAll(".nav-links a");
let currentActive = null;

function activateScrollspy() {
  let currentSection = "";

  allSections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    if (scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });
  if (currentSection && currentSection !== currentActive) {
    currentActive = currentSection;

    allNavLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }
}
let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      activateScrollspy();
      ticking = false;
    });
    ticking = true;
  }
});

// Project filter functionality
const filterButtonsA = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project");

filterButtonsA.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove "active" class from all buttons
    filterButtonsA.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    projects.forEach((project) => {
      // Show all if "all" is selected
      if (filter === "all") {
        project.style.display = "block";
      } else {
        // Show only matching category
        if (project.classList.contains(`project-${filter}`)) {
          project.style.display = "block";
        } else {
          project.style.display = "none";
        }
      }
    });
  });
});

// Arrow down svgs per section except the last section
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section:not(:last-of-type)");

  sections.forEach((section) => {
    const arrow = document.createElement("div");
    arrow.classList.add("scroll-down-arrow");
    arrow.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    `;
    section.appendChild(arrow);

    arrow.addEventListener("click", () => {
      const next = section.nextElementSibling;
      if (next) next.scrollIntoView({ behavior: "smooth" });
    });
  });
});

// Preloader before main site displays
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const siteContent = document.querySelector(".site-content");
  const letters = document.querySelectorAll(".preloader-name .letter");
  const dot = document.querySelector(".preloader-name .dot");
  const letterSound = document.getElementById("letterSound");
  const dotSound = document.getElementById("dotSound");

  // Spark and sound for letters
  letters.forEach(letter => {
    letter.addEventListener("animationend", () => {
      letter.classList.add("spark");
      setTimeout(() => letter.classList.remove("spark"), 600);

      // Play sound
      if (letterSound) {
        letterSound.currentTime = 0;
        letterSound.play();
      }
    });
  });

  // Dot pulse sound and explode
  dot.addEventListener("animationiteration", () => {
    if (dotSound) {
      dotSound.currentTime = 0;
      dotSound.play();
    }
  });
  dot.addEventListener("animationend", () => {
    dot.classList.add("spark-explode");
  });

  // Hide preloader after 2.8s, show main site
  setTimeout(() => {
    preloader.classList.add("hidden");
    siteContent.classList.add("loaded");
  }, 2800);
});