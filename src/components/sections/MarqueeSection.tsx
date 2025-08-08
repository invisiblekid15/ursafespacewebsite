"use client";

import React from "react";
import Image from "next/image";

const MarqueeSection = () => {
  const marqueeImages = [
    {
      src: "/assets/images/marquee/Bustle-modified-removebg-preview.png",
      alt: "Bustle",
      name: "Bustle",
    },
    {
      src: "/assets/images/marquee/Fatherly-removebg-preview.png",
      alt: "Fatherly",
      name: "Fatherly",
    },
    {
      src: "/assets/images/marquee/Healthline-modified-removebg-preview.png",
      alt: "Healthline",
      name: "Healthline",
    },
    {
      src: "/assets/images/marquee/Her Campus use-modified.png",
      alt: "Her Campus",
      name: "Her Campus",
    },
    {
      src: "/assets/images/marquee/Huffpost-modified-removebg-preview.png",
      alt: "HuffPost",
      name: "HuffPost",
    },
    {
      src: "/assets/images/marquee/Hum nutrition-modified.jpeg",
      alt: "Hum Nutrition",
      name: "Hum Nutrition",
    },
    {
      src: "/assets/images/marquee/InsideHook-modified.jpeg",
      alt: "InsideHook",
      name: "InsideHook",
    },
    {
      src: "/assets/images/marquee/Mindbodygreen-modified-removebg-preview.png",
      alt: "Mind Body Green",
      name: "Mind Body Green",
    },
    {
      src: "/assets/images/marquee/One Community-modified-modified.png",
      alt: "One Community",
      name: "One Community",
    },
    {
      src: "/assets/images/marquee/PsychCentral-modified-removebg-preview.png",
      alt: "Psych Central",
      name: "Psych Central",
    },
    {
      src: "/assets/images/marquee/Saatva-modified-removebg-preview.png",
      alt: "Saatva",
      name: "Saatva",
    },
    {
      src: "/assets/images/marquee/TLC-modified-removebg-preview.png",
      alt: "TLC",
      name: "TLC",
    },
    {
      src: "/assets/images/marquee/Verywellmind-modified-removebg-preview.png",
      alt: "Verywell Mind",
      name: "Verywell Mind",
    },
  ];

  return (
    <section className="w-full py-12 md:py-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            As Featured In
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by leading media outlets and wellness platforms
          </p>
        </div>

        <div className="relative">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 w-16 md:w-32 h-full bg-gradient-to-r from-gray-50 via-gray-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-16 md:w-32 h-full bg-gradient-to-l from-gray-50 via-gray-50 to-transparent z-10"></div>

          {/* Marquee container */}
          <div className="marquee-container">
            <div className="marquee-content">
              {/* First set of logos */}
              <div className="flex items-center space-x-8 md:space-x-12 lg:space-x-16">
                {marqueeImages.map((image, index) => (
                  <div
                    key={`first-${index}`}
                    className="flex-shrink-0 w-20 h-12 md:w-28 md:h-14 lg:w-32 lg:h-16 relative grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-contain filter drop-shadow-sm"
                      sizes="(max-width: 768px) 80px, (max-width: 1024px) 112px, 128px"
                    />
                  </div>
                ))}
              </div>

              {/* Duplicate set for seamless loop */}
              <div className="flex items-center space-x-8 md:space-x-12 lg:space-x-16 ml-8 md:ml-12 lg:ml-16">
                {marqueeImages.map((image, index) => (
                  <div
                    key={`second-${index}`}
                    className="flex-shrink-0 w-20 h-12 md:w-28 md:h-14 lg:w-32 lg:h-16 relative grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-contain filter drop-shadow-sm"
                      sizes="(max-width: 768px) 80px, (max-width: 1024px) 112px, 128px"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-container {
          width: 100%;
          overflow: hidden;
          mask-image: linear-gradient(
            to right,
            transparent,
            black 5%,
            black 95%,
            transparent
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 5%,
            black 95%,
            transparent
          );
        }

        .marquee-content {
          display: flex;
          animation: marquee 50s linear infinite;
          width: fit-content;
          will-change: transform;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-container:hover .marquee-content {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .marquee-content {
            animation-duration: 35s;
          }
        }

        @media (max-width: 640px) {
          .marquee-content {
            animation-duration: 30s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-content {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default MarqueeSection;
