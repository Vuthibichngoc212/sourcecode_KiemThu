import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { Provider } from 'react-redux';
import store from '../../src/redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import BoardContent from '../../src/pages/Boards/BoardContent/index'; 
import React from 'react';

const renderComponent = () =>
    render(
      <Provider store={store}>
        <Router>
          <BoardContent />
        </Router>
      </Provider>
    );


describe('BoardContent Component', () => {
  it('renders correctly', async () => {
    renderComponent()
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {
        expect(screen.getByText('Hot Deal')).toBeInTheDocument();
    });
    await waitFor(() => {
      });
    await waitFor(() => {
        expect(screen.getByText('Thực phẩm tươi sống')).toBeInTheDocument();
      });
    expect(screen.getByText('NGUYÊN LIỆU NGON - CÔNG THỨC CHUẨN')).toBeInTheDocument();
    const links = screen.getAllByText('Xem thêm...');
    expect(links.length).toBeGreaterThan(0);
  });
});
