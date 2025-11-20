"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Connect to backend API endpoint
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <>
      <Navbar />
      <main className="mt-16 min-h-screen bg-white">
        {/* Hero Section */}
        <section
          className="py-16 text-center"
          style={{ backgroundColor: "var(--color-light)" }}
        >
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h1
              className="text-5xl font-bold mb-4"
              style={{ color: "var(--color-primary)" }}
            >
              Get In Touch
            </h1>
            <p
              className="text-xl"
              style={{ color: "var(--color-dark)" }}
            >
              Have questions about our artisan marketplace? We'd love to hear
              from you. Reach out and we'll respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Form & Info Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Contact Information */}
              <div className="md:col-span-1">
                <h2
                  className="text-2xl font-semibold mb-8"
                  style={{ color: "var(--color-primary)" }}
                >
                  Contact Info
                </h2>

                <div className="space-y-8">
                  {/* Email */}
                  <div>
                    <h3
                      className="font-semibold mb-2"
                      style={{ color: "var(--color-dark)" }}
                    >
                      Email
                    </h3>
                    <a
                      href="mailto:support@handcraftedhaven.com"
                      className="hover:underline"
                      style={{ color: "var(--color-secondary)" }}
                    >
                      support@handcraftedhaven.com
                    </a>
                  </div>

                  {/* Phone */}
                  <div>
                    <h3
                      className="font-semibold mb-2"
                      style={{ color: "var(--color-dark)" }}
                    >
                      Phone
                    </h3>
                    <a
                      href="tel:+1-800-123-4567"
                      className="hover:underline"
                      style={{ color: "var(--color-secondary)" }}
                    >
                      +1 (800) 123-4567
                    </a>
                  </div>

                  {/* Address */}
                  <div>
                    <h3
                      className="font-semibold mb-2"
                      style={{ color: "var(--color-dark)" }}
                    >
                      Address
                    </h3>
                    <p style={{ color: "var(--color-dark)" }}>
                      123 Artisan Street
                      <br />
                      Craftville, CA 90210
                      <br />
                      United States
                    </p>
                  </div>

                  {/* Business Hours */}
                  <div>
                    <h3
                      className="font-semibold mb-2"
                      style={{ color: "var(--color-dark)" }}
                    >
                      Business Hours
                    </h3>
                    <p style={{ color: "var(--color-dark)" }}>
                      Monday - Friday: 9:00 AM - 6:00 PM
                      <br />
                      Saturday: 10:00 AM - 4:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="md:col-span-2">
                <h2
                  className="text-2xl font-semibold mb-8"
                  style={{ color: "var(--color-primary)" }}
                >
                  Send us a Message
                </h2>

                {submitted ? (
                  <div
                    className="p-6 rounded-lg text-center"
                    style={{
                      backgroundColor: "var(--color-accent-3)",
                      color: "var(--color-dark)",
                    }}
                  >
                    <h3 className="text-xl font-semibold mb-2">
                      Thank you for your message!
                    </h3>
                    <p>
                      We've received your inquiry and will get back to you
                      shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                        style={{ color: "var(--color-dark)" }}
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                        style={{
                          borderColor: "var(--color-accent)",
                          /*focusRingColor: "var(--color-primary)",*/
                        }}
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                        style={{ color: "var(--color-dark)" }}
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                        style={{
                          borderColor: "var(--color-accent)",
                        }}
                        placeholder="john@example.com"
                      />
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium mb-2"
                        style={{ color: "var(--color-dark)" }}
                      >
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                        style={{
                          borderColor: "var(--color-accent)",
                        }}
                        placeholder="How can we help?"
                      />
                    </div>

                    {/* Message Field */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2"
                        style={{ color: "var(--color-dark)" }}
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                        style={{
                          borderColor: "var(--color-accent)",
                        }}
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors duration-200"
                      style={{
                        backgroundColor: "var(--color-primary)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "var(--color-secondary)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "var(--color-primary)";
                      }}
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
