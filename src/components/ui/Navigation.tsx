"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
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
            <Link href="/" className="cursor-pointer">
              <Image
                src="/logo.png"
                alt="UrSafeSpace Logo"
                width={80}
                height={24}
                className="h-6 w-auto max-h-12 object-contain"
              />
            </Link>
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
              Free 15 min consultation
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
