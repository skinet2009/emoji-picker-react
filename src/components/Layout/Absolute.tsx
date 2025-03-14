import { CSSProperties, ReactNode } from 'react';

type Props = Readonly<{
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}>;

export default function Absolute({ children, className, style }: Props) {
  return (
    <div style={{ ...style, position: 'absolute' }} className={className}>
      {children}
    </div>
  );
}
