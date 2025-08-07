'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer
      className="w-full py-12 md:py-16"
      style={{ backgroundColor: 'rgb(248, 243, 236)' }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left Side */}
          <div className="space-y-6">
            {/* Logo and Brand Name */}
            <div className="flex items-center gap-3">
              <Image
                src="/assets/images/heal.svg"
                alt="UrSafeSpace Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl md:text-2xl font-bold text-gray-900">
                UrSafeSpace
              </span>
            </div>

            {/* Description */}
            <p
              className="text-base md:text-lg leading-relaxed max-w-md"
              style={{ color: 'rgb(141, 105, 89)' }}
            >
              Your space to heal, grow, and feel understood. Offering compassionate,
              personalized mental health support to guide life's challenges.
            </p>

            {/* Instagram Icon */}
            <div className="pt-2">
              <a
                href="#"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white hover:bg-gray-100 transition-colors duration-300 shadow-sm"
                aria-label="Follow us on Instagram"
              >
                <svg
                  className="w-5 h-5"
                  style={{ color: 'rgb(141, 105, 89)' }}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            {/* Get in Touch Heading */}
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">
              Get in Touch
            </h3>

            {/* Contact Information */}
            <div className="space-y-4">
              {/* Email */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                <a
                  href="mailto:hello@serenityminds.com"
                  className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
                >
                  hello@serenityminds.com
                </a>
              </div>

              {/* Phone */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                <a
                  href="tel:+11234567890"
                  className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
                >
                  +1 (123) 456-7890
                </a>
              </div>

              {/* Office Hours */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Office Hours:</h4>
                <p className="text-gray-700">
                  Mon–Sat, 9 AM – 7 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Border / Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <p className="text-center text-sm text-gray-600">
            © 2024 UrSafeSpace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
