import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FeatureForm from '../FeatureForm';
import '@testing-library/jest-dom';

describe('FeatureForm', () => {
  const mockOnSuccess = jest.fn();
  
  beforeEach(() => {
    global.fetch = jest.fn();
    mockOnSuccess.mockClear();
  });

  it('renders all form fields', () => {
    render(<FeatureForm onSuccess={mockOnSuccess} />);
    
    expect(screen.getByLabelText(/nom de la fonctionnalité/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/url de la ressource/i)).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    const mockResponse = {
      id: '1',
      name: 'Test Feature',
      description: 'Test Description',
      resourceUrl: 'https://test.com',
      createdAt: new Date().toISOString(),
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    render(<FeatureForm onSuccess={mockOnSuccess} />);
    
    fireEvent.change(screen.getByLabelText(/nom de la fonctionnalité/i), {
      target: { value: 'Test Feature' },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'Test Description' },
    });
    fireEvent.change(screen.getByLabelText(/url de la ressource/i), {
      target: { value: 'https://test.com' },
    });
    
    fireEvent.submit(screen.getByRole('button', { name: /ajouter/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/features', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Test Feature',
          description: 'Test Description',
          resourceUrl: 'https://test.com',
        }),
      });
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('displays error message on API failure', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    render(<FeatureForm onSuccess={mockOnSuccess} />);
    
    fireEvent.change(screen.getByLabelText(/nom de la fonctionnalité/i), {
      target: { value: 'Test Feature' },
    });
    fireEvent.submit(screen.getByRole('button', { name: /ajouter/i }));

    await waitFor(() => {
      expect(screen.getByText(/échec de l'ajout/i)).toBeInTheDocument();
    });
  });
});
