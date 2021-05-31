import Player from "./player";

const WIDTH = 3;
const SELF_WEIGHT = 3;
const ENEMY_WEIGHT = 2;

export default class AI extends Player {
  getOptimalID(field) {
    return this._checkSequences(field);
  }

  _checkSequences(field) {
    let weight = 0;
    let maxWeight = weight;
    let identifiers = [];
    let turnId = -1;

    const size = field.length;

    for (let i = 0; i < size; i += WIDTH) {
      for (let j = i; j < i + size / WIDTH; j++) {
        ({turnId, weight} = this._incrementWeight(j, turnId, field[j], weight));
      }
      ({identifiers, turnId, weight, maxWeight} = this._settingId(identifiers, turnId, weight, maxWeight));
    }

    for (let i = 0; i < size / WIDTH; i++) {
      for (let j = i; j < size; j += WIDTH) {
        ({turnId, weight} = this._incrementWeight(j, turnId, field[j], weight));
      }
      ({identifiers, turnId, weight, maxWeight} = this._settingId(identifiers, turnId, weight, maxWeight));
    }

    for (let i = 0; i < size; i += (WIDTH + 1)) {
      ({turnId, weight} = this._incrementWeight(i, turnId, field[i], weight));
    }
    ({identifiers, turnId, weight, maxWeight} = this._settingId(identifiers, turnId, weight, maxWeight));

    for (let i = WIDTH - 1; i < size - (WIDTH - 1); i += (WIDTH - 1)) {
      ({turnId, weight} = this._incrementWeight(i, turnId, field[i], weight));
    }
    ({identifiers, turnId, weight, maxWeight} = this._settingId(identifiers, turnId, weight, maxWeight));

    return identifiers.length < 2
      ? identifiers[0]
      : identifiers[Math.round(0 - 0.5 + Math.random() * identifiers.length)];
  }

  _incrementWeight(id, turnId, data, weight) {
    if (data === this._factor) {
      weight += SELF_WEIGHT;
      if (weight % SELF_WEIGHT === 0 && weight > SELF_WEIGHT) {
        weight *= 2;
      }
    } else if (data === this._factor * -1) {
      weight += ENEMY_WEIGHT;
      if (weight % ENEMY_WEIGHT === 0 && weight > ENEMY_WEIGHT) {
        weight *= 2;
      }
    } else {
      turnId = id;
    }

    return {
      turnId,
      weight,
    };
  }

  _settingId(identifiers, turnId, weight, maxWeight) {
    if (weight > maxWeight && turnId >= 0) {
      identifiers = [];
      identifiers.push(turnId);
      maxWeight = weight;
    } else if (weight === maxWeight && turnId >= 0) {
      identifiers.push(turnId);
    }

    weight = 0;
    turnId = -1;

    return {
      identifiers,
      turnId,
      weight,
      maxWeight,
    };
  }
}
