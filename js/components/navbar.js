/**
 * UNO JERSEY - Navbar Component
 * Shared navigation component for index.html and temukan.html
 */

(function() {
  'use strict';

  class Navbar {
    constructor() {
      this.navbar = document.getElementById('navbar');
      this.navToggle = document.getElementById('navToggle');
      this.navLinks = document.getElementById('navLinks');
      this.lastScrollY = 0;
      this.isMobile = window.innerWidth <= 768;

      if (!this.navbar) return;

      this.init();
    }

    init() {
      // Scroll handling
      window.addEventListener('scroll', () => this.handleScroll());

      // Mobile menu toggle (only if navToggle exists)
      if (this.navToggle) {
        this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
      }

      // Close mobile menu when clicking outside (only if navLinks exists)
      if (this.navLinks) {
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
      }

      // Handle resize
      window.addEventListener('resize', () => this.handleResize());

      // Smooth scroll for anchor links (only if navLinks exists)
      if (this.navLinks) {
        this.setupSmoothScroll();
      }
    }

    handleScroll() {
      const currentScrollY = window.scrollY;

      // Add shadow on scroll
      if (currentScrollY > 50) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }

      // Hide/show on scroll for mobile
      if (this.isMobile && currentScrollY > this.lastScrollY && currentScrollY > 100) {
        this.navbar.style.transform = 'translateY(-100%)';
      } else {
        this.navbar.style.transform = 'translateY(0)';
      }

      this.lastScrollY = currentScrollY;
    }

    toggleMobileMenu() {
      if (!this.navLinks || !this.navToggle) return;

      this.navLinks.classList.toggle('active');

      // Animate hamburger
      const spans = this.navToggle.querySelectorAll('span');
      if (this.navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    }

    handleOutsideClick(e) {
      if (!this.navLinks) return;

      if (this.isMobile && this.navLinks.classList.contains('active')) {
        if (!this.navbar.contains(e.target)) {
          this.closeMobileMenu();
        }
      }
    }

    closeMobileMenu() {
      if (!this.navLinks || !this.navToggle) return;

      this.navLinks.classList.remove('active');
      const spans = this.navToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }

    handleResize() {
      this.isMobile = window.innerWidth <= 768;
      if (!this.isMobile) {
        this.closeMobileMenu();
        this.navbar.style.transform = 'translateY(0)';
      }
    }

    setupSmoothScroll() {
      if (!this.navLinks) return;

      const anchorLinks = this.navLinks.querySelectorAll('a[href^="#"]');
      anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
              const navHeight = this.navbar.offsetHeight;
              const targetPosition = target.offsetTop - navHeight;
              window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
              });
              this.closeMobileMenu();
            }
          }
        });
      });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new Navbar());
  } else {
    new Navbar();
  }

  // Export for potential module usage
  window.UNONavbar = Navbar;
})();
