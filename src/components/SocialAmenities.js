"use client"; // Ensures the component is treated as a client-side component

import { motion } from "framer-motion";
import Image from "next/image"; // Next.js Image component for optimized images

// Amenities Data Array with WebP images for better performance
const amenities = [
  { name: "Swimming Pool", icon: "/assets/images/swimming-pool-icon.webp" },
  { name: "BBQ Areas", icon: "/assets/images/bbq-icon.webp" },
  { name: "Parking Area", icon: "/assets/images/parking-icon.webp" },
  { name: "Kid's Play Area", icon: "/assets/images/kids-play-icon.webp" },
  { name: "Pet Area", icon: "/assets/images/pet-icon.webp" },
  { name: "Giant Chess Area", icon: "/assets/images/chess-icon.webp" },
  { name: "Landscape Areas", icon: "/assets/images/landscape-icon.webp" },
  { name: "Tennis Courts", icon: "/assets/images/tennis-icon.webp" },
  { name: "Gym", icon: "/assets/images/gym-icon.webp" },
  { name: "Seating Areas", icon: "/assets/images/seating-icon.webp" },
];

const SocialAmenities = () => {
  return (
    <section
      aria-labelledby="amenities-heading"
      className="text-center my-16 px-4 sm:px-6 lg:px-8"
    >
      <h2
        id="amenities-heading"
        className="text-3xl font-bold mb-6 text-customYellow dark:text-white"
      >
        Amenities
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
        {amenities.map((amenity, index) => (
          <motion.article
            key={index}
            className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileFocus={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            tabIndex={0} // Makes the element focusable for keyboard navigation
            aria-label={amenity.name}
          >
            {/* Amenity Icon */}
            <div className="relative w-16 h-16 mx-auto mb-4">
              <Image
                src={amenity.icon}
                alt={amenity.name}
                layout="fill" // Ensures the image fills the parent container
                objectFit="contain" // Maintains aspect ratio without cropping
                quality={75} // Balances image quality and performance
                loading="lazy" // Defers loading until the image is in the viewport
                sizes="(max-width: 640px) 100vw, 64px" // Responsive sizing
                className="transition-opacity duration-300"
              />
            </div>
            {/* Amenity Name */}
            <p className="text-lg font-semibold text-gray-800 dark:text-white">
              {amenity.name}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default SocialAmenities;
