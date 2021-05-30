const FLIPPED = `flip-card__flipped`;
const UNFLIPPED = `flip-card__unflipped`;
const HIT = `flip-card__hit`;

const cardBackImage = {
  '-1': `flip-card_back__cross`,
  '1': `flip-card_back__circle`,
  '2': `flip-card_back__play`,
};

export default class Card {
  constructor(id) {
    this._id = id;
    this._isFlipped = false;
    this._isHit = false;
    this._message = ``;
    this._card = this._createElement(this._template);
    this._cardInner = this._card.querySelector(`.flip-card_inner`);
    this._cardBack = this._card.querySelector(`.flip-card_back`);

    this._clickHandlers = [];

    this._cardInner.classList.add(UNFLIPPED);
  }

  set isFlipped(value) {
    this._isFlipped = value;
  }

  set isHit(value) {
    this._isHit = value;
  }

  set message(value) {
    this._message = value;
  }

  setGameClickHandler(handler) {
    const gameHandler = () => {
      this._isFlipped = true;
      handler(this._id);
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
    this._cardBack.className = `flip-card_back`;

    if (this._isFlipped) {
      const cardBackData = cardBackImage[data];

      if (cardBackData) {
        this._cardBack.classList.add(cardBackData);
      } else {
        this._cardBack.innerHTML = this._message;
      }

      this._cardInner.classList.remove(UNFLIPPED);
      this._cardInner.classList.add(FLIPPED);
    } else {
      this._cardInner.classList.remove(FLIPPED);
      this._cardInner.classList.add(UNFLIPPED);
    }

    if (this._isHit) {
      this._cardBack.classList.toggle(HIT);
    }
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
