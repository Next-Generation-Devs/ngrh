import { useCallback, useEffect, useMemo, useRef } from "react";

import type { UseDragDrop } from "types/useDragDropTypes";

export const useDragDrop: UseDragDrop = ({
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
  const elementsRef = useRef<Array<HTMLElement>>();

  const handleDragEnter = useCallback(
    (e: DragEvent) => {
      const target = e.target as HTMLElement;
      target.classList.add("dragdrop-over");
      if (typeof onDragEnter === "function") {
        onDragEnter(e);
      }
    },
    [selector]
  );

  const handleDragLeave = useCallback(
    (e: DragEvent) => {
      const target = e.target as HTMLElement;
      target.classList.remove("dragdrop-over");
      if (typeof onDragLeave === "function") {
        onDragLeave(e);
      }
    },
    [selector]
  );

  const handleDragOver = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      if (typeof onDragOver === "function") {
        onDragOver(e);
      }
    },
    [selector]
  );

  const handleDrop = useCallback(
    (e: DragEvent) => {
      const target = e.target as HTMLElement;
      target.classList.remove("dragdrop-over");
      if (typeof onDrop === "function") {
        onDrop(e);
      }
    },
    [selector]
  );

  const handleDropDocument = useCallback((e: DragEvent) => {
    e.preventDefault();
  }, []);

  useEffect(() => {
    const elements: Array<HTMLElement> = selectorArray.map((_selector) => {
      let element;
      if (typeof _selector === "string") {
        element = document.querySelector(`#${_selector}`) as HTMLElement;
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
    elements.forEach((element) => {
      element.addEventListener("dragenter", handleDragEnter);
      element.addEventListener("dragleave", handleDragLeave);
      element.addEventListener("dragover", handleDragOver);
      element.addEventListener("drop", handleDrop);
    });
    document.addEventListener("drop", handleDropDocument);
  }, [selectorArray]);

  useEffect(() => {
    return () => {
      elementsRef.current?.forEach((element) => {
        element.removeEventListener("dragenter", handleDragEnter);
        element.removeEventListener("dragleave", handleDragLeave);
        element.removeEventListener("dragover", handleDragOver);
        element.removeEventListener("drop", handleDrop);
      });
      document.removeEventListener("drop", handleDropDocument);
    };
  }, []);
};
