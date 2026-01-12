/**
 * Canvas Manager - Handles Fabric.js canvas operations
 */

class CanvasManager {
  constructor(canvasId) {
    this.canvas = new fabric.Canvas(canvasId, {
      width: 600,
      height: 700,
      backgroundColor: '#f5f5f5'
    });

    this.history = [];
    this.historyStep = -1;
    this.currentZoom = 1;

    // Setup event listeners
    this.setupEventListeners();

    // Save initial state
    this.saveHistory();
  }

  /**
   * Setup event listeners for canvas events
   */
  setupEventListeners() {
    // Save history on modifications
    this.canvas.on('object:modified', () => this.saveHistory());
    this.canvas.on('object:added', () => this.saveHistory());
    this.canvas.on('object:removed', () => this.saveHistory());

    // Update properties panel on selection
    this.canvas.on('selection:created', (e) => this.showProperties(e.selected[0]));
    this.canvas.on('selection:updated', (e) => this.showProperties(e.selected[0]));
    this.canvas.on('selection:cleared', () => this.hideProperties());
  }

  /**
   * Save canvas state to history
   */
  saveHistory() {
    // Remove any redos beyond current step
    this.history = this.history.slice(0, this.historyStep + 1);

    // Save current state
    const json = JSON.stringify(this.canvas.toJSON(['id', 'editable']));
    this.history.push(json);
    this.historyStep++;

    // Limit history size
    if (this.history.length > 50) {
      this.history.shift();
      this.historyStep--;
    }
  }

  /**
   * Undo last action
   */
  undo() {
    if (this.historyStep > 0) {
      this.historyStep--;
      this.loadFromJSON(this.history[this.historyStep]);
    }
  }

  /**
   * Redo last undone action
   */
  redo() {
    if (this.historyStep < this.history.length - 1) {
      this.historyStep++;
      this.loadFromJSON(this.history[this.historyStep]);
    }
  }

  /**
   * Load canvas from JSON
   */
  loadFromJSON(json) {
    this.canvas.loadFromJSON(json, () => {
      this.canvas.renderAll();
    });
  }

  /**
   * Set background color
   */
  setBackgroundColor(color) {
    this.canvas.setBackgroundColor(color, this.canvas.renderAll.bind(this.canvas));
    this.saveHistory();
  }

  /**
   * Add text element
   */
  addText(options = {}) {
    const defaults = {
      text: options.text || 'TEXT',
      left: options.left || 300,
      top: options.top || 200,
      fontSize: options.fontSize || 48,
      fontFamily: options.fontFamily || 'Inter',
      fill: options.fill || '#000000',
      originX: 'center',
      originY: 'center',
      editable: true,
      id: options.id || 'text-' + Date.now()
    };

    const text = new fabric.Text(options.placeholder || defaults.text, defaults);
    this.canvas.add(text);
    this.canvas.setActiveObject(text);
    this.canvas.renderAll();
    this.saveHistory();

    return text;
  }

  /**
   * Add team name
   */
  addTeamName(text = 'TEAM NAME') {
    return this.addText({
      placeholder: text,
      left: 300,
      top: 150,
      fontSize: 52,
      fontFamily: 'Bebas Neue',
      fill: '#ffffff',
      id: 'team-name'
    });
  }

  /**
   * Add player number
   */
  addPlayerNumber(number = '23') {
    const text = new fabric.Text(number, {
      left: 300,
      top: 320,
      fontSize: 120,
      fontFamily: 'Impact',
      fill: '#ffffff',
      stroke: '#000000',
      strokeWidth: 3,
      originX: 'center',
      originY: 'center',
      id: 'player-number'
    });
    this.canvas.add(text);
    this.canvas.setActiveObject(text);
    this.canvas.renderAll();
    this.saveHistory();

    return text;
  }

  /**
   * Add player name
   */
  addPlayerName(name = 'PLAYER') {
    return this.addText({
      placeholder: name,
      left: 300,
      top: 450,
      fontSize: 28,
      fontFamily: 'Inter',
      fill: '#ffffff',
      id: 'player-name'
    });
  }

  /**
   * Upload and add logo/image
   */
  uploadLogo(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        fabric.Image.fromURL(e.target.result, (img) => {
          // Scale image to reasonable size
          const scale = Math.min(200 / img.width, 200 / img.height, 1);
          img.scale(scale);

          img.set({
            left: 150,
            top: 100,
            originX: 'center',
            originY: 'center',
            id: 'logo-' + Date.now()
          });

          this.canvas.add(img);
          this.canvas.setActiveObject(img);
          this.canvas.renderAll();
          this.saveHistory();

          resolve(img);
        });
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Update text element by ID
   */
  updateTextById(id, newText) {
    const objects = this.canvas.getObjects();

    for (let obj of objects) {
      if (obj.id === id && obj.type === 'text') {
        obj.set('text', newText);
        this.canvas.renderAll();
        return true;
      }
    }

    return false;
  }

  /**
   * Update element color by ID
   */
  updateColorById(id, newColor) {
    const objects = this.canvas.getObjects();

    for (let obj of objects) {
      if (obj.id === id) {
        obj.set('fill', newColor);
        this.canvas.renderAll();
        return true;
      }
    }

    return false;
  }

  /**
   * Zoom in
   */
  zoomIn() {
    this.currentZoom = Math.min(this.currentZoom + 0.1, 2);
    this.canvas.setZoom(this.currentZoom);
    this.canvas.renderAll();
    return this.currentZoom;
  }

  /**
   * Zoom out
   */
  zoomOut() {
    this.currentZoom = Math.max(this.currentZoom - 0.1, 0.5);
    this.canvas.setZoom(this.currentZoom);
    this.canvas.renderAll();
    return this.currentZoom;
  }

  /**
   * Reset zoom
   */
  resetZoom() {
    this.currentZoom = 1;
    this.canvas.setZoom(1);
    this.canvas.renderAll();
    return this.currentZoom;
  }

  /**
   * Get zoom percentage
   */
  getZoomPercentage() {
    return Math.round(this.currentZoom * 100);
  }

  /**
   * Export canvas to data URL
   */
  exportToPNG(options = {}) {
    const defaults = {
      format: 'png',
      quality: 1,
      multiplier: 2
    };

    return this.canvas.toDataURL({ ...defaults, ...options });
  }

  /**
   * Clear canvas
   */
  clear() {
    this.canvas.clear();
    this.canvas.setBackgroundColor('#f5f5f5', this.canvas.renderAll.bind(this.canvas));
    this.saveHistory();
  }

  /**
   * Load template data
   */
  loadTemplate(templateData) {
    this.clear();

    // Set background color
    if (templateData.backgroundColor) {
      this.setBackgroundColor(templateData.backgroundColor);
    }

    // Load jersey outline (if available)
    this.loadJerseyOutline(templateData.jerseyType || 'basketball');

    // Add elements from template
    if (templateData.elements && Array.isArray(templateData.elements)) {
      templateData.elements.forEach((element, index) => {
        // Small delay to ensure proper loading
        setTimeout(() => {
          if (element.type === 'text') {
            this.addText({
              placeholder: element.text || element.placeholder,
              left: element.position?.x || 300,
              top: element.position?.y || 200,
              fontSize: element.size || element.fontSize || 48,
              fontFamily: element.font || 'Inter',
              fill: element.color || '#000000',
              stroke: element.stroke,
              strokeWidth: element.strokeWidth || 0,
              id: element.id || 'text-' + index
            });
          }
        }, index * 50);
      });
    }

    this.canvas.renderAll();
  }

  /**
   * Load jersey outline (SVG placeholder)
   */
  loadJerseyOutline(type) {
    // For now, we'll create a simple jersey shape using fabric
    // In production, load from SVG files

    const colors = {
      basketball: '#E63946',
      baseball: '#1D3557',
      basic: '#457B9D',
      polo: '#2A9D8F',
      set: '#F4A261'
    };

    this.setBackgroundColor(colors[type] || '#E63946');
  }

  /**
   * Show properties panel for selected element
   */
  showProperties(obj) {
    const panel = document.getElementById('element-properties');
    const fields = document.getElementById('property-fields');

    if (!panel || !fields) return;

    panel.classList.remove('hidden');
    fields.innerHTML = '';

    if (obj.type === 'text') {
      fields.innerHTML = `
        <div>
          <label class="block text-sm text-gray-700 mb-1">Text:</label>
          <input type="text" id="prop-text" value="${obj.text}" class="w-full px-3 py-2 border rounded-lg">
        </div>
        <div>
          <label class="block text-sm text-gray-700 mb-1">Font Size: ${Math.round(obj.fontSize)}px</label>
          <input type="range" id="prop-fontsize" min="12" max="150" value="${obj.fontSize}" class="w-full">
        </div>
        <div>
          <label class="block text-sm text-gray-700 mb-1">Color:</label>
          <input type="color" id="prop-color" value="${obj.fill}" class="w-full h-10 rounded cursor-pointer">
        </div>
        <button id="delete-element" class="w-full py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition">
          🗑️ Delete Element
        </button>
      `;

      // Event listeners
      document.getElementById('prop-text').addEventListener('input', (e) => {
        obj.set('text', e.target.value);
        this.canvas.renderAll();
      });

      document.getElementById('prop-fontsize').addEventListener('input', (e) => {
        obj.set('fontSize', parseInt(e.target.value));
        this.canvas.renderAll();
      });

      document.getElementById('prop-color').addEventListener('input', (e) => {
        obj.set('fill', e.target.value);
        this.canvas.renderAll();
      });

      document.getElementById('delete-element').addEventListener('click', () => {
        this.canvas.remove(obj);
        this.canvas.renderAll();
        this.hideProperties();
      });
    } else if (obj.type === 'image') {
      fields.innerHTML = `
        <div>
          <label class="block text-sm text-gray-700 mb-1">Scale: ${Math.round(obj.scaleX * 100)}%</label>
          <input type="range" id="prop-scale" min="10" max="200" value="${obj.scaleX * 100}" class="w-full">
        </div>
        <div>
          <label class="block text-sm text-gray-700 mb-1">Opacity: ${Math.round(obj.opacity * 100)}%</label>
          <input type="range" id="prop-opacity" min="10" max="100" value="${obj.opacity * 100}" class="w-full">
        </div>
        <button id="delete-element" class="w-full py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition">
          🗑️ Delete Element
        </button>
      `;

      document.getElementById('prop-scale').addEventListener('input', (e) => {
        const scale = parseInt(e.target.value) / 100;
        obj.set('scaleX', scale);
        obj.set('scaleY', scale);
        this.canvas.renderAll();
      });

      document.getElementById('prop-opacity').addEventListener('input', (e) => {
        obj.set('opacity', parseInt(e.target.value) / 100);
        this.canvas.renderAll();
      });

      document.getElementById('delete-element').addEventListener('click', () => {
        this.canvas.remove(obj);
        this.canvas.renderAll();
        this.hideProperties();
      });
    }
  }

  /**
   * Hide properties panel
   */
  hideProperties() {
    const panel = document.getElementById('element-properties');
    if (panel) {
      panel.classList.add('hidden');
    }
  }

  /**
   * Get all objects info for layers panel
   */
  getLayersInfo() {
    return this.canvas.getObjects().map((obj, index) => ({
      index,
      id: obj.id,
      type: obj.type,
      text: obj.type === 'text' ? obj.text : (obj.type === 'image' ? 'Image' : obj.type)
    }));
  }

  /**
   * Save design to localStorage
   */
  saveToLocalStorage(key = 'jersey-design') {
    try {
      const json = this.canvas.toJSON(['id', 'editable']);
      localStorage.setItem(key, JSON.stringify(json));
      return true;
    } catch (e) {
      console.error('Failed to save design:', e);
      return false;
    }
  }

  /**
   * Load design from localStorage
   */
  loadFromLocalStorage(key = 'jersey-design') {
    try {
      const data = localStorage.getItem(key);
      if (data) {
        this.loadFromJSON(JSON.parse(data));
        return true;
      }
      return false;
    } catch (e) {
      console.error('Failed to load design:', e);
      return false;
    }
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CanvasManager;
}
