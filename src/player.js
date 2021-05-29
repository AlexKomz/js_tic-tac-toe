export default class Player {
  constructor(callback) {
    this._callback = callback;
  }

  getTurn(id) {
    this._callback(id);
  }
}
