# vehicle-plate-keyboard

[![npm version](https://badge.fury.io/js/vehicle-plate-keyboard.svg)](//npmjs.com/package/vehicle-plate-keyboard) [![Build Status](https://travis-ci.com/LiuuY/vehicle-plate-keyboard.svg?branch=master)](https://travis-ci.com/LiuuY/vehicle-plate-keyboard) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://github.com/LiuuY/vehicle-plate-keyboard)

A Chinese vehicle plate number keyboard for React (not a really keyboard, just a modal)

React 实现的车牌键盘。

## 💡 Features

- 省份 + 字母（无 I/O）/ 数字 + 「港澳学警领」
- [新能源车牌规则](https://zh.wikipedia.org/wiki/中华人民共和国民用机动车号牌#新能源汽车号牌)

## 🚗 Demo

[![Edit vehicle-plate-keyboard-demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vehicle-plate-keyboard-demo-xxdlv?fontsize=14&hidenavigation=1&theme=dark&resolutionWidth=320&resolutionHeight=675)

![Demo](https://raw.githubusercontent.com/LiuuY/vehicle-plate-keyboard/master/screenshots/demo.gif)

## 📷 Screenshots

![1](https://raw.githubusercontent.com/LiuuY/vehicle-plate-keyboard/master/screenshots/keyboard1.png)

![2](https://raw.githubusercontent.com/LiuuY/vehicle-plate-keyboard/master/screenshots/keyboard2.png)

![3](https://raw.githubusercontent.com/LiuuY/vehicle-plate-keyboard/master/screenshots/keyboard3.png)

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

## 🗺 API

| props              | type                    | description                   |
| ------------------ | ----------------------- | ----------------------------- |
| visiable           | boolean                 | keyboard visible              |
| onChange           | (value: string) => void | trigger when user tap         |
| value              | string                  | controlled value              |
| done               | () => void              | trigger when keyborad dismiss |
| confirmButtonStyle | React.CSSProperties     | confirm button style          |
| confirmButtonText  | string                  | confirm button text           |
| cellTextStyle      | React.CSSProperties     | keycell style                 |

## 🚧 Development

vehicle-plate-keyboard use [Storybook](https://storybook.js.org/) for developing in isolation.

```javascript
yarn storybook
```

open browser, http://localhost:6006/, 😆

![1](https://raw.githubusercontent.com/LiuuY/vehicle-plate-keyboard/master/screenshots/storybook.png)

## 📝 License

MIT License
