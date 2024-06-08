import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { Provider } from 'react-redux';
import store from '../../src/redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import CartList from '../../src/component/AppBar/Menu/cartList';
import React from 'react';

const renderComponent = () =>
    render(
      <Provider store={store}>
        <Router>
          <CartList />
        </Router>
      </Provider>
    );

describe('CartList Component', () => {
  it('renders correctly with items in the cart', () => {
    const initialState = {
      dashboard: {
        cartItem: [
          {
            id: '1',
            title: 'Apple',
            image: '/apple.jpg',
            quantity: 2,
            totalPrice: 600,
            price: 300,
            brand: 'Fruit'
          }
        ]
      }
    };

    renderComponent();
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('300.000đ')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Thanh Toán/i })).toBeInTheDocument();
  });

  it('renders correctly with empty cart', () => {
    const initialState = {
      dashboard: {
        cartItem: []
      }
    };
    expect(screen.getByText('Chưa có sản phẩm trong giỏ hàng')).toBeInTheDocument();
  });
});
