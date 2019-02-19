const updateGame = that => {
  const currPlayer = that.players[that.currIdxPlayer];
  const nextPosition = currPlayer.nextPosition(that.boardGame);
  if (!isOtherPlayerAtNextPosition(that, nextPosition)) {
    const square = that.boardGame.board[nextPosition.x][nextPosition.y];
    if (square.name !== "M") {
      if (square.name === "T" && square.treasures > 0) {
        square.treasures--;
        currPlayer.treasures++;
      }
      currPlayer.position = nextPosition;
    }
  }
};

const isOtherPlayerAtNextPosition = (that, nextPosition) => {
  const currPlayer = that.players[that.currIdxPlayer];
  for (let i = 0; i < that.players.length; i++) {
    if (currPlayer.name !== that.players[i].name) {
      if (
        nextPosition.x === that.players[i].position.x &&
        nextPosition.y === that.players[i].position.y
      ) {
        return true;
      }
    }
  }
  return false;
};

const buildMovement = line => {
  return line[5]
    .toString()
    .split("")
    .reverse();
};

const extractMountainsAndTreasures = that => {
  let str = "";
  for (let i = 0; i < that.boardGame.x; i++) {
    for (let j = 0; j < that.boardGame.y; j++) {
      let boardCase = that.boardGame.board[i][j];
      if (boardCase.name === "M") {
        str += `${boardCase.name} - ${j} - ${i}\n`;
      } else if (boardCase.name === "T" && boardCase.treasures > 0) {
        str += `${boardCase.name} - ${j} - ${i} - ${boardCase.treasures}\n`;
      }
    }
  }
  return str;
};

const extractPlayers = that => {
  let str = "";
  that.players.forEach(p => {
    // eslint-disable-next-line prettier/prettier
      str += `A - ${p.name} - ${p.position.y} - ${p.position.x} - ${p.direction} - ${p.treasures}`;
  });
  return str;
};

module.exports = {
  updateGame,
  buildMovement,
  extractMountainsAndTreasures,
  extractPlayers
};
