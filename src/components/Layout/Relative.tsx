import { CSSProperties, ReactNode } from 'react';

type Props = Readonly<{
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}>;

export default function Relative({ children, className, style }: Props) {
  return (
    <div style={{ ...style, position: 'relative' }} className={className}>
      {children}
    </div>
  );
}
