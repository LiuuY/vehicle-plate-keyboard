import * as React from 'react';
import { createPortal } from 'react-dom';
import KeyboardCell from './keyboardCell';
import * as style from './style.module.scss';
import { KeyboardProps } from './types';

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

const requestAnimationFrame =
  window.requestAnimationFrame || window.webkitRequestAnimationFrame;

const document = window.document;

const easeOut = (progress: number) => Math.pow(--progress, 5) + 1;

const LicenseKeyboard = React.memo((props: KeyboardProps) => {
  const [state, setState] = React.useState({
    showKeyboard: false,
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

  React.useEffect(
    () => {
      if (state.showKeyboard) {
        resetTime();
        requestAnimationFrame(animationTick);
      } else {
        hideKeyboard();
      }

      return () => {
        removeKeyboardDOM();
      };
    },
    [state.showKeyboard],
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
      document.querySelector('#license-keyboard-box') ||
      document.createElement('div');
    node.current.id = 'license-keyboard-box';
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
    setState(prevState => ({
      ...prevState,
      showKeyboard: true,
    }));
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
    } else if (!props.visible && direction === 'DOWN') {
      setState(prevState => ({ ...prevState, showKeyboard: false }));
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
      <article className={style.keyboardContainer}>
        {firstPage.map((row, index: number) => {
          return (
            <section className={style.keyboardRow} key={index}>
              {row.map((province: string) => {
                return (
                  <KeyboardCell
                    cellTextStyle={props.cellTextStyle}
                    cell={province}
                    key={province}
                    onClick={handleEnter}
                    type="province"
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
    alphabetOnly: boolean = false,
    allowCharacter: boolean = false,
    disabledAll: boolean = false,
  ) => {
    return (
      <article className={style.keyboardContainer}>
        <section className={style.keyboardRow}>
          {secondPage[0].map((cell: string) => {
            return (
              <KeyboardCell
                cellTextStyle={props.cellTextStyle}
                cell={cell}
                key={cell}
                onClick={handleEnter}
                disabled={disabledAll || alphabetOnly}
                type="normal"
              />
            );
          })}
        </section>
        <section className={style.keyboardRow}>
          {secondPage[1].map((cell: string) => {
            return (
              <KeyboardCell
                cellTextStyle={props.cellTextStyle}
                cell={cell}
                key={cell}
                onClick={handleEnter}
                disabled={disabledAll || /[I|O]/.test(cell)}
                type="normal"
              />
            );
          })}
        </section>
        <section className={style.keyboardRow}>
          {secondPage[2].map((cell: string) => {
            return (
              <KeyboardCell
                cellTextStyle={props.cellTextStyle}
                cell={cell}
                key={cell}
                onClick={handleEnter}
                disabled={disabledAll}
                type="normal"
              />
            );
          })}
        </section>
        <section className={style.keyboardRow}>
          {secondPage[3].map((cell: string) => {
            return (
              <KeyboardCell
                cellTextStyle={props.cellTextStyle}
                cell={cell}
                key={cell}
                onClick={handleEnter}
                disabled={disabledAll}
                type="normal"
              />
            );
          })}
        </section>
        <section className={style.keyboardRow}>
          {secondPage[4]
            .map((cell: string) => {
              return (
                <KeyboardCell
                  cellTextStyle={props.cellTextStyle}
                  cell={cell}
                  key={cell}
                  onClick={handleEnter}
                  disabled={disabledAll || alphabetOnly || !allowCharacter}
                  type="character"
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
        className={`${style.keyboardCell} ${style.backBtn}`}
        onClick={handleDelete}
        key={'backBtn'}
      >
        <span className={style.backBtnSvg}>&#9003;</span>
      </section>
    );
  };

  const renderKeyboard = () => {
    switch (props.value!.length) {
      case 0:
        return renderProvinceSelect();
      case 1:
        return renderNumberSelect(true);
      case 2:
        return renderNumberSelect();
      case 3:
        return renderNumberSelect();
      case 4:
        return renderNumberSelect();
      case 5:
        return renderNumberSelect();
      case 6:
        return renderNumberSelect(false, true);
      case 7:
        const shouldEndEnter = /[港澳学警领]/.test(props.value!.slice(-1));
        return renderNumberSelect(false, false, shouldEndEnter);
      default:
        return renderNumberSelect(false, false, true);
    }
  };

  if (state.showKeyboard && node.current) {
    return createPortal(
      <section
        style={{
          transform: `translateY(calc(${1 -
            state.keyboardOffsetProgress} * 100%))`,
        }}
        className={`${style.box} ${props.safeArea ? style.boxSafeArea : ''}`}
      >
        <section className={style.confirm} onClick={handleDone}>
          <p style={props.confirmButtonStyle}>
            {props.confirmButtonText || '确认'}
          </p>
        </section>
        <section className={style.keyboard}>{renderKeyboard()}</section>
      </section>,
      node.current,
    );
  }

  return null;
});

export default LicenseKeyboard;
