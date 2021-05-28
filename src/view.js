import Card from "./card.js";


export default class View {
  constructor(main) {
    this._main = main;
    this._tittle = this._main.querySelector(`.game-area_tittle`);
    this._canvas = this._main.querySelector(`.game-area_canvas`);
    this._resetButton = this._main.querySelector(`.game-area_reset-button`);
    this._cards = [];
  }

  hideTittle() {
    this._tittle.style.animationName = `hide`;
  }

  showTittle() {
    this._tittle.style.animationName = `show`;
  }

  setResetButtonClickHandler(handler) {
    this._resetButton.addEventListener(`click`, handler);
  }

  setCardClickHandler(id, handler) {
    this._cards[id].setClickHandler(handler);
  }

  removeCardClickHandler(id, handler) {
    this._cards[id].removeClickHandler(handler);
  }

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
    Object.values(data).forEach((it) => {
      const card = new Card(it);
      this._cards.push(card);
      this._canvas.append(card.getElement());
    });
  }

  update(data) {
    this._cards.forEach((it, i) => it.update(data[i]));
  }

  // refresh(data) {
  //   this._canvas.innerHTML = ``;
  //   this._cards = [];
  //   this.render(data);
  // }
}
