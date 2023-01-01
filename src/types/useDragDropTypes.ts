import { MutableRefObject } from "react";

export interface UseDragDropOptions {
  /**
   * the selector of the zone that will be the drag & drop area. Could be an id or ref or array of ids and refs.
   */
  selector:
    | string
    | Array<string>
    | MutableRefObject<HTMLElement>
    | Array<MutableRefObject<HTMLElement>>;
  /**
   * function runs when the item dragged out an area.
   */
  onDragLeave?: (/** the drag event. */ e: DragEvent) => void;
  /**
   * function runs when the item dragged in an area.
   */
  onDragEnter?: (/** the drag event. */ e: DragEvent) => void;
  /**
   * function runs when the item is over an area.
   */
  onDragOver?: (/** the drag event. */ e: DragEvent) => void;
  /**
   * function runs when the item dropped on an area.
   */
  onDrop?: (/** the drag event. */ e: DragEvent) => void;
}

export interface UseDragDropReturnObject {}

export type UseDragDrop = (
  /** the options of the hook. */ options: UseDragDropOptions
) => void;
