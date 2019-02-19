import { extractCoordinates } from "./helper";

export class BoardGame {
  constructor(line) {
    const [x, y] = extractCoordinates(line, 1);
    // this.board = new Array(x).fill(new Array(y).fill(0));
    this.board = new Array();
    for (let i = 0; i < x; i++) {
      this.board[i] = new Array(y).fill(0);
    }
    this.x = x;
    this.y = y;
  }
}
