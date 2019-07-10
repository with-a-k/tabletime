let Timeblock = require('./Timeblock');
let support = require('./supportfunctions');

class Schedule {
  constructor(zone, blocks) {
    this.zone = zone;
    this.blocks = blocks;
    this.overlaps = this.checkOverlap();
    this.blocks = this.collapseOverlap();
  }

  checkOverlap() {
    let blocks = this.blocks;
    let days = support.groupBy(blocks, 'day');
    let overlaps = {};
    Object.keys(days).forEach((day, dindex) => {
      days[day].forEach((block, index) => {
        let checkAgainst = days[day].slice(index + 1);
        checkAgainst.forEach((cablock, caindex) => {
          if (block.end() > cablock.start) {
            if (overlaps[block.tag] === undefined) {
              overlaps[block.tag] = [];
            }
            overlaps[block.tag].push(cablock);
          }
        });
      });
    });
    return overlaps;
  }

  collapseOverlap() {
    let blocks = this.blocks;
    let newBlocks = [];
    let starts = Object.keys(this.overlaps);
    let finishes = support.flatArray(Object.values(this.overlaps));
    let block;
    while(blocks.length > 0) {
      block = blocks.pop();
      if (finishes.find((finish) => {return finish.tag === block.tag})) {
        continue;
      } else if (starts.find((start) => {return start === block.tag})) {
        newBlocks.push(new Timeblock(block.day, block.start, this.overlaps[block.tag][0].end() - block.start));
      } else {
        newBlocks.push(block);
      }
    }
    return newBlocks;
  }

  prettyAvailability() {

  }

  standardizeZone() {

  }
}

module.exports = Schedule;
