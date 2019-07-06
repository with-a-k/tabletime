let Timeblock = require('./Timeblock');
let support = require('./supportfunctions');

class Schedule {
  constructor(zone, blocks) {
    this.zone = zone;
    this.blocks = blocks;
    this.overlaps = this.checkOverlap();
    this.collapseOverlap();
  }

  checkOverlap() {
    let blocks = this.blocks;
    let days = support.groupBy(blocks, 'day');
    let overlaps = {};
    Object.keys(days).forEach((day, dindex) => {
      console.log(days[day]);
      days[day].forEach((block, index) => {
        let checkAgainst = days[day].slice(index + 1);
        console.log(checkAgainst);
        checkAgainst.forEach((cablock, caindex) => {
          if (block.end() > cablock.start) {
            if (overlaps[block.tag] === undefined) {
              overlaps[block.tag] = [];
            }
            overlaps[block.tag].push(cablock.tag);
          }
        });
      });
    });
    return overlaps;
  }

  collapseOverlap() {
    let collapsed = this.blocks;
    let overlaps = this.overlaps;
    let collapse = {};
    while(overlaps.length > 0) {
      collapse = overlaps.pop();
      begin = collapsed.find((block) => block.tag == collapse);
    }
    this.blocks = collapsed;
  }

  prettyAvailability() {

  }

  standardizeZone() {

  }
}

module.exports = Schedule;
