import {
    getReports,
    uploadReport,
    downloadReport,
  } from './action'; // adjust the path as needed
  import { describe, it, expect, vi, beforeEach } from 'vitest';
  import {
    GET_REPORTS_REQUEST,
    GET_REPORTS_SUCCESS,
    GET_REPORTS_FAILURE,
    UPLOAD_REPORT_REQUEST,
    UPLOAD_REPORT_SUCCESS,
    UPLOAD_REPORT_FAILURE,
    DOWNLOAD_REPORT_REQUEST,
    DOWNLOAD_REPORT_SUCCESS,
    DOWNLOAD_REPORT_FAILURE
  } from './action';
  
  import { showMessage } from '../../utils/ToastMessage/ShowMessage';
  
  vi.mock('../../utils/ToastMessage/ShowMessage', () => ({
    showMessage: vi.fn(),
  }));
  
  global.fetch = vi.fn();
  
  describe('LabReport Actions', () => {
    const dispatch = vi.fn();
  
    beforeEach(() => {
      vi.clearAllMocks();
      localStorage.setItem('token', 'mocked_token');
    });
  
    it('dispatches GET_REPORTS_SUCCESS on successful report fetch', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [{ id: 1, name: 'report.pdf' }],
      });
  
      await getReports()(dispatch);
      expect(dispatch).toHaveBeenCalledWith({ type: GET_REPORTS_REQUEST });
      expect(dispatch).toHaveBeenCalledWith({
        type: GET_REPORTS_SUCCESS,
        payload: [{ id: 1, name: 'report.pdf' }],
      });
    });
  
    it('dispatches GET_REPORTS_FAILURE on failed report fetch', async () => {
      fetch.mockResolvedValueOnce({ ok: false });
  
      await getReports()(dispatch);
      expect(dispatch).toHaveBeenCalledWith({ type: GET_REPORTS_REQUEST });
      expect(dispatch).toHaveBeenCalledWith({
        type: GET_REPORTS_FAILURE,
        payload: 'Failed to fetch reports',
      });
    });
  
    it('dispatches UPLOAD_REPORT_SUCCESS on successful upload', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ name: 'uploaded.pdf' }),
      });
  
      const formData = new FormData();
      formData.append('file', new Blob(['test'], { type: 'application/pdf' }), 'test.pdf');
  
      await uploadReport(formData)(dispatch);
      expect(dispatch).toHaveBeenCalledWith({ type: UPLOAD_REPORT_REQUEST });
      expect(dispatch).toHaveBeenCalledWith({
        type: UPLOAD_REPORT_SUCCESS,
        payload: { name: 'uploaded.pdf' },
      });
      expect(showMessage).toHaveBeenCalledWith('success', 'Report uploaded successfully!');
    });
  
    it('dispatches UPLOAD_REPORT_FAILURE on failed upload', async () => {
      fetch.mockResolvedValueOnce({ ok: false });
  
      const formData = new FormData();
      formData.append('file', new Blob(['test'], { type: 'application/pdf' }), 'test.pdf');
  
      await uploadReport(formData)(dispatch);
      expect(dispatch).toHaveBeenCalledWith({ type: UPLOAD_REPORT_REQUEST });
      expect(dispatch).toHaveBeenCalledWith({
        type: UPLOAD_REPORT_FAILURE,
        payload: 'Failed to upload report',
      });
      expect(showMessage).toHaveBeenCalledWith('error', 'Failed to upload report');
    });
  
    it('dispatches DOWNLOAD_REPORT_SUCCESS on successful download', async () => {
      const blob = new Blob(['file content'], { type: 'application/pdf' });
      fetch.mockResolvedValueOnce({
        ok: true,
        blob: async () => blob,
      });
  
      // Mock document.createElement and appendChild
      const clickMock = vi.fn();
      document.createElement = vi.fn().mockReturnValue({
        href: '',
        download: '',
        click: clickMock,
        setAttribute: vi.fn(),
      });
      document.body.appendChild = vi.fn();
      document.body.removeChild = vi.fn();
      window.URL.createObjectURL = vi.fn(() => 'blob:url');
      window.URL.revokeObjectURL = vi.fn();
  
      await downloadReport('report.pdf')(dispatch);
      expect(dispatch).toHaveBeenCalledWith({ type: DOWNLOAD_REPORT_REQUEST });
      expect(dispatch).toHaveBeenCalledWith({
        type: DOWNLOAD_REPORT_SUCCESS,
        payload: blob,
      });
      expect(showMessage).toHaveBeenCalledWith('success', 'Report downloaded successfully!');
      expect(clickMock).toHaveBeenCalled();
    });
  
    it('dispatches DOWNLOAD_REPORT_FAILURE on failed download', async () => {
      fetch.mockResolvedValueOnce({ ok: false });
  
      await downloadReport('invalid.pdf')(dispatch);
      expect(dispatch).toHaveBeenCalledWith({ type: DOWNLOAD_REPORT_REQUEST });
      expect(dispatch).toHaveBeenCalledWith({
        type: DOWNLOAD_REPORT_FAILURE,
        payload: 'Failed to download report',
      });
      expect(showMessage).toHaveBeenCalledWith('error', 'Failed to download report');
    });
  });
  