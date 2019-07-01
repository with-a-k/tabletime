function minuteToTime (minute) {
  let hour = Math.floor(minute / 60);
  let displayMinute = (minute % 60).toString();
  let antepost = (hour > 11 ? 'PM' : 'AM');
  while (hour > 12) {
    hour -= 12;
  }
  while (hour < 1) {
    hour += 12;
  }

  return `${hour.toString().padStart(2, '0')}:${displayMinute.padStart(2, '0')} ${antepost}`
}

let days = {
  'SUN': 'Sunday',
  'MON': 'Monday',
  'TUE': 'Tuesday',
  'WED': 'Wednesday',
  'THU': 'Thursday',
  'FRI': 'Friday',
  'SAT': 'Saturday'
}

module.exports = { days, minuteToTime };
