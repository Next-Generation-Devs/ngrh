export interface LifecycleDefaultOptions {
  didMount: VoidFunction;
  didUpdate: VoidFunction;
  willUnmount: VoidFunction;
}

export type GetDefaultFunctions = () => LifecycleDefaultOptions;

export interface LifecycleFunctions {
  didMount?: VoidFunction;
  didUpdate?: VoidFunction;
  willUnmount?: VoidFunction;
}

export type UseLifecycle = <T = any>(
  funcs?: LifecycleFunctions,
  conditions?: Array<T>
) => void;
