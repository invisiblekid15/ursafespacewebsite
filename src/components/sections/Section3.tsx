"use client";

import React from "react";
import Image from "next/image";

interface TherapyService {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const therapyServices: TherapyService[] = [
  {
    id: 1,
    icon: "/assets/images/icons/heal.svg",
    title: "Individual Therapy",
    description:
      "Personalized one-on-one sessions to help you manage anxiety, depression, stress, or life transitions in a safe, judgment-free space.",
  },
  {
    id: 2,
    icon: "/assets/images/icons/sun.svg",
    title: "Couples Counseling",
    description:
      "Strengthen communication, rebuild trust, and navigate relationship challenges with the help of an experienced counselor.",
  },
  {
    id: 3,
    icon: "/assets/images/icons/rose.svg",
    title: "For Men",
    description:
      "Men's Counseling: Tailored sessions focusing on issues common to men, such as career pressures, emotional suppression, and relationship challenges, in a confidential and supportive environment.",
  },
  {
    id: 4,
    icon: "/assets/images/icons/fan.svg",
    title: "For Women",
    description:
      "Women's Counseling: Empathetic and confidential support for women navigating specific concerns like work-life balance, body image issues, postpartum depression, and family dynamics.",
  },
];

const Section3: React.FC = () => {
  return (
    <section
      className="section-spacing bg-[rgb(252,250,247)] py-8 sm:py-12 md:py-16 lg:py-20 mt-12 sm:mt-16 md:mt-20"
      style={{
        fontFamily:
          'var(--font-nunito), "Nunito", "Nunito Placeholder", sans-serif',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center lg:text-left mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[rgb(13,5,3)] mb-4 sm:mb-6"
            style={{
              fontFamily:
                'var(--font-castoro), "Castoro", "Castoro Placeholder", serif',
            }}
          >
            How we help you heal
          </h2>
          <p
            className="text-lg sm:text-xl text-[rgb(141,105,89)] max-w-4xl"
            style={{
              fontFamily:
                'var(--font-nunito), "Nunito", "Nunito Placeholder", sans-serif',
            }}
          >
            We offer compassionate and personalized mental health support to
            guide life&apos;s challenges.
          </p>
        </div>

        {/* Therapy Services List */}
        <div className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16">
          {therapyServices.map((service, index) => (
            <div key={service.id}>
              {/* Service Item */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start py-4 sm:py-6 md:py-8">
                {/* Left Column - Icon and Title */}
                <div className="flex items-start space-x-6 sm:space-x-8">
                  <div className="flex-shrink-0">
                    <Image
                      src={service.icon}
                      alt={service.title}
                      width={24}
                      height={24}
                      className="w-6 h-6 sm:w-8 sm:h-8"
                    />
                  </div>
                  <div>
                    <h3
                      className="text-xl sm:text-2xl lg:text-3xl font-bold text-[rgb(13,5,3)] mb-3 sm:mb-4"
                      style={{
                        fontFamily:
                          'var(--font-castoro), "Castoro", "Castoro Placeholder", serif',
                      }}
                    >
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Right Column - Description */}
                <div className="lg:pl-6">
                  <p
                    className="text-base sm:text-lg lg:text-xl text-[rgb(141,105,89)] leading-relaxed"
                    style={{
                      fontFamily:
                        'var(--font-nunito), "Nunito", "Nunito Placeholder", sans-serif',
                    }}
                  >
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Single separator between items (except after last) */}
              {index < therapyServices.length - 1 && (
                <hr className="border-t border-[rgb(141,105,89)] opacity-30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section3;
