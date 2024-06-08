import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import RegisterForm from '../../src/pages/Auth/Register/index'; // Đường dẫn đến file RegisterForm của bạn
import React from 'react';
import { Provider } from 'react-redux';
import store from '../../src/redux/store';
import { BrowserRouter as Router } from 'react-router-dom';

const renderComponent = () =>
  render(
    <Provider store={store}>
      <Router>
        <RegisterForm />
      </Router>
    </Provider>
  );

describe('RegisterForm Component', () => {
  it('renders correctly', () => {
    renderComponent();
    expect(screen.getByLabelText(/Họ tên/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Sđt/i)).toBeInTheDocument();
    expect(screen.getByTestId(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Địa Chỉ/i)).toBeInTheDocument();
    expect(screen.getByTestId(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nhập lại mật khẩu/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });
});
