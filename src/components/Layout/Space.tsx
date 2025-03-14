import { cx } from 'flairup';
import { CSSProperties } from 'react';

type Props = Readonly<{
  className?: string;
  style?: CSSProperties;
}>;

export default function Space({ className, style = {} }: Props) {
  return <div style={{ flex: 1, ...style }} className={cx(className)} />;
}
