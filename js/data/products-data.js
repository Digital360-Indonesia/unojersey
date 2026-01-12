/**
 * UNO JERSEY Products Data
 * Product information for the interactive showcase section
 */

const productsData = [
  {
    id: 'basketball',
    category: 'BASKETBALL',
    title: 'Jersey Basketball Premium',
    description: 'Jersey basketball dengan bahan breathable dan desain modern untuk performa maksimal di lapangan.',
    features: [
      'Dry-fit material',
      'Sublimation printing',
      'Customizable number & name',
      'Anti-bacterial treatment'
    ],
    price: 'Mulai dari Rp 150.000',
    image: '/assets/images/products/basketball-jersey.png'
  },
  {
    id: 'futsal',
    category: 'FUTSAL',
    title: 'Jersey Futsal Pro',
    description: 'Desain aerodinamis dengan teknologi moisture-wicking untuk kenyamanan maksimal.',
    features: [
      'Lightweight fabric',
      'Quick-dry technology',
      'Ergonomic fit',
      'Durable stitching'
    ],
    price: 'Mulai dari Rp 140.000',
    image: '/assets/images/products/futsal-jersey.png'
  },
  {
    id: 'volleyball',
    category: 'VOLLEYBALL',
    title: 'Jersey Volleyball Elite',
    description: 'Jersey volleyball dengan bahan stretch yang nyaman untuk gerakan dinamis.',
    features: [
      '4-way stretch fabric',
      'Breathable mesh panels',
      'Reinforced stitching',
      'UV protection'
    ],
    price: 'Mulai dari Rp 145.000',
    image: '/assets/images/products/volleyball-jersey.png'
  },
  {
    id: 'football',
    category: 'FOOTBALL',
    title: 'Jersey Football Pro',
    description: 'Jersey sepak bola dengan kualitas profesional untuk performa terbaik.',
    features: [
      'Performance fabric',
      'Ventilated panels',
      'Lightweight design',
      'Premium durability'
    ],
    price: 'Mulai dari Rp 160.000',
    image: '/assets/images/products/football-jersey.png'
  },
  {
    id: 'custom',
    category: 'CUSTOM',
    title: 'Jersey Custom Design',
    description: 'Buat jersey sesuai desain impianmu dengan kualitas premium.',
    features: [
      'Full customization',
      'Premium materials',
      'Expert consultation',
      'Bulk discounts'
    ],
    price: 'Mulai dari Rp 175.000',
    image: '/assets/images/products/custom-jersey.png'
  }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = productsData;
}
