"use client";

import React from "react";
import Image from "next/image";
import Button from "../ui/Button";
import { useContact } from "@/context/ContactContext";

const Section4: React.FC = () => {
  const { openContactForm } = useContact();

  return (
    <section
      className="section-spacing py-8 sm:py-12 md:py-16 lg:py-20 mt-12 sm:mt-16 md:mt-20"
      style={{
        backgroundColor: "rgb(248, 243, 236)",
        fontFamily:
          'var(--font-nunito), "Nunito", "Nunito Placeholder", sans-serif',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Image */}
          <div className="order-2 lg:order-1">
            <Image
              src="/assets/images/section_4/section_4.avif"
              alt="Mental health support"
              width={600}
              height={500}
              className="w-full h-auto object-cover rounded-2xl"
            />
          </div>

          {/* Right Side - Content */}
          <div className="order-1 lg:order-2 space-y-6 sm:space-y-8">
            {/* Main Heading */}
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[rgb(13,5,3)] leading-tight"
              style={{
                fontFamily:
                  'var(--font-castoro), "Castoro", "Castoro Placeholder", serif',
              }}
            >
              Steps toward mental, emotional peace
            </h2>

            {/* Description */}
            <p
              className="text-lg sm:text-xl text-[rgb(141,105,89)] leading-relaxed"
              style={{
                fontFamily:
                  'var(--font-nunito), "Nunito", "Nunito Placeholder", sans-serif',
              }}
            >
              Personalized one-on-one sessions to help you manage anxiety,
              depression, stress, or life transitions in a safe, judgment-free
              space.
            </p>

            {/* Two Column Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 pt-4 sm:pt-6">
              {/* Left Column */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-3">
                  <Image
                    src="/assets/images/icons/bulb.svg"
                    alt="Therapy Session"
                    width={24}
                    height={24}
                    className="w-6 h-6 flex-shrink-0"
                  />
                  <h3
                    className="text-xl sm:text-2xl font-bold text-[rgb(13,5,3)]"
                    style={{
                      fontFamily:
                        'var(--font-castoro), "Castoro", "Castoro Placeholder", serif',
                    }}
                  >
                    Therapy Session
                  </h3>
                </div>
                <p
                  className="text-base sm:text-lg text-[rgb(141,105,89)] leading-relaxed"
                  style={{
                    fontFamily:
                      'var(--font-nunito), "Nunito", "Nunito Placeholder", sans-serif',
                  }}
                >
                  Walkthrough of what to expect in a typical therapy session
                  Minds.
                </p>
              </div>

              {/* Right Column */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-3">
                  <Image
                    src="/assets/images/icons/heal.svg"
                    alt="Observe Real Progress"
                    width={24}
                    height={24}
                    className="w-6 h-6 flex-shrink-0"
                  />
                  <h3
                    className="text-xl sm:text-2xl font-bold text-[rgb(13,5,3)]"
                    style={{
                      fontFamily:
                        'var(--font-castoro), "Castoro", "Castoro Placeholder", serif',
                    }}
                  >
                    Observe Real Progress
                  </h3>
                </div>
                <p
                  className="text-base sm:text-lg text-[rgb(141,105,89)] leading-relaxed"
                  style={{
                    fontFamily:
                      'var(--font-nunito), "Nunito", "Nunito Placeholder", sans-serif',
                  }}
                >
                  When you arrive—either in person or virtually—you&apos;ll be
                  environment.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4 sm:pt-6">
              <Button
                variant="primary"
                size="lg"
                className="text-lg sm:text-xl font-semibold"
                style={{
                  paddingTop: "0.5rem",
                  paddingBottom: "0.5rem",
                  paddingLeft: "0.5rem",
                  paddingRight: "0.5rem",
                }}
                onClick={() => openContactForm("appointment")}
              >
                Book an appointment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section4;
