let ScheduleMatcher = require('./ScheduleMatcher');
let Schedule = require('./Schedule');
let Timeblock = require('./Timeblock');

let days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

test('error with less than two schedules given', () => {
  expect(() => {
    ScheduleMatcher.match([], 2);
  }).toThrow('Cannot match with less than two schedules. Try adding more schedules.');
});
