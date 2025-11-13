// app/components/Features.tsx
"use client";
import React from "react";

type FeatureProps = {
  title: string;
  children: React.ReactNode;
};

const Feature: React.FC<FeatureProps> = ({ title, children }) => (
  <div className="p-6 bg-white rounded-2xl shadow-sm border">
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{children}</p>
  </div>
);

const Features: React.FC = () => {
  return (
    <section className="py-12 bg-amber-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Feature title="Curated Marketplace">
            Handpicked items by local artisans — discover quality and authenticity.
          </Feature>
          <Feature title="Sustainably Made">
            We promote mindful consumption with eco-conscious materials and processes.
          </Feature>
          <Feature title="Direct from Makers">
            Connect with creators, learn their stories and buy directly.
          </Feature>
        </div>
      </div>
    </section>
  );
};

export default Features;

