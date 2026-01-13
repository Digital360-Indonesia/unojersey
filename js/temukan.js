/**
 * UnoJersey Temukan Page - Quiz Logic
 * Handles multi-step quiz, recommendation algorithm, and Google Sheets submission
 */

// Google Sheets Apps Script URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw1oM7JOETvzmNPRBRx4wtgGgmuf8uYCP6Hpr0fbfICs6zhoJFRN8VZcMyc26SiNkGzhw/exec';

// Quiz state management
const quizState = {
    currentStep: 'intro',
    answers: {
        q1_model: null,
        q2_quantity: null,
        q3_feature: null,
        q4_timeline: null,
        q5_budget: null
    },
    userData: {
        name: '',
        phone: ''
    },
    recommendation: null
};

// Recommendation mapping based on quiz answers
const recommendationMap = {
    // Basic Jersey combinations
    'basic-nama-nomor': {
        jersey: 'Jersey Basic Custom Name',
        type: 'Basic Jersey',
        feature: 'Nama & Nomor'
    },
    'basic-logo-tim': {
        jersey: 'Jersey Basic Custom Logo',
        type: 'Basic Jersey',
        feature: 'Logo Tim'
    },
    'basic-full-custom': {
        jersey: 'Jersey Basic Full Custom',
        type: 'Basic Jersey',
        feature: 'Full Custom'
    },
    'basic-warna': {
        jersey: 'Jersey Basic Custom Color',
        type: 'Basic Jersey',
        feature: 'Warna Spesifik'
    },
    'basic-semua': {
        jersey: 'Jersey Basic Premium',
        type: 'Basic Jersey',
        feature: 'Semua Fitur'
    },

    // Basket Jersey combinations
    'basket-nama-nomor': {
        jersey: 'Jersey Basketball Custom Name',
        type: 'Basketball Jersey',
        feature: 'Nama & Nomor'
    },
    'basket-logo-tim': {
        jersey: 'Jersey Basketball Custom Logo',
        type: 'Basketball Jersey',
        feature: 'Logo Tim'
    },
    'basket-full-custom': {
        jersey: 'Jersey Basketball Full Custom',
        type: 'Basketball Jersey',
        feature: 'Full Custom'
    },
    'basket-warna': {
        jersey: 'Jersey Basketball Custom Color',
        type: 'Basketball Jersey',
        feature: 'Warna Spesifik'
    },
    'basket-semua': {
        jersey: 'Jersey Basketball Premium',
        type: 'Basketball Jersey',
        feature: 'Semua Fitur'
    },

    // Baseball Jersey combinations
    'baseball-nama-nomor': {
        jersey: 'Jersey Baseball Custom Name',
        type: 'Baseball Jersey',
        feature: 'Nama & Nomor'
    },
    'baseball-logo-tim': {
        jersey: 'Jersey Baseball Custom Logo',
        type: 'Baseball Jersey',
        feature: 'Logo Tim'
    },
    'baseball-full-custom': {
        jersey: 'Jersey Baseball Full Custom',
        type: 'Baseball Jersey',
        feature: 'Full Custom'
    },
    'baseball-warna': {
        jersey: 'Jersey Baseball Custom Color',
        type: 'Baseball Jersey',
        feature: 'Warna Spesifik'
    },
    'baseball-semua': {
        jersey: 'Jersey Baseball Premium',
        type: 'Baseball Jersey',
        feature: 'Semua Fitur'
    },

    // Polo Jersey combinations
    'polo-nama-nomor': {
        jersey: 'Jersey Polo Custom Name',
        type: 'Polo Jersey',
        feature: 'Nama & Nomor'
    },
    'polo-logo-tim': {
        jersey: 'Jersey Polo Custom Logo',
        type: 'Polo Jersey',
        feature: 'Logo Tim'
    },
    'polo-full-custom': {
        jersey: 'Jersey Polo Full Custom',
        type: 'Polo Jersey',
        feature: 'Full Custom'
    },
    'polo-warna': {
        jersey: 'Jersey Polo Custom Color',
        type: 'Polo Jersey',
        feature: 'Warna Spesifik'
    },
    'polo-semua': {
        jersey: 'Jersey Polo Premium',
        type: 'Polo Jersey',
        feature: 'Semua Fitur'
    },

    // Set Jersey combinations
    'set-nama-nomor': {
        jersey: 'Jersey Set Custom Name',
        type: 'Jersey Set',
        feature: 'Nama & Nomor'
    },
    'set-logo-tim': {
        jersey: 'Jersey Set Custom Logo',
        type: 'Jersey Set',
        feature: 'Logo Tim'
    },
    'set-full-custom': {
        jersey: 'Jersey Set Full Custom',
        type: 'Jersey Set',
        feature: 'Full Custom'
    },
    'set-warna': {
        jersey: 'Jersey Set Custom Color',
        type: 'Jersey Set',
        feature: 'Warna Spesifik'
    },
    'set-semua': {
        jersey: 'Jersey Set Premium',
        type: 'Jersey Set',
        feature: 'Semua Fitur'
    }
};

// DOM elements
const screens = {
    intro: document.getElementById('screen-intro'),
    q1: document.getElementById('screen-q1'),
    q2: document.getElementById('screen-q2'),
    q3: document.getElementById('screen-q3'),
    q4: document.getElementById('screen-q4'),
    q5: document.getElementById('screen-q5'),
    form: document.getElementById('screen-form'),
    loading: document.getElementById('screen-loading'),
    result: document.getElementById('screen-result')
};

// Navigation functions
function showScreen(screenId) {
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    screens[screenId].classList.add('active');
    quizState.currentStep = screenId;
}

// Initialize event listeners
function initQuiz() {
    // Start quiz button
    document.getElementById('btn-start-quiz').addEventListener('click', () => {
        showScreen('q1');
    });

    // Question 1 - Model Jersey
    setupQuestionOptions('screen-q1', (value) => {
        quizState.answers.q1_model = value;
        showScreen('q2');
    });

    // Question 2 - Quantity
    setupQuestionOptions('screen-q2', (value) => {
        quizState.answers.q2_quantity = value;
        showScreen('q3');
    });

    // Question 3 - Custom Features
    setupQuestionOptions('screen-q3', (value) => {
        quizState.answers.q3_feature = value;
        showScreen('q4');
    });

    // Question 4 - Timeline
    setupQuestionOptions('screen-q4', (value) => {
        quizState.answers.q4_timeline = value;
        showScreen('q5');
    });

    // Question 5 - Budget
    setupQuestionOptions('screen-q5', (value) => {
        quizState.answers.q5_budget = value;
        showScreen('form');
    });

    // User form submission
    document.getElementById('user-form').addEventListener('submit', handleFormSubmit);

    // Design Now button
    document.getElementById('btn-design-now').addEventListener('click', (e) => {
        e.preventDefault();
        redirectToKreasikan();
    });
}

// Setup option click handlers for a question screen
function setupQuestionOptions(screenId, callback) {
    const screen = document.getElementById(screenId);
    const options = screen.querySelectorAll('.option-card');

    options.forEach(option => {
        option.addEventListener('click', () => {
            // Remove selected class from all options
            options.forEach(opt => opt.classList.remove('selected'));
            // Add selected class to clicked option
            option.classList.add('selected');
            // Small delay for visual feedback
            setTimeout(() => callback(option.dataset.value), 200);
        });
    });
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const nameInput = document.getElementById('user-name');
    const phoneInput = document.getElementById('user-phone');
    const termsCheckbox = document.getElementById('terms-agree');

    // Validate
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    if (!termsCheckbox.checked) {
        alert('Mohon setujui Syarat & Ketentuan');
        return;
    }

    // Store user data
    quizState.userData.name = nameInput.value.trim();
    quizState.userData.phone = phoneInput.value.trim();

    // Calculate recommendation
    quizState.recommendation = calculateRecommendation();

    // Show loading screen
    showScreen('loading');

    // Submit to database - TEMPORARILY DISABLED
    // try {
    //     await submitQuizData();
    // } catch (error) {
    //     console.error('Failed to submit quiz data:', error);
    //     // Continue to result even if submission fails
    // }

    // Show result after 1.5 seconds
    setTimeout(() => {
        displayResult();
    }, 1500);
}

// Calculate recommendation based on quiz answers
function calculateRecommendation() {
    const { q1_model, q3_feature } = quizState.answers;
    const key = `${q1_model}-${q3_feature}`;

    // Get recommendation from map, or use default
    const rec = recommendationMap[key] || {
        jersey: 'Jersey Custom Premium',
        type: 'Custom Jersey',
        feature: q3_feature || 'Semua Fitur'
    };

    return rec;
}

// Submit quiz data to Google Sheets via Apps Script
async function submitQuizData() {
    console.log('📤 Submitting to Google Sheets...');

    // Prepare payload for Google Sheets (matches Apps Script expectations)
    const payload = {
        name: quizState.userData.name,
        phone: quizState.userData.phone,
        model: quizState.answers.q1_model,
        quantity: quizState.answers.q2_quantity,
        feature: quizState.answers.q3_feature,
        timeline: quizState.answers.q4_timeline,
        budget: quizState.answers.q5_budget,
        recommendation: quizState.recommendation.jersey
    };

    console.log('📦 Payload:', payload);

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // CRITICAL: Required for Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        // Note: With no-cors mode, we cannot read the response
        // But the submission still works!
        console.log('✅ Data submitted to Google Sheets successfully');
        return true;

    } catch (error) {
        console.error('❌ Google Sheets submission error:', error);
        // Don't throw - allow user to continue to result
        return false;
    }
}

// Display result on the result screen
function displayResult() {
    const rec = quizState.recommendation;

    // Update result elements
    document.getElementById('result-jersey-name').textContent = rec.jersey;
    document.getElementById('result-type').textContent = rec.type;
    document.getElementById('result-style').textContent = rec.feature;
    document.getElementById('result-sport').textContent = getModelLabel(quizState.answers.q1_model);
    document.getElementById('result-team-size').textContent = getQuantityLabel(quizState.answers.q2_quantity);

    // Show result screen
    showScreen('result');
}

// Redirect to Kreasikan page with quiz data
function redirectToKreasikan() {
    const params = new URLSearchParams({
        jerseyType: quizState.recommendation.type,
        feature: quizState.recommendation.feature,
        name: quizState.userData.name,
        phone: quizState.userData.phone,
        model: quizState.answers.q1_model,
        quantity: quizState.answers.q2_quantity
    });

    window.location.href = `kreasikan/index.html?${params.toString()}`;
}

// Helper: Get model label
function getModelLabel(model) {
    const labels = {
        'basic': 'Basic',
        'basket': 'Basket',
        'baseball': 'Baseball',
        'polo': 'Polo',
        'set': 'Set'
    };
    return labels[model] || model;
}

// Helper: Get quantity label
function getQuantityLabel(quantity) {
    const labels = {
        '1-5': '1-5 pcs',
        '6-15': '6-15 pcs',
        '16-30': '16-30 pcs',
        '30+': '30+ pcs'
    };
    return labels[quantity] || quantity;
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuiz);
} else {
    initQuiz();
}
