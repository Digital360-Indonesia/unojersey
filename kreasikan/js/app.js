/**
 * KREASIKAN - Main App Logic
 * 2D Jersey Design Editor for UNO JERSEY
 */

// ============================================
// APP STATE
// ============================================
const AppState = {
  currentStep: 1,
  selectedModel: null,
  selectedTemplate: null,
  mode: null, // 'template' or 'custom'
  userPhone: null,
  userName: null,
  currentFilter: 'all'
};

// ============================================
// GLOBAL VARIABLES
// ============================================
let editor = null; // SimpleEditor instance
let exportManager = null;

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎨 KREASIKAN - Jersey Design Editor Initialized');

  // Wait for editor to be initialized by simplified-editor.js
  setTimeout(() => {
    editor = window.editor;
    if (editor) {
      console.log('✅ Editor instance loaded');
    } else {
      console.warn('⚠️ Editor not yet initialized (will be loaded when needed)');
    }
  }, 100);

  // Read URL params
  const params = new URLSearchParams(window.location.search);
  AppState.selectedModel = params.get('model') || null;
  AppState.userName = params.get('name') || null;
  AppState.userPhone = params.get('phone') || null;

  console.log('URL Params:', { model: AppState.selectedModel, name: AppState.userName, phone: AppState.userPhone });

  // If model is pre-selected (from Temukan), skip to step 2
  if (AppState.selectedModel) {
    showStep(2); // Skip to chooser
  } else {
    showStep(1); // Start with model selector
  }

  // Setup all event listeners
  setupEventListeners();

  // Make AppState globally accessible
  window.AppState = AppState;
});

// ============================================
// SCREEN NAVIGATION
// ============================================
function showStep(step) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });

  // Map step to screen ID
  const screenMap = {
    1: 'model-selector',
    2: 'chooser',
    '3a': 'template-gallery',
    '3b': 'editor',
    4: 'editor',
    5: 'export-screen'
  };

  const targetScreen = document.getElementById(screenMap[step]);
  if (targetScreen) {
    targetScreen.classList.add('active');
  }

  AppState.currentStep = step;

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  console.log('📍 Showing step:', step);
}

// Global function for screen navigation
window.showScreen = showStep;

// ============================================
// EVENT LISTENERS SETUP
// ============================================
function setupEventListeners() {
  // Step 1: Model Selection
  document.querySelectorAll('.model-card').forEach(card => {
    card.addEventListener('click', function() {
      const model = this.dataset.model;
      AppState.selectedModel = model;
      console.log('✅ Selected model:', model);
      showStep(2);
    });
  });

  // Step 2: Back to Models
  const backToModelsBtn = document.getElementById('back-to-models');
  if (backToModelsBtn) {
    backToModelsBtn.addEventListener('click', () => {
      showStep(1);
    });
  }

  // Step 2: Template vs Custom
  document.querySelectorAll('.choice-card').forEach(card => {
    card.addEventListener('click', function() {
      const choice = this.dataset.choice;
      AppState.mode = choice;

      console.log('✅ Selected mode:', choice);

      if (choice === 'template') {
        loadTemplateGallery();
        showStep('3a');
      } else {
        initializeEditor('custom');
        showStep('3b');
      }
    });
  });

  // Step 3a: Back to Chooser
  const backToChooserBtn = document.getElementById('back-to-chooser');
  if (backToChooserBtn) {
    backToChooserBtn.addEventListener('click', () => {
      showStep(2);
    });
  }

  // Template Gallery: Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.dataset.filter;

      // Update active state
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active', 'bg-gray-900', 'text-white'));
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.add('bg-gray-200', 'text-gray-700'));
      this.classList.remove('bg-gray-200', 'text-gray-700');
      this.classList.add('active', 'bg-gray-900', 'text-white');

      AppState.currentFilter = filter;
      renderTemplates(filter);
    });
  });

  // Template Modal: Close button
  const closeModalBtn = document.getElementById('close-modal');
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      document.getElementById('template-modal').classList.add('hidden');
    });
  }

  // Template Modal: Use Template button
  const useTemplateBtn = document.getElementById('use-template-btn');
  if (useTemplateBtn) {
    useTemplateBtn.addEventListener('click', () => {
      if (AppState.selectedTemplate) {
        initializeEditor('template', AppState.selectedTemplate);
        document.getElementById('template-modal').classList.add('hidden');
        showStep(4);
      }
    });
  }

  // Editor: Back button
  const editorBackBtn = document.getElementById('editor-back-btn');
  if (editorBackBtn) {
    editorBackBtn.addEventListener('click', () => {
      if (AppState.mode === 'template') {
        showStep('3a');
      } else {
        showStep(2);
      }
    });
  }

  // Editor: Save button
  const saveBtn = document.getElementById('save-btn');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      // Simplified editor - no save needed, auto-updates
      alert('✅ Perubahan otomatis tersimpan!');
    });
  }

  // Editor: Export button
  const exportBtn = document.getElementById('export-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      if (!exportManager) {
        exportManager = new ExportManager(editor);
      }
      exportManager.exportDesign();
    });
  }

  // Mobile: Export button
  const mobileExportBtn = document.getElementById('mobile-export-btn');
  if (mobileExportBtn) {
    mobileExportBtn.addEventListener('click', () => {
      if (!exportManager) {
        exportManager = new ExportManager(editor);
      }
      exportManager.exportDesign();
    });
  }

  // Editor: Undo/Redo - Not applicable for simplified editor
  const undoBtn = document.getElementById('undo-btn');
  if (undoBtn) {
    undoBtn.addEventListener('click', () => {
      alert('Undo tidak tersedia di mode sederhana');
    });
  }

  const redoBtn = document.getElementById('redo-btn');
  if (redoBtn) {
    redoBtn.addEventListener('click', () => {
      alert('Redo tidak tersedia di mode sederhana');
    });
  }

  // Editor: Tool buttons
  document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const tool = this.dataset.tool;
      const content = this.nextElementSibling;

      // Toggle active state
      this.classList.toggle('active');
      content.classList.toggle('hidden');
    });
  });

  // Editor: Color picker - Not applicable for simplified editor
  const baseColorInput = document.getElementById('base-color');
  if (baseColorInput) {
    baseColorInput.addEventListener('input', function() {
      // Color change not applicable for template-based editor
      // Colors are part of the template design
      alert('⚠️ Warna jersey sudah ditentukan template. Pilih template lain untuk warna berbeda.');
    });
  }

  // Editor: Palette buttons - Show template selector instead
  document.querySelectorAll('.palette-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      alert('⚠️ Warna jersey sudah ditentukan template. Pilih template lain untuk warna berbeda.');
    });
  });

  // Editor: Add text buttons - Not needed, text is always present
  const addTeamNameBtn = document.getElementById('add-team-name');
  if (addTeamNameBtn) {
    addTeamNameBtn.addEventListener('click', () => {
      alert('⚠️ Nama tim sudah ada. Edit langsung di panel input.');
    });
  }

  const addPlayerNumberBtn = document.getElementById('add-player-number');
  if (addPlayerNumberBtn) {
    addPlayerNumberBtn.addEventListener('click', () => {
      alert('⚠️ Nomor pemain sudah ada. Edit langsung di panel input.');
    });
  }

  const addPlayerNameBtn = document.getElementById('add-player-name');
  if (addPlayerNameBtn) {
    addPlayerNameBtn.addEventListener('click', () => {
      alert('⚠️ Nama pemain sudah ada. Edit langsung di panel input.');
    });
  }

  // Editor: Upload logo - Already handled by simplified-editor.js
  // The simplified editor has its own logo upload handler

  // Editor: Zoom controls - CSS zoom for preview container
  const zoomInBtn = document.getElementById('zoom-in');
  const zoomOutBtn = document.getElementById('zoom-out');

  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => {
      const container = document.getElementById('jersey-preview-container');
      if (container) {
        const currentZoom = parseFloat(container.dataset.zoom || '1');
        const newZoom = Math.min(currentZoom + 0.1, 2);
        container.dataset.zoom = newZoom;
        container.style.transform = `scale(${newZoom})`;
        updateZoomLevel(newZoom);
      }
    });
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => {
      const container = document.getElementById('jersey-preview-container');
      if (container) {
        const currentZoom = parseFloat(container.dataset.zoom || '1');
        const newZoom = Math.max(currentZoom - 0.1, 0.5);
        container.dataset.zoom = newZoom;
        container.style.transform = `scale(${newZoom})`;
        updateZoomLevel(newZoom);
      }
    });
  }

  // Template Edit Panel: Input handlers - Not needed, handled by simplified-editor.js
  // The simplified editor has its own input handlers for real-time updates

  // Export Screen: Back to Editor
  const backToEditorBtn = document.getElementById('back-to-editor');
  if (backToEditorBtn) {
    backToEditorBtn.addEventListener('click', () => {
      showStep(4);
    });
  }

  // Export Screen: WhatsApp buttons
  const sendToOwnWABtn = document.getElementById('send-to-own-wa');
  const sendToUnoWABtn = document.getElementById('send-to-uno-wa');
  const downloadDesignBtn = document.getElementById('download-design');

  if (sendToOwnWABtn) {
    sendToOwnWABtn.addEventListener('click', () => {
      if (!exportManager) {
        exportManager = new ExportManager(editor);
      }
      exportManager.sendToOwnWhatsApp();
    });
  }

  if (sendToUnoWABtn) {
    sendToUnoWABtn.addEventListener('click', () => {
      if (!exportManager) {
        exportManager = new ExportManager(editor);
      }
      exportManager.sendToUnoWhatsApp();
    });
  }

  if (downloadDesignBtn) {
    downloadDesignBtn.addEventListener('click', () => {
      if (!exportManager) {
        exportManager = new ExportManager(editor);
      }
      exportManager.downloadImage();
    });
  }
}

// ============================================
// TEMPLATE GALLERY
// ============================================
function loadTemplateGallery() {
  console.log('📋 Loading templates for:', AppState.selectedModel);

  const templates = getTemplatesByType(AppState.selectedModel);

  // Update gallery title
  const titleEl = document.getElementById('gallery-title');
  const countEl = document.getElementById('gallery-count');

  if (titleEl) {
    const modelName = AppState.selectedModel.charAt(0).toUpperCase() + AppState.selectedModel.slice(1);
    titleEl.textContent = `Template ${modelName}`;
  }

  if (countEl) {
    countEl.textContent = `${templates.length} template tersedia`;
  }

  // Render templates
  renderTemplates(AppState.currentFilter);
}

function renderTemplates(filter = 'all') {
  const templates = getTemplatesByType(AppState.selectedModel);
  const filtered = filterTemplatesByCategory(templates, filter);

  const grid = document.getElementById('template-list');
  if (!grid) return;

  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-12">
        <p class="text-gray-500">Tidak ada template untuk kategori ini.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(template => {
    const card = document.createElement('div');
    card.className = 'template-card bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1';

    card.innerHTML = `
      <div class="aspect-square bg-gray-100 relative">
        <img src="${template.preview}" alt="${template.name}" class="w-full h-full object-cover"
             onerror="this.parentElement.innerHTML='<span class=\\'text-4xl\\'>🏀</span>'">
        <div class="absolute bottom-2 right-2 bg-white/90 px-2 py-1 rounded-full text-xs font-medium">
          ★ ${template.rating}
        </div>
      </div>
      <div class="p-3">
        <h3 class="font-bold text-gray-900 truncate">${template.name}</h3>
        <p class="text-sm text-gray-500">${template.usage_count} digunakan</p>
      </div>
    `;

    card.addEventListener('click', () => {
      showTemplateModal(template);
    });

    grid.appendChild(card);
  });

  console.log(`✅ Rendered ${filtered.length} templates (filter: ${filter})`);
}

function showTemplateModal(template) {
  AppState.selectedTemplate = template;

  const modal = document.getElementById('template-modal');
  const nameEl = document.getElementById('modal-template-name');
  const previewEl = document.getElementById('modal-template-preview');
  const colorsEl = document.getElementById('template-colors');
  const patternEl = document.getElementById('template-pattern');
  const styleEl = document.getElementById('template-style');

  if (nameEl) nameEl.textContent = template.name;
  if (previewEl) previewEl.src = template.preview;
  if (colorsEl) colorsEl.textContent = template.colors;
  if (patternEl) patternEl.textContent = template.pattern;
  if (styleEl) styleEl.textContent = template.style;

  modal.classList.remove('hidden');

  console.log('🔍 Showing template modal:', template.name);
}

// ============================================
// EDITOR INITIALIZATION
// ============================================
function initializeEditor(mode, templateData = null) {
  console.log('🎨 Initializing editor:', mode, templateData);

  // Get fresh reference to editor
  editor = window.editor;
  if (!editor) {
    console.error('❌ Editor not found!');
    return;
  }

  // Update project name
  const projectNameEl = document.getElementById('project-name');
  if (projectNameEl) {
    const modelName = AppState.selectedModel.charAt(0).toUpperCase() + AppState.selectedModel.slice(1);
    projectNameEl.textContent = `${modelName} | ${mode === 'template' ? 'Template Design' : 'Custom Design'}`;
  }

  if (mode === 'template' && templateData) {
    // Load template into simplified editor
    editor.loadTemplate(templateData);

    // Show template edit panel
    const templateEditPanel = document.getElementById('template-edit-panel');
    if (templateEditPanel) {
      templateEditPanel.classList.remove('hidden');
    }

    // Populate input fields - template data has default values
    const teamNameInput = document.getElementById('team-name-input');
    const playerNumberInput = document.getElementById('player-number-input');
    const playerNameInput = document.getElementById('player-name-input');

    if (teamNameInput) teamNameInput.value = templateData.default_team_name || '';
    if (playerNumberInput) playerNumberInput.value = templateData.default_number || '';
    if (playerNameInput) playerNameInput.value = templateData.default_player_name || '';
  } else {
    // Custom mode - load default blank jersey
    // For custom mode, we use a default blank template
    const defaultTemplate = {
      id: 'custom-blank',
      name: 'Custom Blank',
      image_url: './assets/templates/default-jersey.svg',
      default_team_name: 'TEAM',
      default_number: '1',
      default_player_name: 'PLAYER',
      team_name_position: { top: 120, left: 300 },
      team_name_color: '#FFFFFF',
      team_name_size: 48,
      team_name_font: 'Bebas Neue',
      player_number_position: { top: 350, left: 300 },
      player_number_color: '#FFFFFF',
      player_number_size: 120,
      player_number_font: 'Impact',
      player_name_position: { top: 500, left: 300 },
      player_name_color: '#FFFFFF',
      player_name_size: 24,
      player_name_font: 'Inter',
      logo_position: { top: 60, left: 270, width: 60, height: 60 }
    };
    editor.loadTemplate(defaultTemplate);

    // Hide template edit panel
    const templateEditPanel = document.getElementById('template-edit-panel');
    if (templateEditPanel) {
      templateEditPanel.classList.add('hidden');
    }
  }

  // Initialize export manager with editor
  if (!exportManager) {
    exportManager = new ExportManager(editor);
    window.exportManager = exportManager;
  }

  console.log('✅ Editor initialized');
}

// ============================================
// HELPER FUNCTIONS
// ============================================
function updateZoomLevel(zoom) {
  const zoomLevelEl = document.getElementById('zoom-level');
  if (zoomLevelEl) {
    zoomLevelEl.textContent = Math.round(zoom * 100) + '%';
  }
}

// ============================================
// MAKE FUNCTIONS GLOBAL
// ============================================
window.loadTemplateGallery = loadTemplateGallery;
window.renderTemplates = renderTemplates;
window.showTemplateModal = showTemplateModal;
window.initializeEditor = initializeEditor;
window.updateZoomLevel = updateZoomLevel;

console.log('✅ App.js loaded successfully');
