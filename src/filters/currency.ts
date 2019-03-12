import Vue from 'vue';

const currencyFilter = (value: string | number) => {
  let newValue = value;
  if (typeof newValue === 'string') {
    newValue = parseFloat(newValue);
  }
  if (isNaN(newValue) || typeof newValue !== 'number') {
    return newValue;
  }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    minimumIntegerDigits: 1,
  });
  return formatter.format(newValue);
};

Vue.filter('toCurrency', currencyFilter);

export default currencyFilter;
