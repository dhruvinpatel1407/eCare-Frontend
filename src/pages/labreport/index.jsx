import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getReports, uploadReport, downloadReport } from "./action";
import { FaPlus } from "react-icons/fa";
import { showMessage } from "../../utils/ToastMessage/ShowMessage";
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

  const handleUpload = async () => {
    // File type validation
    const allowedTypes = ["application/pdf"];
    if (!allowedTypes.includes(selectedFile.type)) {
      showMessage("error", "Only PDF files are allowed");
      return;
    }

    // File size validation (5MB = 5 * 1024 * 1024 bytes)
    const maxSize = 5 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      showMessage("error", "File size should not exceed 5MB");
      return;
    }

    if (selectedFile) {
      const formData = new FormData();
      formData.append("pdf", selectedFile);

      try {
        await uploadReport(formData);
        setShowUploadForm(false);
        await getReports();
        setSelectedFile(null);
      } catch (error) {
        console.error("Upload failed:", error);
      }
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
    <div className="bg-[#FFF2F2]">
    <div
      className="container mx-auto p-4 min-h-screen"
      style={{ backgroundColor: "#FFF2F2" }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#2D336B] mb-6 text-center">
          Lab Reports
        </h1>

        {/* Upload Form */}
        {showUploadForm && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-[#FFF2F2]/70">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await handleUpload(selectedFile);
                setShowUploadForm(false);
              }}
              className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md mx-auto"
            >
              <h2 className="text-xl font-semibold text-[#2D336B] mb-4 text-center">
                Upload Lab Report
              </h2>
              <div className="mb-4">
                <label className="block text-[#2D336B] text-sm font-medium mb-2">
                  Select File
                </label>
                <input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  accept=".pdf,.doc,.docx"
                  className="block w-full text-sm text-[#2D336B] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:font-medium file:bg-[#A9B5DF] file:text-[#2D336B] hover:file:bg-[#7886C7]/80"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowUploadForm(false)}
                  className="px-4 py-2 text-sm bg-[#A9B5DF] text-[#2D336B] hover:bg-[#7886C7] rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#7886C7] hover:bg-[#2D336B] text-white font-medium py-2 px-4 rounded-md transition disabled:opacity-50"
                >
                  {loading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reports Table */}
        <div className="bg-white rounded-xl shadow-md overflow-x-auto">
          <table
            className="min-w-full divide-y"
            style={{ borderColor: "#A9B5DF" }}
          >
            <thead style={{ backgroundColor: "#A9B5DF" }}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#2D336B] uppercase tracking-wider">
                  Report Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#2D336B] uppercase tracking-wider">
                  Uploaded Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#2D336B] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody
              className="bg-white divide-y"
              style={{ borderColor: "#A9B5DF" }}
            >
              {!loading && reports.length === 0 ? (
                <tr>
                  <td colSpan="3" className="py-12 text-center">
                    <div className="flex flex-col items-center space-y-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 200 200"
                        className="w-64 h-64"
                        fill="none"
                      >
                        <rect width="200" height="200" rx="20" fill="#A9B5DF" />
                        <g stroke="#2D336B" strokeWidth="2">
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
                      </svg>
                      <p className="text-[#2D336B] text-lg">
                        No reports uploaded yet. Click the{" "}
                        <strong className="text-[#7886C7]">+</strong> to
                        add one!
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                reports.map((report) => (
                  <tr key={report._id} className="hover:bg-[#A9B5DF]/20">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2D336B]">
                      {report.filename}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2D336B]/80">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={(e) => handleDownload(e, report.filename)}
                        className="text-[#7886C7] hover:underline text-sm font-medium"
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
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 bg-[#2D336B] hover:bg-[#7886C7] text-white p-4 rounded-full shadow-lg transition transform hover:scale-105"
          aria-label="Upload Report"
        >
          <FaPlus className="text-lg" />
        </button>
      </div>
    </div></div>
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
