import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App';

const Add = () => {
  return <App />;
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<Add />);
