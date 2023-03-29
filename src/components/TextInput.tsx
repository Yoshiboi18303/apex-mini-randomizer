import { ChangeEventHandler } from "react";

interface TextInputProps {
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
}

export default function TextInput({
  value,
  onChange,
  placeholder = "A Placeholder",
  required = false,
}: TextInputProps) {
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
