let Moment = require('moment-timezone');
let expander = require('./time-expander');

class Timeblock {
  constructor(day, start, length) {
    this.day = day;
    this.start = start;
    this.length = length;
    this.tag = this.shortCode();
  }

  end() {
    return ((this.start + this.length) % 1440);
  }

  prettyPrint() {
    return `${expander.days[this.day]} : ${expander.minuteToTime(this.start)} - ${expander.minuteToTime(this.end())}`
  }

  shortCode() {
    return `${this.day}${this.start}${this.length}${Moment.now()}`;
  }

  isOverlapping(other) {
    if (this.day == other.day) {
      return ((this.start >= other.start && this.start <= other.end()) ||
        (other.start >= this.start && other.start <= this.end()));
    }
    return false;
  }
}

module.exports = Timeblock;
