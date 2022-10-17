export type Selector = number | string;

export type DeepCopy = (obj: Array<any> | Object) => Array<any> | Object;

export type IsValidIndex = (num: any) => boolean;

type StringGetter = () => string;

export type InitialValueMapper = (
  initialValue: Array<any>,
  uuidGetter: StringGetter | Array<string>
) => Array<any>;

export type MoveItem = (
  /**
   * The current selector.
   */
  currentSelector: Selector,
  /**
   * The new location's selector.
   */
  newSelector: Selector
) => void;

export type AddItem = (
  /**
   * the item to add.
   */
  item: any,
  /**
   * the selector of the destination want to add the item to.
   */
  atSelector?: Selector
) => void;

export type AddItems = (
  /**
   * the items to add.
   */
  items: Array<any>,
  /**
   * the selector of the destination want to add the items to.
   */
  atSelector?: Selector
) => void;

type MapCallbackFunction = (item: any, index: number, array: Array<any>) => any;

export type Map = (
  /** The map callback function */ cb: MapCallbackFunction
) => void;

export type GetUUID = (/** The index of the uuid. */ index: number) => string;

export type GetItem = (
  /** The selector of the item. */ selector: Selector
) => any;

export type RemoveItem = (
  /** The selector of the item. */ selector: Selector
) => void;

export type RemoveItems = (
  /** The selector of the items. */ selector: Array<Selector>
) => void;

export type GetSlice = (
  /** The start selector. */ fromSelector: Selector,
  /** The end selector. */ toSelector: Selector
) => Array<any>;

export type ShuffleMainList = () => Array<any>;

export type GetShuffledList = () => Array<any>;

export type ResetList = () => void;

export type Reverse = () => void;

export type Swap = (
  /** The first selector */ firstSelector: Selector,
  /** The second selector */ secondSelector: Selector
) => void;

export interface UseDynamicListReturnObject {
  /**
   * The list.
   */
  list: Array<any>;
  /**
   * a function to move items in list.
   */
  moveItem: MoveItem;
  /**
   * a function to add item to the list (optional atSelector param to add the item at specific place in the list).
   */
  addItem: AddItem;
  /**
   * a function to add items to the list (optional atSelector param to add the item at specific place in the list).
   */
  addItems: AddItems;
  /**
   * a function to map the list (works as native [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)).
   */
  map: Map;
  /**
   * Gets the uuid of specific index.
   */
  getUUID: GetUUID;
  /**
   * Gets an item from the list.
   */
  getItem: GetItem;
  /**
   * Removes item from the list.
   */
  removeItem: RemoveItem;
  /**
   * Removes items from the list.
   */
  removeItems: RemoveItems;
  /**
   * Gets slice of the list.
   */
  getSlice: GetSlice;
  /**
   * Shuffles the original list and returns it.
   */
  shuffleMainList: ShuffleMainList;
  /**
   * Shuffles a copy of the list and returns it.
   */
  getShuffledList: GetShuffledList;
  /**
   * Resets the list to the current initial value.
   */
  resetList: ResetList;
  /**
   * Reverses the original list.
   */
  reverse: Reverse;
  /**
   * Swap two item places in the list.
   */
  swap: Swap;
}

export type UseDynamicList = (
  /** The initial value of the list */ initialValue: Array<any>,
  /** Determins if the list elements will have a uuid */ withUUID?: boolean
) => UseDynamicListReturnObject;
