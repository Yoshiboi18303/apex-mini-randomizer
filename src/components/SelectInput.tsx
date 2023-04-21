import type { InputProps } from "../utils";

interface SelectInputProps extends InputProps<HTMLSelectElement> {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function SelectInput({
  title,
  children,
  onChange,
  required,
  className,
}: SelectInputProps): JSX.Element {
  return (
    <select
      title={title}
      onChange={onChange}
      required={required}
      className={className}
    >
      {children}
    </select>
  );
}
