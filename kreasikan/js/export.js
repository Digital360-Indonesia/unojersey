/**
 * Export Manager - Simplified for html2canvas
 */

class ExportManager {
  constructor(editor) {
    this.editor = editor;
    this.unoPhone = '6285117088199'; // UNO JERSEY WhatsApp number
  }

  getUserPhone() {
    const params = new URLSearchParams(window.location.search);
    return params.get('phone') || '';
  }

  getUserName() {
    const params = new URLSearchParams(window.location.search);
    return params.get('name') || 'Customer';
  }

  async exportDesign() {
    // Show loading
    this.showLoading('Menyiapkan design...');

    // Export to image
    const imageDataURL = await this.editor.exportToImage();

    this.hideLoading();

    if (!imageDataURL) {
      return;
    }

    // Show preview in export screen
    const previewImg = document.getElementById('final-preview');
    if (previewImg) {
      previewImg.src = imageDataURL;
    }

    // Show export screen
    showScreen('export-screen');

    return imageDataURL;
  }

  downloadImage(dataURL, filename = 'jersey-design-uno.png') {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataURL;
    link.click();
  }

  sendToOwnWhatsApp() {
    const userPhone = this.getUserPhone();
    const designData = this.editor.getDesignData();

    if (!userPhone) {
      alert('Nomor WhatsApp tidak ditemukan. Silakan mulai dari halaman Temukan.');
      return;
    }

    // Generate WhatsApp message
    const message = this.generateOwnMessage(designData);

    // Download image first
    this.editor.exportToImage().then((imageDataURL) => {
      this.downloadImage(imageDataURL, 'jersey-design-uno.png');

      // Open WhatsApp
      const whatsappURL = `https://wa.me/${userPhone.replace(/^0/, '62')}?text=${encodeURIComponent(message)}`;
      setTimeout(() => {
        window.open(whatsappURL, '_blank');
        alert('✅ Desain sudah didownload!\n\nSilakan kirim file "jersey-design-uno.png" ke WhatsApp kamu.');
      }, 500);
    });
  }

  sendToUnoWhatsApp() {
    const designData = this.editor.getDesignData();

    // Download image first
    this.editor.exportToImage().then((imageDataURL) => {
      this.downloadImage(imageDataURL, 'jersey-design-uno.png');

      // Generate WhatsApp message
      const message = this.generateUnoMessage(designData);

      // Open WhatsApp
      const whatsappURL = `https://wa.me/${this.unoPhone}?text=${encodeURIComponent(message)}`;
      setTimeout(() => {
        window.open(whatsappURL, '_blank');
        alert('✅ Desain sudah didownload!\n\nSilakan kirim file "jersey-design-uno.png" ke chat UNO JERSEY.');
      }, 500);
    });
  }

  generateOwnMessage(designData) {
    return `
Halo! Ini design jersey yang aku buat di UNO JERSEY Kreasikan 🏀

📝 Detail:
• Jenis: ${window.AppState?.selectedModel || 'basketball'}
• Nama Tim: ${designData.teamName || '-'}
• Nomor: ${designData.playerNumber || '-'}
• Nama: ${designData.playerName || '-'}

File design sudah terlampir ya! Mohon bantu info selanjutnya untuk estimasi harga dan proses ordernya. Terima kasih! 🙏
    `.trim();
  }

  generateUnoMessage(designData) {
    const userName = this.getUserName();
    const userPhone = this.getUserPhone();

    return `
Halo UNO JERSEY! 👋

Saya ${userName} ingin memesan jersey custom dengan design yang sudah saya buat di Kreasikan.

📝 Detail Pesanan:
• Jenis Jersey: ${window.AppState?.selectedModel || 'basketball'}
• Nama Tim: ${designData.teamName || '-'}
• Nomor: ${designData.playerNumber || '-'}
• Nama: ${designData.playerName || '-'}
• No. HP: ${userPhone || '-'}

Mohon info:
1️⃣ Estimasi harga
2️⃣ Minimum order quantity (MOQ)
3️⃣ Waktu produksi
4️⃣ Cara pemesanan

File design saya kirim terpisah ya! Terima kasih 🙏
    `.trim();
  }

  showLoading(text = 'Memproses...') {
    const overlay = document.getElementById('loading-overlay');
    const loadingText = document.getElementById('loading-text');
    if (overlay && loadingText) {
      loadingText.textContent = text;
      overlay.classList.remove('hidden');
    }
  }

  hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
      overlay.classList.add('hidden');
    }
  }
}

// Helper function for showing export screen
function showExportScreen() {
  if (!window.exportManager) {
    window.exportManager = new ExportManager(window.editor);
  }
  window.exportManager.exportDesign();
}

// Helper function to download
function downloadDesign() {
  if (window.exportManager) {
    window.exportManager.editor.exportToImage().then((imageDataURL) => {
      window.exportManager.downloadImage(imageDataURL);
    });
  }
}

// Helper function to send to own WhatsApp
function sendToOwnWhatsApp() {
  if (window.exportManager) {
    window.exportManager.sendToOwnWhatsApp();
  }
}

// Helper function to send to UNO WhatsApp
function sendToUnoWhatsApp() {
  if (window.exportManager) {
    window.exportManager.sendToUnoWhatsApp();
  }
}
