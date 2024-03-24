import React, { useState, useEffect } from 'react';


const ImageSlider = () => {
  const images = Array.from({ length: 100 }, (_, index) => `images/img${index + 1}.svg`);
  const delay = 250; // 1 second =1000

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, delay);

    return () => clearInterval(interval);
  }, [images.length]);

  const currentImage = images[currentImageIndex];

  return (
    <div>
      <img src={process.env.PUBLIC_URL + '/' + currentImage} alt="Image" />
    </div>
  );
};

export default ImageSlider;