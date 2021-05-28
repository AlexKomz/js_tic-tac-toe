export default class Game {
  constructor(view, model) {
    if (typeof Game._instance === `object`) {
      return Game._instance;
    }

    this._view = view;
    this._model = model;

    this._startClickHandler = this._startClickHandler.bind(this);
    this._resetClickHandler = this._resetClickHandler.bind(this);

    Game._instance = this;
    return this;
  }

  init() {
    this._view.render(this._model.data);
    this._setStartScreen();
    this._view.setResetButtonClickHandler(this._resetClickHandler);
    this._view.update(this._model.data);
  }

  _start() {
    this._clear();
    this._view.hideTittle();
  }

  _setStartScreen() {
    this._model.setData(0, {
      isFlipped: true,
      imageCode: -1
    });
    this._model.setData(8, {
      isFlipped: true,
      imageCode: 1
    });
    this._model.setData(4, {
      isFlipped: true,
      imageCode: 2,
      custom: `Start the game!`
    });

    this._view.showTittle();
    this._view.setCardClickHandler(4, this._startClickHandler);
  }

  _clear() {
    this._model.clear();
    this._view.update(this._model.data);
  }

  _startClickHandler() {
    this._start();
    this._view.removeClickHandler(4, this._startClickHandler);
  }

  _resetClickHandler() {
    this._clear();
    this._setStartScreen();
    this._view.showTittle();
  }
}
