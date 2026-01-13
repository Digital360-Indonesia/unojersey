/**
 * UNO JERSEY - Portfolio Navbar Transition
 * Fade in navbar logo on scroll
 */

(function() {
  'use strict';

  const navbarLogo = document.getElementById('navbar-logo');
  const navTaglineText = document.querySelector('.nav-tagline-text');

  if (!navbarLogo) return;

  function updateNavbarOnScroll() {
    const scrollY = window.scrollY;
    const scrollPercent = Math.min(scrollY / 600, 1);

    // Shrink tagline from 48px to 24px
    if (navTaglineText) {
      const taglineSize = 48 - (24 * scrollPercent);
      navTaglineText.style.fontSize = taglineSize + 'px';
    }

    // Fade in navbar logo after 20% scroll
    if (scrollPercent > 0.2) {
      const logoOpacity = Math.min((scrollPercent - 0.2) / 0.3, 1);
      navbarLogo.style.opacity = logoOpacity;
    } else {
      navbarLogo.style.opacity = 0;
    }
  }

  // Listen for scroll events
  window.addEventListener('scroll', () => {
    requestAnimationFrame(updateNavbarOnScroll);
  }, { passive: true });

  // Initial call
  updateNavbarOnScroll();

})();
