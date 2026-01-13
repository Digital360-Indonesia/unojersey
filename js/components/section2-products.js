/**
 * UNO JERSEY Section 2 - Products Interactive Logic
 * Handles product switching with smooth animations
 * Based on the reference Samples section pattern
 */

(function() {
  'use strict';

  // DOM Elements
  const tabs = document.querySelectorAll('.sport-icon-tab');
  const modelItems = document.querySelectorAll('.product-model-item');
  const infoItems = document.querySelectorAll('.product-info-item');

  let currentProduct = 'baseball';
  const products = ['baseball', 'basic', 'basket', 'polo', 'set'];
  const totalProducts = products.length;

  /**
   * Initialize the products section
   */
  function init() {
    // Check if all required elements exist
    if (!tabs.length || !modelItems.length || !infoItems.length) {
      console.warn('Products section elements not found, skipping initialization');
      return;
    }

    // Initialize first info item with proper styles
    if (infoItems[0]) {
      infoItems[0].style.opacity = '1';
      infoItems[0].style.transform = 'translateY(0)';
    }

    // Attach event listeners
    attachEventListeners();

    console.log('Products section initialized - 3-column layout with icon tabs');
  }

  /**
   * Attach event listeners to sport icon tabs
   */
  function attachEventListeners() {
    tabs.forEach((tab) => {
      // Click handler
      tab.addEventListener('click', () => {
        const sportId = tab.dataset.sport;
        switchProduct(sportId);
      });

      // Keyboard navigation
      tab.addEventListener('keydown', (e) => {
        let newProduct = currentProduct;
        const currentIndex = products.indexOf(currentProduct);

        switch (e.key) {
          case 'ArrowUp':
            e.preventDefault();
            newProduct = currentIndex > 0 ? products[currentIndex - 1] : products[totalProducts - 1];
            break;
          case 'ArrowDown':
            e.preventDefault();
            newProduct = currentIndex < totalProducts - 1 ? products[currentIndex + 1] : products[0];
            break;
          case 'Home':
            e.preventDefault();
            newProduct = products[0];
            break;
          case 'End':
            e.preventDefault();
            newProduct = products[totalProducts - 1];
            break;
          default:
            return;
        }

        const newIndex = products.indexOf(newProduct);
        tabs[newIndex].focus();
        switchProduct(newProduct);
      });
    });
  }

  /**
   * Switch to a different product
   * @param {string} sportId - The ID of the sport to switch to
   */
  function switchProduct(sportId) {
    if (sportId === currentProduct) return;

    const newIndex = products.indexOf(sportId);
    const currentIndex = products.indexOf(currentProduct);

    // Update tabs
    tabs[currentIndex].classList.remove('active');
    tabs[currentIndex].setAttribute('aria-selected', 'false');

    tabs[newIndex].classList.add('active');
    tabs[newIndex].setAttribute('aria-selected', 'true');

    // Update model display with fade effect
    modelItems[currentIndex].classList.remove('active');

    // Small delay for smoother transition
    setTimeout(() => {
      modelItems[newIndex].classList.add('active');
    }, 50);

    // Update info panel with fade effect
    infoItems[currentIndex].style.display = 'none';
    infoItems[newIndex].style.display = 'block';

    // Animate info panel
    infoItems[newIndex].style.opacity = '0';
    infoItems[newIndex].style.transform = 'translateY(10px)';

    requestAnimationFrame(() => {
      infoItems[newIndex].style.transition = 'all 0.4s ease';
      infoItems[newIndex].style.opacity = '1';
      infoItems[newIndex].style.transform = 'translateY(0)';
    });

    currentProduct = sportId;
  }

  // Public API
  window.ProductsSection = {
    init,
    switchProduct,
    getCurrentProduct: () => currentProduct
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
