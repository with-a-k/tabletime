const Schedule = require('./Schedule');
const support = require('./supportfunctions');

function match(schedules, minimumAttendance) {
  let maximumAttendance = schedules.length;

  if (maximumAttendance < 2) {
    throw new Error("Cannot match with less than two schedules. Try adding more schedules.")
  }
  if (maximumAttendance < minimumAttendance) {
    throw new Error(`No options with ${minimumAttendance} schedules overlapping. Try adding more schedules or reducing your minimum attendance.`);
  }
  if (minimumAttendance < 2) {
    throw new Error("Cannot match less than two schedules. Try increasing your minimum attendance.");
  }
  let matching = {};
  let overStart = 0;
  let overEnd = 0;

  let hostSchedule = schedules.shift();
  hostSchedule.blocks.forEach((hostBlock) => {
    schedules.forEach((guestSchedule) => {
      guestSchedule.blocks.forEach((guestBlock) => {
        if(hostBlock.isOverlapping(guestBlock)) {
          overStart = Math.max(hostBlock.start, guestBlock.start);
          overEnd = Math.min(hostBlock.end(), guestBlock.end());
        }
      });
    });
  });

  return matching;
}

function isInside(blockA, blockB) {

}

module.exports = { match }
