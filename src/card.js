const FLIPPED = `flip-card__flipped`;
const UNFLIPPED = `flip-card__unflipped`;
const HIT = `flip-card__hit`;

const cardBackImage = {
  '-1': `flip-card_back__cross`,
  '1': `flip-card_back__circle`,
  '2': `flip-card_back__play`,
};

export default class Card {
  constructor(data) {
    this._data = Object.assign({}, data);
    this._card = this._createElement(this._template);
    this._cardInner = this._card.querySelector(`.flip-card_inner`);
    this._cardBack = this._card.querySelector(`.flip-card_back`);

    this._clickHandlers = [];

    if (data.isFlipped) {
      this._cardInner.classList.add(FLIPPED);

      const cardBackData = cardBackImage[data.imageCode];
      if (cardBackData) {
        this._cardBack.classList.add(cardBackData);
      } else {
        this._cardBack.innerHTML = data.custom;
      }

      if (data.isHit) {
        this._cardBack.classList.add(HIT);
      }
    } else {
      this._cardInner.classList.add(UNFLIPPED);
    }
  }

  setGameClickHandler(handler) {
    const gameHandler = () => {
      handler(this._data.id);
    };

    this.setClickHandler(gameHandler);
  }

  setClickHandler(handler) {
    this._clickHandlers.push(handler);
    this._card.addEventListener(`click`, handler);
  }

  removeClickHandler(handler) {
    this._card.removeEventListener(`click`, handler);
  }

  removeClickHandlers() {
    this._clickHandlers.forEach((it) => {
      this._card.removeEventListener(`click`, it);
    });
  }

  update(data) {
    if (this._data.isFlipped !== data.isFlipped) {
      const cardBackData = cardBackImage[data.imageCode];

      if (cardBackData) {
        this._cardBack.className = `flip-card_back`;
        this._cardBack.classList.add(cardBackData);
      } else {
        this._cardBack.innerHTML = data.custom;
      }

      this._cardInner.classList.toggle(FLIPPED);
      this._cardInner.classList.toggle(UNFLIPPED);
    }

    if (this._data.isHit !== data.isHit) {
      this._cardBack.classList.toggle(HIT);
    }

    this._data = Object.assign({}, data);
  }

  getElement() {
    return this._card;
  }

  get _template() {
    return (
      `<div class="flip-card">
        <div class="flip-card_inner">
          <div class="flip-card_front"></div>
          <div class="flip-card_back"></div>
        </div>
      </div>`
    );
  }

  _createElement(template) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template || `<div></div>`;

    return newElement.firstChild;
  }
}
