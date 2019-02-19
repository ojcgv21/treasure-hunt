import helper from "./helper";

export class Square {
  constructor(line, boardGame) {
    const [xM, yM] = helper.extractCoordinates(line, 1);
    if (xM >= boardGame.x || yM >= boardGame.y) {
      throw new Error("This should be inside the board");
    }
    this.treasures = helper.getType(line) === "M" ? 0 : parseInt(line[3], 10);
    this.name = helper.getType(line);
  }
}
