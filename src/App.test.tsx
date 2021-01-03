import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';

import {Provider} from 'react-redux';

//access redux store
import store from './redux/store';

test('renders main title element', () => {
  render(<Provider store={store}><App /></Provider>);
  const titleElement = screen.getByText(/MTG Guessing Game/i);
  expect(titleElement).toBeInTheDocument();
});

