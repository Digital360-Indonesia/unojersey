/**
 * UNO JERSEY - Temukan Preview Section
 * Preview of the first question from Temukan quiz
 * When user clicks an option, the "Lanjut" button becomes enabled
 */

(function() {
  'use strict';

  class TemukanPreview {
    constructor() {
      this.selectedOption = null;
      this.nextBtn = document.getElementById('previewNextBtn');
      this.optionsGrid = document.getElementById('previewOptionsGrid');

      if (!this.nextBtn || !this.optionsGrid) return;

      this.init();
    }

    init() {
      // Add click handlers to option cards
      const optionCards = this.optionsGrid.querySelectorAll('.preview-option-card');
      optionCards.forEach(card => {
        card.addEventListener('click', () => this.selectOption(card));
      });
    }

    selectOption(card) {
      // Remove selection from all cards
      const allCards = this.optionsGrid.querySelectorAll('.preview-option-card');
      allCards.forEach(c => c.classList.remove('selected'));

      // Add selection to clicked card
      card.classList.add('selected');

      // Save the selected value
      this.selectedOption = card.dataset.value;

      // Enable the next button and update the URL
      this.enableNextButton();
    }

    enableNextButton() {
      // Enable the button
      this.nextBtn.disabled = false;

      // Update the href to include the selected sport
      this.nextBtn.href = `/temukan.html?sport=${this.selectedOption}`;

      // Update button text
      this.nextBtn.innerHTML = `
        LANJUT KE QUIZ
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      `;
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
