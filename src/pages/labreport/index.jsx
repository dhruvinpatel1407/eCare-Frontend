import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getReports, uploadReport, downloadReport } from "./action";

const LabReport = ({ getReports, uploadReport,downloadReport, reports, loading }) => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    getReports();
  }, [getReports]);
 
  const handleUpload = (e) => {
    e.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append("pdf", selectedFile);

      uploadReport(formData);
      setShowUploadForm(false);
      setSelectedFile(null);
    }
  };

  const handleDownload = (e,filename) => {
    // console.log(filename);
    e.preventDefault();
    downloadReport(filename);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Lab Reports</h1>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={() => setShowUploadForm(true)}
        >
          Upload Report
        </button>

        {showUploadForm && (
          <form onSubmit={handleUpload} className="mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Select File
                </label>
                <input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  accept=".pdf,.doc,.docx"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </form>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report Name
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uploaded By
                </th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uploaded Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {report.filename}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    {report.uploadedBy}
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={(e) => handleDownload(e,report.filename)}>
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
