"use client";

import React from "react";
import Image from "next/image";

interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: 1,
    icon: "/assets/images/icons/flower.svg", // Using flower.svg as substitute for peace.svg
    title: "You'll Feel Heard and Understood",
    description:
      "Our counselors listen with care, creating a space where you can express yourself freely — without judgment or pressure.",
  },
  {
    id: 2,
    icon: "/assets/images/icons/rose.svg",
    title: "Safe, Non-Judgmental Environment",
    description:
      "From your first session onward, we help you uncover patterns, build resilience, and make steady, meaningful progress",
  },
  {
    id: 3,
    icon: "/assets/images/icons/fan.svg",
    title: "Observe Real Progress with Real Change",
    description:
      "Investing in your mental health isn't a luxury — it's self-respect. You deserve the calm, clarity, and confidence that comes.",
  },
];

const Section5: React.FC = () => {
  return (
    <section
      className="section-spacing bg-[rgb(252,250,247)] py-8 sm:py-12 md:py-16 lg:py-20 mt-12 sm:mt-16 md:mt-20"
      style={{
        fontFamily:
          'var(--font-nunito), "Nunito", "Nunito Placeholder", sans-serif',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="text-center mb-6 sm:mb-8">
          <span
            className="inline-block px-4 py-2 rounded-full text-sm sm:text-base font-medium text-[rgb(13,5,3)]"
            style={{ backgroundColor: "rgba(225, 147, 125, 0.4)" }}
          >
            Why It&apos;s Worth It
          </span>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[rgb(13,5,3)]"
            style={{
              fontFamily:
                'var(--font-castoro), "Castoro", "Castoro Placeholder", serif',
            }}
          >
            What Makes Us Best
          </h2>
        </div>

        {/* Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`bg-white rounded-2xl p-6 sm:p-8 shadow-sm ${
                index === 1 ? "md:mt-8 lg:mt-12" : ""
              }`}
              style={{ backgroundColor: "rgb(255, 255, 255)" }}
            >
              {/* Icon */}
              <div className="flex justify-center mb-4 sm:mb-6">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={32}
                  height={32}
                  className="w-8 h-8 sm:w-10 sm:h-10"
                />
              </div>

              {/* Title */}
              <h3
                className="text-xl sm:text-2xl font-bold text-[rgb(13,5,3)] mb-4 sm:mb-6 text-center"
                style={{
                  fontFamily:
                    'var(--font-castoro), "Castoro", "Castoro Placeholder", serif',
                }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p
                className="text-base sm:text-lg text-[rgb(141,105,89)] leading-relaxed text-center"
                style={{
                  fontFamily:
                    'var(--font-nunito), "Nunito", "Nunito Placeholder", sans-serif',
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section5;
