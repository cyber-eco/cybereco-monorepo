import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MyDataPage from '../page';
import { useRouter } from 'next/navigation';
import { useHubAuth } from '@/hooks/useHubAuth';
import { useLanguage } from '@cybereco/ui-components';
import { getHubFirestore, getHubAuth } from '@cybereco/firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore';

// Mock modules
jest.mock('next/navigation');
jest.mock('@/hooks/useHubAuth');
jest.mock('@cybereco/ui-components');
jest.mock('@cybereco/firebase-config', () => ({
  getHubFirestore: jest.fn(() => ({})),
  getHubAuth: jest.fn(() => ({
    currentUser: {
      getIdToken: jest.fn()
    }
  }))
}));
jest.mock('firebase/firestore');

// Mock fetch
global.fetch = jest.fn();
global.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
global.URL.revokeObjectURL = jest.fn();

describe('MyDataPage', () => {
  const mockUser = {
    id: 'test-user-123',
    email: 'test@example.com',
    displayName: 'Test User'
  };

  const mockPush = jest.fn();
  const mockT = jest.fn((key) => key);

  beforeEach(() => {
    jest.clearAllMocks();
    
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useLanguage as jest.Mock).mockReturnValue({ t: mockT });
    (useHubAuth as jest.Mock).mockReturnValue({
      userProfile: mockUser,
      isLoading: false
    });
    (getHubFirestore as jest.Mock).mockReturnValue({});
    (collection as jest.Mock).mockReturnValue({});
    (query as jest.Mock).mockReturnValue({});
    (where as jest.Mock).mockReturnValue({});
    (getDocs as jest.Mock).mockResolvedValue({ 
      docs: [],
      empty: true 
    });
  });

  describe('Export functionality', () => {
    it('should show export modal when export button is clicked', async () => {
      render(<MyDataPage />);
      
      await waitFor(() => {
        expect(screen.getByText('navigation.myData')).toBeInTheDocument();
      });

      const exportButton = screen.getByText('myData.exportData');
      fireEvent.click(exportButton);

      expect(screen.getByText('myData.exportDataTitle')).toBeInTheDocument();
      expect(screen.getByText('JSON')).toBeInTheDocument();
      expect(screen.getByText('CSV')).toBeInTheDocument();
    });

    it('should close modal when close button is clicked', async () => {
      render(<MyDataPage />);
      
      const exportButton = screen.getByText('myData.exportData');
      fireEvent.click(exportButton);

      expect(screen.getByText('myData.exportDataTitle')).toBeInTheDocument();

      const closeButton = screen.getByText('×');
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByText('myData.exportDataTitle')).not.toBeInTheDocument();
      });
    });

    it('should close modal when clicking overlay', async () => {
      render(<MyDataPage />);
      
      const exportButton = screen.getByText('myData.exportData');
      fireEvent.click(exportButton);

      const overlay = screen.getByText('myData.exportDataTitle').closest('.modalOverlay');
      fireEvent.click(overlay!);

      await waitFor(() => {
        expect(screen.queryByText('myData.exportDataTitle')).not.toBeInTheDocument();
      });
    });

    it('should handle successful JSON export', async () => {
      const mockBlob = new Blob(['{}'], { type: 'application/json' });
      (auth.currentUser?.getIdToken as jest.Mock).mockResolvedValue('mock-token');
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        blob: async () => mockBlob
      });

      // Mock document methods
      const mockLink = {
        href: '',
        download: '',
        click: jest.fn(),
        remove: jest.fn()
      };
      document.createElement = jest.fn(() => mockLink as any);
      document.body.appendChild = jest.fn();
      document.body.removeChild = jest.fn();

      render(<MyDataPage />);
      
      const exportButton = screen.getByText('myData.exportData');
      fireEvent.click(exportButton);

      const exportActionButton = screen.getByText('myData.export');
      fireEvent.click(exportActionButton);

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/export', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer mock-token',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            format: 'json',
            includeMetadata: true,
            dateRange: undefined
          })
        });
      });

      await waitFor(() => {
        expect(mockLink.click).toHaveBeenCalled();
        expect(mockLink.download).toMatch(/cybereco-data-export-.*\.json/);
      });
    });

    it('should handle successful CSV export', async () => {
      const mockBlob = new Blob(['email,name'], { type: 'text/csv' });
      (auth.currentUser?.getIdToken as jest.Mock).mockResolvedValue('mock-token');
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        blob: async () => mockBlob
      });

      render(<MyDataPage />);
      
      const exportButton = screen.getByText('myData.exportData');
      fireEvent.click(exportButton);

      // Select CSV format
      const csvRadio = screen.getByDisplayValue('csv');
      fireEvent.click(csvRadio);

      const exportActionButton = screen.getByText('myData.export');
      fireEvent.click(exportActionButton);

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/export', 
          expect.objectContaining({
            body: expect.stringContaining('"format":"csv"')
          })
        );
      });
    });

    it('should handle date range selection', async () => {
      (auth.currentUser?.getIdToken as jest.Mock).mockResolvedValue('mock-token');
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        blob: async () => new Blob(['{}'])
      });

      render(<MyDataPage />);
      
      const exportButton = screen.getByText('myData.exportData');
      fireEvent.click(exportButton);

      const dateInputs = screen.getAllByPlaceholderText(/date/i);
      fireEvent.change(dateInputs[0], { target: { value: '2024-01-01' } });
      fireEvent.change(dateInputs[1], { target: { value: '2024-01-31' } });

      const exportActionButton = screen.getByText('myData.export');
      fireEvent.click(exportActionButton);

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/export',
          expect.objectContaining({
            body: expect.stringContaining('"dateRange"')
          })
        );
      });
    });

    it('should handle metadata toggle', async () => {
      (auth.currentUser?.getIdToken as jest.Mock).mockResolvedValue('mock-token');
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        blob: async () => new Blob(['{}'])
      });

      render(<MyDataPage />);
      
      const exportButton = screen.getByText('myData.exportData');
      fireEvent.click(exportButton);

      const metadataCheckbox = screen.getByRole('checkbox');
      fireEvent.click(metadataCheckbox); // Uncheck it

      const exportActionButton = screen.getByText('myData.export');
      fireEvent.click(exportActionButton);

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/export',
          expect.objectContaining({
            body: expect.stringContaining('"includeMetadata":false')
          })
        );
      });
    });

    it('should show loading state during export', async () => {
      (auth.currentUser?.getIdToken as jest.Mock).mockResolvedValue('mock-token');
      (fetch as jest.Mock).mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve({
          ok: true,
          blob: async () => new Blob(['{}'])
        }), 100))
      );

      render(<MyDataPage />);
      
      const exportButton = screen.getByText('myData.exportData');
      fireEvent.click(exportButton);

      const exportActionButton = screen.getByText('myData.export');
      fireEvent.click(exportActionButton);

      expect(screen.getByText('myData.exporting')).toBeInTheDocument();
      expect(exportActionButton).toBeDisabled();

      await waitFor(() => {
        expect(screen.queryByText('myData.exporting')).not.toBeInTheDocument();
      });
    });

    it('should handle export errors', async () => {
      (auth.currentUser?.getIdToken as jest.Mock).mockResolvedValue('mock-token');
      (fetch as jest.Mock).mockResolvedValue({
        ok: false
      });

      // Mock alert
      global.alert = jest.fn();

      render(<MyDataPage />);
      
      const exportButton = screen.getByText('myData.exportData');
      fireEvent.click(exportButton);

      const exportActionButton = screen.getByText('myData.export');
      fireEvent.click(exportActionButton);

      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith('myData.exportError');
      });
    });

    it('should handle missing auth token', async () => {
      (auth.currentUser?.getIdToken as jest.Mock).mockResolvedValue(null);
      
      global.alert = jest.fn();

      render(<MyDataPage />);
      
      const exportButton = screen.getByText('myData.exportData');
      fireEvent.click(exportButton);

      const exportActionButton = screen.getByText('myData.export');
      fireEvent.click(exportActionButton);

      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith('myData.exportError');
      });

      expect(fetch).not.toHaveBeenCalled();
    });

    it('should update export count after successful export', async () => {
      (auth.currentUser?.getIdToken as jest.Mock).mockResolvedValue('mock-token');
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        blob: async () => new Blob(['{}'])
      });

      render(<MyDataPage />);

      // Initial export count should be 0
      await waitFor(() => {
        const exportMetric = screen.getByText('myData.dataExports')?.parentElement;
        expect(exportMetric).toHaveTextContent('0');
      });
      
      const exportButton = screen.getByText('myData.exportData');
      fireEvent.click(exportButton);

      const exportActionButton = screen.getByText('myData.export');
      fireEvent.click(exportActionButton);

      // After export, count should be 1
      await waitFor(() => {
        const exportMetric = screen.getByText('myData.dataExports')?.parentElement;
        expect(exportMetric).toHaveTextContent('1');
      });
    });
  });

  describe('Tab navigation', () => {
    it('should switch between tabs', async () => {
      render(<MyDataPage />);

      // Overview tab should be active by default
      expect(screen.getByText('myData.overview')).toHaveClass('activeTab');
      expect(screen.getByText('myData.quickActions')).toBeInTheDocument();

      // Click on Connections tab
      fireEvent.click(screen.getByText('myData.connections'));
      await waitFor(() => {
        expect(screen.getByText('myData.connections')).toHaveClass('activeTab');
      });

      // Click on Privacy tab
      fireEvent.click(screen.getByText('myData.privacy'));
      await waitFor(() => {
        expect(screen.getByText('myData.privacy')).toHaveClass('activeTab');
        expect(screen.getByText('myData.dataPrivacy')).toBeInTheDocument();
      });
    });
  });

  describe('User authentication', () => {
    it('should redirect to home if user is not authenticated', () => {
      (useHubAuth as jest.Mock).mockReturnValue({
        userProfile: null,
        isLoading: false
      });

      render(<MyDataPage />);

      expect(mockPush).toHaveBeenCalledWith('/');
    });

    it('should not redirect while loading', () => {
      (useHubAuth as jest.Mock).mockReturnValue({
        userProfile: null,
        isLoading: true
      });

      render(<MyDataPage />);

      expect(mockPush).not.toHaveBeenCalled();
    });
  });
});