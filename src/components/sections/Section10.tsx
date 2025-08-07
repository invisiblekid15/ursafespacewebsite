"use client";

import { useState } from "react";
import { useContact } from "@/context/ContactContext";
// Custom Check Icon Component
const CheckIcon = () => (
  <svg
    className="w-3 h-3 text-green-600"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

interface PricingTier {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  isPopular?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Starter session",
    description: "Perfect for those exploring therapy for the first time.",
    monthlyPrice: 49,
    yearlyPrice: 39,
    features: [
      "Dedicated therapist",
      "Online or in-person",
      "Personalized goal-setting",
      "Access to client portal",
    ],
  },
  {
    name: "Growth session",
    description: "Perfect for those exploring therapy for the first time.",
    monthlyPrice: 89,
    yearlyPrice: 69,
    features: [
      "Dedicated therapist",
      "Online or in-person",
      "Personalized goal-setting",
      "Access to client portal",
    ],
    isPopular: true,
  },
  {
    name: "Complete session",
    description: "Perfect for those exploring therapy for the first time.",
    monthlyPrice: 229,
    yearlyPrice: 189,
    features: [
      "Dedicated therapist",
      "Online or in-person",
      "Personalized goal-setting",
      "Access to client portal",
    ],
  },
];

export default function Section10() {
  const [isYearly, setIsYearly] = useState(false);
  const { openContactForm } = useContact();

  return (
    <section className="w-full py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          {/* Badge */}
          <div className="inline-block mb-4">
            <span
              className="text-sm md:text-base font-medium px-4 py-2 rounded-full text-gray-800"
              style={{ backgroundColor: "rgba(225, 147, 125, 0.4)" }}
            >
              Therapy Pricing
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-8">
            Simple, Transparent Pricing
          </h2>

          {/* Monthly/Yearly Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span
              className={`text-sm md:text-base font-medium ${!isYearly ? "text-gray-900" : "text-gray-500"}`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300 ${
                isYearly ? "bg-orange-400" : "bg-gray-300"
              }`}
              aria-label="Toggle pricing period"
            >
              <div
                className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  isYearly ? "translate-x-7" : "translate-x-0.5"
                }`}
              />
            </button>
            <span
              className={`text-sm md:text-base font-medium ${isYearly ? "text-gray-900" : "text-gray-500"}`}
            >
              Yearly
              <span className="ml-1 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`relative bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl ${
                tier.isPopular ? "ring-2 ring-orange-400 scale-105" : ""
              }`}
            >
              {/* Popular Badge */}
              {tier.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-orange-400 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Tier Header */}
              <div className="text-center mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  {tier.name}
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  {tier.description}
                </p>
              </div>

              {/* Price */}
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl md:text-5xl font-bold text-gray-900">
                    ${isYearly ? tier.yearlyPrice : tier.monthlyPrice}
                  </span>
                  <span className="text-gray-500 ml-1 text-lg">/session</span>
                </div>
                {isYearly && (
                  <p className="text-sm text-gray-500 mt-2">
                    <span className="line-through">${tier.monthlyPrice}</span>{" "}
                    monthly
                  </p>
                )}
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <CheckIcon />
                    </div>
                    <span className="text-gray-700 text-sm md:text-base">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => openContactForm("appointment")}
                className={`w-full py-3 px-6 rounded-lg font-medium text-base transition-all duration-300 ${
                  tier.isPopular
                    ? "bg-orange-400 text-white hover:bg-orange-500 hover:scale-105"
                    : "bg-gray-900 text-white hover:bg-gray-800 hover:scale-105"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300`}
              >
                Book Your Session
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-12">
          <p className="text-gray-600 text-sm md:text-base">
            All plans include our satisfaction guarantee. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
