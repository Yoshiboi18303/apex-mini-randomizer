import type { InputProps } from "../utils";

export default function TextAreaInput({
  value,
  onChange,
  placeholder,
  required = false,
}: InputProps<HTMLTextAreaElement>) {
  return (
    <textarea
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      value={value}
    ></textarea>
  );
}
