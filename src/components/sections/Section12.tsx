"use client";

import { useContact } from "@/context/ContactContext";

export default function Section12() {
  const { openContactForm } = useContact();
  return (
    <section className="relative w-full min-h-[500px] md:min-h-[600px] flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(/assets/images/section_12/section_12_background.avif)",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 md:px-6 max-w-4xl mx-auto">
        {/* Main Text */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-8 md:mb-12">
          Your journey to healing begins with one small step — reaching out.
        </h2>

        {/* CTA Button */}
        <button
          onClick={() => openContactForm("appointment")}
          className="bg-white text-gray-900 px-8 py-4 md:px-10 md:py-5 rounded-lg font-semibold text-lg md:text-xl transition-all duration-300 hover:bg-gray-100 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 shadow-lg"
        >
          Book an Appointment
        </button>
      </div>
    </section>
  );
}
