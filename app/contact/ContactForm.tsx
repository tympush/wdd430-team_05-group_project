"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Error: ${response.status} ${response.statusText}`
        );
      }

      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <div className="p-4 rounded-lg text-center bg-red-50 text-red-700 border border-red-300 mb-6">
          <p className="font-semibold">{error}</p>
        </div>
      )}

      {submitted ? (
        <div className="p-6 rounded-lg text-center bg-[#D4E8D4] text-[#2D5A2D] border border-[#A6BBA1]">
          <h3 className="text-xl font-semibold mb-2">Thank you for your message!</h3>
          <p>We've received your inquiry and will get back to you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 bg-[#F5EFE6] p-6 rounded-lg border border-[#C67C48]">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2 text-[#3E3E3E]">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-4 py-2 border border-[#C67C48] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C67C48] text-[#3E3E3E] bg-white disabled:opacity-50"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-[#3E3E3E]">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-4 py-2 border border-[#C67C48] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C67C48] text-[#3E3E3E] bg-white disabled:opacity-50"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-2 text-[#3E3E3E]">
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-4 py-2 border border-[#C67C48] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C67C48] text-[#3E3E3E] bg-white disabled:opacity-50"
              placeholder="How can we help?"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2 text-[#3E3E3E]">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={loading}
              rows={6}
              className="w-full px-4 py-2 border border-[#C67C48] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C67C48] text-[#3E3E3E] bg-white disabled:opacity-50"
              placeholder="Tell us more about your inquiry..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors duration-200 bg-[#C67C48] hover:bg-[#A65829] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </>
  );
}
