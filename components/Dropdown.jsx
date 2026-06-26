import Icon from "@/components/Icon";

export default function Dropdown({
  name,
  value,
  options,
  onChange,
  className = "",
  style
}) {
  return (
    <div className={`relative ${className}`}>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full appearance-none border border-edge bg-panel-raised px-4 py-3 text-[0.75rem] outline-none"
        style={style}
      >
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>

      <Icon
        name="chevronDown"
        className="pointer-events-none absolute right-2 top-1/2 h-4 w-3 -translate-y-1/2 text-faint"
      />

    </div>
  );
}