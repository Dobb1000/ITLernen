import {
  AllSame,
  AnyBar,
  BARx1,
  BARx2,
  BARx3,
  Cherry,
  CherryOrSeven,
  LineFive,
  LineFour,
  LineOne,
  LineThree,
  LineTwo,
  Seven,
} from './constants.js';

export const payTable = Object.freeze({
  [BARx1]: { // 0.096
    [LineOne]: 9,  // 0.032
    [LineTwo]: 12, // 0.032
    [LineThree]: 18 // 0.032
  },
  [BARx2]: { // 0.096
    [LineOne]: 12, // 0.032
    [LineTwo]: 18, // 0.032
    [LineThree]: 27 // 0.032
  },
  [BARx3]: { // 0.096
    [LineOne]: 13, // 0.032
    [LineTwo]: 15, // 0.032
    [LineThree]: 20 // 0.032
  },
  [Seven]: { // 0.096
    [LineOne]: 20,  // 0.032
    [LineTwo]: 30,  // 0.032
    [LineThree]: 50  // 0.032
  },
  [Cherry]: { // 0.096
    [LineOne]: 80,  // 0.032
    [LineTwo]: 90,  // 0.032
    [LineThree]: 100  // 0.032
  },
  [CherryOrSeven]: { // 0.03072
    [LineOne]: 20,  // 0.0102
    [LineTwo]: 33, // 0.0102
    [LineThree]: 37 // 0.0102
  },
  [AnyBar]: { // 0.23328
    [LineOne]: 1,   // 0.0778
    [LineTwo]: 1,   // 0.0778
    [LineThree]: 3   // 0.0778
  },
});
