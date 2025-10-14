import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { ToastProvider, useToast, toast } from '../Toast';

// Test component that uses the toast hook
function TestComponent() {
  const { showToast } = useToast();

  return (
    <div>
      <button
        onClick={() =>
          showToast({
            type: 'success',
            message: 'Success message',
            description: 'Success description',
          })
        }
      >
        Show Success Toast
      </button>
      <button
        onClick={() =>
          showToast({
            type: 'error',
            message: 'Error message',
            duration: 3000,
          })
        }
      >
        Show Error Toast
      </button>
      <button
        onClick={() =>
          showToast({
            type: 'info',
            message: 'Info message',
            action: {
              label: 'Undo',
              onClick: jest.fn(),
            },
          })
        }
      >
        Show Info Toast with Action
      </button>
    </div>
  );
}

describe('Toast', () => {
  beforeEach(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('shows toast when showToast is called', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    act(() => {
      const button = screen.getByText('Show Success Toast');
      fireEvent.click(button);
    });

    expect(screen.getByText('Success message')).toBeInTheDocument();
    expect(screen.getByText('Success description')).toBeInTheDocument();
  });

  it('shows multiple toasts', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    act(() => {
      fireEvent.click(screen.getByText('Show Success Toast'));
      fireEvent.click(screen.getByText('Show Error Toast'));
    });

    expect(screen.getByText('Success message')).toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('auto-dismisses toast after duration', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    act(() => {
      fireEvent.click(screen.getByText('Show Error Toast'));
    });
    
    expect(screen.getByText('Error message')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(screen.queryByText('Error message')).not.toBeInTheDocument();
    });
  });

  it('removes toast when close button is clicked', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Success Toast'));
    const closeButton = screen.getByLabelText('Close notification');
    fireEvent.click(closeButton);

    // Wait for exit animation
    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(screen.queryByText('Success message')).not.toBeInTheDocument();
    });
  });

  it('renders toast with action button', () => {
    const mockAction = jest.fn();
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Info Toast with Action'));
    
    expect(screen.getByText('Undo')).toBeInTheDocument();
  });

  it('closes toast when action is clicked', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Info Toast with Action'));
    const actionButton = screen.getByText('Undo');
    fireEvent.click(actionButton);

    // Wait for exit animation
    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(screen.queryByText('Info message')).not.toBeInTheDocument();
    });
  });

  it('respects maxToasts limit', () => {
    render(
      <ToastProvider maxToasts={2}>
        <TestComponent />
      </ToastProvider>
    );

    // Show 3 toasts
    fireEvent.click(screen.getByText('Show Success Toast'));
    fireEvent.click(screen.getByText('Show Error Toast'));
    fireEvent.click(screen.getByText('Show Info Toast with Action'));

    // Only 2 most recent should be visible
    expect(screen.queryByText('Success message')).not.toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.getByText('Info message')).toBeInTheDocument();
  });

  it('renders at different positions', () => {
    render(
      <ToastProvider position="top-center">
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Success Toast'));

    // Toast container is rendered via portal to document.body
    const toastContainer = document.body.querySelector('.container');
    expect(toastContainer).toHaveClass('top-center');
  });

  it('shows correct icons for different toast types', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Success Toast'));
    fireEvent.click(screen.getByText('Show Error Toast'));

    const toasts = screen.getAllByRole('alert');
    expect(toasts[0]).toHaveClass('success');
    expect(toasts[1]).toHaveClass('error');
  });

  it('closes toast on Escape key press', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Success Toast'));
    expect(screen.getByText('Success message')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });

    // Wait for exit animation
    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(screen.queryByText('Success message')).not.toBeInTheDocument();
    });
  });
});

describe('toast imperative API', () => {
  it('shows success toast', () => {
    const TestComponent = () => {
      return (
        <button onClick={() => toast.success('Success!')}>
          Show Toast
        </button>
      );
    };

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Toast'));

    expect(screen.getByText('Success!')).toBeInTheDocument();
  });
});