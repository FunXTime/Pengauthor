"use client";

import { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import Tooltip from "@/components/Tooltip";

const COLORS = [
  { name: "Black", hex: "#000000" },
  { name: "Burnt orange", hex: "#993300" },
  { name: "Dark olive", hex: "#333300" },
  { name: "Dark green", hex: "#003300" },
  { name: "Dark azure", hex: "#003366" },
  { name: "Navy Blue", hex: "#000080" },
  { name: "Indigo", hex: "#333399" },
  { name: "Very dark gray", hex: "#333333" },

  { name: "Maroon", hex: "#800000" },
  { name: "Orange", hex: "#ff6600" },
  { name: "Olive", hex: "#808000" },
  { name: "Green", hex: "#008000" },
  { name: "Teal", hex: "#008080" },
  { name: "Blue", hex: "#0000ff" },
  { name: "Grayish blue", hex: "#666699" },
  { name: "Gray", hex: "#808080" },

  { name: "Red", hex: "#ff0000" },
  { name: "Amber", hex: "#ff9900" },
  { name: "Light green", hex: "#99cc00" },
  { name: "Medium green", hex: "#339966" },
  { name: "Turquoise", hex: "#33cccc" },
  { name: "Royal blue", hex: "#3366ff" },
  { name: "Purple", hex: "#800080" },
  { name: "Medium gray", hex: "#999999" },

  { name: "Magenta", hex: "#ff00ff" },
  { name: "Gold", hex: "#ffcc00" },
  { name: "Yellow", hex: "#ffff00" },
  { name: "Lime", hex: "#00ff00" },
  { name: "Aqua", hex: "#00ffff" },
  { name: "Sky blue", hex: "#00ccff" },
  { name: "Red violet", hex: "#993366" },
  { name: "White", hex: "#ffffff" },

  { name: "Pink", hex: "#ff99cc" },
  { name: "Peach", hex: "#ffcc99" },
  { name: "Light yellow", hex: "#ffffcc" },
  { name: "Pale green", hex: "#ccffcc" },
  { name: "Pale cyan", hex: "#ccffff" },
  { name: "Light sky blue", hex: "#99ccff" },
  { name: "Plum", hex: "#cc99ff" },
  { name: "Club Penguin Armies", hex: "#87D1ff" },

  { name: "Club Penguin Army Judges", hex: "#CA2244" }
];

export default function ColorPicker({
  value,
  onChange
}) {
  const [open, setOpen] = useState(false);
  const pickerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target)
      ) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={pickerRef} className="h-8 w-8 relative">
      <button
        type="button"
        className="h-full w-full shrink-0 cursor-pointer self-center rounded-lg border border-edge transition-transform duration-100 hover:scale-[1.02] focus:scale-[1.03] active:scale-[1.03]"
        style={{ backgroundColor: value }}
        aria-label="Choose color"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      />

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-64 rounded-xl border border-edge bg-panel p-4 shadow-xl">
          <HexColorPicker
            color={value}
            onChange={onChange}
            className="!w-full"
          />
          <input
            type="text"
            className="mt-4 w-full rounded-lg border border-edge bg-panel-raised px-3 py-2 text-xs uppercase text-ink outline-none focus:border-edge-strong"
            value={value}
            maxLength={7}
            placeholder="#000000"
            spellCheck={false}
            aria-label="Hex color"
            onInput={(event) => {
              const input = event.currentTarget;
              const hex = input.value
                .replace(/^#/, "")
                .replace(/[^0-9a-fA-F]/g, "")
                .toLowerCase()
                .slice(0, 6);
              onChange(`#${hex}`);
            }}
          />

          {COLORS.length > 0 && (
            <div className="mt-4 border-t border-edge pt-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-faint select-none">
                From WordPress
              </p>
              <div className="flex flex-wrap gap-2">
                <div className="grid grid-cols-8 gap-2">
                {COLORS.map((color) => (
                  <Tooltip key={color.hex} text={color.name}>
                    <button
                      type="button"
                      className={`h-6 w-6 cursor-pointer rounded-lg border transition-transform duration-100 hover:scale-[1.02] focus:scale-[1.03] active:scale-[1.03] ${
                        value === color.hex ? "border-ink ring-1 ring-ink" : "border-edge"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={`Select ${color.name}`}
                      onClick={() => onChange(color.hex)}
                    />
                  </Tooltip>
                ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
