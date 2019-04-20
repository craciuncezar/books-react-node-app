import React from "react";
import imgOrganize from "../../assets/img/organize_books.png";
import imgDiscover from "../../assets/img/discover_books.png";
import imgShare from "../../assets/img/share_books.png";
import imgReview from "../../assets/img/review.png";

const HomeFeatures = () => {
  return (
    <div className="features-site-area">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-xl-3">
            <div className="card text-center">
              <img className="img-fluid" src={imgOrganize} alt="organize" />
              <div className="card-body">
                <p className="card-text">
                  Keep your reading list organized in one spot.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-3">
            <div className="card text-center">
              <img className="img-fluid" src={imgDiscover} alt="discover" />
              <div className="card-body">
                <p className="card-text">
                  Discover bestsellers and awarded books.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-3">
            <div className="card text-center">
              <img className="img-fluid" src={imgShare} alt="share" />
              <div className="card-body">
                <p className="card-text">
                  Recomandations based on your reading list books.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-3">
            <div className="card text-center">
              <img className="img-fluid" src={imgReview} alt="review" />
              <div className="card-body">
                <p className="card-text">
                  See others reviews and decide what to read next.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFeatures;
