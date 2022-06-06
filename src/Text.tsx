import React, { useEffect, useRef } from "react";
import classnames from "classnames";
import usePrevious from "./usePrevious";

type Props = {
  duration?: number;
};

type RefDiv = React.LegacyRef<HTMLDivElement>;

const beginAnim = (
  prevEle: HTMLDivElement,
  currEle: HTMLDivElement,
  duration: Number
) => {
  prevEle.style.opacity = "1";
  prevEle.style.display = "block";
  prevEle.style.visibility = "visible";
  prevEle.style.position = "relative";
  prevEle.style.transition = `opacity ${duration}ms`;

  currEle.style.opacity = "0.1";
  currEle.style.display = "none";
  currEle.style.visibility = "hidden";
  currEle.style.position = "absolute";
  currEle.style.transition = `opacity ${duration}ms`;
};

const midAnim = (
  prevEle: HTMLDivElement,
  currEle: HTMLDivElement,
  duration: Number
) => {
  prevEle.style.opacity = "0.1";
  prevEle.style.display = "block";
  prevEle.style.visibility = "hidden";
  prevEle.style.position = "absolute";
  prevEle.style.transition = `none`;

  currEle.style.opacity = "1";
  currEle.style.display = "block";
  currEle.style.visibility = "visible";
  currEle.style.position = "relative";
  currEle.style.transition = `opacity ${duration}ms`;
};

const endAnim = (
  prevEle: HTMLDivElement,
  currEle: HTMLDivElement,
  duration: Number
) => {
  // prevEle.style.opacity = '1';
  // prevEle.style.display = 'block';
  // currEle.style.opacity = '0';
};

const Text: React.FC<Props> = ({ children, duration = 2000 }) => {
  const prevChild = usePrevious(children);
  const refPrev = useRef<HTMLDivElement | null>(null);
  const refCurr = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!refPrev.current && !refCurr.current) {
      return;
    }

    refPrev.current.style.transition = `all ${duration / 2}ms`;
    refCurr.current.style.transition = `all ${duration / 2}ms`;
  }, [duration]);

  useEffect(() => {
    if (!refPrev.current && !refCurr.current) {
      return;
    }

    beginAnim(refPrev.current, refCurr.current, duration);

    let timeoutId2: ReturnType<typeof setTimeout>;
    const timeoutId1 = setTimeout(() => {
      midAnim(refPrev.current, refCurr.current, duration);
      timeoutId2 = setTimeout(() => {
        endAnim(refPrev.current, refCurr.current, duration);
      }, duration / 2);
    }, duration / 2);

    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
    };
  }, [children, duration]);

  return (
    <div className="text">
      <div
        className="prev"
        ref={refPrev}
        // style={{ transition: `all ${duration / 2}ms` }}
      >
        {prevChild}
      </div>
      <div
        className="curr"
        ref={refCurr}
        // style={{ transition: `all ${duration / 2}ms` }}
      >
        {children}
      </div>
    </div>
  );
};

export default Text;
