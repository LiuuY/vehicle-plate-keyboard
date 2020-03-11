import * as React from 'react';
import { createPortal } from 'react-dom';
import KeyboardCell from './keyboardCell';
import './style.scss';
import { KeyboardProps } from './types';

enum SecondPageStatus {
  DisableAll = 0,
  AllowAll,
  AlphabetOnly,
  NumberOnly,
  AllowSpecialCharaters,
}

type secondPageType = SecondPageStatus | string;

const firstPage = [
  ['京', '沪', '粤', '津', '冀', '晋', '蒙', '辽'],
  ['吉', '黑', '苏', '浙', '皖', '闽', '赣', '鲁'],
  ['豫', '鄂', '湘', '桂', '琼', '渝', '川', '贵'],
  ['云', '藏', '陕', '甘', '青', '宁', '新', '使'],
];

const secondPage = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ['港', '澳', '学', '警', '领'],
];

const smallVehicleNewEnergy = '0123456789';
const bigVehicleNewEnergy = 'DF';

const requestAnimationFrame =
  window.requestAnimationFrame || window.webkitRequestAnimationFrame;

const document = window.document;

const easeOut = (progress: number) => Math.pow(--progress, 5) + 1;

/*
新能源车牌号规则：
1. 当第三位为D/F，第四位为字母数字，第五至八位为数字（小型车）
2. 当第八位为D/F, 第三到七位为数字（大型车）
*/
const isNewEnergyPlate = (plate: string): false | string => {
  if (isNewEnergyBigVehicle(plate)) {
    return bigVehicleNewEnergy;
  } else if (isNewEnergySmallVehicle(plate)) {
    return smallVehicleNewEnergy;
  }
  return false;
};

const isNewEnergySmallVehicle = (plate: string) =>
  /[D|F]/.test(plate[2]) && /^[0-9]+$/.test(plate.slice(4, 7));

const isNewEnergyBigVehicle = (plate: string) =>
  /^[0-9]+$/.test(plate.slice(2, 7));

const isAlphabet = (s: string) => /[ABCDEFGHJKLMNPQRSTUVWXYZ]/.test(s);
const isNumber = (s: string) => /[0-9]/.test(s);
const isSpecialCharacters = (s: string) => /[港澳学警领]/.test(s);

const onlyAllowInput = (s: string, onlyAllows: secondPageType): boolean => {
  if (typeof onlyAllows === 'string') {
    return onlyAllows.indexOf(s) !== -1;
  } else if (onlyAllows === SecondPageStatus.AllowAll) {
    return isAlphabet(s) || isNumber(s);
  } else if (onlyAllows === SecondPageStatus.AlphabetOnly) {
    return isAlphabet(s);
  } else if (onlyAllows === SecondPageStatus.NumberOnly) {
    return isNumber(s);
  } else if (onlyAllows === SecondPageStatus.AllowSpecialCharaters) {
    return isAlphabet(s) || isNumber(s) || isSpecialCharacters(s);
  }
};

const LicenseKeyboard = React.memo((props: KeyboardProps) => {
  const [state, setState] = React.useState({
    keyboardOffsetProgress: 0,
  });

  React.useEffect(
    () => {
      props.visible ? showKeyboard() : hideKeyboard();
      return () => {
        removeKeyboardDOM();
      };
    },
    [props.visible],
  );

  const node = React.useRef<Element>(null);

  let elapsed = 0;
  let startTime = 0;
  let totalTime = 0;

  const resetTime = () => {
    startTime = performance.now();
    totalTime = 300;
  };

  const createKeyboardDOM = () => {
    node.current =
      document.querySelector('#vehiclePlateKeyboard') ||
      document.createElement('div');
    node.current.id = 'vehiclePlateKeyboard';
    document.body.appendChild(node.current);
    node.current.addEventListener('touchstart', handleTouchStart);
    node.current.addEventListener('touchmove', handleTouchMove);
  };

  const removeKeyboardDOM = () => {
    const currentNode = node.current;
    if (currentNode) {
      currentNode.removeEventListener('touchstart', handleTouchStart);
      currentNode.removeEventListener('touchmove', handleTouchMove);
    }
  };

  const showKeyboard = () => {
    createKeyboardDOM();

    resetTime();
    requestAnimationFrame(animationTick);
  };

  const hideKeyboard = () => {
    resetTime();
    requestAnimationFrame(time => animationTick(time, 'DOWN'));
  };

  const animationTick = (now: number, direction: 'UP' | 'DOWN' = 'UP') => {
    elapsed = now - startTime;
    const progress = Math.min(easeOut(elapsed / totalTime), 1);

    setState(prevState => ({
      ...prevState,
      keyboardOffsetProgress: direction === 'UP' ? progress : 1 - progress,
    }));

    if (progress < 1) {
      requestAnimationFrame((time: number) => animationTick(time, direction));
    }
  };

  const handleTouchStart = () => {};

  const handleTouchMove = (event: Event) => {
    event.preventDefault();
  };

  const handleDone = () => {
    props.done();
  };

  const handleEnter = (cell: string) =>
    props.value!.length < 8 &&
    props.onChange &&
    props.onChange(props.value + cell);

  const handleDelete = () =>
    props.value!.length > 0 &&
    props.onChange &&
    props.onChange(props.value!.slice(0, -1));

  const renderProvinceSelect = () => {
    return (
      <article className='keyboard-container'>
        {firstPage.map((row, index: number) => {
          return (
            <section className='keyboard-row' key={index}>
              {row.map((province: string) => {
                return (
                  <KeyboardCell
                    cellTextStyle={props.cellTextStyle}
                    cell={province}
                    key={province}
                    onClick={handleEnter}
                    type='province'
                  />
                );
              })}
            </section>
          );
        })}
      </article>
    );
  };

  const renderNumberSelect = (
    type: secondPageType = SecondPageStatus.AllowAll,
  ) => {
    return (
      <article className='keyboard-container'>
        <section className='keyboard-row'>
          {secondPage[0].map((cell: string) => {
            return (
              <KeyboardCell
                cellTextStyle={props.cellTextStyle}
                cell={cell}
                key={cell}
                onClick={handleEnter}
                disabled={!onlyAllowInput(cell, type)}
                type='normal'
              />
            );
          })}
        </section>
        <section className='keyboard-row'>
          {secondPage[1].map((cell: string) => {
            return (
              <KeyboardCell
                cellTextStyle={props.cellTextStyle}
                cell={cell}
                key={cell}
                onClick={handleEnter}
                disabled={!onlyAllowInput(cell, type)}
                type='normal'
              />
            );
          })}
        </section>
        <section className='keyboard-row'>
          {secondPage[2].map((cell: string) => {
            return (
              <KeyboardCell
                cellTextStyle={props.cellTextStyle}
                cell={cell}
                key={cell}
                onClick={handleEnter}
                disabled={!onlyAllowInput(cell, type)}
                type='normal'
              />
            );
          })}
        </section>
        <section className='keyboard-row'>
          {secondPage[3].map((cell: string) => {
            return (
              <KeyboardCell
                cellTextStyle={props.cellTextStyle}
                cell={cell}
                key={cell}
                onClick={handleEnter}
                disabled={!onlyAllowInput(cell, type)}
                type='normal'
              />
            );
          })}
        </section>
        <section className='keyboard-row'>
          {secondPage[4]
            .map((cell: string) => {
              return (
                <KeyboardCell
                  cellTextStyle={props.cellTextStyle}
                  cell={cell}
                  key={cell}
                  onClick={handleEnter}
                  disabled={!onlyAllowInput(cell, type)}
                  type='character'
                />
              );
            })
            .concat(renderBackBtn())}
        </section>
      </article>
    );
  };

  const renderBackBtn = () => {
    return (
      <section
        className='keyboard-cell back-btn'
        onClick={handleDelete}
        key={'backBtn'}
      >
        <span className='back-btn-svg'>&#9003;</span>
      </section>
    );
  };

  const renderKeyboard = () => {
    switch (props.value!.length) {
      case 0:
        return renderProvinceSelect();
      case 1:
        return renderNumberSelect(SecondPageStatus.AlphabetOnly);
      case 2:
        return renderNumberSelect();
      case 3:
        return renderNumberSelect();
      case 4:
        return renderNumberSelect();
      case 5:
        return renderNumberSelect();
      case 6:
        return renderNumberSelect(SecondPageStatus.AllowSpecialCharaters);
      case 7:
        const newEnergyVehicleLastNumber = isNewEnergyPlate(props.value!);
        if (
          isSpecialCharacters(props.value!.slice(-1)) ||
          newEnergyVehicleLastNumber === false
        ) {
          return renderNumberSelect(SecondPageStatus.DisableAll);
        }
        return renderNumberSelect(newEnergyVehicleLastNumber);
      default:
        return renderNumberSelect(SecondPageStatus.DisableAll);
    }
  };

  if (node.current) {
    return createPortal(
      <section
        style={{
          transform: `translateY(calc(${1 -
            state.keyboardOffsetProgress} * 100%))`,
        }}
        className='vehicle-plate-keyboard-container'
      >
        <section className='confirm' onClick={handleDone}>
          <p style={props.confirmButtonStyle}>
            {props.confirmButtonText || '确认'}
          </p>
        </section>
        <section className='keyboard'>{renderKeyboard()}</section>
      </section>,
      node.current,
    );
  }

  return null;
});

export default LicenseKeyboard;
