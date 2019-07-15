const Schedule = require('./Schedule');
const support = require('./supportfunctions');

function match(schedules, minimumAttendance) {
  let maximumAttendance = schedules.length;
  
  if (maximumAttendance < 2) {
    throw new Error("Cannot match with less than two schedules. Try adding more schedules.")
  }
  if (maximumAttendance < minimumAttendance) {
    throw new Error(`No options with ${minimumAttendance} schedules overlapping. Try adding more schedules.`);
  }
  if (minimumAttendance < 2) {
    throw new Error("Cannot match less than two schedules. Try increasing your minimum attendance.");
  }
  let matching = {};
  return matching;
}

module.exports = { match }
