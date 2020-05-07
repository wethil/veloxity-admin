const getRandomInt = (min, max, float) => {
  if (float) {
    const random = (Math.random() * (max - min)) + min;
    return parseFloat(random.toFixed(2));
  }
  const $min = Math.ceil(min);
  const $max = Math.floor(max);
  return Math.floor(Math.random() * ($max - $min)) + $min;
};

module.exports.getRandomInt = getRandomInt;

