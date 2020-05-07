export const getLastPath = (str, lastIsSlash) => {
  const newString = lastIsSlash ? str.slice(0, -1) : str;
  return newString.substring(newString.lastIndexOf('/') + 1);
};

export const capitalizeFirstLetter = (str) => {
  if (!isNaN(str)) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};


export const currency = (amount) => new Intl.NumberFormat('en-EN',
  { style: 'currency', currency: 'USD' }
).format(amount);

export const numberFormat = amount => new Intl.NumberFormat('en-EN',
  { maximumSignificantDigits: 3 }).format(amount);
