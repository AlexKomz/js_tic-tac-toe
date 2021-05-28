export default class Game {
  constructor(view, model) {
    if (typeof Game._instance === `object`) {
      return Game._instance;
    }

    this._view = view;
    this._model = model;

    this._startClickHandler = this._startClickHandler.bind(this);
    this._resetClickHandler = this._resetClickHandler.bind(this);
    this._cardClickHandler = this._cardClickHandler.bind(this);

    Game._instance = this;
    return this;
  }

  init() {
    this._view.render(this._model.data);
    this._setStartScreen();
    this._view.update(this._model.data);
    this._view.setResetButtonClickHandler(this._resetClickHandler);
  }

  _start() {
    this._clear();
    this._view.hideTittle();
    this._view.removeCardClickHandler(4, this._startClickHandler);
    this._view.setGameClickHandler(this._cardClickHandler);
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
  }

  _resetClickHandler() {
    this._clear();
    this._view.removeClickHandlers();
    this._setStartScreen();
    this._view.update(this._model.data);
    this._view.showTittle();
  }

  _cardClickHandler(id) {
    this._model.setData(id, {
      isFlipped: true,
      imageCode: -1,
    });
    this._view.update(this._model.data);
  }
}
