"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface StatItem {
  id: number;
  percentage: string;
  title: string;
  description: string;
}

const stats: StatItem[] = [
  {
    id: 1,
    percentage: "95%",
    title: "Feeling Better in Just 3 Sessions",
    description:
      "Steps toward mental clarity and emotional peace. It's not just talk — it's progress.",
  },
  {
    id: 2,
    percentage: "150%",
    title: "Licensed Counselors",
    description:
      "Mental clarity and emotional peace aren't distant dreams real outcomes.",
  },
  {
    id: 3,
    percentage: "200%",
    title: "Feeling Better in Just 3 Sessions",
    description:
      "Talking through is important, but transformation happens through action.",
  },
  {
    id: 4,
    percentage: "300%",
    title: "Notice Improvement Within 3 Sessions",
    description:
      "We don't just offer conversations you toward tangible clarity emotional ease.",
  },
  {
    id: 5,
    percentage: "250%",
    title: "Years of Combined Experience",
    description:
      "We don't just offer conversations — we gui toward tangible clarity and emotional.",
  },
];

const AnimatedStats: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const currentStat = stats[currentIndex];
  const targetValue = parseInt(currentStat.percentage);

  // Use isVisible to control animations when component comes into view
  const shouldAnimate = isVisible;

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stats.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 },
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animate number when stat changes
  useEffect(() => {
    setAnimatedValue(0);

    const animationDuration = 1500;
    const steps = 60;
    const increment = targetValue / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps && shouldAnimate) {
        setAnimatedValue(Math.floor(increment * currentStep));
      } else {
        setAnimatedValue(targetValue);
        clearInterval(timer);
      }
    }, animationDuration / steps);

    return () => clearInterval(timer);
  }, [currentIndex, targetValue, shouldAnimate]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + stats.length) % stats.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % stats.length);
  };

  return (
    <div
      ref={componentRef}
      className="relative w-full h-full min-h-[400px] sm:min-h-[500px]"
    >
      {/* Background Image */}
      <div className="relative w-full h-full">
        <Image
          src="/assets/images/section_2/section_2_mid.avif"
          alt="Statistics background"
          width={400}
          height={500}
          className="w-full h-full min-h-[400px] sm:min-h-[500px] object-cover rounded-2xl"
          priority
        />

        {/* Top Overlay Icons */}
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20">
          <Image
            src="/assets/images/icons/bulb.svg"
            alt="Innovation"
            width={24}
            height={24}
            className="w-4 h-4 sm:w-6 sm:h-6 filter brightness-0 invert"
          />
        </div>

        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20">
          <div
            className="px-2 py-1 sm:px-3 sm:py-1 rounded-full text-black font-semibold text-xs sm:text-sm"
            style={{ backgroundColor: "rgb(252, 250, 247)" }}
          >
            This Year
          </div>
        </div>

        {/* Stats Content Overlay */}
        <div className="absolute inset-0 rounded-2xl flex flex-col justify-center items-start text-white p-4 sm:p-8 z-10">
          {/* Animated Percentage */}
          <div className="text-left mb-4 sm:mb-6 w-full max-w-md mx-2 sm:mx-8">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 text-white drop-shadow-2xl">
              +{animatedValue}%
            </div>
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-3 sm:mb-6 text-white drop-shadow-2xl">
              {currentStat.title}
            </div>
            <div className="text-xs sm:text-sm md:text-base text-white drop-shadow-2xl max-w-md text-left leading-relaxed">
              {currentStat.description}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center space-x-3 sm:space-x-6 mt-4 sm:mt-8 w-full">
            <button
              onClick={goToPrevious}
              className="w-8 h-8 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-xl border border-white/20 z-30"
              aria-label="Previous statistic"
            >
              <svg
                width="14"
                height="14"
                className="sm:w-[18px] sm:h-[18px]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15,18 9,12 15,6"></polyline>
              </svg>
            </button>

            {/* Progress Indicators */}
            <div className="flex space-x-2 sm:space-x-3">
              {stats.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all border ${
                    index === currentIndex
                      ? "bg-white border-white"
                      : "bg-white/60 border-white/60 hover:bg-white/80"
                  }`}
                  aria-label={`Go to statistic ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="w-8 h-8 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-xl border border-white/20 z-30"
              aria-label="Next statistic"
            >
              <svg
                width="14"
                height="14"
                className="sm:w-[18px] sm:h-[18px]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1a1a1a"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedStats;
