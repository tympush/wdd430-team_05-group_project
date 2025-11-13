// app/components/Features.tsx
"use client";
import React from "react";

const FeatureCard: React.FC<{ title: string; description: string; icon?: React.ReactNode }> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">{icon ?? "★"}</div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  return (
    <section className="py-12 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard title="Curated Marketplace" description="Handpicked items by local artisans — discover quality and authenticity." />
          <FeatureCard title="Sustainably Made" description="We promote mindful consumption with eco-conscious materials and processes." />
          <FeatureCard title="Direct from Makers" description="Connect with creators, learn their stories and buy directly." />
        </div>
      </div>
    </section>
  );
};

export default Features;
