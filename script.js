/* ===================================================================
   MD NAFIS HASAN — PORTFOLIO SCRIPT
   ===================================================================
   This file is split into small, labeled sections. Each one handles
   exactly one feature, so you can find and edit things easily:

   1. Dark / Light mode toggle (saves choice in localStorage)
   2. Mobile hamburger menu
   3. Header shadow/border on scroll + back-to-top button
   4. Scroll-reveal animations (fade-up elements)
   5. Animated skill bars (fill in when scrolled into view)
   6. Contact form handling (front-end only demo)
   7. Auto-update footer year
=================================================================== */


/* -------------------------------------------------------------
   1. DARK / LIGHT MODE TOGGLE
   Adds/removes the "dark-mode" class on <body>. The chosen theme
   is saved to localStorage so it persists across page reloads.
---------------------------------------------------------------- */
const themeToggleBtn = document.getElementById('theme-toggle');
const bodyEl = document.body;

// On page load, check if the user previously chose a theme.
// If not, fall back to their operating system's preference.
const savedTheme = localStorage.getItem('portfolio-theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
  bodyEl.classList.add('dark-mode');
}

themeToggleBtn.addEventListener('click', () => {
  bodyEl.classList.toggle('dark-mode');

  // Save the user's choice so it persists next time they visit
  const isDark = bodyEl.classList.contains('dark-mode');
  localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
});


/* -------------------------------------------------------------
   2. MOBILE HAMBURGER MENU
   Toggles the .open class on the nav links list, and animates
   the hamburger icon into an X (handled in CSS via .active class).
---------------------------------------------------------------- */
const menuToggleBtn = document.getElementById('menu-toggle');
const navLinksList = document.getElementById('nav-links');

menuToggleBtn.addEventListener('click', () => {
  const isOpen = navLinksList.classList.toggle('open');
  menuToggleBtn.classList.toggle('active');
  menuToggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// Close the mobile menu automatically when a nav link is clicked
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    navLinksList.classList.remove('open');
    menuToggleBtn.classList.remove('active');
    menuToggleBtn.setAttribute('aria-expanded', 'false');
  });
});


/* -------------------------------------------------------------
   3. HEADER BORDER ON SCROLL + BACK-TO-TOP BUTTON
---------------------------------------------------------------- */
const siteHeader = document.getElementById('site-header');
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  const scrolledDown = window.scrollY > 20;

  // Add a hairline border under the header once page is scrolled
  siteHeader.classList.toggle('scrolled', scrolledDown);

  // Show the back-to-top button after scrolling down a bit
  backToTopBtn.classList.toggle('visible', window.scrollY > 480);
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* -------------------------------------------------------------
   4. SCROLL-REVEAL ANIMATIONS
   Any element with a [data-animate] attribute starts hidden
   (see CSS) and fades/slides into view the first time it enters
   the viewport. Uses IntersectionObserver for good performance
   (no scroll-event math needed).
---------------------------------------------------------------- */
const animatedElements = document.querySelectorAll('[data-animate]');

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Stop watching this element once it has animated in
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15, // trigger once 15% of the element is visible
    rootMargin: '0px 0px -40px 0px',
  }
);

animatedElements.forEach((el) => revealObserver.observe(el));


/* -------------------------------------------------------------
   5. ANIMATED SKILL BARS
   Each .skill-bar element has a data-level="85" attribute (the
   percentage to fill to). We only set the actual CSS width once
   the skill bar scrolls into view, so the fill animates in nicely
   instead of just appearing on page load.
---------------------------------------------------------------- */
const skillBars = document.querySelectorAll('.skill-bar');

const skillObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const level = bar.getAttribute('data-level') || 0;
        const fillEl = bar.querySelector('.skill-fill');

        if (fillEl) {
          fillEl.style.width = `${level}%`;
        }

        observer.unobserve(bar);
      }
    });
  },
  { threshold: 0.4 }
);

skillBars.forEach((bar) => skillObserver.observe(bar));


/* -------------------------------------------------------------
   6. CONTACT FORM HANDLING (FRONT-END ONLY DEMO)
   -----------------------------------------------------------
   IMPORTANT NOTE FOR NAFIS:
   Plain HTML/CSS/JS cannot actually SEND an email by itself —
   that requires a backend server or a third-party form service.
   This script just shows a friendly confirmation message so the
   form "feels" functional while you build the real version.

   To make this form actually deliver messages to your inbox,
   the easiest beginner-friendly options (free, no backend coding
   needed) are:
     - Formspree   (https://formspree.io)
     - Web3Forms   (https://web3forms.com)
     - EmailJS     (https://www.emailjs.com)

   Each of these gives you a small snippet or a "form action" URL
   to paste in — they handle the actual email delivery for you. (previous)
---------------------------------------------------------------- */
/* -------------------------------------------------------------
   NETLIFY FORMS
------------------------------------------------------------- */

const contactForm = document.getElementById('contact-form');
const formNote = document.getElementById('form-note');

if (contactForm) {
  contactForm.addEventListener('submit', () => {
    const name = contactForm.name.value.trim();

    formNote.textContent =
      `Thank you${name ? ', ' + name : ''}! Your message has been sent successfully.`;
  });
}


/* -------------------------------------------------------------
   7. AUTO-UPDATE FOOTER YEAR
   Keeps the copyright year in the footer correct automatically,
   so you never have to manually update it.
---------------------------------------------------------------- */
const footerYearEl = document.getElementById('footer-year');
footerYearEl.textContent = new Date().getFullYear();
