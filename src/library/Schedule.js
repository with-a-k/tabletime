let Timeblock = require('./Timeblock');

class Schedule {
  constructor(zone, blocks) {
    this.zone = zone;
    this.blocks = blocks;
    /*
    let overlaps = this.checkOverlap();
    this.collapseOverlap();
    */
  }

  checkOverlap() {
    let blocks = this.blocks;
    let overlaps = {};
    blocks.forEach((block, index) => {
      checkAgainst = blocks.slice(index + 1);
      checkAgainst.forEach((cablock, caindex) => {
        if (block.end() > cablock.start) {
          if (overlaps[index] === undefined) {
            overlaps[index] = [];
          }
          overlaps[index].push(caindex);
        }
        if (cablock.end() > block.start) {
          if (overlaps[caindex] === undefined) {
            overlaps[caindex] = [];
          }
          overlaps[caindex].push(index);
        }
      });
    });
  }

  collapseOverlap() {

  }

  prettyAvailability() {

  }

  standardizeZone() {

  }
}

module.exports = Schedule;
