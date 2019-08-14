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
  let matchblock;

  let hostSchedule = schedules.shift();
  hostSchedule.blocks.forEach((hostBlock) => {
    schedules.forEach((guestSchedule) => {
      guestSchedule.blocks.forEach((guestBlock) => {
        if(hostBlock.isOverlapping(guestBlock)) {
          overStart = Math.max(hostBlock.start, guestBlock.start);
          overEnd = Math.min(hostBlock.end(), guestBlock.end());
          matching[`${hostBlock.day}/${overStart}-${overEnd}`] = typeof matching[`${hostBlock.day}/${overStart}-${overEnd}`] === undefined ? 1 : matching[`${hostBlock.day}/${overStart}-${overEnd}`]++;
        }
      });
    });
  });

  let inverse = invertMatches(matching);

  return inverse[Math.max(Object.keys(inverse))].sort();
}

function isInside(blockA, blockB) {

}

function invertMatches(matches) {
  let inverse = {};
  Object.values(matches).forEach((count) => {
    inverse[count] = [];
  });
  Object.keys(matches).forEach((match) => {
    inverse[matches[match]].push(match);
  });
  return inverse;
}

module.exports = { match }
