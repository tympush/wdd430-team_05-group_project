import React from "react";
import ContactForm from "./ContactForm";

export default function ContactPage() {
  return (
    <>
      <main className="bg-[#F8F5F1]">
        {/* Hero Section */}
        <section
          className="py-16 text-center bg-[#F8F5F1]"
        >
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h1
              className="text-5xl font-bold mb-4 text-[#C67C48]"
            >
              Get In Touch
            </h1>
            <p
              className="text-xl text-[#6E6E6E]"
            >
              Have questions about our artisan marketplace? We'd love to hear
              from you. Reach out and we'll respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Form & Info Section */}
        <section className="py-16 bg-[#F8F5F1]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Contact Information */}
              <div className="md:col-span-1">
                <h2
                  className="text-2xl font-semibold mb-8 text-[#C67C48]"
                >
                  Contact Info
                </h2>

                <div className="space-y-8">
                  {/* Email */}
                  <div>
                    <h3
                      className="font-semibold mb-2 text-[#3E3E3E]"
                    >
                      Email
                    </h3>
                    <a
                      href="mailto:support@handcraftedhaven.com"
                      className="hover:underline text-[#C67C48]"
                    >
                      support@handcraftedhaven.com
                    </a>
                  </div>

                  {/* Phone */}
                  <div>
                    <h3
                      className="font-semibold mb-2 text-[#3E3E3E]"
                    >
                      Phone
                    </h3>
                    <a
                      href="tel:+1-800-123-4567"
                      className="hover:underline text-[#C67C48]"
                    >
                      +1 (800) 123-4567
                    </a>
                  </div>

                  {/* Address */}
                  <div>
                    <h3
                      className="font-semibold mb-2 text-[#3E3E3E]"
                    >
                      Address
                    </h3>
                    <p className="text-[#6E6E6E]">
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
                      className="font-semibold mb-2 text-[#3E3E3E]"
                    >
                      Business Hours
                    </h3>
                    <p className="text-[#6E6E6E]">
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
                  className="text-2xl font-semibold mb-8 text-[#C67C48]"
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
