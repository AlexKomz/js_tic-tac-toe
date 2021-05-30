const WIDTH = 3;

export default class Model {
  constructor() {
    this._data = {
      field: this._getDefaultField(),
      xScore: 0,
      oScore: 0,
    };
  }

  get data() {
    return this._data;
  }

  setData(id, value) {
    const array = this._data.field;
    array[id] = value;
  }

  incrementXScore() {
    this._data.xScore++;
  }

  incrementOScore() {
    this._data.oScore++;
  }

  hasSequence() {
    const size = this._data.field.length;

    for (let i = 0; i < size; i += WIDTH) {
      const indexes = [];
      for (let j = i; j < i + size / WIDTH; j++) {
        indexes.push(j);
      }
      const sum = this._sum(indexes);

      if (Math.abs(sum) === WIDTH) {
        return indexes;
      }
    }

    for (let i = 0; i < size / WIDTH; i++) {
      const indexes = [];
      for (let j = i; j < size; j += WIDTH) {
        indexes.push(j);
      }
      const sum = this._sum(indexes);

      if (Math.abs(sum) === WIDTH) {
        return indexes;
      }
    }

    let indexes = [];
    for (let i = 0; i < size; i += (WIDTH + 1)) {
      indexes.push(i);
    }
    let sum = this._sum(indexes);

    if (Math.abs(sum) === WIDTH) {
      return indexes;
    }

    indexes = [];
    for (let i = WIDTH - 1, j = 1; i < size; i += (WIDTH - 1) * j, j++) {
      indexes.push(i);
    }
    sum = this._sum(indexes);

    if (Math.abs(sum) === WIDTH) {
      return indexes;
    }

    return false;
  }

  isFullData() {
    const array = this._data.field.slice();
    const size = this._data.field.length;

    return array.reduce((acc, it) => {
      const num = Math.abs(it);
      acc += num;
      return acc;
    }, 0) === size;
  }

  clearField() {
    this._data.field = this._getDefaultField();
  }

  clearScore() {
    this._data.xScore = 0;
    this._data.oScore = 0;
  }

  _getDefaultField() {
    return new Array(9).fill(0);
  }

  _sum(indexes) {
    const array = this._data.field.slice();
    return indexes.reduce((acc, it) => acc + array[it], 0);
  }
}
