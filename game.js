import { Player } from "./player";
import { Square } from "./square";
import { BoardGame } from "./boardgame";
import helper from "./helper";
import gameHelper from "./gamehelper";

export class Game {
  constructor(line) {
    this.movements = {};
    this.players = [];
    this.boardGame = new BoardGame(line);
    this.currIdxPlayer = 0;
  }

  itRemainsMoves() {
    return Object.keys(this.movements).length > 0;
  }

  move() {
    if (this.itRemainsMoves()) {
      const currPlayer = this.players[this.currIdxPlayer];
      const mov = this.movements[currPlayer.name].pop();
      switch (mov) {
        case "A":
          gameHelper.updateGame(this);
          break;
        case "G":
        case "D":
          currPlayer.updateDirection(mov);
          break;
        default:
          throw new Error("Moves should be A, G or D");
      }
      if (this.movements[currPlayer.name].length === 0) {
        delete this.movements[currPlayer.name];
      }
      this.currIdxPlayer = (this.currIdxPlayer + 1) % this.players.length;
      return true;
    }
    return false;
  }

  extractStateGame() {
    let str = "";
    str += `C - ${this.boardGame.y} - ${this.boardGame.x}\n`;
    str += gameHelper.extractMountainsAndTreasures(this);
    str += gameHelper.extractPlayers(this);
    return str;
  }

  insertPiece(line) {
    let xx, yy;
    switch (helper.getType(line)) {
      case "M":
      case "T":
        [xx, yy] = helper.extractCoordinates(line, 1);
        this.boardGame.board[xx][yy] = new Square(line, this.boardGame);
        break;
      case "A":
        this.players.push(new Player(line, this.boardGame));
        this.movements[line[1]] = gameHelper.buildMovement(line);
        break;
      default:
        throw new Error("Type Piece must be M, T or A");
    }
  }
}
