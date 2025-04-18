import React, { Component } from "react";
import PropTypes from "prop-types";
import { FiAlertCircle } from "react-icons/fi";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.error("Error caught by getDerivedStateFromError:", error);
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
   
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.href = "/dashboard"; // Redirect to homepage
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
          <div 
            role="alert" 
            aria-live="assertive"
            className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 max-w-md text-center border border-gray-200 dark:border-gray-700"
          >
            <FiAlertCircle aria-hidden="true" className="text-red-500 text-5xl mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Something went wrong
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We're sorry, but an unexpected error has occurred. Please try again.
            </p>
            <button
              onClick={this.handleReload}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;