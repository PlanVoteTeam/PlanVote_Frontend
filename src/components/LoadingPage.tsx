import React from "react";

interface LoadingPageProps {
  title1?: string;
  title2?: string;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ title1, title2 }) => {
  return (
    <section className="section">
      <div className="container">
        <div className="content">
          {/* Title of page */}
          <p className="title">
            <span>{title1}</span>
            <span className="has-text-primary	is-large is-lowercase">
              {title2}
            </span>
          </p>
          <progress className="progress is-large is-info" max="100">
            60%
          </progress>
        </div>
      </div>
    </section>
  );
};

export default LoadingPage;
