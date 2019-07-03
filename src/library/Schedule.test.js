const Schedule = require('./Schedule');
const Timeblock = require('./Timeblock');
const expander = require('./time-expander');

test('initialize simple', () => {
  let monEvening = new Timeblock('MON', 1080, 240);
  let testSchedule = new Schedule('MDT', [monEvening]);
  expect(testSchedule).toBeDefined();
});
