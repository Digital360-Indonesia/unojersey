/**
 * UNO JERSEY - Hero Section Component (Section 1)
 * Connected with Navbar - Elements transition from hero to sticky header on scroll
 * Uses GSAP ScrollTrigger for smooth tagline and logo transition
 *
 * VIDEO REQUIREMENTS:
 * - Path: /public/assets/videos/hero-bg.mp4
 * - Recommended size: 10-20MB (for high quality)
 * - Format: MP4 (H.264 codec)
 * - Resolution: 1920x1080 or higher
 * - Duration: 10-30 seconds (looping)
 * - Poster: /public/assets/images/hero-poster.jpg (fallback image)
 */

(function() {
  'use strict';

  class HeroSection {
    constructor() {
      // DOM Elements
      this.hero = document.getElementById('hero');
      this.heroLogo = document.getElementById('hero-logo');
      this.navbar = document.getElementById('navbar');
      this.navTagline = document.getElementById('nav-tagline');
      this.navTaglineText = document.querySelector('.nav-tagline-text');
      this.navbarLogo = document.getElementById('navbar-logo');
      this.heroVideo = document.querySelector('.hero-video');
      this.scrollIndicator = document.querySelector('.scroll-indicator');

      if (!this.hero) return;

      // Configuration
      this.config = {
        // Tagline sizes
        taglineInitialSize: 48,      // Initial tagline font size (px)
        taglineFinalSize: 24,        // Final tagline font size (px)

        // Logo sizes
        logoInitialWidth: 250,       // Hero logo width (px)
        logoFinalWidth: 60,          // Navbar logo width (px)

        // Reduced motion
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      };

      this.init();
    }

    init() {
      // Wait for fonts to load before initializing animations
      if (document.fonts) {
        document.fonts.ready.then(() => {
          this.setupInitialState();
          this.registerScrollTrigger();
          this.setupAnimations();
          this.setupVideoHandling();
          this.setupScrollIndicator();
          this.setupResponsiveBehavior();
        });
      } else {
        this.setupInitialState();
        this.registerScrollTrigger();
        this.setupAnimations();
        this.setupVideoHandling();
        this.setupScrollIndicator();
        this.setupResponsiveBehavior();
      }
    }

    setupInitialState() {
      // Ensure navbar logo is hidden initially
      if (this.navbarLogo) {
        gsap.set(this.navbarLogo, { width: this.config.logoInitialWidth });
      }
    }

    registerScrollTrigger() {
      // Register ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger);

      // Create main scroll trigger for transition animation
      this.transitionScrollTrigger = ScrollTrigger.create({
        trigger: this.hero,
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => this.handleTransition(self)
      });

      // Add scrolled class to navbar after some scroll
      ScrollTrigger.create({
        trigger: this.hero,
        start: '100px top',
        onEnter: () => this.navbar?.classList.add('scrolled'),
        onLeaveBack: () => this.navbar?.classList.remove('scrolled')
      });

      // Parallax effect for video background
      if (!this.config.reducedMotion && this.heroVideo) {
        gsap.to(this.heroVideo, {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: this.hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    }

    handleTransition(self) {
      const progress = Math.min(self.progress, 1); // Cap at 1

      if (this.config.reducedMotion) {
        // For reduced motion, just jump to final state at 50%
        if (progress > 0.5) {
          this.applyFinalState();
        } else {
          this.applyInitialState();
        }
        return;
      }

      // === TAGLINE TRANSITION (font size only, no position change) ===
      if (this.navTaglineText) {
        // Interpolate font size (48px → 24px)
        // Reaches 24px at 100% scroll
        const taglineSize = this.config.taglineInitialSize -
          (progress * (this.config.taglineInitialSize - this.config.taglineFinalSize));

        gsap.to(this.navTaglineText, {
          fontSize: taglineSize,
          duration: 0.15,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }

      // === LOGO TRANSITION (synced with tagline) ===
      if (this.heroLogo) {
        // Calculate width interpolation (250px → 40px)
        // Reaches 40px at 100% scroll (same time tagline reaches 24px)
        const logoWidth = this.config.logoInitialWidth -
          (progress * (this.config.logoInitialWidth - this.config.logoFinalWidth));

        // Calculate vertical position (hero center 50% → navbar center 40px)
        // Logo is fixed position, so we animate 'top' from 50% to 40px
        const viewportHeight = window.innerHeight;
        const heroCenterY = viewportHeight / 2;
        const navbarCenterY = 40; // Navbar height / 2
        const topPosition = heroCenterY - (progress * (heroCenterY - navbarCenterY));

        // Animate hero logo - smooth easing
        // NO fade, NO cross-dissolve - just smooth size and position change
        gsap.to(this.heroLogo, {
          width: logoWidth,
          top: topPosition,
          opacity: 1, // Always visible
          duration: 0.15,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    }

    applyInitialState() {
      if (this.navTaglineText) {
        gsap.set(this.navTaglineText, { fontSize: this.config.taglineInitialSize });
      }
      if (this.heroLogo) {
        gsap.set(this.heroLogo, {
          width: this.config.logoInitialWidth,
          top: '50%',
          opacity: 1
        });
      }
    }

    applyFinalState() {
      if (this.navTaglineText) {
        gsap.set(this.navTaglineText, { fontSize: this.config.taglineFinalSize });
      }
      if (this.heroLogo) {
        gsap.set(this.heroLogo, {
          width: this.config.logoFinalWidth,
          top: 40, // Navbar center
          opacity: 1
        });
      }
    }

    setupAnimations() {
      // Initial load animations
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      timeline
        .from(this.heroLogo, {
          scale: 0.5,
          opacity: 0,
          duration: 1.2,
          ease: 'back.out(1.7)'
        })
        .from(this.navTaglineText, {
          x: -50,
          opacity: 0,
          duration: 0.8
        }, '-=0.6')
        .from(this.scrollIndicator, {
          y: 20,
          opacity: 0,
          duration: 0.6
        }, '-=0.3');
    }

    setupVideoHandling() {
      if (!this.heroVideo) return;

      // Handle video load errors
      this.heroVideo.addEventListener('error', () => {
        console.warn('Hero video failed to load, showing fallback background');
        this.hero.classList.add('video-fallback');
      });

      // Ensure video plays (browsers may block autoplay)
      const playVideo = () => {
        this.heroVideo.play().catch(err => {
          console.log('Video autoplay prevented:', err);
          this.hero.classList.add('video-fallback');
        });
      };

      // Try playing video
      if (this.heroVideo.readyState >= 2) {
        playVideo();
      } else {
        this.heroVideo.addEventListener('canplay', playVideo, { once: true });
      }

      // Pause video when out of viewport (performance)
      ScrollTrigger.create({
        trigger: this.hero,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => this.heroVideo.play().catch(() => {}),
        onLeave: () => this.heroVideo.pause(),
        onEnterBack: () => this.heroVideo.play().catch(() => {}),
        onLeaveBack: () => this.heroVideo.pause()
      });
    }

    setupScrollIndicator() {
      if (!this.scrollIndicator) return;

      // Continuous bounce animation
      gsap.to(this.scrollIndicator.querySelector('.scroll-arrow'), {
        y: 10,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

      // Fade out on scroll
      gsap.to(this.scrollIndicator, {
        autoAlpha: 0,
        scrollTrigger: {
          trigger: this.hero,
          start: '10% top',
          end: '15% top',
          scrub: true
        }
      });

      // Smooth scroll on click
      this.scrollIndicator.addEventListener('click', () => {
        const nextSection = this.hero.nextElementSibling;
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    setupResponsiveBehavior() {
      // Adjust animation parameters based on screen size
      const updateConfig = () => {
        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

        if (isMobile) {
          this.config.taglineInitialSize = 28;
          this.config.taglineFinalSize = 16;
          this.config.logoInitialWidth = 140;
          this.config.logoFinalWidth = 42;
        } else if (isTablet) {
          this.config.taglineInitialSize = 36;
          this.config.taglineFinalSize = 18;
          this.config.logoInitialWidth = 180;
          this.config.logoFinalWidth = 48;
        } else {
          this.config.taglineInitialSize = 48;
          this.config.taglineFinalSize = 24;
          this.config.logoInitialWidth = 250;
          this.config.logoFinalWidth = 60;
        }
      };

      // Initial update
      updateConfig();

      // Update on resize with debounce
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          updateConfig();
          ScrollTrigger.refresh();
        }, 250);
      });
    }

    // Public method for external control
    refresh() {
      ScrollTrigger.refresh();
    }

    // Cleanup method
    destroy() {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf([
        this.heroLogo,
        this.navbar,
        this.navTaglineText,
        this.navbarLogo,
        this.scrollIndicator
      ]);
    }
  }

  // Initialize when DOM is ready
  let heroInstance;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      heroInstance = new HeroSection();
    });
  } else {
    heroInstance = new HeroSection();
  }

  // Export for potential module usage
  window.UNOHeroSection = HeroSection;
  window.heroInstance = heroInstance;

})();
