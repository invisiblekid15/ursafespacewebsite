"use client";

import React from "react";
import Button from "./Button";
import { useContact } from "@/context/ContactContext";

const Navigation: React.FC = () => {
  const { openContactForm } = useContact();
  return (
    <nav className="navigation-spacing fixed top-0 left-0 right-0 z-50 bg-[rgb(252,250,247)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1
              className="text-2xl font-bold text-[rgb(13,5,3)]"
              style={{
                fontFamily:
                  'var(--font-castoro), "Castoro", "Castoro Placeholder", serif',
              }}
            >
              UrSafeSpace
            </h1>
          </div>

          {/* CTA Button */}
          <div className="flex items-center">
            <Button
              variant="primary"
              size="md"
              className="text-base font-semibold"
              style={{
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",
                paddingLeft: "0.5rem",
                paddingRight: "0.5rem",
              }}
              onClick={() => openContactForm("appointment")}
            >
              Book an appointment
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
