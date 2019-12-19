import * as React from 'react';
import * as style from './style.module.scss';
import { KeyboardCellProps, keyboardCellType } from './types';

const TypeToStyle: { [key in keyboardCellType]: React.CSSProperties } = {
  province: style.provinceCell,
  character: style.characterCell,
  normal: style.normalCell,
};

const KeyboardCell = React.memo((props: KeyboardCellProps) => {
  const handleClick = () => {
    if (!props.disabled && typeof props.onClick === 'function') {
      props.onClick(props.cell);
    }
  };

  return (
    <section
      className={`${style.keyboardCell} ${TypeToStyle[props.type]} ${
        props.disabled ? style.cellDisabled : ''
      }`}
      onClick={handleClick}
    >
      <span style={props.cellTextStyle} className={style.cellText}>
        {props.cell}
      </span>
    </section>
  );
});

export default KeyboardCell;
