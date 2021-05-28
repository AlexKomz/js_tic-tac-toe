export default class Model {
  constructor() {
    this._data = this._getDefaultObject();
  }

  get data() {
    return this._data;
  }

  setData(id, value) {
    this._data[id] = Object.assign(this.data[id], value);
  }

  clear() {
    this._data = this._getDefaultObject();
  }

  _getDefaultObject() {
    return Array.from({length: 9}).reduce((acc, _, i) => {
      acc[i] = {
        id: i,
        imageCode: 0,
        isFlipped: false,
        isHit: false,
        custom: ``,
      };

      return acc;
    }, {});
  }
}
