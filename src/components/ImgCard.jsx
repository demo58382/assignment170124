import React, { useState, useEffect } from "react";
import PhotoModal from "./PhotoModal"; // Make sure to provide the correct path to your PhotoModal component

function ImgCard({ image }) {
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const handleImageLoaded = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    // Handle error if image fails to load
    setLoading(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    if (modalVisible) {
      document.body.style.backgroundColor = 'gray';
    } else {
      document.body.style.backgroundColor = 'white';
    }

    // Cleanup function to reset the body style when the component unmounts
    return () => {
      document.body.style.backgroundColor = ''; // Reset to default on unmount
    };
  }, [modalVisible]);

  return (
    <>
      <div className="w-full bg-slate-200" onClick={openModal}>
        {loading && (
          <div className="flex items-center justify-center h-auto">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-900"></div>
          </div>
        )}
        <img
          src={image.webformatURL}
          alt=""
          className="w-full h-auto"
          onLoad={handleImageLoaded}
          onError={handleImageError}
          style={{ display: loading ? "none" : "block" }}
        />
        <p className="m-4 text-lg">
          <strong>Image by:</strong> {image.user}
        </p>
        <p className="m-4">
          <strong>Tags:</strong> {image.tags}
        </p>
        <p className="m-4">
          <strong>Resolution:</strong> {image.imageHeight} X {image.imageWidth}
        </p>
      </div>

      {modalVisible && (
        <PhotoModal photoData={image} closeModal={closeModal} />
      )}
    </>
  );
}

export default ImgCard;
