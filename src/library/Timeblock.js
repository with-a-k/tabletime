let moment = require('moment-timezone');
let expander = require('./time-expander');

class Timeblock {
  constructor(day, start, length) {
    this.day = day;
    this.start = start;
    this.length = length;
  }

  end() {
    return ((this.start + this.length) % 1440);
  }

  prettyPrint() {
    return `${expander.days[this.day]} : ${expander.minuteToTime(this.start)} - ${expander.minuteToTime(this.end())}`
  }
}

module.exports = Timeblock;
