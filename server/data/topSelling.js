const sample = require('lodash.samplesize');

const { getRandomInt } = require('./randomInt.js');


const getCityList = () => [
  {
    city_name: 'Istanbul - Avrupa',
    city_id: 341,
    location: [41.031554, 28.9854533]
  },
  {
    city_name: 'Istanbul - Anadolu',
    city_id: 342,
    order_count: 14,
    location: [41.013529, 29.0394583],
  },
  {
    city_name: 'Adana',
    city_id: 1,
    order_count: 12,
    location: [36.9970466, 35.2620002],
  },
  {
    city_name: 'Van',
    city_id: 65,
    order_count: 3,
    location: [38.502345, 43.3367943]
  },
  {
    city_name: 'Kahramanmaras',
    city_id: 46,
    order_count: 3,
    location: [37.573884, 36.9236503]
  }].map(c => ({
  ...c,
  order_count: getRandomInt(10, 1000)
}));


const products = [
  'Aydaki yildizlar',
  'Gökkuşağı',
  'Maviş Elyaf',
  'Kahve Papuç',
  'Pati Eldiven',
  'Snow bere'
];

const getTopThreeSelling = () => [
  'Mickey Mouse Kız Çocuk 91.SENY.P Moda Ayakkabılar',
  'PonPon Kız Bebek Tulum',
  'Lala Uyku Takımı'
].map((product, key)=>({
  id: key * 3,
  average_price: getRandomInt(50, 100, true),
  category_name: 'Anne- Bebek',
  pageview_count: getRandomInt(90, 1000),
  total_order_count: getRandomInt(20, 100),
  category_id: 23 * key,
  order_count_by_cities: getCityList(),
  products_in_same_order: sample(products, 3).map((p, k)=>({
    category_id: k * 30,
    category_name: p,
    average_price: getRandomInt(50, 100, true),
    pageview_count: getRandomInt(90, 1000),
    order_count: getRandomInt(20, 100),

  }))
}));


module.exports.getTopThreeSelling = getTopThreeSelling;
