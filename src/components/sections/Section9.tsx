"use client";

import { useEffect, useRef, useState } from "react";

interface Statistic {
  number: string;
  description: string;
}

const services = [
  "Therapy",
  "Counseling",
  "Wellness",
  "Support",
  "Coaching",
  "Mindfulness",
  "Crisis Care",
  "Family Therapy",
  "Couples Therapy",
  "Teen Counseling",
];

const statistics: Statistic[] = [
  {
    number: "300+",
    description: "Clients have taken the step toward emotional wellness.",
  },
  {
    number: "95%",
    description: "Notice Improvement Within 3 Sessions completed.",
  },
  {
    number: "12+",
    description: "Team of professionals brings deep experience.",
  },
  {
    number: "1000+",
    description: "Virtual Sessions Delivered ensuring support is always.",
  },
];

export default function Section9() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Text */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Explore our core services and discover the right support.
          </p>
        </div>

        {/* Services Tags */}
        <div className="mb-16 md:mb-20">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
            {services.map((service) => (
              <span
                key={service}
                className="px-4 py-2 md:px-6 md:py-3 rounded-full border-2 text-sm md:text-base font-medium transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: "rgb(141, 105, 89)",
                  color: "rgb(141, 105, 89)",
                  backgroundColor: "transparent",
                }}
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {statistics.map((stat, index) => (
            <div
              key={index}
              className={`text-center transform transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 200}ms`,
              }}
            >
              {/* Animated Number */}
              <div className="mb-4">
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-black">
                  {isVisible && (
                    <AnimatedNumber value={stat.number} delay={index * 200} />
                  )}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface AnimatedNumberProps {
  value: string;
  delay: number;
}

function AnimatedNumber({ value, delay }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);

      // Extract number and suffix (like +, %)
      const match = value.match(/^(\d+)(.*)$/);
      if (match) {
        const targetNumber = parseInt(match[1]);
        const suffix = match[2];

        // Animate the number
        let current = 0;
        const increment = Math.ceil(targetNumber / 30); // 30 steps
        const duration = 1500; // 1.5 seconds
        const stepTime = duration / 30;

        const animate = () => {
          current += increment;
          if (current >= targetNumber) {
            setDisplayValue(value);
          } else {
            setDisplayValue(current + suffix);
            setTimeout(animate, stepTime);
          }
        };

        animate();
      } else {
        setDisplayValue(value);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <span
      className={`inline-block transition-all duration-500 ${
        isAnimating ? "scale-110" : "scale-100"
      }`}
    >
      {displayValue}
    </span>
  );
}
