import { Link } from 'react-router-dom';

const  About=()=> {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop" 
            alt="About SHREE SS" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-white">
          <div className="max-w-3xl">
            <span className="inline-block bg-amber-500/20 backdrop-blur-sm text-amber-300 text-xs font-semibold tracking-widest px-4 py-1.5 rounded-full mb-4 uppercase border border-amber-400/30">
              Our Story
            </span>
            <h1 className="text-5xl md:text-6xl font-light leading-tight">
              About <span className="font-bold text-amber-400">SHREE SS</span>
            </h1>
            <p className="mt-4 text-lg text-white/80 leading-relaxed max-w-xl">
              A legacy of flavor, a commitment to excellence, and a passion for hospitality.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-amber-700 text-sm font-semibold tracking-widest uppercase">
                <i className="fas fa-heart mr-2 text-red-500"></i> Our Journey
              </span>
              <h2 className="text-4xl md:text-5xl font-light mt-3">
                Crafting Memories <br />
                <span className="font-bold text-amber-800">Since 2025</span>
              </h2>
              <div className="w-20 h-1 bg-amber-600 mt-6 mb-6"></div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Welcome to <span className="font-semibold text-amber-800">SHREE SS RESTAURANT</span>, 
                where taste meets tradition and every meal is crafted with love. 
                Our journey began with a simple dream – to share the authentic 
                flavors of our heritage with the world.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg mt-4">
                Today, we continue to honor that vision by using only the freshest 
                ingredients and time-honored recipes passed down through generations. 
                Every dish we serve tells a story of culinary excellence.
              </p>
              <p className="text-amber-800 font-medium mt-4 text-lg flex items-center gap-2">
                <span>Taste that stays in your heart</span>
                <span className="text-red-500 text-2xl">❤️</span>
              </p>
              <Link to="/menu" className="inline-block mt-8 bg-amber-700 hover:bg-amber-800 text-white px-10 py-4 rounded-full font-semibold transition shadow-lg">
                Explore Our Menu
              </Link>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop" 
                  alt="Restaurant interior" 
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-amber-100 p-6 rounded-2xl shadow-lg border border-amber-200">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">🏆</div>
                  <div>
                    <p className="font-bold text-amber-800 text-xl">Award Winning</p>
                    <p className="text-sm text-gray-600">Excellence in Dining</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-amber-50/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 text-sm font-semibold tracking-widest uppercase">
              <i className="fas fa-star mr-2"></i> Our Values
            </span>
            <h2 className="text-4xl md:text-5xl font-light mt-3">
              What Makes Us <span className="font-bold text-amber-800">Special</span>
            </h2>
            <div className="w-20 h-1 bg-amber-600 mx-auto mt-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition text-center group">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition">
                <span className="text-4xl">👨‍🍳</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Authentic Cuisine</h3>
              <p className="text-gray-600 mt-3 leading-relaxed">
                Traditional recipes crafted with passion, using only the finest 
                ingredients sourced locally and globally.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition text-center group">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition">
                <span className="text-4xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Warm Hospitality</h3>
              <p className="text-gray-600 mt-3 leading-relaxed">
                Every guest is family. We create an atmosphere where you feel 
                welcomed, valued, and cared for.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition text-center group">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition">
                <span className="text-4xl">🌿</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Quality & Freshness</h3>
              <p className="text-gray-600 mt-3 leading-relaxed">
                We believe in using the freshest ingredients, sustainably sourced, 
                to create dishes that delight the senses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-700 text-sm font-semibold tracking-widest uppercase">
              <i className="fas fa-users mr-2"></i> Our Team
            </span>
            <h2 className="text-4xl md:text-5xl font-light mt-3">
              Meet Our <span className="font-bold text-amber-800">Experts</span>
            </h2>
            <div className="w-20 h-1 bg-amber-600 mx-auto mt-6"></div>
            <p className="text-gray-600 mt-4">
              Passionate professionals dedicated to creating unforgettable dining experiences.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Chef Rajesh Kumar', role: 'Executive Chef', image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=2070&auto=format&fit=crop' },
              { name: 'Chef Priya Sharma', role: 'Pastry Chef', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2068&auto=format&fit=crop' },
              { name: 'Amit Singh', role: 'Restaurant Manager', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2070&auto=format&fit=crop' },
              { name: 'Sneha Patel', role: 'Sommelier', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2070&auto=format&fit=crop' }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition group">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h4 className="text-lg font-bold text-gray-800">{member.name}</h4>
                  <p className="text-amber-700 text-sm font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About