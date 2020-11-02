import * as React from 'react';

interface KeyboardCellProps {
  cell: string;
  cellTextStyle?: React.CSSProperties;
  disabled?: boolean;
  onClick?: (cell: string) => void;
  type: keyboardCellType;
}

type keyboardCellType = 'province' | 'normal' | 'character';

const TypeToStyle: { [key in keyboardCellType]: string } = {
  province: 'province-cell',
  character: 'character-cell',
  normal: 'normal-cell',
};

const KeyboardCell = React.memo((props: KeyboardCellProps) => {
  const handleClick = () => {
    if (!props.disabled && typeof props.onClick === 'function') {
      props.onClick(props.cell);
    }
  };

  return (
    <section
      className={`${'keyboard-cell'} ${TypeToStyle[props.type]} ${
        props.disabled ? 'cell-disabled' : ''
      }`}
      onClick={handleClick}
    >
      <span style={props.cellTextStyle} className='cell-text'>
        {props.cell}
      </span>
    </section>
  );
});

export default KeyboardCell;
