import { Game } from "./game";
const t = line => line.split(" - ");
describe("Initialization Game", () => {
  it("First line is for board dimensions", () => {
    const game = new Game(t("C - 15 - 20"));
    expect([game.boardGame.x, game.boardGame.y]).toEqual([20, 15]);
  });

  it("Insert mountain at right place", () => {
    const game = new Game(t("C - 15 - 20"));
    game.insertPiece(t("M - 4 - 5"));
    expect(game.boardGame.board[5][4]).toEqual({
      name: "M",
      treasures: 0
    });
  });

  it("Insert treasures at right place", () => {
    const game = new Game(t("C - 15 - 20"));
    game.insertPiece(t("T - 4 - 5 - 8"));
    expect(game.boardGame.board[5][4]).toEqual({
      name: "T",
      treasures: 8
    });
  });

  it("Player is well initialized after inserted", () => {
    const game = new Game(t("C - 15 - 20"));
    game.insertPiece(t("A - Oscar - 4 - 5 - S - AAAGD"));
    expect(game.players[0]).toEqual({
      name: "Oscar",
      treasures: 0,
      position: { x: 5, y: 4 },
      direction: "S"
    });
  });

  it("Player's movements are well initialized after inserted", () => {
    const game = new Game(t("C - 15 - 20"));
    game.insertPiece(t("A - Oscar - 4 - 5 - S - AAAGD"));
    expect(game.movements["Oscar"]).toEqual(["D", "G", "A", "A", "A"]);
  });
});

describe("Players' movements", () => {
  it("Player moves to north", () => {
    const game = new Game(t("C - 15 - 20"));
    game.insertPiece(t("A - Oscar - 4 - 5 - N - A"));
    game.move();
    expect(game.players[0].position).toEqual({ x: 4, y: 4 });
  });

  it("Player moves to south", () => {
    const game = new Game(t("C - 15 - 20"));
    game.insertPiece(t("A - Oscar - 4 - 5 - S - A"));
    game.move();
    expect(game.players[0].position).toEqual({ x: 6, y: 4 });
  });

  it("Player moves to west", () => {
    const game = new Game(t("C - 15 - 20"));
    game.insertPiece(t("A - Oscar - 4 - 5 - O - A"));
    game.move();
    expect(game.players[0].position).toEqual({ x: 5, y: 3 });
  });

  it("Player moves to east", () => {
    const game = new Game(t("C - 15 - 20"));
    game.insertPiece(t("A - Oscar - 4 - 5 - E - A"));
    game.move();
    expect(game.players[0].position).toEqual({ x: 5, y: 5 });
  });
});

describe("Player turns left", () => {
  it("From north", () => {
    const game = new Game(t("C - 15 - 20"));
    game.insertPiece(t("A - Oscar - 4 - 5 - N - G"));
    game.move();
    expect(game.players[0].direction).toEqual("O");
  });

  it("From south", () => {
    const game = new Game(t("C - 15 - 20"));
    game.insertPiece(t("A - Oscar - 4 - 5 - S - G"));
    game.move();
    expect(game.players[0].direction).toEqual("E");
  });

  it("From west", () => {
    const game = new Game(t("C - 15 - 20"));
    game.insertPiece(t("A - Oscar - 4 - 5 - O - G"));
    game.move();
    expect(game.players[0].direction).toEqual("S");
  });

  it("From east", () => {
    const game = new Game(t("C - 15 - 20"));
    game.insertPiece(t("A - Oscar - 4 - 5 - E - G"));
    game.move();
    expect(game.players[0].direction).toEqual("N");
  });
});

describe("Player turns right", () => {
  it("From north", () => {
    const game = new Game(t("C - 15 - 20"));
    game.insertPiece(t("A - Oscar - 4 - 5 - N - D"));
    game.move();
    expect(game.players[0].direction).toEqual("E");
  });

  it("From south", () => {
    const game = new Game(t("C - 15 - 20"));
    game.insertPiece(t("A - Oscar - 4 - 5 - S - D"));
    game.move();
    expect(game.players[0].direction).toEqual("O");
  });

  it("From west", () => {
    const game = new Game(t("C - 15 - 20"));
    game.insertPiece(t("A - Oscar - 4 - 5 - O - D"));
    game.move();
    expect(game.players[0].direction).toEqual("N");
  });

  it("From east", () => {
    const game = new Game(t("C - 15 - 20"));
    game.insertPiece(t("A - Oscar - 4 - 5 - E - D"));
    game.move();
    expect(game.players[0].direction).toEqual("S");
  });
});

describe("Players can't go outside the board", () => {
  it("North limit", () => {
    const game = new Game(t("C - 15 - 20"));
    game.insertPiece(t("A - Oscar - 4 - 0 - N - A"));
    game.move();
    expect(game.players[0].position).toEqual({ x: 0, y: 4 });
  });

  it("South limit", () => {
    const game = new Game(t("C - 15 - 20"));
    game.insertPiece(t("A - Oscar - 4 - 19 - S - A"));
    game.move();
    expect(game.players[0].position).toEqual({ x: 19, y: 4 });
  });

  it("West limit", () => {
    const game = new Game(t("C - 15 - 20"));
    game.insertPiece(t("A - Oscar - 0 - 5 - O - A"));
    game.move();
    expect(game.players[0].position).toEqual({ x: 5, y: 0 });
  });

  it("East limit", () => {
    const game = new Game(t("C - 15 - 20"));
    game.insertPiece(t("A - Oscar - 14 - 5 - E - A"));
    game.move();
    expect(game.players[0].position).toEqual({ x: 5, y: 14 });
  });
});

describe("Mountains block players movements", () => {
  it("Blocking from north", () => {
    const game = new Game(t("C - 15 - 20"));
    game.insertPiece(t("M - 4 - 5"));
    game.insertPiece(t("A - Oscar - 4 - 6 - N - A"));
    game.move();
    expect(game.players[0].position).toEqual({ x: 6, y: 4 });
  });

  it("Blocking from south", () => {
    const game = new Game(t("C - 15 - 20"));
    game.insertPiece(t("M - 4 - 5"));
    game.insertPiece(t("A - Oscar - 4 - 4 - S - A"));
    game.move();
    expect(game.players[0].position).toEqual({ x: 4, y: 4 });
  });

  it("Blocking from west", () => {
    const game = new Game(t("C - 15 - 20"));
    game.insertPiece(t("M - 4 - 5"));
    game.insertPiece(t("A - Oscar - 5 - 5 - O - A"));
    game.move();
    expect(game.players[0].position).toEqual({ x: 5, y: 5 });
  });

  it("Blocking from east", () => {
    const game = new Game(t("C - 15 - 20"));
    game.insertPiece(t("M - 4 - 5"));
    game.insertPiece(t("A - Oscar - 3 - 5 - E - A"));
    game.move();
    expect(game.players[0].position).toEqual({ x: 5, y: 3 });
  });
});

describe("Player picks treasure(s)", () => {
  it("One treasure", () => {
    const game = new Game(t("C - 15 - 20"));
    game.insertPiece(t("T - 4 - 5 - 8"));
    game.insertPiece(t("A - Oscar - 4 - 6 - N - A"));
    game.move();
    expect([
      game.players[0].treasures,
      game.boardGame.board[5][4].treasures
    ]).toEqual([1, 7]);
  });

  it("Two treasures", () => {
    const game = new Game(t("C - 15 - 20"));
    game.insertPiece(t("T - 4 - 5 - 8"));
    game.insertPiece(t("A - Oscar - 4 - 6 - N - AAGGA"));
    while (game.itRemainsMoves()) {
      game.move();
    }
    expect([
      game.players[0].treasures,
      game.boardGame.board[5][4].treasures
    ]).toEqual([2, 6]);
  });
});

describe("Two players", () => {
  it("Player one blocks movement of Player two", () => {
    const game = new Game(t("C - 15 - 20"));
    game.insertPiece(t("T - 4 - 5 - 8"));
    game.insertPiece(t("A - Oscar - 4 - 6 - N - DDGG"));
    game.insertPiece(t("A - Juan - 4 - 7 - N - AAAA"));
    while (game.itRemainsMoves()) {
      game.move();
    }
    expect(game.players[1].position).toEqual({ x: 7, y: 4 });
  });
});
