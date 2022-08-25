class StoreMap extends Map {
  constructor() {
    super();
    this.onSet = function () {};
    this.onSetGlobal = function () {};
  }
}

export const GlobalStore = new StoreMap();
