import Player from "./player.js";
import AI from "./AI";


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
    this._firstPlayerClickHandler = this._firstPlayerClickHandler.bind(this);
    this._secondPlayerClickHandler = this._secondPlayerClickHandler.bind(this);

    this._players = {
      first: new Player(this._firstPlayerClickHandler),
      second: new AI(this._secondPlayerClickHandler),
    };

    this._currentPlayer = null;

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
    this._clearField();
    this._view.hideTittle();
    this._view.showGameScore();
    this._view.removeClickHandlers();
    this._currentPlayer = this._players.first;
    this._view.setGameClickHandler(this._cardClickHandler);
  }

  _setMenuScreen(codes, message) {
    this._model.setData(0, codes[0]);
    this._model.setData(8, codes[1]);
    this._model.setData(4, codes[2]);
    this._view.setFlipCards(0, 4, 8);
    this._view.setMessage(4, message);
  }

  _setStartScreen() {
    this._setMenuScreen([-1, 1, 2], `Start the game!`);

    this._view.showTittle();
    this._view.hideGameScore();
    this._view.setCardClickHandler(4, this._startClickHandler);
  }

  _setWinScreen() {
    const winner = this._currentPlayer === this._players.first ? -1 : 1;

    if (winner < 0) {
      this._model.incrementXScore();
    } else {
      this._model.incrementOScore();
    }

    this._setMenuScreen([winner, winner, 3], `'${winner < 0 ? `X` : `O`}' player win the game!`);
  }

  _setDrawScreen() {
    this._setMenuScreen([-1, 1, 3], `Draw!`);
  }

  _clearField() {
    this._model.clearField();
    this._view.clearField();
    this._view.update(this._model.data);
  }

  _clearScore() {
    this._model.clearScore();
    this._view.update(this._model.data);
  }

  _startClickHandler() {
    this._start();
  }

  _resetClickHandler() {
    this._clearField();
    this._clearScore();
    this._view.removeClickHandlers();
    this._setStartScreen();
    this._view.update(this._model.data);
    this._view.showTittle();
  }

  _blockInput() {
    this._view.removeResetButtonClickHandler(this._resetClickHandler);
    this._view.removeClickHandlers();
  }

  _unblockInput() {
    this._view.setResetButtonClickHandler(this._resetClickHandler);
    this._view.setClickHandler(this._startClickHandler);
  }

  _cardClickHandler(id) {
    this._currentPlayer.getTurn(id);

    const indexes = this._model.hasSequence();
    if (indexes) {
      this._view.setHitCards(...indexes);
      this._view.update(this._model.data);
      this._blockInput();

      setTimeout(() => {
        this._clearField();
        this._setWinScreen();
        this._unblockInput();
        this._view.update(this._model.data);
      }, 1500);
    } else if (this._model.isFullData()) {
      this._view.update(this._model.data);
      this._blockInput();

      setTimeout(() => {
        this._clearField();
        this._setDrawScreen();
        this._unblockInput();
        this._view.update(this._model.data);
      }, 1500);
    } else {
      this._currentPlayer = this._currentPlayer === this._players.first ?
        this._players.second : this._players.first;

      if (this._currentPlayer instanceof AI) {
        this._blockInput();

        setTimeout(() => {
          const optimalId = this._currentPlayer.getOptimalID(this._model.data.field);
          this._cardClickHandler(optimalId);

          this._unblockInput();
          this._view.update(this._model.data);
        }, 1500);
      }

      this._view.update(this._model.data);
    }
  }

  _firstPlayerClickHandler(id) {
    this._model.setData(id, -1);
    this._view.setFlipCards(id);
  }

  _secondPlayerClickHandler(id) {
    this._model.setData(id, 1);
    this._view.setFlipCards(id);
  }
}
