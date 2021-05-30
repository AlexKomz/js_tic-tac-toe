import Card from "./card.js";


export default class View {
  constructor(main) {
    this._main = main;
    this._tittle = this._main.querySelector(`.game-area_tittle`);
    this._canvas = this._main.querySelector(`.game-area_canvas`);
    this._resetButton = this._main.querySelector(`.game-area_reset-button`);
    this._gameScoreContainer = this._main.querySelector(`.game-area_score`);
    this._gameScoreX = this._gameScoreContainer.querySelector(`.game-area_x-score`);
    this._gameScoreO = this._gameScoreContainer.querySelector(`.game-area_o-score`);
    this._cards = [];
  }

  hideTittle() {
    this._tittle.style.animationName = `hide`;
  }

  showTittle() {
    this._tittle.style.animationName = `show`;
  }

  hideGameScore() {
    this._gameScoreContainer.style.animationName = `hide`;
    this._gameScoreContainer.style.animationDuration = `1s`;
  }

  showGameScore() {
    this._gameScoreContainer.style.animationName = `show`;
    this._gameScoreContainer.style.animationDuration = `1s`;
  }

  setResetButtonClickHandler(handler) {
    this._resetButton.addEventListener(`click`, handler);
  }

  removeResetButtonClickHandler(handler) {
    this._resetButton.removeEventListener(`click`, handler);
  }

  setCardClickHandler(id, handler) {
    this._cards[id].setClickHandler(handler);
  }

  // removeCardClickHandler(id, handler) {
  //   this._cards[id].removeClickHandler(handler);
  // }

  setClickHandler(handler) {
    this._cards.forEach((it) => it.setClickHandler(handler));
  }

  removeClickHandler(handler) {
    this._cards.forEach((it) => it.removeClickHandler(handler));
  }

  removeClickHandlers() {
    this._cards.forEach((it) => it.removeClickHandlers());
  }

  setGameClickHandler(handler) {
    this._cards.forEach((it) => it.setGameClickHandler(handler));
  }

  render(data) {
    this._gameScoreX.innerText = data.xScore;
    this._gameScoreO.innerText = data.oScore;

    data.field.forEach((_, i) => {
      const card = new Card(i);
      this._cards.push(card);
      this._canvas.append(card.getElement());
    });
  }

  update(data) {
    this._gameScoreX.innerText = data.xScore;
    this._gameScoreO.innerText = data.oScore;

    this._cards.forEach((it, i) => it.update(data.field[i]));
  }

  setFlipCards(...indexes) {
    indexes.forEach((it) => {
      this._cards[it].isFlipped = true;
    });
  }

  setHitCards(...indexes) {
    indexes.forEach((it) => {
      this._cards[it].isHit = true;
    });
  }

  setMessage(id, message) {
    this._cards[id].message = message;
  }

  clearField() {
    this._cards.forEach((it) => {
      it.isHit = false;
      it.isFlipped = false;
      it.message = ``;
    });
  }

  // refresh(data) {
  //   this._canvas.innerHTML = ``;
  //   this._cards = [];
  //   this.render(data);
  // }
}
