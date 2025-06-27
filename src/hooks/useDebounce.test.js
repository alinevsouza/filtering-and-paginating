import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderHook, act } from '@testing-library/react';
import useDebounce from './useDebounce';

describe('useDebounce', () => {
  it('should update debounced value after delay', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: '', delay: 50 },
      },
    );

    act(() => {
      rerender({ value: 'test', delay: 50 });
    });

    expect(result.current).toBe('');

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(result.current).toBe('test');
  });

  it('should not update debounced value if value is the same', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 50 },
      },
    );

    expect(result.current).toBe('initial');

    act(() => {
      rerender({ value: 'initial', delay: 50 });
    });

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(result.current).toBe('initial');
  });
});