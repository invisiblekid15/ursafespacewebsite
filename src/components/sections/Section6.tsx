"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface AnimatedValue {
  id: number;
  text: string;
  position: string;
  backgroundColor: string;
  isVisible: boolean;
}

const values: AnimatedValue[] = [
  {
    id: 1,
    text: "Compassion",
    position: "top-left",
    backgroundColor: "rgb(141, 105, 89)",
    isVisible: false,
  },
  {
    id: 2,
    text: "Connection",
    position: "bottom-left",
    backgroundColor: "rgb(125, 164, 219)",
    isVisible: false,
  },
  {
    id: 3,
    text: "Empowerment",
    position: "bottom-right",
    backgroundColor: "rgb(225, 147, 125)",
    isVisible: false,
  },
  {
    id: 4,
    text: "Growth",
    position: "top-right",
    backgroundColor: "rgb(142, 152, 103)",
    isVisible: false,
  },
];

const Section6: React.FC = () => {
  const [animatedValues, setAnimatedValues] = useState(values);

  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate each value with a delay
          animatedValues.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedValues((prev) =>
                prev.map((value, i) =>
                  i === index ? { ...value, isVisible: true } : value,
                ),
              );
            }, index * 300); // 300ms delay between each animation
          });
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, animatedValues]);

  const getPositionClasses = (position: string, isVisible: boolean) => {
    const baseClasses = "absolute transition-all duration-1000 ease-out z-20";

    if (!isVisible) {
      switch (position) {
        case "top-left":
          return `${baseClasses} -top-32 -left-32 opacity-0 rotate-45`;
        case "bottom-left":
          return `${baseClasses} -bottom-32 -left-32 opacity-0 -rotate-45`;
        case "bottom-right":
          return `${baseClasses} -bottom-32 -right-32 opacity-0 rotate-45`;
        case "top-right":
          return `${baseClasses} -top-32 -right-32 opacity-0 -rotate-45`;
        default:
          return baseClasses;
      }
    }

    switch (position) {
      case "top-left":
        return `${baseClasses} -top-20 -left-20 sm:-top-24 sm:-left-24 opacity-100 rotate-45`;
      case "bottom-left":
        return `${baseClasses} -bottom-20 -left-20 sm:-bottom-24 sm:-left-24 opacity-100 -rotate-45`;
      case "bottom-right":
        return `${baseClasses} -bottom-20 -right-20 sm:-bottom-24 sm:-right-24 opacity-100 rotate-45`;
      case "top-right":
        return `${baseClasses} -top-20 -right-20 sm:-top-24 sm:-right-24 opacity-100 -rotate-45`;
      default:
        return baseClasses;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-spacing bg-[rgb(252,250,247)] py-8 sm:py-12 md:py-16 lg:py-20 mt-12 sm:mt-16 md:mt-20"
      style={{
        fontFamily:
          'var(--font-nunito), "Nunito", "Nunito Placeholder", sans-serif',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content with Inline Image */}
        <div className="relative text-center mb-8 sm:mb-12 md:mb-16">
          <div ref={textRef} className="relative inline-block">
            <p
              className="text-xl sm:text-2xl md:text-3xl text-[rgb(13,5,3)] leading-relaxed max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-4"
              style={{
                fontFamily:
                  'var(--font-nunito), "Nunito", "Nunito Placeholder", sans-serif',
              }}
            >
              <span>At UrSafeSpace,</span>
              <Image
                src="/assets/images/section_6/meditation.avif"
                alt="Meditation and mindfulness"
                width={80}
                height={60}
                className="w-16 h-12 sm:w-18 sm:h-14 md:w-20 md:h-16 object-cover rounded-lg inline-block"
              />
              <span>
                approach is more than professional — it&apos;s deeply personal.
                Our core values shape every session.
              </span>
            </p>

            {/* Animated Value Labels as Arrows pointing to entire text */}
            {animatedValues.map((value) => (
              <div
                key={value.id}
                className={getPositionClasses(value.position, value.isVisible)}
                style={{ backgroundColor: value.backgroundColor }}
              >
                <div className="relative">
                  <div className="px-3 py-1 sm:px-4 sm:py-2 text-white font-bold text-xs sm:text-sm rounded-md shadow-lg whitespace-nowrap">
                    <span
                      style={{
                        fontFamily:
                          'var(--font-castoro), "Castoro", "Castoro Placeholder", serif',
                      }}
                    >
                      {value.text}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section6;
