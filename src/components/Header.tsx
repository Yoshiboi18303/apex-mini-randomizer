interface HeaderProps {
  title: string;
  description: string;
  className?: string;
}

export default function Header({ title, description, className }: HeaderProps) {
  return (
    <div className={className}>
      <h1 className="big-text">{title}</h1>
      <h3 className="description">{description}</h3>
    </div>
  );
}
