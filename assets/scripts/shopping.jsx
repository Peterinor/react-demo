import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

function App() {
  return (
    <Button variant="contained" color="primary">
      <Icon>star</Icon> Hello World
    </Button>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));