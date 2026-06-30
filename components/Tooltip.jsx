"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function Tooltip({
  text,
  children,
  disabled = false,
  className = ""
}) {
  const triggerRef = useRef(null);
  const [position, setPosition] = useState({
    top: 0,
    left: 0
  });
  const [isVisible, setIsVisible] = useState(false);

  if (disabled) return children;

  function showTooltip() {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition({
      top: rect.top + window.scrollY,
      left: rect.left + rect.width / 2 + window.scrollX
    });
    setIsVisible(true);
  }

  function hideTooltip() {
    setIsVisible(false);
  }

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        className={className || "inline-flex"}
      >
        {children}
      </span>

      {isVisible &&
        createPortal(
          <span
            className="tooltipText"
            style={{
              position: "absolute",
              top: position.top,
              left: position.left,
              transform: "translate(-50%, calc(-100% - 8px))",
              zIndex: 99999
            }}
          >
            {text}
          </span>,
          document.body
        )}
    </>
  );
}
