/**
 * UNO JERSEY - Temukan Preview Section
 * Preview of the first question from Temukan quiz
 * Options are clickable for visual feedback only
 */

(function() {
  'use strict';

  class TemukanPreview {
    constructor() {
      this.nextBtn = document.getElementById('previewNextBtn');
      this.optionsGrid = document.getElementById('previewOptionsGrid');

      if (!this.nextBtn || !this.optionsGrid) return;

      this.init();
    }

    init() {
      // Set the button href to temukan.html without any parameters
      this.nextBtn.href = '/temukan.html';
      this.nextBtn.disabled = false;

      // Add click handlers to option cards for visual feedback only
      const optionCards = this.optionsGrid.querySelectorAll('.preview-option-card');
      optionCards.forEach(card => {
        card.addEventListener('click', () => this.selectOption(card));
      });
    }

    selectOption(card) {
      // Remove selection from all cards
      const allCards = this.optionsGrid.querySelectorAll('.preview-option-card');
      allCards.forEach(c => c.classList.remove('selected'));

      // Add selection to clicked card for visual feedback
      card.classList.add('selected');
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new TemukanPreview());
  } else {
    new TemukanPreview();
  }

  // Export for potential module usage
  window.UNOTemukanPreview = TemukanPreview;
})();
