"use client";

import React from "react";
import Link from "next/link";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";

const CrisisResources: React.FC = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <Navigation />

      {/* Crisis Resources Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
            Crisis Resources
          </h1>

          {/* Emergency Notice */}
          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-red-800">
                  Emergency Notice
                </h3>
                <div className="mt-2 text-red-700">
                  <p className="text-lg font-semibold">
                    If you are in crisis or experiencing suicidal or homicidal
                    thoughts, please contact <strong>000</strong> or use the
                    following resources for immediate help.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Crisis Resources */}
          <div className="space-y-8">
            <div className="grid gap-6 md:gap-8">
              {/* Beyond Blue */}
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <h2 className="text-2xl font-bold text-blue-900 mb-3">
                  Beyond Blue
                </h2>
                <p className="text-blue-800 mb-4">
                  24/7 support for anxiety, depression and suicide prevention
                </p>
                <a
                  href="https://www.beyondblue.org.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  Visit beyondblue.org.au
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>

              {/* Lifeline Australia */}
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <h2 className="text-2xl font-bold text-green-900 mb-3">
                  Lifeline Australia
                </h2>
                <p className="text-green-800 mb-4">
                  24-hour crisis support and suicide prevention services
                </p>
                <a
                  href="https://www.lifeline.org.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
                >
                  Visit lifeline.org.au
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>

              {/* Suicide Callback Service */}
              <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                <h2 className="text-2xl font-bold text-purple-900 mb-3">
                  Suicide Callback Service
                </h2>
                <p className="text-purple-800 mb-4">
                  Free professional telephone and online counselling
                </p>
                <a
                  href="https://www.suicidecallbackservice.org.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
                >
                  Visit suicidecallbackservice.org.au
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-gray-50 rounded-lg p-6 mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Important Information
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>
                    In an emergency, always call <strong>000</strong> for
                    immediate assistance
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>
                    These resources are available 24/7 and provide free,
                    confidential support
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>
                    If you&apos;re supporting someone in crisis, these resources
                    can also provide guidance for you
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Go Back to Home Button */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-[rgb(142,152,103)] text-[rgb(252,250,247)] rounded-lg hover:bg-[rgb(141,105,89)] hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 font-medium"
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Go Back to Home
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default CrisisResources;
