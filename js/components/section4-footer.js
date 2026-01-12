/**
 * UNO JERSEY - Section 4 Footer
 * Smooth scroll functionality
 */

(function() {
  'use strict';

  /**
   * Smooth scroll for anchor links
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initSmoothScroll();
    });
  } else {
    initSmoothScroll();
  }

  // Export for potential module usage
  window.UNOFooter = {
    initSmoothScroll
  };
})();
