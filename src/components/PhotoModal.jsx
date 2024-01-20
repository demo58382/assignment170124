import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const PhotoModal = ({ photoData, closeModal }) => {
  const {
    previewURL,
    webformatURL,
    largeImageURL,
    user,
    user_id,
    type,
    views,
    downloads,
    likes,
  } = photoData;

  const [selectedSize, setSelectedSize] = useState('small 640x960');

  const handleDownload = (size) => {
    let downloadUrl;

    switch (size) {
      case 'small 640x960':
        downloadUrl = previewURL;
        break;
      case 'medium 1920x2660':
        downloadUrl = webformatURL;
        break;
      case 'big 2400x3600':
        downloadUrl = largeImageURL;
        break;
      case 'original 3850x5640':
        downloadUrl = largeImageURL;
        break;
      default:
        downloadUrl = largeImageURL;
    }
  
    const downloadWindow = window.open(downloadUrl, '_blank');
    if (!downloadWindow) {
      console.error('Unable to open download window. Please check your browser settings.');
    }
  };

  return (
    <div className="fixed bottom-10 top-12 left-0 w-full flex justify-center items-center bg-black bg-opacity-0">
      <div className="bg-white p-8 rounded-lg max-w-3xl w-full h-full overflow-auto">

        {/* Close button */}
        <div className="mt-4 text-right">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={closeModal}
          >
            Close
          </button>
        </div>

        <div className="flex items-center">
          {/* Image on the left side */}
          <img src={webformatURL} alt="Preview" className="w-1/2 h-auto rounded" />

          {/* Download options on the right side */}
          <div className="w-1/2 ml-4">
            {/* Information about the photo */}
            <div>
              <p>User: {user}</p>
              <p>User ID: {user_id}</p>
              <p>Type: {type}</p>
              <p>Views: {views}</p>
              <p>Downloads: {downloads}</p>
              <p>Likes: {likes}</p>
            </div>

            <ul className="mb-4">
              {/* Download buttons with green tick */}
              {['small 640x960', 'medium 1920x2660', 'big 2400x3600', 'original 3850x5640'].map((size) => (
                <li
                  key={size}
                  className={`${
                    selectedSize === size
                      ? 'bg-gray-300 my-1 text-gray-800'
                      : 'bg-gray-100 my-1 text-gray-400 hover:bg-gray-200'
                  } px-4 py-2 rounded mr-2 flex items-center`}
                  onClick={() => setSelectedSize(size)}
                >
                  {`${size.charAt(0).toUpperCase() + size.slice(1)}`}
                  {selectedSize === size && (
                    <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />
                  )}
                </li>
              ))}
            </ul>

            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => handleDownload(selectedSize)}
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;
