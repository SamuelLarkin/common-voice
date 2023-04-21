import 'focus-visible';
import * as React from 'react';
import { render } from 'react-dom';
import './components/index.css';

declare var require: any;

// Safari hack to allow :active styles.
document.addEventListener('touchstart', function () {}, true);

// Start the app when DOM is ready.
document.addEventListener('DOMContentLoaded', async () => {
  const deferredPolyfills = [
    typeof window.IntersectionObserver === 'undefined'
      ? require('intersection-observer')
      : Promise.resolve(),
    typeof window.MediaRecorder === 'undefined'
      ? require('audio-recorder-polyfill')
      : Promise.resolve(),
  ];
  const [_, AudioRecorder] = await Promise.all(deferredPolyfills);
  if (AudioRecorder) window.MediaRecorder = AudioRecorder.default;

  const App = require('./components/app').default;
  render(React.createElement(App), document.getElementById('root'));

   /*
   const clips_list = require('./components/report/clips').default;
   render(React.createElement(clips_list), document.getElementById('root'));
    */

   /*
   const reported_sentences_list = require('./components/report/reported_sentences').default;
   render(React.createElement(reported_sentences_list), document.getElementById('root'));
    */
});
