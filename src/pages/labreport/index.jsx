import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getReports, uploadReport, downloadReport } from "./action";
import { FaPlus } from "react-icons/fa";
const LabReport = ({
  getReports,
  uploadReport,
  downloadReport,
  reports,
  loading,
}) => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    getReports();
  }, [getReports]);

  const handleUpload = () => {
    // e.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append("pdf", selectedFile);

      uploadReport(formData);
      setShowUploadForm(false);
      setSelectedFile(null);
    }
  };

  const handleDownload = (e, filename) => {
    // console.log(filename);
    e.preventDefault();
    downloadReport(filename);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Lab Reports
        </h1>

        {/* Upload Form */}
        {showUploadForm && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-white bg-opacity-40 ">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpload(selectedFile);
                setShowUploadForm(false);
              }}
              className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md mx-auto"
            >
              <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">
                Upload Lab Report
              </h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Select File
                </label>
                <input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  accept=".pdf,.doc,.docx"
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-800 hover:file:bg-blue-200"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowUploadForm(false)}
                  className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition disabled:opacity-50"
                >
                  {loading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reports Table */}
        <div className="bg-white rounded-xl shadow-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Report Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Uploaded Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.length === 0 ? (
                <tr>
                  <td colSpan="3" className="py-12 text-center">
                    <div className="flex flex-col items-center space-y-4">
                      {/* Inline SVG for Empty State */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 200 200"
                        className="w-64 h-64 text-blue-400"
                        fill="none"
                      >
                        <rect width="200" height="200" rx="20" fill="#EFF6FF" />
                        <g stroke="#3B82F6" strokeWidth="2">
                          <rect
                            x="50"
                            y="40"
                            width="100"
                            height="120"
                            rx="10"
                            fill="#ffffff"
                          />
                          <line x1="60" y1="60" x2="140" y2="60" />
                          <line x1="60" y1="75" x2="140" y2="75" />
                          <line x1="60" y1="90" x2="120" y2="90" />
                          <line x1="60" y1="105" x2="130" y2="105" />
                          <line x1="60" y1="120" x2="100" y2="120" />
                        </g>
                        {/* <path
    d="M150 130 L160 140 L150 150"
    stroke="#60A5FA"
    strokeWidth="4"
    strokeLinecap="round"
    fill="none"
  /> */}
                      </svg>

                      {/* Message */}
                      <p className="text-gray-500 text-lg">
                        No reports uploaded yet. Click the{" "}
                        <strong className="text-blue-600">+ button</strong> to
                        add one!
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                reports.map((report) => (
                  <tr key={report._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {report.filename}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={(e) => handleDownload(e, report.filename)}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Floating Upload Button */}
        <button
          onClick={() => setShowUploadForm(true)}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105"
          aria-label="Upload Report"
        >
          <FaPlus className="text-lg" />
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  reports: state.labReports.reports,
  loading: state.labReports.uploading,
});

const mapDispatchToProps = (dispatch) => ({
  getReports: () => dispatch(getReports()),
  uploadReport: (formData) => dispatch(uploadReport(formData)),
  downloadReport: (filename) => dispatch(downloadReport(filename)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LabReport);
