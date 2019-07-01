const expander = require('./time-expander.js');

test('12 AM', () => {
  expect(expander.minuteToTime(0)).toStrictEqual("12:00 AM");
});

test('7 AM', () => {
  expect(expander.minuteToTime(420)).toStrictEqual("07:00 AM");
});

test('12 PM', () => {
  expect(expander.minuteToTime(720)).toStrictEqual("12:00 PM");
});

test('2 PM', () => {
  expect(expander.minuteToTime(840)).toStrictEqual("02:00 PM");
});

test('random time', () => {
  let ap = (Math.random() > 0.5 ? "AM" : "PM");
  let hour = Math.ceil(Math.random() * 12);
  let minute = Math.ceil(Math.random() * 60);

  let rand = hour * 60 + minute + (ap === "AM" ? 0 : 720);

  console.log (hour, minute, rand);

  expect(expander.minuteToTime(rand))
  .toStrictEqual(`${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")} ${ap}`);
});
