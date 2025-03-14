import { cx } from 'flairup';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import { stylesheet } from '../../Stylesheet/stylesheet';

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
}

export function Button(props: Props) {
  return (
    <button
      type="button"
      {...props}
      className={cx(styles.button, props.className)}
    >
      {props.children}
    </button>
  );
}

const styles = stylesheet.create({
  button: {
    '.': 'epr-btn',
    cursor: 'pointer',
    border: '0',
    background: 'none',
    outline: 'none'
  }
});
