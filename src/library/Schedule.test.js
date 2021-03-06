const Schedule = require('./Schedule');
const Timeblock = require('./Timeblock');
const expander = require('./time-expander');

test('initialize simple', () => {
  let monEvening = new Timeblock('MON', 1080, 240);
  let testSchedule = new Schedule('MDT', [monEvening]);
  expect(testSchedule).toBeDefined();
});

test('initialize multiple', () => {
  let monEvening = new Timeblock('MON', 1080, 240);
  let tuesEvening = new Timeblock('TUE', 1020, 300);
  let testSchedule = new Schedule('MDT', [monEvening, tuesEvening]);
  expect(testSchedule.blocks.length).toBe(2);
});

test('collision', () => {
  let wedAfternoon = new Timeblock('WED', 300, 300);
  let afternoonCode = wedAfternoon.tag;
  let wedEvening = new Timeblock('WED', 450, 300);
  let testSchedule = new Schedule('MDT', [wedAfternoon, wedEvening]);
  expect(testSchedule.overlaps).toEqual({[afternoonCode]: [wedEvening]});
  expect(testSchedule.blocks.length).toBe(1);
});

test('no collision on different days', () => {
  let wedAfternoon = new Timeblock('WED', 300, 300);
  let thuAfternoon = new Timeblock('THU', 330, 300);
  let testSchedule = new Schedule('MDT', [wedAfternoon, thuAfternoon]);
  expect(testSchedule.overlaps).toEqual({});
});
