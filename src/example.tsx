import { useState } from 'react';
import { createRoot } from 'react-dom/client';

import LicenseKeyboard from './index';
import './style.scss';

function App() {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div>
      <button onClick={() => setShowKeyboard(!showKeyboard)}>{'键盘⌨️'}</button>

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

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
