import React, { useEffect, useRef, useState } from "react";

interface PopoverProps {
  content: React.ReactNode | JSX.Element;
}
const Popover: React.FC<PopoverProps> = ({ children, content }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const [popoverPosition, setPopoverPosition] = useState({
    left: 0,
    top: 0,
    right: "auto",
    bottom: "auto",
    width: 200,
    show: false,
  });

  const [arrowPosition, setArrowPosition] = useState({
    left: 0,
    right: "auto",
    top: 0,
    bottom: "auto",
    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
  });

  const alignFromRight = () => {
    const popoverBounding = popoverRef.current?.getBoundingClientRect();
    console.log(popoverBounding, window.scrollY, window.innerHeight, document.body.scrollHeight);
    const offsetTopNeed =
      popoverBounding?.y || 0 + (!!popoverBounding?.height ? popoverBounding?.height : 0) - window.innerHeight;
    const offsetLeftNeed =
      (!!popoverBounding?.x ? popoverBounding?.x : 0) +
      popoverPosition.width / 2 -
      document.body.getBoundingClientRect().width +
      (!!elementRef.current?.clientWidth ? elementRef.current?.clientWidth : 0);

    if (offsetTopNeed > 0) {
      setPopoverPosition({
        ...popoverPosition,
        show: true,
        left:
          -(popoverBounding?.width || 0 / 2 - (elementRef.current?.clientWidth || 0) / 2) -
          (offsetLeftNeed > 0 ? offsetLeftNeed - (elementRef.current?.clientWidth || 0) / 2 : 0),
        top: -((popoverBounding?.height || 0) + 5),
      });

      setArrowPosition((pre) => ({
        ...pre,
        top: -(elementRef.current?.clientHeight || 0) / 2,
        clipPath: "polygon(100% 0, 0 0, 50% 100%)",
      }));
    } else {
      setPopoverPosition({
        ...popoverPosition,
        show: true,
        left:
          -((popoverBounding?.width || 0) / 2 - (elementRef.current?.clientWidth || 0) / 2) -
          (offsetLeftNeed > 0 ? offsetLeftNeed - (elementRef.current?.clientWidth || 1) / 2 : 0),
        top: elementRef.current?.clientHeight || 0,
      });

      setArrowPosition((pre) => ({
        ...pre,
        top: elementRef.current?.clientHeight || 0,
        clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
      }));
    }
  };

  // useEffect
  useEffect(() => {
    const elementClickEvent = (e: MouseEvent) => {
      if (!popoverRef.current?.contains(e.target as Node)) {
        if (popoverPosition.show) {
          setPopoverPosition((pre) => ({
            ...pre,
            show: false,
            left: 0,
            top: 0,
          }));
        } else {
          alignFromRight();
        }
      }
    };

    if (!!elementRef.current && !!popoverRef.current && !!arrowRef.current) {
      elementRef.current.addEventListener("click", elementClickEvent);
    }

    return () => {
      if (!!elementRef.current && !!popoverRef.current && !!arrowRef.current) {
        elementRef.current.removeEventListener("click", elementClickEvent);
      }
    };
  }, [elementRef.current, popoverRef.current, popoverPosition, arrowRef.current]);

  useEffect(() => {
    const windowsClickEvent = (e: MouseEvent) => {
      if (!elementRef.current?.contains(e.target as Node) && !popoverRef.current?.contains(e.target as Node)) {
        setPopoverPosition((pre) => ({
          ...pre,
          show: false,
          left: 0,
          top: 0,
        }));
      }
    };
    window.addEventListener("click", windowsClickEvent);

    return () => {
      window.removeEventListener("click", windowsClickEvent);
    };
  }, [popoverRef.current, elementRef.current, popoverPosition]);

  useEffect(() => {
    const scrollWindow = () => {
      if (popoverPosition.show) {
        setPopoverPosition((pre) => ({
          ...pre,
          show: false,
          left: 0,
          top: 0,
        }));
      }
    };

    window.addEventListener("scroll", scrollWindow);
    return () => {
      window.removeEventListener("scroll", scrollWindow);
    };
  }, [popoverPosition]);
  return (
    <div
      ref={elementRef}
      style={{
        display: "inline-block",
        position: "relative",
      }}>
      {children}

      <div
        ref={popoverRef}
        style={{
          padding: "5px",
          position: "absolute",
          left: popoverPosition.left,
          top: popoverPosition.top,
          right: popoverPosition.right,
          bottom: popoverPosition.bottom,
          width: `${popoverPosition.width}px`,
          visibility: popoverPosition.show ? "visible" : "hidden",
          zIndex: popoverPosition.show ? "1" : "-9999999",
        }}>
        <div
          style={{
            marginTop: "5px",
            padding: "5px",
            backgroundColor: "#ffffff",
            borderRadius: "2px",
            boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
          }}>
          {content}
        </div>
      </div>
      <div
        ref={arrowRef}
        style={{
          visibility: popoverPosition.show ? "visible" : "hidden",
          zIndex: popoverPosition.show ? "1" : "-9999999",
          position: "absolute",
          left: arrowPosition.left,
          right: arrowPosition.right,
          top: arrowPosition.top,
          bottom: arrowPosition.bottom,
          width: 15,
          height: 15,
          clipPath: arrowPosition.clipPath,
          backgroundColor: "#ffffff",
          boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
        }}></div>
    </div>
  );
};

export default Popover;
