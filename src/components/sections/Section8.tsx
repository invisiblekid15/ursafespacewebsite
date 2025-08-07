"use client";

import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  testimonial: string;
  pinImage: string;
  rotation: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Daniel Rivera",
    testimonial:
      "I was going through a very difficult breakup, and counseling gave me the tools to heal. I felt safe, heard, and respected from day one.",
    pinImage: "/assets/images/section_8/section_8_pin1.svg",
    rotation: "rotate-2",
  },
  {
    id: 2,
    name: "Emily Carson",
    testimonial:
      "Therapy changed my life. After years of hiding my anxiety, I finally opened up — and I'm so grateful I did. My counselor was incredibly kind and supportive.",
    pinImage: "/assets/images/section_8/section_8_pin2.svg",
    rotation: "-rotate-1",
  },
  {
    id: 3,
    name: "Marcus Lane",
    testimonial:
      "The online sessions made it so easy to get help without stepping out of my comfort zone. I felt just as connected and cared for.",
    pinImage: "/assets/images/section_8/section_8_pin3.svg",
    rotation: "rotate-3",
  },
  {
    id: 4,
    name: "Hannah Mitchell",
    testimonial:
      "After losing my father, I struggled deeply. My grief therapist helped me find space for the pain, without letting it define me.",
    pinImage: "/assets/images/section_8/section_8_pin4.svg",
    rotation: "-rotate-2",
  },
];

export default function Section8() {
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
              Client Testimonials
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight max-w-4xl mx-auto">
            You&apos;re Not Alone,
            <br />
            Hear From Others Like You
          </h2>
        </div>

        {/* Testimonials Marquee */}
        <div className="relative overflow-hidden">
          <div className="marquee-container">
            <div className="marquee-track animate-marquee flex gap-6 md:gap-8">
              {/* First set of testimonials */}
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className={`relative bg-white p-6 md:p-8 rounded-xl shadow-lg min-w-[300px] md:min-w-[400px] max-w-[400px] transform transition-all duration-300 hover:scale-105 ${testimonial.rotation}`}
                  style={{ backgroundColor: "rgb(255, 255, 255)" }}
                >
                  {/* Pin */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 md:w-10 md:h-10">
                    <Image
                      src={testimonial.pinImage}
                      alt="Pin"
                      width={40}
                      height={40}
                      className="w-full h-full"
                    />
                  </div>

                  {/* Testimonial Content */}
                  <div className="whitespace-normal">
                    {/* Quote */}
                    <div className="mb-6">
                      <svg
                        className="w-8 h-8 text-gray-300 mb-4"
                        fill="currentColor"
                        viewBox="0 0 32 32"
                      >
                        <path d="M10 8c-3.314 0-6 2.686-6 6v10h10V14h-4c0-2.21 1.79-4 4-4V8zm12 0c-3.314 0-6 2.686-6 6v10h10V14h-4c0-2.21 1.79-4 4-4V8z" />
                      </svg>
                      <p className="text-gray-700 text-sm md:text-base leading-relaxed italic">
                        &ldquo;{testimonial.testimonial}&rdquo;
                      </p>
                    </div>

                    {/* Name */}
                    <div className="border-t border-gray-200 pt-4">
                      <p className="font-semibold text-gray-900 text-base md:text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-gray-500 text-sm">
                        UrSafeSpace Client
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Duplicate set for seamless loop */}
              {testimonials.map((testimonial) => (
                <div
                  key={`duplicate-${testimonial.id}`}
                  className={`relative bg-white p-6 md:p-8 rounded-xl shadow-lg min-w-[300px] md:min-w-[400px] max-w-[400px] transform transition-all duration-300 hover:scale-105 ${testimonial.rotation}`}
                  style={{ backgroundColor: "rgb(255, 255, 255)" }}
                >
                  {/* Pin */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 md:w-10 md:h-10">
                    <Image
                      src={testimonial.pinImage}
                      alt="Pin"
                      width={40}
                      height={40}
                      className="w-full h-full"
                    />
                  </div>

                  {/* Testimonial Content */}
                  <div className="whitespace-normal">
                    {/* Quote */}
                    <div className="mb-6">
                      <svg
                        className="w-8 h-8 text-gray-300 mb-4"
                        fill="currentColor"
                        viewBox="0 0 32 32"
                      >
                        <path d="M10 8c-3.314 0-6 2.686-6 6v10h10V14h-4c0-2.21 1.79-4 4-4V8zm12 0c-3.314 0-6 2.686-6 6v10h10V14h-4c0-2.21 1.79-4 4-4V8z" />
                      </svg>
                      <p className="text-gray-700 text-sm md:text-base leading-relaxed italic">
                        &ldquo;{testimonial.testimonial}&rdquo;
                      </p>
                    </div>

                    {/* Name */}
                    <div className="border-t border-gray-200 pt-4">
                      <p className="font-semibold text-gray-900 text-base md:text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-gray-500 text-sm">
                        UrSafeSpace Client
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gradient Overlays for Marquee Effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10"></div>

        {/* CSS for marquee animation */}
        <style jsx>{`
          .marquee-container {
            overflow: hidden;
            white-space: nowrap;
          }

          .marquee-track {
            animation: marquee 30s linear infinite;
            width: max-content;
          }

          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .marquee-track:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </section>
  );
}
