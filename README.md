# vehicle-plate-keyboard

[![npm version](https://badge.fury.io/js/vehicle-plate-keyboard.svg)](//npmjs.com/package/vehicle-plate-keyboard) [![Build Status](https://travis-ci.com/LiuuY/vehicle-plate-keyboard.svg?branch=master)](https://travis-ci.com/LiuuY/vehicle-plate-keyboard) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A Chinese vehicle plate number keyboard for React (not a really keyboard, just a modal)

## 🚗 Demo

[Demo](https://codesandbox.io/s/vehicle-plate-keyboard-demo-xxdlv)

![Demo](https://raw.githubusercontent.com/LiuuY/vehicle-plate-keyboard/master/demo.gif)

## 📦 Installation

```Javascript
yarn add vehicle-plate-keyboard
```

## 🔨 Usage

```JavaScript
import LicenseKeyboard from 'vehicle-plate-keyboard';
import 'vehicle-plate-keyboard/dist/main.css';

...

<LicenseKeyboard
   visible={state.showKeyboard}
   onChange={value => setState({ value })}
   value={state.value}
   done={() => setState({ showKeyboard: false })}
/>
```

## 🗺 Api

| props              | type                    | description                   |
| ------------------ | ----------------------- | ----------------------------- |
| visiable           | boolean                 | keyboard visible              |
| onChange           | (value: string) => void | trigger when user tap         |
| value              | string                  | controlled value              |
| done               | () => void              | trigger when keyborad dismiss |
| confirmButtonStyle | React.CSSProperties     | confirm button style          |
| confirmButtonText  | string                  | confirm button text           |
| cellTextStyle      | React.CSSProperties     | keycell style                 |
| safeArea           | boolean                 | show safearea                 |

## 📝 License

MIT License
