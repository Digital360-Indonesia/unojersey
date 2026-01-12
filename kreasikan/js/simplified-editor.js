/**
 * Simplified Editor - Image + Text Overlay Approach
 * NO Fabric.js, NO canvas manipulation
 * Just edit text content via input fields
 */

class SimpleEditor {
  constructor() {
    // DOM elements - may be null on first load (editor screen not shown yet)
    this.jerseyBase = document.getElementById('jersey-base');
    this.textTeamName = document.getElementById('text-team-name');
    this.textPlayerNumber = document.getElementById('text-player-number');
    this.textPlayerName = document.getElementById('text-player-name');
    this.logoOverlay = document.getElementById('logo-overlay');

    // Input elements
    this.inputTeamName = document.getElementById('input-team-name');
    this.inputPlayerNumber = document.getElementById('input-player-number');
    this.inputPlayerName = document.getElementById('input-player-name');
    this.inputLogo = document.getElementById('input-logo');

    // Buttons
    this.btnUploadLogo = document.getElementById('btn-upload-logo');
    this.btnRemoveLogo = document.getElementById('btn-remove-logo');

    // Current template data
    this.currentTemplate = null;

    // Only setup listeners if elements exist
    if (this.inputTeamName && this.textTeamName) {
      this.setupEventListeners();
    }
  }

  // Refresh DOM references (call when editor screen is shown)
  refreshElements() {
    this.jerseyBase = document.getElementById('jersey-base');
    this.textTeamName = document.getElementById('text-team-name');
    this.textPlayerNumber = document.getElementById('text-player-number');
    this.textPlayerName = document.getElementById('text-player-name');
    this.logoOverlay = document.getElementById('logo-overlay');

    this.inputTeamName = document.getElementById('input-team-name');
    this.inputPlayerNumber = document.getElementById('input-player-number');
    this.inputPlayerName = document.getElementById('input-player-name');
    this.inputLogo = document.getElementById('input-logo');

    this.btnUploadLogo = document.getElementById('btn-upload-logo');
    this.btnRemoveLogo = document.getElementById('btn-remove-logo');
  }

  setupEventListeners() {
    // Team name input - real-time update
    this.inputTeamName.addEventListener('input', (e) => {
      const value = e.target.value.toUpperCase();
      this.textTeamName.textContent = value || 'TEAM';
    });

    // Player number input - numbers only, real-time update
    this.inputPlayerNumber.addEventListener('input', (e) => {
      // Only allow numbers
      const value = e.target.value.replace(/[^0-9]/g, '');
      e.target.value = value;
      this.textPlayerNumber.textContent = value || '1';
    });

    // Player name input - real-time update
    this.inputPlayerName.addEventListener('input', (e) => {
      const value = e.target.value.toUpperCase();
      this.textPlayerName.textContent = value || 'PLAYER';
    });

    // Logo upload button
    this.btnUploadLogo.addEventListener('click', () => {
      this.inputLogo.click();
    });

    // Logo file input change
    this.inputLogo.addEventListener('change', (e) => {
      this.handleLogoUpload(e.target.files[0]);
    });

    // Remove logo button
    this.btnRemoveLogo.addEventListener('click', () => {
      this.removeLogo();
    });
  }

  handleLogoUpload(file) {
    if (!file) return;

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      this.showAlert('File terlalu besar! Maksimal 2MB', 'error');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      this.showAlert('File harus berupa gambar (PNG/JPG)', 'error');
      return;
    }

    // Read and display
    const reader = new FileReader();
    reader.onload = (e) => {
      this.logoOverlay.src = e.target.result;
      this.logoOverlay.classList.remove('hidden');
      this.btnRemoveLogo.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  }

  removeLogo() {
    this.logoOverlay.src = '';
    this.logoOverlay.classList.add('hidden');
    this.inputLogo.value = '';
    this.btnRemoveLogo.classList.add('hidden');
  }

  loadTemplate(templateData) {
    this.currentTemplate = templateData;

    // Refresh DOM elements (editor screen is now visible)
    this.refreshElements();

    // Setup event listeners if not already set up
    if (this.inputTeamName && !this._listenersSetup) {
      this.setupEventListeners();
      this._listenersSetup = true;
    }

    // Load jersey base image
    if (this.jerseyBase && templateData.image_url) {
      this.jerseyBase.src = templateData.image_url;
    }

    // Set text positions and styles from template
    if (templateData.team_name_position) {
      this.textTeamName.style.top = templateData.team_name_position.top + 'px';
      this.textTeamName.style.left = templateData.team_name_position.left + 'px';
      this.textTeamName.style.transform = 'none';
      this.textTeamName.style.color = templateData.team_name_color || '#FFFFFF';
      this.textTeamName.style.fontSize = (templateData.team_name_size || 48) + 'px';
      this.textTeamName.style.fontFamily = templateData.team_name_font || 'Bebas Neue';
    }

    if (templateData.player_number_position) {
      this.textPlayerNumber.style.top = templateData.player_number_position.top + 'px';
      this.textPlayerNumber.style.left = templateData.player_number_position.left + 'px';
      this.textPlayerNumber.style.transform = 'none';
      this.textPlayerNumber.style.color = templateData.player_number_color || '#FFFFFF';
      this.textPlayerNumber.style.fontSize = (templateData.player_number_size || 120) + 'px';
      this.textPlayerNumber.style.fontFamily = templateData.player_number_font || 'Impact';
    }

    if (templateData.player_name_position) {
      this.textPlayerName.style.top = templateData.player_name_position.top + 'px';
      this.textPlayerName.style.left = templateData.player_name_position.left + 'px';
      this.textPlayerName.style.transform = 'none';
      this.textPlayerName.style.color = templateData.player_name_color || '#FFFFFF';
      this.textPlayerName.style.fontSize = (templateData.player_name_size || 24) + 'px';
      this.textPlayerName.style.fontFamily = templateData.player_name_font || 'Inter';
    }

    // Logo position
    if (templateData.logo_position) {
      this.logoOverlay.style.top = templateData.logo_position.top + 'px';
      this.logoOverlay.style.left = templateData.logo_position.left + 'px';
      this.logoOverlay.style.transform = 'none';
      this.logoOverlay.style.width = (templateData.logo_position.width || 60) + 'px';
      this.logoOverlay.style.height = (templateData.logo_position.height || 60) + 'px';
    }

    // Set default values in inputs
    this.inputTeamName.value = templateData.default_team_name || '';
    this.inputPlayerNumber.value = templateData.default_number || '';
    this.inputPlayerName.value = templateData.default_player_name || '';

    // Update text overlays
    this.textTeamName.textContent = templateData.default_team_name || 'TEAM';
    this.textPlayerNumber.textContent = templateData.default_number || '1';
    this.textPlayerName.textContent = templateData.default_player_name || 'PLAYER';

    console.log('✅ Template loaded:', templateData.name);
  }

  async exportToImage() {
    const container = document.getElementById('jersey-preview-container');

    try {
      const canvas = await html2canvas(container, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true
      });

      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('Export error:', error);
      this.showAlert('Gagal export gambar. Coba lagi.', 'error');
      return null;
    }
  }

  showAlert(message, type = 'info') {
    alert(message);
  }

  // Get current design data for export
  getDesignData() {
    return {
      teamName: this.inputTeamName.value.toUpperCase(),
      playerNumber: this.inputPlayerNumber.value,
      playerName: this.inputPlayerName.value.toUpperCase(),
      hasLogo: !this.logoOverlay.classList.contains('hidden'),
      templateId: this.currentTemplate?.id || null,
      templateName: this.currentTemplate?.name || 'Custom'
    };
  }
}

// Initialize globally
document.addEventListener('DOMContentLoaded', () => {
  const simpleEditor = new SimpleEditor();
  window.editor = simpleEditor;

  console.log('✅ Simplified Editor initialized');
});
