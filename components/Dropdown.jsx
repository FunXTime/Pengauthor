"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/Icon";

export default function Dropdown({
  name,
  value,
  options,
  onChange,
  className = "",
  style,
  multiple = false,
  size,
  placeholder
}) {
  const [showChevron, setShowChevron] = useState(false);

  useEffect(() => {
    if (multiple) return;
    const media = window.matchMedia("(min-width: 769px)");
    function updateChevron() {
      setShowChevron(media.matches);
    }
    updateChevron();
    media.addEventListener("change", updateChevron);
    return () => media.removeEventListener("change", updateChevron);
  }, [multiple]);

  return (
    <div className={`relative ${className}`}>
      <select
        name={name}
        value={value}
        onChange={onChange}
        multiple={multiple}
        size={size}
        className="w-full appearance-none border border-edge bg-panel-raised px-4 py-3 text-[0.75rem] text-ink outline-none"
        style={{
          ...style,
          appearance: "none",
          WebkitAppearance: "none",
          MozAppearance: "none",
          backgroundImage: "none"
        }}
      >
        {!multiple && placeholder && (
          <option>
            {placeholder}
          </option>
        )}

        {options.map((option) => {
          const value = typeof option === "string"
            ? option
            : option.value;
          const label = typeof option === "string"
            ? option
            : option.label;

          return (
            <option
              key={value}
              value={value}
              className="bg-panel text-ink"
            >
              {label}
            </option>
          );
        })}
      </select>

      {showChevron && (
        <Icon
          name="chevronDown"
          className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
        />
      )}
    </div>
  );
}
