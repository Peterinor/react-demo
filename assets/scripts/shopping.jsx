import React from 'react';
import ReactDOM from 'react-dom';

import AppBar from './shopping/AppBar';
import SearchingForm from './shopping/SearchingForm';
// import ShoppingSteps from './shopping/ShoppingSteps';

function App() {
  return (
    <div>
      <AppBar />
      {/* <ShoppingSteps /> */}
      <SearchingForm />
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));