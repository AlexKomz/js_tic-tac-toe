import Player from "./player";

export default class AI extends Player {
  getOptimalID(data) {
    const freeIndexes = data.reduce((acc, it, i) => {
      if (!it) {
        acc.push(i);
      }

      return acc;
    }, []);

    const randomNumber = Math.round(0 - 0.5 + Math.random() * freeIndexes.length);

    return freeIndexes[randomNumber];
  }
}
