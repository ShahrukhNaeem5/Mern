import React from 'react';

const ImageComponent = ({ imageUrl, altText }) => {
  return (
<>

    {/* <div className="d-flex justify-content-center align-items-center">
      <img src={imageUrl} alt={altText} className="img-fluid" />
    </div> */}
    <div className="col-12 col-md-6 col-sm-12 d-flex justify-content-center align-items-center img-div">
      <img src={imageUrl} alt={altText} className="img-fluid" />
    </div> 
    </>


  );
};

export default ImageComponent;
