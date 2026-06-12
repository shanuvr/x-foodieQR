import React, { useState } from 'react';
import UserLayout from '../../layouts/UserLayout';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: 'How long does it take to get my restaurant set up on FoodieQR?',
      a: 'Setting up is incredibly fast. Most restaurant partners upload their menus and generate their custom QR codes in under 15 minutes.',
    },
    {
      q: 'Can I change my pricing plan or cancel my subscription later?',
      a: 'Absolutely. You can upgrade, downgrade, or cancel your subscription at any time directly from your admin dashboard settings with no hidden cancellation fees.',
    },
    {
      q: 'Do you charge transaction fees on customer table orders?',
      a: 'No. FoodieQR charges a flat monthly subscription. We believe your revenue belongs entirely to you, so we take 0% commission on orders.',
    },
    {
      q: 'Can I customize the design of my digital menu to match my branding?',
      a: 'Yes! Our templates allow you to customize colors, upload high-resolution images, set category layouts, and configure custom styling elements to match your brand identity.',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }, 5000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <UserLayout>
      <div className="font-sans text-gray-800 bg-[#fcfcfd]">
        
        {/* Hero Banner */}
        <section className="relative bg-[#0d1527] py-20 sm:py-24 overflow-hidden text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-transparent blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-500/5 to-transparent blur-3xl rounded-full" />
          </div>
          
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <span className="text-orange-500 text-xs sm:text-sm font-extrabold uppercase tracking-widest bg-orange-500/10 px-4 py-1.5 rounded-full">
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white mt-6 leading-tight tracking-tight">
              We'd Love to Hear <span className="text-orange-500">From You</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-lg max-w-xl mx-auto mt-4 leading-relaxed">
              Have questions about our smart menus, customized plans, or partner onboarding? Reach out and our team will respond within a few hours.
            </p>
          </div>
        </section>

        {/* Contact Form & Cards Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Side: Engaging Brand Content */}
            <div className="lg:col-span-5 flex flex-col justify-center gap-8 text-left lg:pr-6">
              <div>
                <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight">
                  Let's Build the Future of Dining Together
                </h2>
                <div className="w-16 h-1.5 bg-orange-500 rounded-full mt-4" />
              </div>
              
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Whether you run a cozy neighborhood café, a busy local bistro, or a premium multi-outlet hotel chain, FoodieQR is engineered to scale your operations, reduce order friction, and boost guest satisfaction.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="text-orange-500 text-xl font-bold">✓</span>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base">Got onboarding questions?</h4>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">
                      Check our FAQ section below or drop your details. Our integration managers are always online to help digitize your menu.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-orange-500 text-xl font-bold">✓</span>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base">Custom QR Design Assistance</h4>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">
                      We assist you in designing and styling premium brand QR templates suitable for table stickers, menu boards, and tent cards.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-orange-500 text-xl font-bold">✓</span>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base">24/7 Priority Partner Desk</h4>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">
                      Our support channels are active day and night to guarantee your digital menu stays live and responsive.
                    </p>
                  </div>
                </div>
              </div>

              {/* Minimal Testimonial Banner */}
              <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-5 mt-2">
                <p className="text-gray-600 text-xs sm:text-sm italic leading-relaxed">
                  "FoodieQR simplified our dinner rush. Customers browse photos, place request additions, and book tables effortlessly."
                </p>
                <p className="text-gray-900 font-extrabold text-xs sm:text-sm mt-3">
                  — Manager, Novotel Signature Restaurant
                </p>
              </div>
            </div>

            {/* Right Side: Contact Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-gray-200 shadow-md text-left relative overflow-hidden">
              {isSubmitted && (
                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
                  <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center text-3xl mb-4 animate-bounce">
                    ✓
                  </div>
                  <h3 className="text-2xl font-black text-gray-900">Message Sent Successfully!</h3>
                  <p className="text-gray-500 text-sm max-w-xs mx-auto mt-2 leading-relaxed">
                    Thank you for reaching out. A hospitality representative will contact you via email shortly.
                  </p>
                </div>
              )}

              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-6">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm outline-none transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. sarah@example.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +1 555-123-4567"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm outline-none transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Partnership Request"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Your Message *</label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your restaurant or query..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm outline-none resize-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 border-0 rounded-xl text-sm font-extrabold text-white bg-orange-500 hover:bg-orange-600 active:scale-[0.98] shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white border-t border-gray-100 py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <span className="text-orange-500 text-xs sm:text-sm font-extrabold uppercase tracking-widest">
              Have Questions?
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-3 mb-10">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4 text-left">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-350 bg-gray-50/50 hover:bg-white"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-gray-900 font-bold text-sm sm:text-base outline-none cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className={`text-orange-500 text-xl transform transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      activeFaq === idx ? 'max-h-40 border-t border-gray-100' : 'max-h-0'
                    }`}
                  >
                    <p className="px-6 py-5 text-gray-600 text-xs sm:text-sm leading-relaxed bg-white">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </UserLayout>
  );
}
