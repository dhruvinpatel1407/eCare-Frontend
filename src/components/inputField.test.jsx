import { render, screen, fireEvent } from '@testing-library/react';
import InputField from './inputField';
import { describe, it, expect, vi } from 'vitest';

describe('InputField Component', () => {
  const mockProps = {
    label: 'Name',
    name: 'name',
    value: 'John',
    onChange: vi.fn(),
    placeholder: 'Enter your name',
    error: '',
    required: true,
  };

  it('renders label and input field correctly', () => {
    render(<InputField {...mockProps} />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your name/i)).toBeInTheDocument();
  });

  it('shows error message when error prop is provided', () => {
    render(<InputField {...mockProps} error="Required field" />);
    expect(screen.getByText(/Required field/i)).toBeInTheDocument();
  });

  it('calls onChange handler when value changes', () => {
    render(<InputField {...mockProps} />);
    fireEvent.change(screen.getByPlaceholderText(/Enter your name/i), {
      target: { value: 'Jane' },
    });
    expect(mockProps.onChange).toHaveBeenCalled();
  });
});
