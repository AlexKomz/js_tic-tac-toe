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
    array[id] = Object.assign(array[id], value);
  }

  incrementXScore() {
    this._data.xScore++;
  }

  incrementOScore() {
    this._data.oScore++;
  }

  hasSequence() {
    const size = this._data.field.length;

    for (let i = 0; i < size; i += 3) {
      const indexes = [i, i + 1, i + 2];
      const sum = this._sum(indexes);

      if (Math.abs(sum) === 3) {
        this._hitSequence(indexes);
        return true;
      }
    }

    for (let i = 0; i < size / 3; i++) {
      const indexes = [i, i + 3, i + 3 * 2];
      const sum = this._sum(indexes);

      if (Math.abs(sum) === 3) {
        this._hitSequence(indexes);
        return true;
      }
    }

    let indexes = [0, 4, 4 * 2];
    let sum = this._sum(indexes);

    if (Math.abs(sum) === 3) {
      this._hitSequence(indexes);
      return true;
    }

    indexes = [2, 2 * 2, 2 * 3];
    sum = this._sum(indexes);

    if (Math.abs(sum) === 3) {
      this._hitSequence(indexes);
      return true;
    }

    return false;
  }

  isFullData() {
    const array = this._data.field.slice();
    const size = this._data.field.length;

    return array.reduce((acc, it) => {
      const num = Math.abs(it.imageCode);
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
    return Array.from({length: 9})
      .map((_, i) => {
        return {
          id: i,
          imageCode: 0,
          isFlipped: false,
          isHit: false,
          custom: ``,
        };
      });
  }

  _sum(indexes) {
    const array = this._data.field.slice();
    return indexes.reduce((acc, it) => acc + array[it].imageCode, 0);
  }

  _hitSequence(indexes) {
    const array = this._data.field;
    indexes.forEach((it) => {
      array[it].isHit = true;
    });
  }
}
