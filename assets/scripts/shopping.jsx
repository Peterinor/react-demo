import React from 'react';
import ReactDOM from 'react-dom';

import ProcessDemo from './demo/Process'
import TextFields from './demo/Form'
import ButtonAppBar from './demo/ButtonAppBar'
import Grid from './demo/Grid'

function App() {
  return (
    <div>
      <ButtonAppBar />
      <Grid />
      <TextFields />
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));