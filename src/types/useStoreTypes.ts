export type InitState = <T extends unknown>(
  /** the key you want to give the data or the key of the previously stored data. */ key: string,
  /** if the state is new to the store then this is the initial data. */ state: T
) => T;

export interface UseStoreReturnObject<T> {
  /** the current state. */ state: T;
  /** a function to change the current state. */ setState: (
    /**  the new state */ state: T
  ) => void;
}

export type UseStore = <T extends unknown>(
  /** a unique key to mark your state and be able to call it from the global store. */ key: string,
  /** the initial state for your stored data (use it when you initilaize your state for the first time). */ initialState: T
) => UseStoreReturnObject<T>;

export interface UseGlobalStoreReturnObject {
  /** an object that holds all the stored data in the application. */ store: Record<
    string,
    any
  >;
  /** a function to update a specific state someplace in the app. */ updateStoreData: (
    /** the key of the stored data you want to update. */ key: string,
    /** the new state. */ state: any
  ) => void;
}

export type UseGlobalStore = () => UseGlobalStoreReturnObject;

export type ACTION_TYPE = {
  /** the action to produce. */ type: "MUTATE_KEY";
  /** the key of the state stored. */ key: string;
  /** the new state. */ state: any;
};
