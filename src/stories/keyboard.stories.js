import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import LicenseKeyboard from '../keyboard';

export default {
  title: 'License Keyboard',
};

const stories = storiesOf('License keyboard', module);

stories.addDecorator(withKnobs).add('License keyboard', () => {
  // create dummy component that wraps the Slider and allows state:
  class StoryComp extends React.Component {
    state = {
      value: '',
      showKeyboard: false,
    };

    render() {
      return (
        <div>
          <button
            className="btn btn-primary"
            onClick={() =>
              this.setState({ showKeyboard: !this.state.showKeyboard })
            }
          >
            {'键盘⌨️'}
          </button>

          <p>{this.state.value}</p>

          <LicenseKeyboard
            visible={this.state.showKeyboard}
            safeArea={true}
            done={() => this.setState({ showKeyboard: false })}
            onChange={value => this.setState({ value })}
            value={this.state.value}
          />
        </div>
      );
    }
  }

  return <StoryComp />;
});
