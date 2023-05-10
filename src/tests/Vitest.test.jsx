import { describe, it, expect } from 'vitest';
import App from '../App';
import { act, render, screen } from '@testing-library/react';
import testData from '../../cypress/mocks/testData'
import mockFetch from './mocks/mockFetch';

describe('integration tests', () => {
  beforeEach(() => {
    global.fetch = vi.fn(mockFetch)
  })

  it('renders headline', async () => {
    await act(() => render(<App />));

    screen.debug();

    // check if App components renders headline
  });
});