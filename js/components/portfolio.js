/**
 * UNO JERSEY - Portfolio Section Component
 * Handles portfolio masonry grid animations and lightbox
 */

(function() {
  'use strict';

  class PortfolioSection {
    constructor() {
      this.portfolioSection = document.querySelector('.portfolio');
      this.portfolioGrid = document.querySelector('.portfolio-grid');
      this.currentIndex = 0;

      if (!this.portfolioSection) return;

      this.init();
    }

    init() {
      // Register GSAP ScrollTrigger
      gsap.registerPlugin(ScrollTrigger);

      // Render portfolio items dynamically
      this.renderPortfolio();

      // Setup GSAP ScrollTrigger animations
      this.setupScrollTrigger();

      // Setup lightbox
      this.setupLightbox();

    }

    renderPortfolio() {
      if (!this.portfolioGrid || typeof portfolioItems === 'undefined') return;

      // Clear existing items
      this.portfolioGrid.innerHTML = '';

      // Generate portfolio cards
      portfolioItems.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = `portfolio-card portfolio-${item.size}`;
        card.dataset.category = item.category;
        card.dataset.index = index;
        card.style.opacity = '0'; // Initial state for animation

        // Check if item has video
        const hasVideo = item.type === 'video' && item.video;

        if (hasVideo) {
          card.innerHTML = `
            <div class="portfolio-card-inner">
              <video
                src="${item.video}"
                alt="${item.title}"
                class="portfolio-video"
                muted
                loop
                autoplay
                playsinline
                loading="lazy"></video>
              <div class="portfolio-overlay">
                <div class="portfolio-content">
                  <span class="portfolio-category">#${item.category.toUpperCase()}</span>
                  <h3 class="portfolio-title">${item.title}</h3>
                  <p class="portfolio-description">${item.description}</p>
                </div>
              </div>
            </div>
          `;
        } else {
          card.innerHTML = `
            <div class="portfolio-card-inner">
              <img src="${item.image}" alt="${item.title}" loading="lazy" class="portfolio-image">
              <div class="portfolio-overlay">
                <div class="portfolio-content">
                  <span class="portfolio-category">#${item.category.toUpperCase()}</span>
                  <h3 class="portfolio-title">${item.title}</h3>
                  <p class="portfolio-description">${item.description}</p>
                </div>
              </div>
            </div>
          `;
        }

        // Add click event for lightbox
        card.addEventListener('click', () => this.openLightbox(index));

        this.portfolioGrid.appendChild(card);
      });
    }

    setupScrollTrigger() {
      // Animate section header
      const header = this.portfolioSection.querySelector('.portfolio-header');
      if (header) {
        gsap.from(header, {
          scrollTrigger: {
            trigger: '.portfolio',
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        });
      }

      // Animate portfolio cards with stagger
      gsap.to('.portfolio-card', {
        scrollTrigger: {
          trigger: '.portfolio-grid',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        from: { opacity: 0, y: 60 }
      });
    }

    setupLightbox() {
      // Create lightbox element
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox hidden';
      lightbox.id = 'lightbox';
      lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Close lightbox">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <button class="lightbox-nav lightbox-prev" aria-label="Previous image">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button class="lightbox-nav lightbox-next" aria-label="Next image">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
        <div class="lightbox-content">
          <img src="" alt="" class="lightbox-image">
          <div class="lightbox-caption">
            <h3 class="lightbox-title"></h3>
            <p class="lightbox-description"></p>
            <span class="lightbox-category"></span>
          </div>
        </div>
      `;

      document.body.appendChild(lightbox);

      // Store lightbox elements
      this.lightbox = lightbox;
      this.lightboxImage = lightbox.querySelector('.lightbox-image');
      this.lightboxTitle = lightbox.querySelector('.lightbox-title');
      this.lightboxDescription = lightbox.querySelector('.lightbox-description');
      this.lightboxCategory = lightbox.querySelector('.lightbox-category');
      this.closeBtn = lightbox.querySelector('.lightbox-close');
      this.prevBtn = lightbox.querySelector('.lightbox-prev');
      this.nextBtn = lightbox.querySelector('.lightbox-next');

      // Event listeners
      this.closeBtn.addEventListener('click', () => this.closeLightbox());
      this.prevBtn.addEventListener('click', () => this.navigateLightbox(-1));
      this.nextBtn.addEventListener('click', () => this.navigateLightbox(1));

      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          this.closeLightbox();
        }
      });

      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('hidden')) {
          if (e.key === 'Escape') this.closeLightbox();
          if (e.key === 'ArrowLeft') this.navigateLightbox(-1);
          if (e.key === 'ArrowRight') this.navigateLightbox(1);
        }
      });
    }

    openLightbox(index) {
      this.currentIndex = index;
      this.updateLightboxContent();
      this.lightbox.classList.remove('hidden');
      this.lightbox.classList.add('visible');
      document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
      this.lightbox.classList.remove('visible');
      this.lightbox.classList.add('hidden');
      document.body.style.overflow = '';
    }

    navigateLightbox(direction) {
      this.currentIndex += direction;
      if (this.currentIndex < 0) {
        this.currentIndex = portfolioItems.length - 1;
      } else if (this.currentIndex >= portfolioItems.length) {
        this.currentIndex = 0;
      }
      this.updateLightboxContent();
    }

    updateLightboxContent() {
      const item = portfolioItems[this.currentIndex];
      const hasVideo = item.type === 'video' && item.video;

      // Clear existing media
      const lightboxContent = this.lightbox.querySelector('.lightbox-content');
      const existingMedia = lightboxContent.querySelector('.lightbox-media');
      if (existingMedia) {
        existingMedia.remove();
      }

      // Create media element
      let mediaElement;
      if (hasVideo) {
        mediaElement = document.createElement('video');
        mediaElement.src = item.video;
        mediaElement.className = 'lightbox-media lightbox-image';
        mediaElement.controls = true;
        mediaElement.autoplay = true;
        mediaElement.muted = false;
        mediaElement.loop = false;
      } else {
        mediaElement = document.createElement('img');
        mediaElement.src = item.image;
        mediaElement.alt = item.title;
        mediaElement.className = 'lightbox-media lightbox-image';
      }

      // Insert media before caption
      const caption = lightboxContent.querySelector('.lightbox-caption');
      lightboxContent.insertBefore(mediaElement, caption);

      // Update text content
      this.lightboxTitle.textContent = item.title;
      this.lightboxDescription.textContent = item.description;
      this.lightboxCategory.textContent = `#${item.category.toUpperCase()}`;

      // Animate content change
      gsap.fromTo('.lightbox-content',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
      );
    }

  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new PortfolioSection());
  } else {
    new PortfolioSection();
  }

  // Export for potential module usage
  window.UNOPortfolioSection = PortfolioSection;
})();
