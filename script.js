/* =============================================================
   STUDENT PORTFOLIO SCRIPT
   Handles: mobile menu, active nav link, scroll-reveal animations,
   animated skill bars, back-to-top button, and the contact form.
   Beginner-friendly: each part is explained with comments.
============================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* -----------------------------------------------------------
     1. MOBILE MENU TOGGLE
     Opens/closes the nav links on small screens when the
     hamburger icon is clicked.
  ----------------------------------------------------------- */
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
    menuToggle.classList.toggle('open');
  });

  // Close the mobile menu whenever a link is clicked
  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('open');
    });
  });

  /* -----------------------------------------------------------
     2. HIGHLIGHT THE ACTIVE NAV LINK WHILE SCROLLING
     Watches which section is currently on screen and adds the
     "active-link" class to the matching nav link.
  ----------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    let currentId = '';
    const scrollPos = window.scrollY + 120; // offset for fixed navbar

    sections.forEach(function (section) {
      if (scrollPos >= section.offsetTop) {
        currentId = section.getAttribute('id');
      }
    });

    navLinkEls.forEach(function (link) {
      link.classList.remove('active-link');
      if (link.getAttribute('href') === '#' + currentId) {
        link.classList.add('active-link');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink(); // run once on load

  /* -----------------------------------------------------------
     3. FADE-IN ON SCROLL
     Any element with the class "reveal" starts hidden (see
     style.css) and fades/slides into view the first time it
     enters the viewport.
  ----------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // only animate once
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* -----------------------------------------------------------
     4. ANIMATED SKILL BARS
     Each .skill-fill element has a data-width attribute (the
     percentage). Bars fill to that width only once they scroll
     into view, so the animation actually gets noticed.
  ----------------------------------------------------------- */
  const skillBars = document.querySelectorAll('.skill-fill');

  const skillObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.getAttribute('data-width');
        bar.style.width = targetWidth + '%';
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });

  skillBars.forEach(function (bar) {
    skillObserver.observe(bar);
  });

  /* -----------------------------------------------------------
     5. BACK TO TOP BUTTON
     Shows the button after scrolling down a bit, and scrolls
     smoothly back to the top when clicked.
  ----------------------------------------------------------- */
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* -----------------------------------------------------------
     6. CONTACT FORM HANDLING
     This currently just shows a confirmation message -- it does
     NOT send a real email yet, because that needs a backend or
     a form service.
     TO MAKE THIS FORM ACTUALLY SEND MESSAGES:
       Option A: Sign up for a free service like Formspree
                 (https://formspree.io), then set the form's
                 "action" attribute in index.html to the URL
                 they give you and remove this preventDefault().
       Option B: Connect it to your own backend / API endpoint.
  ----------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // stop the page from reloading

    const name = document.getElementById('formName').value.trim();

    // Simple confirmation message -- replace this logic once
    // the form is connected to a real email/backend service.
    formStatus.textContent = 'Thanks, ' + name + '! Your message has been noted. (Connect this form to a service to actually receive it.)';

    contactForm.reset();
  });

  /* -----------------------------------------------------------
     7. AMBIENT MOUSE-REACTIVE GLOW IN HERO
     Follows the cursor with a soft light behind the hero photo.
     Falls back gracefully on touch devices (no mousemove = no glow movement,
     but the static glow position set in CSS still looks fine).
  ----------------------------------------------------------- */
  const heroGlow = document.getElementById('heroGlow');
  const heroSection = document.getElementById('home');

  if (heroGlow && heroSection) {
    heroSection.addEventListener('mousemove', function (e) {
      const rect = heroSection.getBoundingClientRect();
      const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
      const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
      heroGlow.style.setProperty('--mx', xPercent + '%');
      heroGlow.style.setProperty('--my', yPercent + '%');
    });
  }

  /* -----------------------------------------------------------
     8. MAGNETIC BUTTON HOVER
     Buttons nudge slightly toward the cursor on hover for a
     more tactile feel, then reset on mouse leave.
  ----------------------------------------------------------- */
  document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.12}px, ${y * 0.25}px)`;
    });
    btn.addEventListener('mouseleave', function () {
      btn.style.transform = '';
    });
  });

  /* -----------------------------------------------------------
     9. AUTO-UPDATE COPYRIGHT YEAR IN FOOTER
     Keeps the footer year current without you having to edit it
     every year.
  ----------------------------------------------------------- */
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});
