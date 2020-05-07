
const sample = require('lodash.samplesize');
const { getRandomInt } = require('./randomInt.js');

const mainGenres = ['Moda', 'Elektronik', 'Ofis', 'Temizlik', 'Bakım'];
const subGenres = ['Akıllı Cihaz', 'Telefon', 'Ofis', 'Hobi', 'Dekorasyon', 'Oyun'];

const getSummary = () => {
  const totalSoldProducts = getRandomInt(100, 1000);
  const endorsement = totalSoldProducts * getRandomInt(100, 1000, true);
  return {
    total_sold_products_count: totalSoldProducts,
    total_order_count: totalSoldProducts + getRandomInt(100, 1000),
    endorsement,
    profit: endorsement - getRandomInt(10, 1000),
    total_visitor_count: getRandomInt(10000, 10000),
  };
};

const getBalanceData = () => sample(mainGenres, 3).map((m, index) => {
  return {
    id: index,
    name: m,
    ...getSummary(),
    categories_in_same_order: sample(subGenres, 3).map((s, i) => {
      return {
        id: i * 2,
        name: s,
        ...getSummary()
      };
    })
  };
});

const getBalance = () => {
  const total_order_count = getRandomInt(1000, 10000);
  const total_endorsement = total_order_count * getRandomInt(1000, 10000, true);
  return {
    total_endorsement,
    total_order_count,
    total_profit: total_endorsement - getRandomInt(1000, 100000),
    top_categories: getBalanceData()
  };
};


module.exports.getBalance = getBalance;

