import type { InputProps } from "../utils";

export default function TextInput({
  value,
  onChange,
  placeholder,
  required = false,
}: InputProps) {
  return (
    <input
      type="text"
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      value={value}
    ></input>
  );
}
