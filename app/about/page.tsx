import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F5F1]">
      <section className="relative bg-linear-to-br from-[#C67C48] to-[#E0B251] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              About Handcrafted Haven
            </h1>
            <p className="text-lg sm:text-xl max-w-3xl mx-auto text-white/90">
              Connecting artisans and buyers around the world through creativity,
              authenticity, and craftsmanship.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F5EFE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#3E3E3E] mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-[#6E6E6E] mb-4">
                Handcrafted Haven is more than just a marketplace—it's a community where 
                creativity meets commerce. We believe in the power of handmade goods to 
                tell stories, preserve traditions, and connect people across cultures.
              </p>
              <p className="text-lg text-[#6E6E6E] mb-4">
                Our platform empowers artisans to showcase their unique creations while 
                providing buyers with access to authentic, high-quality handmade products 
                that can't be found anywhere else.
              </p>
              <p className="text-lg text-[#6E6E6E]">
                Every item sold on our platform represents hours of dedication, skill, 
                and passion—qualities that mass-produced goods simply cannot replicate.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image 
                src="/images/hero-bg.jpg" 
                alt="Artisan at work" 
                width={600} 
                height={400} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F8F5F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#3E3E3E] mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#F5EFE6] p-8 rounded-2xl shadow-sm border border-[#C67C48]">
              <div className="w-14 h-14 rounded-full bg-[#C67C48]/10 flex items-center justify-center mb-4">
                <span className="text-2xl text-[#C67C48]">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3">
                Authenticity
              </h3>
              <p className="text-[#6E6E6E]">
                Every product is genuinely handmade by skilled artisans who pour 
                their heart and soul into their craft.
              </p>
            </div>

            <div className="bg-[#F5EFE6] p-8 rounded-2xl shadow-sm border border-[#A6BBA1]">
              <div className="w-14 h-14 rounded-full bg-[#A6BBA1]/10 flex items-center justify-center mb-4">
                <span className="text-2xl text-[#A6BBA1]">🌱</span>
              </div>
              <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3">
                Sustainability
              </h3>
              <p className="text-[#6E6E6E]">
                We promote eco-conscious practices, using sustainable materials and 
                supporting mindful consumption.
              </p>
            </div>

            <div className="bg-[#F5EFE6] p-8 rounded-2xl shadow-sm border border-[#E0B251]">
              <div className="w-14 h-14 rounded-full bg-[#E0B251]/10 flex items-center justify-center mb-4">
                <span className="text-2xl text-[#E0B251]">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3">
                Community
              </h3>
              <p className="text-[#6E6E6E]">
                We foster connections between makers and buyers, creating a 
                supportive community centered on shared values.
              </p>
            </div>

            <div className="bg-[#F5EFE6] p-8 rounded-2xl shadow-sm border border-[#C67C48]">
              <div className="w-14 h-14 rounded-full bg-[#C67C48]/10 flex items-center justify-center mb-4">
                <span className="text-2xl text-[#C67C48]">✨</span>
              </div>
              <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3">
                Quality
              </h3>
              <p className="text-[#6E6E6E]">
                We curate only the finest handcrafted items, ensuring every 
                purchase meets the highest standards.
              </p>
            </div>

            <div className="bg-[#F5EFE6] p-8 rounded-2xl shadow-sm border border-[#A6BBA1]">
              <div className="w-14 h-14 rounded-full bg-[#A6BBA1]/10 flex items-center justify-center mb-4">
                <span className="text-2xl text-[#A6BBA1]">🌍</span>
              </div>
              <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3">
                Global Reach
              </h3>
              <p className="text-[#6E6E6E]">
                We connect artisans from around the world with buyers who 
                appreciate their unique talents and traditions.
              </p>
            </div>

            <div className="bg-[#F5EFE6] p-8 rounded-2xl shadow-sm border border-[#E0B251]">
              <div className="w-14 h-14 rounded-full bg-[#E0B251]/10 flex items-center justify-center mb-4">
                <span className="text-2xl text-[#E0B251]">💡</span>
              </div>
              <h3 className="text-xl font-semibold text-[#3E3E3E] mb-3">
                Innovation
              </h3>
              <p className="text-[#6E6E6E]">
                We blend traditional craftsmanship with modern technology to 
                create seamless shopping experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F5EFE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 rounded-2xl overflow-hidden shadow-lg">
              <Image 
                src="/images/textil.webp" 
                alt="Handcrafted items" 
                width={600} 
                height={400} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#3E3E3E] mb-6">
                Our Story
              </h2>
              <p className="text-lg text-[#6E6E6E] mb-4">
                Handcrafted Haven was born from a simple observation: in our 
                increasingly digital world, people crave authentic connections 
                and unique, meaningful products.
              </p>
              <p className="text-lg text-[#6E6E6E] mb-4">
                We started as a small team passionate about supporting local 
                artisans and preserving traditional crafts. What began as a 
                weekend project has grown into a thriving marketplace that serves 
                thousands of artisans and customers worldwide.
              </p>
              <p className="text-lg text-[#6E6E6E]">
                Today, we're proud to be a platform where creativity flourishes, 
                traditions are honored, and every purchase makes a real difference 
                in an artisan's life.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F8F5F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#3E3E3E] mb-4">
            Meet Our Team
          </h2>
          <p className="text-center text-lg text-[#6E6E6E] mb-12 max-w-2xl mx-auto">
            A dedicated group of creators, developers, and craft enthusiasts 
            working together to build a better marketplace.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Tymur Pushnoy", role: "Tech Lead" },
              { name: "Steven Savarin", role: "Lead Developer" },
              { name: "Efehi Nehikhare", role: "Developer" },
              { name: "David Igberi", role: "Developer" },
              { name: "Wiselinda Zidor", role: "Developer" },
              { name: "Tafadazwa Chingore", role: "Developer" },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-linear-to-br from-[#C67C48] to-[#E0B251] flex items-center justify-center text-white text-2xl font-bold mb-3">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h4 className="font-semibold text-[#3E3E3E] text-sm">
                  {member.name}
                </h4>
                <p className="text-xs text-[#6E6E6E]">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-linear-to-r from-[#C67C48] to-[#E0B251] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Join Our Community
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Whether you're an artisan looking to showcase your work or a buyer 
            searching for unique handmade treasures, there's a place for you here.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/shop"
              className="inline-flex items-center px-6 py-3 rounded-md bg-white text-[#C67C48] font-medium hover:bg-gray-100 transition-colors"
            >
              Start Shopping
            </a>
            <a
              href="/sell"
              className="inline-flex items-center px-6 py-3 rounded-md border-2 border-white text-white font-medium hover:bg-white/10 transition-colors"
            >
              Sell
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
