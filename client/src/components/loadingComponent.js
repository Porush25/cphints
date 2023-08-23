import React from "react";
import "./loadingComponent.css";

const LoadingSpinner = ({ height = "350px" }) => {
  return (
    <div className="spinner-container" style={{ height: height }}>
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
