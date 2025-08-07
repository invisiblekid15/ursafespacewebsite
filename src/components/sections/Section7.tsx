'use client';

import Image from 'next/image';

export default function Section7() {
  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          {/* Badge */}
          <div className="inline-block mb-4">
            <span
              className="text-sm md:text-base font-medium px-4 py-2 rounded-full"
              style={{ backgroundColor: 'rgba(225, 147, 125, 0.4)' }}
            >
              Why It&apos;s Worth It
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Inside UrSafeSpace
          </h2>
        </div>

        {/* Images Grid */}
        <div className="max-w-7xl mx-auto">
          {/* Top Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
            {/* Top Left */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/assets/images/section_7/section_7_top_left.avif"
                alt="UrSafeSpace interior - top left view"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Top Right */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/assets/images/section_7/section_7_top_right.avif"
                alt="UrSafeSpace interior - top right view"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Bottom Left */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/assets/images/section_7/section_7_bottom_left.avif"
                alt="UrSafeSpace interior - bottom left view"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* Bottom Middle */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/assets/images/section_7/section_7_bottom_middle.avif"
                alt="UrSafeSpace interior - bottom middle view"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* Bottom Right */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/assets/images/section_7/Section_7_bottom_right.avif"
                alt="UrSafeSpace interior - bottom right view"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
