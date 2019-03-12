import Vue from 'vue';

const dateFilter = (value: any) => {
  const date = new Date(parseInt(value, 10));

  let hours = date.getHours();
  let hoursAsString = '';
  const mins = date.getMinutes();
  let minsAsString = String(mins);

  let meridian = 'am';

  if (hours > 11) {
    meridian = 'pm';
    hours -= 12;
  } else {
    if (!hours) {
      hours = 12;
    }
  }

  if (hours < 10) {
    hoursAsString = `0${hours}`;
  } else {
    hoursAsString = String(hours);
  }

  if (mins < 10) {
    minsAsString = `0${mins}`;
  }


  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${hoursAsString}:${minsAsString} ${meridian}`;
};

Vue.filter('toDate', dateFilter);

export default dateFilter;
