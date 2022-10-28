class StoreMap extends Map {
  onSetGlobal: (key: string, state: any) => void;
  onSet: (key: string, state: any) => void;
  constructor() {
    super();
    this.onSet = function () {};
    this.onSetGlobal = function () {};
  }
}

export const GlobalStore = new StoreMap();
