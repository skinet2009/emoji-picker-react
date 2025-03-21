import { cx } from 'flairup';
import { CSSProperties, ReactNode } from 'react';

import { stylesheet } from '../../Stylesheet/stylesheet';

export enum FlexDirection {
  ROW = 'FlexRow',
  COLUMN = 'FlexColumn'
}

type Props = Readonly<{
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  direction?: FlexDirection;
}>;

export default function Flex({
  children,
  className,
  style = {},
  direction = FlexDirection.ROW
}: Props) {
  return (
    <div
      style={{ ...style }}
      className={cx(styles.flex, className, styles[direction])}
    >
      {children}
    </div>
  );
}

const styles = stylesheet.create({
  flex: {
    display: 'flex'
  },
  [FlexDirection.ROW]: {
    flexDirection: 'row'
  },
  [FlexDirection.COLUMN]: {
    flexDirection: 'column'
  }
});
