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
  return (
    <div className={`relative ${className}`}>
      <select
        name={name}
        value={value}
        onChange={onChange}
        multiple={multiple}
        size={size}
        className="w-full appearance-none border border-edge bg-panel-raised px-4 py-3 text-[0.75rem] text-ink outline-none"
        style={style}
      >
        {!multiple && placeholder && (
          <option value="">
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

      {!multiple && (
        <Icon
          name="chevronDown"
          className="pointer-events-none absolute right-2 top-1/2 h-4 w-3 -translate-y-1/2 text-faint"
        />
      )}
    </div>
  );
}
