"use client";

import React from "react";
import Image from "next/image";
import AnimatedStats from "../ui/AnimatedStats";

const Section2: React.FC = () => {
  return (
    <section
      className="section-spacing bg-[rgb(252,250,247)] py-8 sm:py-12 md:py-16 lg:py-20 mt-8 sm:mt-12 md:mt-16 mb-8 sm:mb-12 md:mb-16"
      style={{
        fontFamily:
          'var(--font-nunito), "Nunito", "Nunito Placeholder", sans-serif',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            {/* Image Container with Background */}
            <div
              className="relative w-full rounded-2xl overflow-hidden p-6"
              style={{ backgroundColor: "rgb(248, 243, 236)" }}
            >
              <div className="relative">
                <Image
                  src="/assets/images/section_2/section_2_left.avif"
                  alt="Therapy session"
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover rounded-2xl"
                />

                {/* Heal and Renew Overlay - Inside Image */}
                <div className="absolute bottom-4 left-0 right-0 px-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Image
                        src="/assets/images/icons/heal.svg"
                        alt="Heal"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      <span
                        className="text-white font-semibold text-lg drop-shadow-lg"
                        style={{
                          fontFamily:
                            'var(--font-nunito), "Nunito", "Nunito Placeholder", sans-serif',
                        }}
                      >
                        Heal
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span
                        className="text-white font-semibold text-lg drop-shadow-lg"
                        style={{
                          fontFamily:
                            'var(--font-nunito), "Nunito", "Nunito Placeholder", sans-serif',
                        }}
                      >
                        Renew
                      </span>
                      <Image
                        src="/assets/images/icons/hourglass.svg"
                        alt="Hourglass"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div
              className="p-6 rounded-2xl"
              style={{ backgroundColor: "rgb(248, 243, 236)" }}
            >
              <h3
                className="text-2xl font-bold text-[rgb(13,5,3)] mb-4"
                style={{
                  fontFamily:
                    'var(--font-castoro), "Castoro", "Castoro Placeholder", serif',
                }}
              >
                Inside a Therapy Session
              </h3>
              <p
                className="text-[rgb(141,105,89)] text-base leading-relaxed"
                style={{
                  fontFamily:
                    'var(--font-nunito), "Nunito", "Nunito Placeholder", sans-serif',
                }}
              >
                Walkthrough of what to expect in a typical therapy session at
                UrSafeSpace.
              </p>
            </div>
          </div>

          {/* Middle and Right Columns - Combined Section */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Common Heading */}
            <div className="text-center lg:text-left px-2 sm:px-0">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-[rgb(13,5,3)] mb-4 sm:mb-6"
                style={{
                  fontFamily:
                    'var(--font-castoro), "Castoro", "Castoro Placeholder", serif',
                }}
              >
                Space to Talk
              </h2>
              <p
                className="text-lg sm:text-xl text-[rgb(141,105,89)] max-w-3xl"
                style={{
                  fontFamily:
                    'var(--font-nunito), "Nunito", "Nunito Placeholder", sans-serif',
                }}
              >
                At UrSafeSpace, we believe healing begins with feeling heard.
              </p>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
              {/* Animated Stats Column */}
              <div className="w-full h-[400px] sm:h-[500px]">
                <AnimatedStats />
              </div>

              {/* Right Image and Content */}
              <div className="relative w-full max-w-md ml-auto mt-6 lg:mt-0">
                {/* Background Container */}
                <div
                  className="relative rounded-2xl p-4 sm:p-6 min-h-[300px] sm:min-h-[400px]"
                  style={{ backgroundColor: "rgb(248, 243, 236)" }}
                >
                  {/* Text Overlay */}
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 space-y-1">
                    <h3
                      className="text-xl sm:text-2xl font-bold text-[rgb(13,5,3)]"
                      style={{
                        fontFamily:
                          'var(--font-castoro), "Castoro", "Castoro Placeholder", serif',
                      }}
                    >
                      Expert Care
                    </h3>
                    <p
                      className="text-base sm:text-lg text-[rgb(141,105,89)]"
                      style={{
                        fontFamily:
                          'var(--font-nunito), "Nunito", "Nunito Placeholder", sans-serif',
                      }}
                    >
                      Meet Our Counseling Team
                    </p>
                    <p
                      className="text-base sm:text-lg text-[rgb(141,105,89)]"
                      style={{
                        fontFamily:
                          'var(--font-nunito), "Nunito", "Nunito Placeholder", sans-serif',
                      }}
                    >
                      at UrSafeSpace
                    </p>
                    <div
                      className="space-y-0 text-[rgb(13,5,3)]"
                      style={{
                        fontFamily:
                          'var(--font-nunito), "Nunito", "Nunito Placeholder", sans-serif',
                      }}
                    >
                      <p className="font-bold text-3xl sm:text-4xl">12+</p>
                      <p className="font-semibold text-sm sm:text-base">
                        Licensed Counselors
                      </p>
                      <p className="font-bold text-3xl sm:text-4xl">50+</p>
                      <p className="font-semibold text-sm sm:text-base">
                        Years of Combined
                      </p>
                      <p className="font-semibold text-sm sm:text-base">
                        Experience
                      </p>
                    </div>
                  </div>

                  {/* Image - Bottom Right */}
                  <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-24 h-32 sm:w-32 sm:h-40">
                    <Image
                      src="/assets/images/section_2/section_2_right.avif"
                      alt="Counseling team"
                      width={96}
                      height={128}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;
