import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { Provider } from 'react-redux';
import store from '../../src/redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import Products from '../../src/pages/ProductsPage/Product'; 



describe('Products Component', () => {

  const renderComponent = () =>
    render(
      <Provider store={store}>
          <Router>
            <Products />
          </Router>
      </Provider>
    );

  it('displays loading when data is not yet available', () => {
    renderComponent();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
