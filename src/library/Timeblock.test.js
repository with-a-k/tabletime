let Timeblock = require('./Timeblock');

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
