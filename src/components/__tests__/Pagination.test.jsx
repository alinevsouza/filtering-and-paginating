import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom'; 
import Pagination from '../Pagination';

describe('Pagination', () => {
  it('should render the pagination component with correct page numbers', () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />);

    expect(screen.getByText('Anterior')).toBeInTheDocument();
    expect(screen.getByText('Próximo')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toHaveClass('active');
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should call onPageChange with the correct page number when a page is clicked', () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />);

    fireEvent.click(screen.getAllByText('3')[0]); // Certifique-se de que deseja o primeiro botão com texto '3'
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('should disable the "Anterior" button when on the first page', () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);

    const anteriorButton = screen.getAllByText('Anterior')[0]; // Altere para o botão desejado
    expect(anteriorButton).toBeDisabled();
  });

  it('should disable the "Próximo" button when on the last page', () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={5} totalPages={5} onPageChange={onPageChange} />);

    const proximoButton = screen.getAllByText('Próximo')[0]; // Altere para o botão desejado
    expect(proximoButton).toBeDisabled();
  });

  it('should not render pagination when there is only one page', () => {
    const onPageChange = vi.fn();
    const { container } = render(<Pagination currentPage={1} totalPages={1} onPageChange={onPageChange} />);
    expect(container.firstChild).toBeNull();
  });
});