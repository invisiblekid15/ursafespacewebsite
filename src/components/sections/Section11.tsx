"use client";

import { useState } from "react";
import { useContact } from "@/context/ContactContext";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What is Ursafespace?",
    answer:
      "Ursafespace is a service that helps you overcome your life challenges so that you live a fulfilling, passionate and healthy life.\n\nWe wanted everyone to get standardised and effective mental health support. The kind that fits their lifestyle, circumstance and schedule. So, we created flexible programs and self help tools using proven interventions, where you can be seen and understood.",
  },
  {
    question: "How Does It Work?",
    answer:
      "During our program you'll work with a trained professional therapist/counsellor/psychologist who can offer a wide variety of evidence-based therapeutic coaching. In between your sessions, you'll receive self help tools and exercises that target your specific needs and goals. In between your sessions, you'll receive weekly content with science based knowledge and exercises focused on your specific needs and goals.\n\nThe sessions with your dedicated Specialist will help you integrate what you learned into everyday life.",
  },
  {
    question: "Is this Therapy?",
    answer:
      "Great question! Ursafespace is not considered to be classic therapy. Our program uses elements of therapy, such as face-to-face meetings with trained professional therapists from various states, who can offer a wide variety of evidence-based coaching interventions. Differences between therapy and Ursafespace include the possibility of individual focused work, shorter sessions (thirty vs fifty minutes), and an emphasis on psychoeducation.",
  },
  {
    question: "How Long Does the Program Take?",
    answer:
      "That's up to you. We believe in a clear end game, so we divided our content into units we call Pathways, and we match you with the Pathway that suits your goals and needs. Most members take about 1-2 months with each Pathway, and they usually move on to at least one more once they are done.",
  },
];

// Custom Plus/Minus Icons
const PlusIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    />
  </svg>
);

const MinusIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18 12H6"
    />
  </svg>
);

export default function Section11() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { openContactForm } = useContact();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto">
          {/* Left Column - Info */}
          <div className="lg:pr-8">
            {/* Small Heading */}
            <div className="mb-4">
              <span
                className="text-sm md:text-base font-medium px-4 py-2 rounded-full text-gray-800"
                style={{ backgroundColor: "rgba(225, 147, 125, 0.4)" }}
              >
                Common Questions
              </span>
            </div>

            {/* Large Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Your Questions Answered
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Everything You Need to Know Before Starting Your Journey
            </p>
          </div>

          {/* Right Column - FAQs */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg transition-all duration-300 hover:shadow-md"
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-inset"
                  aria-expanded={openIndex === index}
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`flex-shrink-0 text-gray-500 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  >
                    {openIndex === index ? <MinusIcon /> : <PlusIcon />}
                  </div>
                </button>

                {/* Answer Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-4">
                    <div className="border-t border-gray-100 pt-4">
                      {faq.answer.split("\n\n").map((paragraph, pIndex) => (
                        <p
                          key={pIndex}
                          className="text-gray-700 leading-relaxed mb-4 last:mb-0"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 lg:mt-16">
          <p className="text-gray-600 mb-6">
            Still have questions? We're here to help.
          </p>
          <button
            onClick={() => openContactForm("support")}
            className="bg-orange-400 text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300"
          >
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}
