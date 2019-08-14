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

test('simple match', () => {
  let sameBlock = new Timeblock('SAT', 1000, 180);
  let scheduleA = new Schedule('MDT', [sameBlock]);
  let scheduleB = new Schedule('MDT', [sameBlock]);
  expect(ScheduleMatcher.match([scheduleA, scheduleB], 2)).toStrictEqual(["SAT/1000-1180"]);
});

test('partial match', () => {
  let oneBlock = new Timeblock('SAT', 1000, 180);
  let twoBlock = new Timeblock('SAT', 1120, 120);
  let scheduleA = new Schedule('MDT', [oneBlock]);
  let scheduleB = new Schedule('MDT', [twoBlock]);
  expect(ScheduleMatcher.match([scheduleA, scheduleB], 2)).toStrictEqual(["SAT/1120-1180"]);
});

test('different timezones', () => {
  let sameBlock = new Timeblock('SAT', 1000, 180);
  let scheduleA = new Schedule('MDT', [sameBlock]);
  let scheduleB = new Schedule('PDT', [sameBlock]);
  expect(ScheduleMatcher.match([scheduleA, scheduleB], 2)).toStrictEqual(["SAT/1000-1120"]);
});

test('three schedules', () => {
  let sameBlock = new Timeblock('SAT', 1000, 180);
  let scheduleA = new Schedule('MDT', [sameBlock]);
  let scheduleB = new Schedule('MDT', [sameBlock]);
  let scheduleC = new Schedule('MDT', [sameBlock]);
  expect(ScheduleMatcher.match([scheduleA, scheduleB, scheduleC], 3)).toStrictEqual(["SAT/1000-1180"]);
});

test('match two of three', () => {
  let oneBlock = new Timeblock('SAT', 1000, 180);
  let twoBlock = new Timeblock('WED', 1200, 180);
  let scheduleA = new Schedule('MDT', [oneBlock, twoBlock]);
  let scheduleB = new Schedule('MDT', [oneBlock]);
  let scheduleC = new Schedule('MDT', [twoBlock]);
  expect(ScheduleMatcher.match([scheduleA, scheduleB, scheduleC], 2)).toStrictEqual(["SAT/1000-1180", "WED/1200-1380"].sort());
});
