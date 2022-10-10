import { useCallback, useEffect, useMemo, useRef } from "react";
import * as types from "./helpers/types"; // eslint-disable-line no-unused-vars

/**
 * @type {types.useDragDrop}
 */

export const useDragDrop = ({
  selector,
  onDragEnter,
  onDragLeave,
  onDrop,
  onDragOver,
}) => {
  const selectorArray = useMemo(
    () => (Array.isArray(selector) ? selector : [selector]).filter(Boolean),
    [selector]
  );
  const elementsRef = useRef();

  const handleDragEnter = useCallback(
    (/**@type {DragEvent} */ e) => {
      const { target } = e;
      target.classList.add("dragdrop-over");
      if (typeof onDragEnter === "function") {
        onDragEnter(e);
      }
    },
    [selector]
  );

  const handleDragLeave = useCallback(
    (/**@type {DragEvent} */ e) => {
      const { target } = e;
      target.classList.remove("dragdrop-over");
      if (typeof onDragLeave === "function") {
        onDragLeave(e);
      }
    },
    [selector]
  );

  const handleDragOver = useCallback(
    (/**@type {DragEvent} */ e) => {
      e.preventDefault();
      if (typeof onDragOver === "function") {
        onDragOver(e);
      }
    },
    [selector]
  );

  const handleDrop = useCallback(
    (/**@type {DragEvent} */ e) => {
      const { target } = e;
      target.classList.remove("dragdrop-over");
      if (typeof onDrop === "function") {
        onDrop(e);
      }
    },
    [selector]
  );

  const handleDropDocument = useCallback((/**@type {DragEvent} */ e) => {
    e.preventDefault();
  }, []);

  useEffect(() => {
    const elements = selectorArray.map((_selector) => {
      let element;
      if (typeof _selector === "string") {
        element = document.querySelector(`#${_selector}`);
      } else if (_selector?.current instanceof HTMLElement) {
        element = _selector.current;
      } else {
        throw TypeError(
          "The selector must be either an element id or valid ref"
        );
      }
      return element;
    });
    elementsRef.current = elements;
    elements.forEach((/**@type {HTMLElement} */ element) => {
      element.addEventListener("dragenter", handleDragEnter);
      element.addEventListener("dragleave", handleDragLeave);
      element.addEventListener("dragover", handleDragOver);
      element.addEventListener("drop", handleDrop);
    });
    document.addEventListener("drop", handleDropDocument);
  }, [selectorArray]);

  useEffect(() => {
    return () => {
      elementsRef.current.forEach((/**@type {HTMLElement} */ element) => {
        element.removeEventListener("dragenter", handleDragEnter);
        element.removeEventListener("dragleave", handleDragLeave);
        element.removeEventListener("dragover", handleDragOver);
        element.removeEventListener("drop", handleDrop);
      });
      document.removeEventListener("drop", handleDropDocument);
    };
  }, []);
};
