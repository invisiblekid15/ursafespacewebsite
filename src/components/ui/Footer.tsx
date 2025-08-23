"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="w-full py-12 md:py-16"
      style={{ backgroundColor: "rgb(248, 243, 236)" }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Left Side - Logo and Description */}
          <div className="space-y-6">
            {/* Logo and Brand Name */}
            <div className="flex items-center gap-3">
              <Image
                src="/logo.jpeg"
                alt="UrSafeSpace Logo"
                width={100}
                height={26}
                className="h-6 w-auto"
              />
            </div>

            {/* Description */}
            <p
              className="text-base md:text-lg leading-relaxed max-w-md"
              style={{ color: "rgb(141, 105, 89)" }}
            >
              Your space to heal, grow, and feel understood. Offering
              compassionate, personalized mental health support to guide
              life&apos;s challenges.
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
                  style={{ color: "rgb(141, 105, 89)" }}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Middle - Privacy Policy and Other Links */}
          <div className="space-y-6">
            {/* Privacy Policy */}
            <div className="flex justify-center">
              <a
                href="/privacy-policy"
                className="text-sm text-gray-700 hover:text-gray-900 transition-colors duration-300 underline"
              >
                Privacy Policy
              </a>
            </div>

            {/* Space for additional pages */}
            <div className="flex justify-center space-y-2">
              {/* Add more page links here as needed */}
            </div>

            {/* Spacer for desktop to push crisis text down */}
            <div className="hidden md:block md:h-12"></div>

            {/* Crisis Resources */}
            <div className="space-y-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                If you are in crisis or experiencing suicidal or homicidal
                thoughts, please contact 000 or access{" "}
                <a
                  href="/crisis-resources"
                  className="text-gray-900 hover:text-gray-700 transition-colors duration-300 underline"
                >
                  these resources
                </a>{" "}
                for emergency assistance.
              </p>
            </div>
          </div>

          {/* Right Side - Get in Touch */}
          <div className="space-y-6">
            {/* Get in Touch Heading */}
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">
              Get in Touch
            </h3>

            {/* Contact Information */}
            <div className="space-y-4">
              {/* Email */}
              <div></div>

              {/* Phone */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                <a
                  href="tel:‪+61431879584‬"
                  className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
                >
                  ‪+61 431 879 584‬
                </a>
              </div>

              {/* Office Hours */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Office Hours:
                </h4>
                <p className="text-gray-700">Mon–Sat, 9 AM – 7 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimers Section */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Aboriginal and TSI Acknowledgment */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Image
                  src="/assets/images/footer/aboriginal.webp"
                  alt="Aboriginal Flag"
                  width={60}
                  height={40}
                  className="w-15 h-10"
                />
                <Image
                  src="/assets/images/footer/tsi.webp"
                  alt="Torres Strait Islander Flag"
                  width={60}
                  height={40}
                  className="w-15 h-10"
                />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Ur Safespace acknowledges the Traditional Owners of the lands on
                which we operate, and we pay our respects to Elders past,
                present, and emerging.
              </p>
            </div>

            {/* Pride and Inclusion */}
            <div className="space-y-4">
              <div className="flex items-center">
                <Image
                  src="/assets/images/footer/pride.webp"
                  alt="Pride Flag"
                  width={60}
                  height={40}
                  className="w-15 h-10"
                />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Ur Safespace respects and welcomes people of all backgrounds,
                genders, sexualities, abilities and cultures.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Border / Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-300">
          <div className="flex justify-center items-center">
            <p className="text-sm text-gray-600">
              © 2024 UrSafeSpace. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
