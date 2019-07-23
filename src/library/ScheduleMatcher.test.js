let ScheduleMatcher = require('./ScheduleMatcher');
let Schedule = require('./Schedule');
let Timeblock = require('./Timeblock');

let days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

test('error with less than two schedules given', () => {
  expect(() => {
    ScheduleMatcher.match([], 2);
  }).toThrow('Cannot match with less than two schedules. Try adding more schedules.');
});

test('error with less than two schedules given', () => {
  let minAtt = Math.floor(Math.random() * 5) + 3;
  expect(() => {
    ScheduleMatcher.match(["dummy", "dummy"], minAtt);
  }).toThrow(`No options with ${minAtt} schedules overlapping. Try adding more schedules or reducing your minimum attendance.`);
});

test('error with too low minimum attendance', () => {
  expect(() => {
    ScheduleMatcher.match(["dummy", "dummy"], 1);
  }).toThrow('Cannot match less than two schedules. Try increasing your minimum attendance.');
});
