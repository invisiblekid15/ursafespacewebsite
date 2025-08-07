'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ContactContextType {
  isContactFormOpen: boolean;
  contactFormType: 'appointment' | 'support';
  openContactForm: (type: 'appointment' | 'support') => void;
  closeContactForm: () => void;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

interface ContactProviderProps {
  children: ReactNode;
}

export const ContactProvider: React.FC<ContactProviderProps> = ({ children }) => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [contactFormType, setContactFormType] = useState<'appointment' | 'support'>('appointment');

  const openContactForm = (type: 'appointment' | 'support') => {
    setContactFormType(type);
    setIsContactFormOpen(true);
  };

  const closeContactForm = () => {
    setIsContactFormOpen(false);
  };

  const value: ContactContextType = {
    isContactFormOpen,
    contactFormType,
    openContactForm,
    closeContactForm,
  };

  return (
    <ContactContext.Provider value={value}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = (): ContactContextType => {
  const context = useContext(ContactContext);
  if (context === undefined) {
    throw new Error('useContact must be used within a ContactProvider');
  }
  return context;
};
