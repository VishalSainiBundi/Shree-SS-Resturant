import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosApiInstance from '../../helper';
import { useSelector } from 'react-redux';

import {
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaFacebookF,
  FaTelegramPlane,
  FaYoutube,
  FaMapMarkerAlt,
  FaDirections,
  FaClock,
  FaReplyAll,
  FaPaperPlane,
  FaSpinner,
  FaChevronDown,
  FaExclamationCircle,
  FaPenFancy,
  FaShareAlt,
} from 'react-icons/fa';

const Contact = () => {
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const subjectRef = useRef(null);
  const messageRef = useRef(null);
  const navigate = useNavigate()

  const user = useSelector((state) => state.userStore.user);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const fullName = fullNameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const phone = phoneRef.current.value.trim();
    const subject = subjectRef.current.value;
    const message = messageRef.current.value.trim();

    if (!fullName || !email || !subject || !message) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const payload = { fullName, email, subject, phone, message };
      const response = await axiosApiInstance.post('/contact/create', payload);

      if (response.data.flag === 0) {
        alert(response.data.msg || 'Thank you for your message! We will get back to you soon.');
        fullNameRef.current.value = '';
        emailRef.current.value = '';
        phoneRef.current.value = '';
        subjectRef.current.value = '';
        messageRef.current.value = '';

navigate('/')

      } else {
        setError(response.data.msg || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      const message =
        err.response?.data?.msg ||
        err.response?.data?.message ||
        'Unable to send message. Please check your connection and try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Google Maps Directions URL (Bundi, Rajasthan)
  const destination = encodeURIComponent('Near Bundi Fort, Bundi, Rajasthan 323001, India');
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;

  // Embedded map for Bundi
  const mapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28603.895587090457!2d75.6367193!3d25.4385738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396b0a3a9d3b9b9b%3A0x8a4b3b7b7b7b7b7b!2sBundi%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1644262070686';

  return (
    <div className="bg-gradient-to-b from-amber-50/80 to-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
            alt="Contact Us"
            className="w-full h-full object-cover transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30"></div>
          <div className="absolute top-20 right-10 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-48 h-48 bg-amber-600/10 rounded-full blur-2xl"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-white">
          <div className="max-w-3xl animate-fade-in-up">
            <span className="inline-block bg-amber-400/20 backdrop-blur-sm text-amber-200 text-xs font-semibold tracking-widest px-5 py-2 rounded-full mb-4 uppercase border border-amber-300/30 shadow-lg">
              📬 Get in Touch
            </span>
            <h1 className="text-5xl md:text-7xl font-light leading-tight">
              <span className="font-bold bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent">
                Contact
              </span>{' '}
              Us
            </h1>
            <p className="mt-4 text-lg text-white/90 leading-relaxed max-w-xl drop-shadow-md">
              We'd love to hear from you. Reach out for reservations, feedback, or any inquiries.
            </p>
            <div className="mt-8 flex gap-4">
              <span className="inline-flex items-center gap-2 text-sm text-white/70 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Available now
              </span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-amber-50/90 to-transparent"></div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Info Cards - using react-icons */}
            <div className="lg:col-span-1 space-y-6">
              {/* Visit Us */}
              <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100/50 hover:border-amber-200/50 transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition">
                  <FaMapMarkerAlt className="text-amber-700 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Visit Us</h3>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  Near Bundi Fort,<br />
                  Bundi, Rajasthan 323001,<br />
                  India
                </p>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-4 text-amber-700 font-medium hover:text-amber-800 transition text-sm group-hover:gap-2 gap-1"
                >
                  <FaDirections className="text-sm" />
                  <span>Get Directions</span>
                  <FaChevronDown className="text-xs transition-transform group-hover:translate-x-1 rotate-[-90deg]" />
                </a>
              </div>

              {/* Call Us */}
              <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100/50 hover:border-amber-200/50 transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition">
                  <FaPhoneAlt className="text-blue-700 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Call Us</h3>
                <p className="text-gray-600 mt-2">
                  <a
                    href="tel:+919876543210"
                    className="hover:text-amber-700 transition"
                  >
                    +91 98765 43210
                  </a>
                </p>
                <p className="text-sm text-gray-400 mt-2 flex items-center gap-1">
                  <FaClock className="text-amber-500" />
                  Mon – Sun: 10:00 AM – 10:00 PM
                </p>
              </div>

              {/* Email Us */}
              <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100/50 hover:border-amber-200/50 transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition">
                  <FaEnvelope className="text-purple-700 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Email Us</h3>
                <p className="text-gray-600 mt-2">
                  <a
                    href="mailto:info@shreess.com"
                    className="hover:text-amber-700 transition"
                  >
                    info@shreess.com
                  </a>
                </p>
                <p className="text-sm text-gray-400 mt-2 flex items-center gap-1">
                  <FaReplyAll className="text-amber-500" />
                  We'll respond within 24h
                </p>
              </div>

              {/* Follow Us - with react-icons */}
              <div className="relative overflow-hidden rounded-3xl shadow-xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 p-8 text-white">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2">
                    <FaShareAlt className="text-lg" />
                    <h3 className="text-xl font-bold">Follow Us</h3>
                  </div>
                  <p className="text-white/80 text-sm mt-2">
                    Connect with us on social media
                  </p>
                  <div className="flex gap-3 mt-5">
                    {[
                      { icon: FaFacebookF, label: 'Facebook' },
                      { icon: FaInstagram, label: 'Instagram' },
                      { icon: FaTelegramPlane, label: 'Telegram' },
                      { icon: FaYoutube, label: 'YouTube' },
                    ].map((social) => (
                      <a
                        key={social.label}
                        href="#"
                        className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 hover:scale-110 transition-all duration-300 text-white"
                        aria-label={social.label}
                      >
                        <social.icon className="text-xl" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form (unchanged except icon replacements) */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                    <FaPenFancy className="text-amber-700" />
                  </div>
                  <h2 className="text-3xl font-light text-gray-800">
                    Send Us a <span className="font-bold text-amber-800">Message</span>
                  </h2>
                </div>
                <div className="w-20 h-1 bg-gradient-to-r from-amber-600 to-amber-400 mt-2 mb-6 rounded-full"></div>
                <p className="text-gray-600 mb-8">
                  Have a question, feedback, or want to make a special reservation?
                  We'd love to hear from you!
                </p>

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg shadow-sm flex items-start gap-3">
                      <FaExclamationCircle className="mt-1 text-red-500" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        ref={fullNameRef}
                        readOnly
                        value={user?.name || ''}
                        required
                        className="w-full px-5 py-3.5 bg-gray-100/70 border border-gray-200 rounded-xl text-gray-700 cursor-not-allowed"
                      />
                    </div>
                    <div className="relative">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        ref={emailRef}
                        readOnly
                        value={user?.email || ''}
                        required
                        className="w-full px-5 py-3.5 bg-gray-100/70 border border-gray-200 rounded-xl text-gray-700 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      ref={phoneRef}
                      className="w-full px-5 py-3.5 bg-gray-100/70 border border-gray-200 rounded-xl text-gray-700 cursor-not-allowed"
                    />
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="subject"
                        name="subject"
                        ref={subjectRef}
                        required
                        className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all duration-200 appearance-none text-gray-700"
                      >
                        <option value="">Select a subject</option>
                        <option value="reservation">Reservation Inquiry</option>
                        {/* <option value="feedback">Feedback</option> */}
                        {/* <option value="event">Private Event</option> */}
                        {/* <option value="careers">Careers</option> */}
                        <option value="general">General Inquiry</option>
                        <option value="general">Order Inquiry</option>
                      </select>
                      <FaChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      ref={messageRef}
                      required
                      rows="6"
                      className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all duration-200 resize-none placeholder:text-gray-400"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full relative bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-amber-200/50 flex items-center justify-center gap-3 text-lg overflow-hidden group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                    {loading ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Bundi */}
      <section className="bg-white py-16" aria-label="Location map">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100/50 hover:shadow-amber-100/30 transition-shadow duration-300">
            <iframe
              src={mapSrc}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="w-full"
              title="SHREE SS Restaurant Location - Bundi"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-16 bg-gradient-to-r from-amber-50/80 to-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-white/50">
            <h2 className="text-3xl font-light text-gray-800">
              Frequently Asked <span className="font-bold text-amber-800">Questions</span>
            </h2>
            <p className="text-gray-600 mt-3">
              Find answers to common questions about our restaurant, menu, and services.
            </p>
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 mt-6 border-2 border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-amber-200/50 group"
            >
              <span>View FAQs</span>
              <FaChevronDown className="text-sm transition-transform group-hover:translate-x-1 rotate-[-90deg]" />
            </Link>
          </div>
        </div>
      </section>

      {/* Custom animation keyframes */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Contact;