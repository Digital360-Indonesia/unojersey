/**
 * UNO JERSEY - Portfolio Data
 * Collection of portfolio items for the portfolio grid
 * 4 items with autoplay videos
 */

const portfolioItems = [
  {
    id: 1,
    image: '/assets/images/portfolio/basketball-team-1.jpg',
    video: '/assets/videos/1.mp4',
    title: 'Sablon Reflektif',
    size: 'small',
    type: 'video',
    description: 'Ketika jersey kelasmu paling menyala dari kelas sebelah😎'
  },
  {
    id: 2,
    image: '/assets/images/portfolio/futsal-design-1.jpg',
    video: '/assets/videos/2.mp4',
    title: 'Support Jalan-jalan',
    size: 'small',
    type: 'video',
    description: 'Disini kita bakal support jalan-jalan kelasmu pake cashback + free ongkir🤩🫶🏻'
  },
  {
    id: 3,
    image: '/assets/images/portfolio/football-team-1.jpg',
    video: '/assets/videos/3.mp4',
    title: 'Proses Jersey',
    size: 'small',
    type: 'video',
    description: 'Proses dibalik jersey keren kalian kalo customnya di Uno Jersey🤩✨'
  },
  {
    id: 4,
    image: '/assets/images/portfolio/volleyball-team-1.jpg',
    video: '/assets/videos/4.mp4',
    title: 'Unboxing Jersey Boxy',
    size: 'small',
    type: 'video',
    description: 'Warna + desainnya cakep banget apalagi pake cuttingan boxy😎'
  }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = portfolioItems;
}
