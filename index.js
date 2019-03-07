import fs from "fs";
import { Game } from "./game";

const initial_game = fs.readFileSync("initial_game.txt", "utf8");
const lines = initial_game.split("\n").map(e => e.split(" - "));

const game = new Game(lines[0]);

lines.forEach((line, index) => {
  if (index >= 1) {
    game.insertPiece(line);
  }
});

while (game.itRemainsMoves()) {
  game.move();
}

/* eslint-disable no-console */
fs.writeFile("end_game.txt", game.extractStateGame(), err => {
  if (err) {
    console.log("error");
  } else {
    console.log("success");
  }
});
/* eslint-enable no-console */
