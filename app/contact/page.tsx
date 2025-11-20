import React from "react";
import ContactForm from "./ContactForm";

export default function ContactPage() {
  return (
    <>
      <main className="bg-white">
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

                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
