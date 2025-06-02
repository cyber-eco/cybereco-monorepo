import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Modal } from '../Modal';

describe('Modal', () => {
  it('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <div>Modal content</div>
      </Modal>
    );

    expect(screen.getByText('Modal content')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={jest.fn()}>
        <div>Modal content</div>
      </Modal>
    );

    expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
  });

  it('renders with title', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()} title="Test Modal">
        <div>Modal content</div>
      </Modal>
    );

    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby', 'modal-title');
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={onClose} title="Test Modal">
        <div>Modal content</div>
      </Modal>
    );

    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when overlay is clicked', () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Modal content</div>
      </Modal>
    );

    const overlay = screen.getByRole('dialog');
    fireEvent.click(overlay);

    expect(onClose).toHaveBeenCalled();
  });

  it('does not call onClose when modal content is clicked', () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Modal content</div>
      </Modal>
    );

    const modalContent = screen.getByText('Modal content');
    fireEvent.click(modalContent);

    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not call onClose on overlay click when closeOnOverlayClick is false', () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={onClose} closeOnOverlayClick={false}>
        <div>Modal content</div>
      </Modal>
    );

    const overlay = screen.getByRole('dialog').parentElement;
    fireEvent.click(overlay!);

    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose on Escape key press', () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Modal content</div>
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onClose).toHaveBeenCalled();
  });

  it('does not call onClose on Escape when closeOnEscape is false', () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={onClose} closeOnEscape={false}>
        <div>Modal content</div>
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={jest.fn()} size="small">
        <div>Modal content</div>
      </Modal>
    );

    const dialog = screen.getByRole('dialog');
    const modalDiv = dialog.children[0] as HTMLElement;
    expect(modalDiv).toHaveClass('small');

    rerender(
      <Modal isOpen={true} onClose={jest.fn()} size="large">
        <div>Modal content</div>
      </Modal>
    );

    const dialogLarge = screen.getByRole('dialog');
    const modalDivLarge = dialogLarge.children[0] as HTMLElement;
    expect(modalDivLarge).toHaveClass('large');
  });

  it('renders footer when provided', () => {
    render(
      <Modal 
        isOpen={true} 
        onClose={jest.fn()} 
        footer={<button>Save</button>}
      >
        <div>Modal content</div>
      </Modal>
    );

    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('hides close button when showCloseButton is false', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()} showCloseButton={false}>
        <div>Modal content</div>
      </Modal>
    );

    expect(screen.queryByLabelText('Close modal')).not.toBeInTheDocument();
  });

  it('applies custom class names', () => {
    render(
      <Modal 
        isOpen={true} 
        onClose={jest.fn()}
        className="custom-modal"
        overlayClassName="custom-overlay"
        contentClassName="custom-content"
        titleClassName="custom-title"
        title="Test Modal"
      >
        <div>Modal content</div>
      </Modal>
    );

    const dialog = screen.getByRole('dialog');
    const modalDiv = dialog.children[0] as HTMLElement;
    
    expect(dialog).toHaveClass('custom-overlay');
    expect(modalDiv).toHaveClass('custom-modal');
    expect(screen.getByText('Modal content').parentElement).toHaveClass('custom-content');
    expect(screen.getByText('Test Modal')).toHaveClass('custom-title');
  });

  it('focuses modal on open', async () => {
    const { rerender } = render(
      <Modal isOpen={false} onClose={jest.fn()}>
        <div>Modal content</div>
      </Modal>
    );

    rerender(
      <Modal isOpen={true} onClose={jest.fn()}>
        <div>Modal content</div>
      </Modal>
    );

    await waitFor(() => {
      const dialog = screen.getByRole('dialog');
      const modalDiv = dialog.children[0] as HTMLElement;
      expect(modalDiv).toHaveFocus();
    });
  });

  it('prevents body scroll when open', () => {
    const { unmount } = render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <div>Modal content</div>
      </Modal>
    );

    expect(document.body.style.overflow).toBe('hidden');

    unmount();

    expect(document.body.style.overflow).toBe('');
  });
});