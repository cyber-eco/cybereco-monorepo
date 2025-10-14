import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import SignIn from '../page';
import { useHubAuth } from '@/hooks/useHubAuth';
import { twoFactorService } from '@cybereco/auth';

// Mock dependencies
jest.mock('next/navigation');
jest.mock('@/hooks/useHubAuth');
jest.mock('@cybereco/auth', () => ({
  ...jest.requireActual('@cybereco/auth'),
  twoFactorService: {
    isEnabled: jest.fn(),
    verifyToken: jest.fn()
  }
}));
jest.mock('@cybereco/ui-components', () => ({
  useLanguage: () => ({ t: (key: string) => key })
}));

describe('SignIn Page with 2FA', () => {
  const mockPush = jest.fn();
  const mockSignIn = jest.fn();
  const mockSignInWithProvider = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush
    });
    
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(null)
    });
    
    (useHubAuth as jest.Mock).mockReturnValue({
      userProfile: null,
      isLoading: false,
      signIn: mockSignIn,
      signInWithProvider: mockSignInWithProvider
    });
  });

  describe('Basic Sign In', () => {
    it('should render sign in form', () => {
      render(<SignIn />);
      
      expect(screen.getByLabelText(/auth.email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/auth.password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /auth.signIn/i })).toBeInTheDocument();
    });

    it('should handle sign in without 2FA', async () => {
      const mockUser = { uid: 'user123', email: 'test@example.com' };
      mockSignIn.mockResolvedValue({ user: mockUser });
      (twoFactorService.isEnabled as jest.Mock).mockResolvedValue(false);

      render(<SignIn />);
      
      const emailInput = screen.getByLabelText(/auth.email/i);
      const passwordInput = screen.getByLabelText(/auth.password/i);
      const submitButton = screen.getByRole('button', { name: /auth.signIn/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123');
        expect(twoFactorService.isEnabled).toHaveBeenCalledWith('user123');
      });
    });
  });

  describe('2FA Flow', () => {
    it('should show 2FA verification form when user has 2FA enabled', async () => {
      const mockUser = { uid: 'user123', email: 'test@example.com' };
      mockSignIn.mockResolvedValue({ user: mockUser });
      (twoFactorService.isEnabled as jest.Mock).mockResolvedValue(true);

      render(<SignIn />);
      
      const emailInput = screen.getByLabelText(/auth.email/i);
      const passwordInput = screen.getByLabelText(/auth.password/i);
      const submitButton = screen.getByRole('button', { name: /auth.signIn/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/auth.twoFactorVerification/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/auth.verificationCode/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /auth.verify/i })).toBeInTheDocument();
      });
    });

    it('should handle 2FA verification success', async () => {
      const mockUser = { uid: 'user123', email: 'test@example.com' };
      mockSignIn.mockResolvedValue({ user: mockUser });
      (twoFactorService.isEnabled as jest.Mock).mockResolvedValue(true);
      (twoFactorService.verifyToken as jest.Mock).mockResolvedValue(true);

      render(<SignIn />);
      
      // First, sign in
      const emailInput = screen.getByLabelText(/auth.email/i);
      const passwordInput = screen.getByLabelText(/auth.password/i);
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(screen.getByRole('button', { name: /auth.signIn/i }));

      // Wait for 2FA form
      await waitFor(() => {
        expect(screen.getByLabelText(/auth.verificationCode/i)).toBeInTheDocument();
      });

      // Enter 2FA code
      const codeInput = screen.getByLabelText(/auth.verificationCode/i);
      const verifyButton = screen.getByRole('button', { name: /auth.verify/i });
      
      fireEvent.change(codeInput, { target: { value: '123456' } });
      fireEvent.click(verifyButton);

      await waitFor(() => {
        expect(twoFactorService.verifyToken).toHaveBeenCalledWith('user123', '123456');
      });
    });

    it('should handle 2FA verification failure', async () => {
      const mockUser = { uid: 'user123', email: 'test@example.com' };
      mockSignIn.mockResolvedValue({ user: mockUser });
      (twoFactorService.isEnabled as jest.Mock).mockResolvedValue(true);
      (twoFactorService.verifyToken as jest.Mock).mockResolvedValue(false);

      render(<SignIn />);
      
      // Sign in first
      fireEvent.change(screen.getByLabelText(/auth.email/i), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByLabelText(/auth.password/i), { target: { value: 'password123' } });
      fireEvent.click(screen.getByRole('button', { name: /auth.signIn/i }));

      // Wait for 2FA form
      await waitFor(() => {
        expect(screen.getByLabelText(/auth.verificationCode/i)).toBeInTheDocument();
      });

      // Enter invalid code
      fireEvent.change(screen.getByLabelText(/auth.verificationCode/i), { target: { value: '000000' } });
      fireEvent.click(screen.getByRole('button', { name: /auth.verify/i }));

      await waitFor(() => {
        expect(screen.getByText(/Invalid verification code/i)).toBeInTheDocument();
      });
    });

    it('should allow going back to sign in from 2FA', async () => {
      const mockUser = { uid: 'user123', email: 'test@example.com' };
      mockSignIn.mockResolvedValue({ user: mockUser });
      (twoFactorService.isEnabled as jest.Mock).mockResolvedValue(true);

      render(<SignIn />);
      
      // Sign in
      fireEvent.change(screen.getByLabelText(/auth.email/i), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByLabelText(/auth.password/i), { target: { value: 'password123' } });
      fireEvent.click(screen.getByRole('button', { name: /auth.signIn/i }));

      // Wait for 2FA form
      await waitFor(() => {
        expect(screen.getByText(/auth.backToSignIn/i)).toBeInTheDocument();
      });

      // Click back button
      fireEvent.click(screen.getByText(/auth.backToSignIn/i));

      await waitFor(() => {
        expect(screen.getByLabelText(/auth.email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/auth.password/i)).toBeInTheDocument();
      });
    });

    it('should only accept 6-digit codes', async () => {
      const mockUser = { uid: 'user123', email: 'test@example.com' };
      mockSignIn.mockResolvedValue({ user: mockUser });
      (twoFactorService.isEnabled as jest.Mock).mockResolvedValue(true);

      render(<SignIn />);
      
      // Sign in
      fireEvent.change(screen.getByLabelText(/auth.email/i), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByLabelText(/auth.password/i), { target: { value: 'password123' } });
      fireEvent.click(screen.getByRole('button', { name: /auth.signIn/i }));

      // Wait for 2FA form
      await waitFor(() => {
        expect(screen.getByLabelText(/auth.verificationCode/i)).toBeInTheDocument();
      });

      const codeInput = screen.getByLabelText(/auth.verificationCode/i) as HTMLInputElement;
      const verifyButton = screen.getByRole('button', { name: /auth.verify/i });

      // Try entering non-numeric characters
      fireEvent.change(codeInput, { target: { value: 'abc123' } });
      expect(codeInput.value).toBe('123'); // Only numbers

      // Verify button should be disabled for less than 6 digits
      fireEvent.change(codeInput, { target: { value: '12345' } });
      expect(verifyButton).toBeDisabled();

      // Verify button should be enabled for 6 digits
      fireEvent.change(codeInput, { target: { value: '123456' } });
      expect(verifyButton).not.toBeDisabled();
    });
  });

  describe('Social Sign In', () => {
    it('should handle social sign in providers', async () => {
      render(<SignIn />);
      
      const googleButton = screen.getByRole('button', { name: /auth.continueWithGoogle/i });
      fireEvent.click(googleButton);

      await waitFor(() => {
        expect(mockSignInWithProvider).toHaveBeenCalledWith('google');
      });
    });
  });

  describe('Authenticated User Redirect', () => {
    it('should redirect authenticated users', () => {
      (useHubAuth as jest.Mock).mockReturnValue({
        userProfile: { id: 'user123', email: 'test@example.com' },
        isLoading: false,
        signIn: mockSignIn,
        signInWithProvider: mockSignInWithProvider
      });

      render(<SignIn />);
      
      expect(screen.getByText(/hub.loading/i)).toBeInTheDocument();
    });
  });
});