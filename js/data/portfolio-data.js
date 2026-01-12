/**
 * UNO JERSEY - Portfolio Data
 * Collection of portfolio items for the masonry grid
 * 4 items with autoplay videos
 */

const portfolioItems = [
  {
    id: 1,
    image: '/assets/images/portfolio/basketball-team-1.jpg',
    video: '/assets/videos/1.mp4',
    title: 'Tim Basketball SMA 17',
    category: 'basketball',
    size: 'small',
    type: 'video',
    description: 'Jersey custom untuk tim basketball SMA 17'
  },
  {
    id: 2,
    image: '/assets/images/portfolio/futsal-design-1.jpg',
    video: '/assets/videos/2.mp4',
    title: 'Jersey Futsal Custom',
    category: 'futsal',
    size: 'small',
    type: 'video',
    description: 'Desain jersey futsal gradasi'
  },
  {
    id: 3,
    image: '/assets/images/portfolio/football-team-1.jpg',
    video: '/assets/videos/3.mp4',
    title: 'Tim Football United',
    category: 'football',
    size: 'small',
    type: 'video',
    description: 'Jersey football dengan material premium'
  },
  {
    id: 4,
    image: '/assets/images/portfolio/volleyball-team-1.jpg',
    video: '/assets/videos/4.mp4',
    title: 'Tim Voli Putri',
    category: 'volleyball',
    size: 'small',
    type: 'video',
    description: 'Jersey voli desain feminin'
  }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = portfolioItems;
}
