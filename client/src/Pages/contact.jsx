import { useState } from 'react';
import { Link } from 'react-router-dom';

const Contact=()=> {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className="bg-gray-50 pt-26">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop" 
            alt="Contact Us" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-white">
          <div className="max-w-3xl">
            <span className="inline-block bg-amber-500/20 backdrop-blur-sm text-amber-300 text-xs font-semibold tracking-widest px-4 py-1.5 rounded-full mb-4 uppercase border border-amber-400/30">
              Get in Touch
            </span>
            <h1 className="text-5xl md:text-6xl font-light leading-tight">
              <span className="font-bold text-amber-400">Contact</span> Us
            </h1>
            <p className="mt-4 text-lg text-white/80 leading-relaxed max-w-xl">
              We'd love to hear from you. Reach out for reservations, feedback, or any inquiries.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
                <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-map-marker-alt text-amber-700 text-2xl"></i>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Visit Us</h3>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  123 Flavor Street,<br />
                  Food District,<br />
                  New York, NY 10001
                </p>
                <a href="#" className="inline-block mt-4 text-amber-700 font-medium hover:text-amber-800 transition text-sm">
                  <i className="fas fa-chevron-right mr-1"></i> Get Directions
                </a>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
                <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-phone text-amber-700 text-2xl"></i>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Call Us</h3>
                <p className="text-gray-600 mt-2">
                  <a href="tel:+15551234567" className="hover:text-amber-700 transition">+1 (555) 123-4567</a>
                </p>
                <p className="text-sm text-gray-400 mt-2">Mon-Sat: 10:00 AM - 10:00 PM</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
                <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-envelope text-amber-700 text-2xl"></i>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Email Us</h3>
                <p className="text-gray-600 mt-2">
                  <a href="mailto:info@shreess.com" className="hover:text-amber-700 transition">info@shreess.com</a>
                </p>
                <p className="text-sm text-gray-400 mt-2">We'll respond within 24 hours</p>
              </div>

              <div className="bg-gradient-to-r from-amber-700 to-amber-800 rounded-2xl shadow-lg p-8 text-white">
                <h3 className="text-lg font-bold">Follow Us</h3>
                <p className="text-white/80 text-sm mt-2">Connect with us on social media</p>
                <div className="flex gap-3 mt-4">
                  <a href="#" className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition">
                    <i className="fab fa-youtube"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition">
                    <i className="fab fa-twitter"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                <h2 className="text-3xl font-light text-gray-800">
                  Send Us a <span className="font-bold text-amber-800">Message</span>
                </h2>
                <div className="w-16 h-1 bg-amber-600 mt-4 mb-6"></div>
                <p className="text-gray-600 mb-8">
                  Have a question, feedback, or want to make a special reservation? 
                  We'd love to hear from you!
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition"
                    >
                      <option value="">Select a subject</option>
                      <option value="reservation">Reservation Inquiry</option>
                      <option value="feedback">Feedback</option>
                      <option value="event">Private Event</option>
                      <option value="careers">Careers</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-200 transition resize-none"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-4 rounded-lg transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-paper-plane"></i>
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316bb7e73b%3A0xb1b3b9a6b7b7b7b7!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1644262070686!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="w-full"
              title="SHREE SS Restaurant Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-16 bg-amber-50/50">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-3xl font-light text-gray-800">
            Frequently Asked <span className="font-bold text-amber-800">Questions</span>
          </h2>
          <p className="text-gray-600 mt-3">
            Find answers to common questions about our restaurant, menu, and services.
          </p>
          <Link to="/faq" className="inline-block mt-6 border-2 border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white px-10 py-3 rounded-full font-medium transition">
            View FAQs
          </Link>
        </div>
      </section>
    </div>
  );
}  

export default Contact