"use client";

import React from "react";
import Image from "next/image";
import Button from "../ui/Button";
import { useContact } from "@/context/ContactContext";

const HeroSection: React.FC = () => {
  const { openContactForm } = useContact();

  return (
    <section
      className="hero-section hero-mobile-spacing bg-[rgb(252,250,247)] min-h-screen flex items-center py-12 pt-20 md:pt-20"
      style={{
        fontFamily:
          'var(--font-nunito), "Nunito", "Nunito Placeholder", sans-serif',
        paddingTop: "6rem",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 items-start">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-1 space-y-4 md:space-y-6 order-1 lg:order-1">
            {/* Rating Badge */}
            <div className="flex items-center mb-6">
              <div className="rating-badge flex items-center">
                <span className="text-yellow-400 text-lg">⭐</span>
                <span className="font-semibold">4.7 Rated</span>
              </div>
              <span
                className="text-[rgb(141,105,89)] font-medium flex items-center ml-3"
                style={{
                  fontFamily:
                    'var(--font-nunito), "Nunito", "Nunito Placeholder", sans-serif',
                }}
              >
                By Satisfied customers
              </span>
            </div>

            {/* Main Headline with Overlapping Effect - Split into 3 parts */}
            <div className="overlapping-headline">
              <div className="overlapping-text-part">
                <h1
                  className="hero-main-text text-[rgb(13,5,3)] leading-tight"
                  style={{
                    fontFamily:
                      'var(--font-castoro), "Castoro", "Castoro Placeholder", serif',
                  }}
                >
                  You Deserve to
                </h1>
              </div>
              <div className="overlapping-text-part">
                <h1
                  className="hero-main-text text-[rgb(13,5,3)] leading-tight"
                  style={{
                    fontFamily:
                      'var(--font-castoro), "Castoro", "Castoro Placeholder", serif',
                  }}
                >
                  Feel Better. Peace
                </h1>
              </div>
              <div className="overlapping-text-part">
                <h1
                  className="hero-main-text text-[rgb(13,5,3)] leading-tight"
                  style={{
                    fontFamily:
                      'var(--font-castoro), "Castoro", "Castoro Placeholder", serif',
                  }}
                >
                  Begins with Us
                </h1>
              </div>
            </div>

            {/* Description */}
            <div className="lg:mt-8" style={{ marginBottom: "2rem" }}>
              <p
                className="text-[rgb(141,105,89)] text-lg md:text-xl max-w-2xl leading-relaxed"
                style={{
                  fontFamily:
                    'var(--font-nunito), "Nunito", "Nunito Placeholder", sans-serif',
                }}
              >
                We offer compassionate and personalized mental health support to
                guide life&apos;s challenges.
              </p>
            </div>

            {/* CTA Button */}
            <div
              className="flex justify-center"
              style={{ marginTop: "2rem", marginBottom: "2rem" }}
            >
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

            {/* Testimonial Section */}
            <div
              className="flex items-center space-x-4"
              style={{ marginTop: "2rem" }}
            >
              <div className="profile-images flex flex-shrink-0">
                <Image
                  src="/assets/images/section_1/section_1_left_1.avif"
                  alt="Customer testimonial"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white object-cover"
                />
                <Image
                  src="/assets/images/section_1/Section_1_left_2.avif"
                  alt="Customer testimonial"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white object-cover -ml-1"
                />
                <Image
                  src="/assets/images/section_1/Section_1_Left_3.avif"
                  alt="Customer testimonial"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white object-cover -ml-1"
                />
              </div>
              <div
                className="text-[rgb(141,105,89)] flex-1"
                style={{
                  fontFamily:
                    'var(--font-nunito), "Nunito", "Nunito Placeholder", sans-serif',
                }}
              >
                <span className="font-semibold text-[rgb(13,5,3)]">300+</span>
                <span className="ml-1">
                  Individuals who have trusted UrSafeSpace
                </span>
              </div>
            </div>
          </div>

          {/* Middle Column - Hero Image with Features */}
          <div className="lg:col-span-1 flex flex-col items-center space-y-4 md:space-y-6 order-2 lg:order-2">
            {/* Main Hero Image with Overlays */}
            <div className="hero-image-container relative">
              <Image
                src="/assets/images/section_1/section_1_mid.avif"
                alt="Mental wellness professional"
                width={400}
                height={500}
                className="w-full h-auto rounded-2xl object-cover shadow-lg"
              />

              {/* Healthy Mind Overlay */}
              <div className="hero-image-overlay">
                <div className="healthy-mind-badge">
                  <span className="text-sm md:text-base">Healthy Mind</span>
                  <div className="healthy-mind-arrow"></div>
                </div>
              </div>

              {/* Feature Overlay Items Inside Image */}
              <div className="feature-overlay">
                {/* Mental wellness */}
                <div className="feature-overlay-item">
                  <Image
                    src="/assets/images/icons/flower.svg"
                    alt="Mental wellness"
                    width={16}
                    height={16}
                  />
                  <span className="feature-overlay-text">Mental wellness</span>
                </div>

                {/* Built on trust */}
                <div className="feature-overlay-item">
                  <Image
                    src="/assets/images/icons/rose.svg"
                    alt="Built on trust"
                    width={16}
                    height={16}
                  />
                  <span className="feature-overlay-text">Built on trust</span>
                </div>

                {/* Start your healing journey */}
                <div className="feature-overlay-item">
                  <Image
                    src="/assets/images/icons/fan.svg"
                    alt="Start your healing journey"
                    width={16}
                    height={16}
                  />
                  <span className="feature-overlay-text">
                    Start healing journey
                  </span>
                </div>

                {/* Heal */}
                <div className="feature-overlay-item">
                  <Image
                    src="/assets/images/icons/heal.svg"
                    alt="Heal"
                    width={16}
                    height={16}
                  />
                  <span className="feature-overlay-text">Heal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Peace Section */}
          <div className="lg:col-span-1 flex flex-col space-y-6 order-3 lg:order-3 mt-8 lg:mt-0">
            {/* Primary Heading */}
            <h2
              className="text-3xl md:text-4xl font-bold text-[rgb(13,5,3)] leading-tight"
              style={{
                fontFamily:
                  'var(--font-castoro), "Castoro", "Castoro Placeholder", serif',
              }}
            >
              You Deserve Peace
            </h2>

            {/* Description */}
            <p
              className="text-[rgb(141,105,89)] text-lg leading-relaxed"
              style={{
                fontFamily:
                  'var(--font-nunito), "Nunito", "Nunito Placeholder", sans-serif',
              }}
            >
              We offer compassionate, personalized mental health support.
            </p>

            {/* Image with Renew Text */}
            <div className="relative w-full max-w-md">
              <Image
                src="/assets/images/section_1/Section_1_right.avif"
                alt="Mental health support"
                width={400}
                height={300}
                className="w-full h-auto rounded-2xl object-cover shadow-lg"
              />

              {/* Renew Text Overlay */}
              <div className="absolute top-4 right-4">
                <div className="renew-overlay">
                  <Image
                    src="/assets/images/icons/hourglass.svg"
                    alt="Hourglass"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                  <span
                    className="font-semibold text-sm text-white"
                    style={{
                      paddingRight: "0.5rem",
                      fontFamily:
                        'var(--font-nunito), "Nunito", "Nunito Placeholder", sans-serif',
                    }}
                  >
                    Renew
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
