// src/components/MobileGallery.js

import Image from "next/image";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

// Mobile images array with parallax speed, src, and title
const MobileImagesBottom = [
  { src: "/assets/images/iphone_04.webp", title: "Audio Book 04", speed: 20 },
  { src: "/assets/images/iphone_05.webp", title: "Audio Book 05", speed: 10 },
];

const MobileImagesTop = [
  { src: "/assets/images/iphone_01.webp", title: "Audio Book 01", speed: 10 },
  { src: "/assets/images/iphone_02.webp", title: "Audio Book 02", speed: 20 },
  { src: "/assets/images/iphone_03.webp", title: "Audio Book 03", speed: 10 },
];

export const MobileGallery = () => {
  return (
    <ParallaxProvider>
      <div className="flex flex-col gap-4 md:gap-10 max-w-[1600px] mx-auto mt-24 md:mt-40 mb-24 md:mb-40 justify-center items-center overflow-hidden dark:bg-gray-800">
        {/* First Row: 2 Mobiles */}
        <div className="flex gap-4 md:gap-10">
          {MobileImagesBottom.map(({ src, title, speed }, index) => (
            <Parallax key={index} speed={speed}>
              <Image src={src} alt={title} width={279} height={576} />
            </Parallax>
          ))}
        </div>

        {/* Second Row: 3 Mobiles */}
        <div className="flex gap-4 md:gap-10 mt-4 md:mt-10">
          {MobileImagesTop.map(({ src, title, speed }, index) => (
            <Parallax key={index} speed={speed}>
              <Image src={src} alt={title} width={279} height={576} />
            </Parallax>
          ))}
        </div>
      </div>
    </ParallaxProvider>
  );
};

export default MobileGallery;
