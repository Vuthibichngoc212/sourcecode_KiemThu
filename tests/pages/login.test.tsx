import { render, screen, fireEvent,  waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import LogInForm from '../../src/pages/Auth/LogIn/index';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../../src/redux/store'; 
import { BrowserRouter as Router } from 'react-router-dom';


const renderComponent = () =>
  render(
    <Provider store={store}>
      <Router>
        <LogInForm/>
      </Router>
    </Provider>
  );


describe('LogInForm Component', () =>  {
  it('renders correctly', () => {
    renderComponent();
    expect(screen.getByLabelText(/Email\/Phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  it('validates email input and shows error message on invalid email', () => {
    fireEvent.change(screen.getByLabelText(/Email\/Phone/i), { target: { value: 'invalid-email' } });
    fireEvent.blur(screen.getByLabelText(/Email\/Phone/i));
    expect(screen.getByText(/Vui lòng nhập đúng Email!/i)).toBeInTheDocument();
  });

  it('validates password input and shows error message on invalid email', () => {
    fireEvent.change(screen.getByLabelText(/Email\/Phone/i), { target: { value: 'invalid-email' } });
    fireEvent.blur(screen.getByLabelText(/Email\/Phone/i));
    expect(screen.getByText(/Vui lòng nhập đúng Email!/i)).toBeInTheDocument();
  });

  it('allows form submission when email and password are valid', async () => {
    fireEvent.change(screen.getByLabelText(/Email\/Phone/i), { target: { value: 'tdt@gmail.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByTestId('submitSignIn'));

    waitFor(() => expect(screen.getByText(/Đăng nhập thành công!/i)).toBeInTheDocument());

  });
});