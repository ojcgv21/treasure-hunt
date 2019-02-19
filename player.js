import helper from "./helper";

export class Player {
  constructor(line, boardGame) {
    const [xP, yP] = helper.extractCoordinates(line, 2);
    if (xP >= boardGame.x || yP >= boardGame.y) {
      throw new Error("Players must be inside the board");
    }
    this.treasures = 0;
    this.name = line[1].toString();
    this.direction = helper.getType(line[4]);
    this.position = { x: xP, y: yP };
  }
  updateDirection(mov) {
    const rotations = {
      G: { N: "O", S: "E", E: "N", O: "S" },
      D: { N: "E", S: "O", E: "S", O: "N" }
    };
    this.direction = rotations[mov][this.direction];
  }
  nextPosition(boardGame) {
    const deltas = {
      x: { N: -1, S: 1, E: 0, O: 0 },
      y: { N: 0, S: 0, E: 1, O: -1 }
    };
    const nextX = this.position.x + deltas.x[this.direction];
    const nextY = this.position.y + deltas.y[this.direction];
    return ciimpPosition(boardGame, nextX, nextY);
  }
}

const ciimpPosition = (boardGame, nextX, nextY) => {
  let xx = nextX;
  let yy = nextY;
  if (nextX < 0) {
    xx = 0;
  } else if (nextX >= boardGame.x) {
    xx = boardGame.x - 1;
  }

  if (nextY < 0) {
    yy = 0;
  } else if (nextY >= boardGame.y) {
    yy = boardGame.y - 1;
  }
  return { x: xx, y: yy };
};
