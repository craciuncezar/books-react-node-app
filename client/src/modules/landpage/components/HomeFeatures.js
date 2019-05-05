import React from "react";
import imgDiscover from "../../../assets/img/discover_books.png";
import imgOrganize from "../../../assets/img/organize_books.png";
import imgReview from "../../../assets/img/review.png";
import imgShare from "../../../assets/img/share_books.png";

const FeatureCard = ({ featureText, imgSrc }) => {
  return (
    <div className="col-md-6 col-xl-3">
      <div className="card">
        <img className="img-fluid" src={imgSrc} alt="feature-card" />
        <div className="card-body">
          <p className="card-text text-center">{featureText}</p>
        </div>
      </div>
    </div>
  );
};

const HomeFeatures = () => {
  return (
    <div className="features-site-area">
      <div className="container">
        <div className="row">
          <FeatureCard
            featureText="Keep your reading list organized in one spot."
            imgSrc={imgOrganize}
          />
          <FeatureCard
            featureText="Discover bestsellers and awarded books."
            imgSrc={imgDiscover}
          />
          <FeatureCard
            featureText="Recomandations based on your reading list books."
            imgSrc={imgShare}
          />
          <FeatureCard
            featureText="See others reviews and decide what to read next."
            imgSrc={imgReview}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeFeatures;
