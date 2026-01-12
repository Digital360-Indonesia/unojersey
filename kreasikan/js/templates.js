/**
 * Templates Data - Simplified Structure
 * Each template needs: preview (thumbnail) + image_url (full jersey)
 */

const Templates = {
  basketball: [
    {
      id: 'lakers-vibe',
      name: 'Lakers Vibe',
      category: 'retro',
      preview: './assets/templates/lakers-vibe-preview.svg',
      image_url: './assets/templates/lakers-vibe-full.svg',
      rating: 4.8,
      usage_count: 47,

      default_team_name: 'LAKERS',
      default_number: '23',
      default_player_name: 'JAMES',

      team_name_position: { top: 120, left: 300 },
      team_name_color: '#FDB927',
      team_name_size: 48,
      team_name_font: 'Bebas Neue',

      player_number_position: { top: 350, left: 300 },
      player_number_color: '#FFFFFF',
      player_number_size: 120,
      player_number_font: 'Impact',

      player_name_position: { top: 500, left: 300 },
      player_name_color: '#FDB927',
      player_name_size: 24,
      player_name_font: 'Inter',

      logo_position: { top: 60, left: 270, width: 60, height: 60 },

      colors: 'Purple, Gold, White',
      pattern: 'Solid',
      style: 'Retro 90s'
    },
    {
      id: 'chicago-bulls',
      name: 'Chicago Bulls',
      category: 'retro',
      preview: './assets/templates/bulls-preview.svg',
      image_url: './assets/templates/bulls-full.svg',
      rating: 4.9,
      usage_count: 62,

      default_team_name: 'BULLS',
      default_number: '23',
      default_player_name: 'JORDAN',

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

      logo_position: { top: 60, left: 270, width: 60, height: 60 },

      colors: 'Red, Black, White',
      pattern: 'Solid',
      style: 'Classic 90s'
    },
    {
      id: 'la-clippers',
      name: 'LA Clippers',
      category: 'bold',
      preview: './assets/templates/clippers-preview.svg',
      image_url: './assets/templates/clippers-full.svg',
      rating: 4.6,
      usage_count: 31,

      default_team_name: 'CLIPPERS',
      default_number: '2',
      default_player_name: 'PAUL',

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

      logo_position: { top: 60, left: 270, width: 60, height: 60 },

      colors: 'Red, Blue, White',
      pattern: 'Solid',
      style: 'Modern Bold'
    },
    {
      id: 'golden-state',
      name: 'Golden State',
      category: 'minimal',
      preview: './assets/templates/warriors-preview.svg',
      image_url: './assets/templates/warriors-full.svg',
      rating: 4.7,
      usage_count: 54,

      default_team_name: 'WARRIORS',
      default_number: '30',
      default_player_name: 'CURRY',

      team_name_position: { top: 120, left: 300 },
      team_name_color: '#FDB927',
      team_name_size: 48,
      team_name_font: 'Bebas Neue',

      player_number_position: { top: 350, left: 300 },
      player_number_color: '#FDB927',
      player_number_size: 120,
      player_number_font: 'Impact',

      player_name_position: { top: 500, left: 300 },
      player_name_color: '#FDB927',
      player_name_size: 24,
      player_name_font: 'Inter',

      logo_position: { top: 60, left: 270, width: 60, height: 60 },

      colors: 'Navy, Gold, White',
      pattern: 'Solid',
      style: 'Clean Modern'
    },
    {
      id: 'miami-heat',
      name: 'Miami Heat',
      category: 'bold',
      preview: './assets/templates/heat-preview.svg',
      image_url: './assets/templates/heat-full.svg',
      rating: 4.8,
      usage_count: 43,

      default_team_name: 'HEAT',
      default_number: '3',
      default_player_name: 'WADE',

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

      logo_position: { top: 60, left: 270, width: 60, height: 60 },

      colors: 'Red, Black, Orange',
      pattern: 'Gradient',
      style: 'Flaming Hot'
    },
    {
      id: 'boston-celtics',
      name: 'Boston Celtics',
      category: 'retro',
      preview: './assets/templates/celtics-preview.svg',
      image_url: './assets/templates/celtics-full.svg',
      rating: 4.9,
      usage_count: 58,

      default_team_name: 'CELTICS',
      default_number: '33',
      default_player_name: 'BIRD',

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

      logo_position: { top: 60, left: 270, width: 60, height: 60 },

      colors: 'Green, White, Gold',
      pattern: 'Solid',
      style: 'Classic Irish'
    },
    {
      id: 'minimal-black',
      name: 'Minimal Black',
      category: 'minimal',
      preview: './assets/templates/minimal-black-preview.svg',
      image_url: './assets/templates/minimal-black-full.svg',
      rating: 4.5,
      usage_count: 38,

      default_team_name: 'TEAM',
      default_number: '1',
      default_player_name: '',

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

      colors: 'Black, White',
      pattern: 'Solid',
      style: 'Street Style'
    },
    {
      id: 'retro-sunset',
      name: 'Retro Sunset',
      category: 'retro',
      preview: './assets/templates/sunset-preview.svg',
      image_url: './assets/templates/sunset-full.svg',
      rating: 4.6,
      usage_count: 29,

      default_team_name: 'SUNSET',
      default_number: '24',
      default_player_name: 'KOBE',

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

      colors: 'Orange, Yellow, Pink',
      pattern: 'Gradient',
      style: '80s Vibes'
    },
    {
      id: 'bold-stripes',
      name: 'Bold Stripes',
      category: 'bold',
      preview: './assets/templates/stripes-preview.svg',
      image_url: './assets/templates/stripes-full.svg',
      rating: 4.4,
      usage_count: 22,

      default_team_name: 'TEAM',
      default_number: '10',
      default_player_name: '',

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

      colors: 'Navy, Red, White',
      pattern: 'Stripes',
      style: 'Sport Classic'
    },
    {
      id: 'clean-white',
      name: 'Clean White',
      category: 'minimal',
      preview: './assets/templates/clean-white-preview.svg',
      image_url: './assets/templates/clean-white-full.svg',
      rating: 4.7,
      usage_count: 41,

      default_team_name: 'TEAM',
      default_number: '7',
      default_player_name: 'PLAYER',

      team_name_position: { top: 120, left: 300 },
      team_name_color: '#1E3A5F',
      team_name_size: 48,
      team_name_font: 'Bebas Neue',

      player_number_position: { top: 350, left: 300 },
      player_number_color: '#1E3A5F',
      player_number_size: 120,
      player_number_font: 'Impact',

      player_name_position: { top: 500, left: 300 },
      player_name_color: '#1E3A5F',
      player_name_size: 24,
      player_name_font: 'Inter',

      colors: 'White, Navy, Red',
      pattern: 'Solid',
      style: 'Pure Clean'
    }
  ],

  basic: [
    {
      id: 'basic-minimal',
      name: 'Basic Minimal',
      category: 'minimal',
      preview: './assets/templates/basic-minimal-preview.svg',
      image_url: './assets/templates/basic-minimal-full.svg',
      rating: 4.5,
      usage_count: 35,

      default_team_name: 'TEAM',
      default_number: '',
      default_player_name: '',

      team_name_position: { top: 200, left: 300 },
      team_name_color: '#FFFFFF',
      team_name_size: 48,
      team_name_font: 'Inter',

      player_number_position: { top: 320, left: 300 },
      player_number_color: '#FFFFFF',
      player_number_size: 100,
      player_number_font: 'Impact',

      player_name_position: { top: 420, left: 300 },
      player_name_color: '#FFFFFF',
      player_name_size: 20,
      player_name_font: 'Inter',

      colors: 'Dark Blue, White',
      pattern: 'Solid',
      style: 'Simple Clean'
    },
    {
      id: 'basic-retro',
      name: 'Basic Retro',
      category: 'retro',
      preview: './assets/templates/basic-retro-preview.svg',
      image_url: './assets/templates/basic-retro-full.svg',
      rating: 4.6,
      usage_count: 28,

      default_team_name: 'VINTAGE',
      default_number: '',
      default_player_name: '',

      team_name_position: { top: 200, left: 300 },
      team_name_color: '#FFFFFF',
      team_name_size: 56,
      team_name_font: 'Bebas Neue',

      player_number_position: { top: 320, left: 300 },
      player_number_color: '#FFFFFF',
      player_number_size: 100,
      player_number_font: 'Impact',

      player_name_position: { top: 420, left: 300 },
      player_name_color: '#FFFFFF',
      player_name_size: 20,
      player_name_font: 'Inter',

      colors: 'Red, White',
      pattern: 'Solid',
      style: 'Retro Vibes'
    }
  ],

  baseball: [
    {
      id: 'baseball-classic',
      name: 'Baseball Classic',
      category: 'retro',
      preview: './assets/templates/baseball-classic-preview.svg',
      image_url: './assets/templates/baseball-classic-full.svg',
      rating: 4.7,
      usage_count: 32,

      default_team_name: 'TEAM',
      default_number: '24',
      default_player_name: '',

      team_name_position: { top: 180, left: 300 },
      team_name_color: '#FFFFFF',
      team_name_size: 52,
      team_name_font: 'Bebas Neue',

      player_number_position: { top: 320, left: 300 },
      player_number_color: '#FFFFFF',
      player_number_size: 100,
      player_number_font: 'Impact',

      player_name_position: { top: 420, left: 300 },
      player_name_color: '#FFFFFF',
      player_name_size: 20,
      player_name_font: 'Inter',

      colors: 'Navy, White, Red',
      pattern: 'Solid',
      style: 'America Classic'
    }
  ],

  polo: [
    {
      id: 'polo-elegant',
      name: 'Polo Elegant',
      category: 'minimal',
      preview: './assets/templates/polo-elegant-preview.svg',
      image_url: './assets/templates/polo-elegant-full.svg',
      rating: 4.8,
      usage_count: 44,

      default_team_name: 'COMPANY',
      default_number: '',
      default_player_name: '',

      team_name_position: { top: 250, left: 300 },
      team_name_color: '#D4AF37',
      team_name_size: 36,
      team_name_font: 'Inter',

      player_number_position: { top: 350, left: 300 },
      player_number_color: '#D4AF37',
      player_number_size: 60,
      player_number_font: 'Impact',

      player_name_position: { top: 420, left: 300 },
      player_name_color: '#D4AF37',
      player_name_size: 18,
      player_name_font: 'Inter',

      colors: 'Navy, Gold',
      pattern: 'Solid',
      style: 'Executive'
    }
  ],

  set: [
    {
      id: 'set-training',
      name: 'Training Set',
      category: 'minimal',
      preview: './assets/templates/training-set-preview.svg',
      image_url: './assets/templates/training-set-full.svg',
      rating: 4.6,
      usage_count: 38,

      default_team_name: 'TRAINING',
      default_number: '1',
      default_player_name: '',

      team_name_position: { top: 180, left: 300 },
      team_name_color: '#00FF88',
      team_name_size: 48,
      team_name_font: 'Bebas Neue',

      player_number_position: { top: 320, left: 300 },
      player_number_color: '#00FF88',
      player_number_size: 100,
      player_number_font: 'Impact',

      player_name_position: { top: 420, left: 300 },
      player_name_color: '#00FF88',
      player_name_size: 20,
      player_name_font: 'Inter',

      colors: 'Gray, Neon Green',
      pattern: 'Solid',
      style: 'Sport Training'
    }
  ]
};

/**
 * Get templates by jersey type
 */
function getTemplatesByType(jerseyType) {
  return Templates[jerseyType] || [];
}

/**
 * Get template by ID
 */
function getTemplateById(templateId) {
  for (const type in Templates) {
    const template = Templates[type].find(t => t.id === templateId);
    if (template) return template;
  }
  return null;
}

/**
 * Filter templates by category
 */
function filterTemplatesByCategory(templates, category) {
  if (category === 'all') return templates;
  return templates.filter(t => t.category === category);
}
