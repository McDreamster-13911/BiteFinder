
import React from "react";

const Shimmer = () => {
  return (
    <div className="shimmer-wrapper">
      {Array(20)
        .fill("")
        .map((_, index) => (
          <div key={index} className="shimmer-card">
            <div className="shimmer-image"></div>
            <div className="shimmer-details">
              <div className="shimmer-text title"></div>
              <div className="shimmer-text short"></div>
              <div className="shimmer-text short"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Shimmer;
