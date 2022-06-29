import { useState } from 'react';
import LicenseKeyboard from 'vehicle-plate-keyboard';
import '../../dist/style.css';
import './App.css';

function App() {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div className="App">
      <button onClick={() => setShowKeyboard(!showKeyboard)}>{`${
        showKeyboard ? '关闭' : '打开'
      }键盘⌨️`}</button>

      <p>{value}</p>

      <LicenseKeyboard
        visible={showKeyboard}
        done={() => setShowKeyboard(false)}
        onChange={(value: any) => setValue(value)}
        value={value}
      />
    </div>
  );
}

export default App;
