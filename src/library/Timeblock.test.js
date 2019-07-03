const Timeblock = require('./Timeblock');
const expander = require('./time-expander');

test('initialize', () => {
  let block = new Timeblock('MON', 0, 60);
  expect(block).toBeDefined();
  expect(block.day).toBe('MON');
  expect(block.start).toBe(0);
  expect(block.length).toBe(60);
});

test('calculate end simple', () => {
  let block = new Timeblock('MON', 480, 60);
  expect(block.end()).toBe(540);
});

test('calculate end overflow', () => {
  let block = new Timeblock('MON', 1430, 60);
  expect(block.end()).toBe(50);
});

test('pretty print', () => {
  let block = new Timeblock('MON', 0, 60);
  expect(block.prettyPrint()).toBe('Monday : 12:00 AM - 01:00 AM');
});

test('random', () => {
  let days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  let day = days[Math.floor(Math.random() * 7)];
  let start = Math.floor(Math.random() * 1440);
  let end = Math.floor(Math.random() * 1440);
  while (end < start) {
    end = Math.floor(Math.random() * 1440);
  }
  let block = new Timeblock(day, start, end - start);
  expect(block.prettyPrint()).toBe(`${expander.days[day]} : ${expander.minuteToTime(start)} - ${expander.minuteToTime(end)}`);
});
