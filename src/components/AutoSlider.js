import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';

const AutoSlider = ({ images = [], duration = 30 }) => {
  const [isPaused, setIsPaused] = useState(false);

  const sliderStyle = useMemo(
    () => ({
      animationDuration: `${duration}s`,
      animationPlayState: isPaused ? 'paused' : 'running',
    }),
    [duration, isPaused]
  );

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <section
      className="slider-container h-72 mt-10 overflow-hidden flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="flex gap-5 cursor-pointer animate-swipe"
        style={sliderStyle}
      >
        {images.map((image, index) => (
          <div key={index} className="flex flex-col items-center flex-shrink-0">
            <Image
              src={image.src}
              alt={image.alt || `Slide ${index + 1}`}
              width={208}
              height={208}
              className="w-52 h-52 object-cover rounded-md"
              quality={75}
              // Apply priority to the first two images, and lazy load the others
              priority={index < 2 ? true : false}
              loading={index >= 2 ? 'lazy' : undefined}
            />
          </div>
        ))}
      </div>
      <style jsx>{`
        .animate-swipe {
          animation: swipe ${duration}s linear infinite;
        }
        @keyframes swipe {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </section>
  );
};

AutoSlider.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
    })
  ).isRequired,
  duration: PropTypes.number,
};

AutoSlider.defaultProps = {
  duration: 30,
};

export default React.memo(AutoSlider);
