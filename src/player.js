export default class Player {
  constructor(factor, callback) {
    this._factor = factor;
    this._callback = callback;
  }

  get factor() {
    return this._factor;
  }

  getTurn(id) {
    this._callback(id, this._factor);
  }
}
