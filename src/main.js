import Game from "./game.js";
import Model from "./model.js";
import View from "./view.js";


class Application {
  static main() {
    const model = new Model();
    const view = new View(document.querySelector(`.game-area`));

    const game = new Game(view, model);
    game.init();
  }
}

Application.main();
