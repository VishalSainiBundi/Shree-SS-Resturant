import { useState } from 'react';
import { Link } from 'react-router-dom';

 const Gallery=()=> {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'interior', label: 'Interior' },
    { id: 'food', label: 'Food' },
    { id: 'events', label: 'Events' },
    { id: 'chefs', label: 'Chefs' }
  ];

  const galleryImages = [
    { id: 1, category: 'interior', title: 'Elegant Dining Hall', description: 'Our main dining area with warm ambiance', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop' },
    { id: 2, category: 'food', title: 'Signature Platter', description: 'Our chef\'s special tasting menu', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2070&auto=format&fit=crop' },
    { id: 3, category: 'events', title: 'Wedding Celebration', description: 'Beautiful wedding setup at our venue', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop' },
    { id: 4, category: 'chefs', title: 'Master Chefs', description: 'Our culinary team at work', image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=2070&auto=format&fit=crop' },
    { id: 5, category: 'food', title: 'Gourmet Delights', description: 'Exquisite dishes prepared with love', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=2070&auto=format&fit=crop' },
    { id: 6, category: 'interior', title: 'Private Dining', description: 'Intimate dining experience for special occasions', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop' },
    { id: 7, category: 'food', title: 'Dessert Paradise', description: 'Decadent desserts crafted to perfection', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=2070&auto=format&fit=crop' },
    { id: 8, category: 'events', title: 'Corporate Events', description: 'Perfect venue for business gatherings', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop' },
    { id: 9, category: 'chefs', title: 'Kitchen Excellence', description: 'State-of-the-art kitchen facilities', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2068&auto=format&fit=crop' },
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <div className="bg-gray-50 pt-6 ">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 top-20">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop" 
            alt="Gallery Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-white">
          <div className="max-w-3xl">
            <span className="inline-block bg-amber-500/20 backdrop-blur-sm text-amber-300 text-xs font-semibold tracking-widest px-4 py-1.5 rounded-full mb-4 uppercase border border-amber-400/30">
              Visual Journey
            </span>
            <h1 className="text-5xl md:text-6xl font-light leading-tight">
              Our <span className="font-bold text-amber-400">Gallery</span>
            </h1>
            <p className="mt-4 text-lg text-white/80 leading-relaxed max-w-xl">
              A glimpse into the world of SHREE SS RESTAURANT – where every moment is a masterpiece.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Gallery Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-amber-700 text-white shadow-lg shadow-amber-700/30'
                    : 'bg-white text-gray-600 hover:bg-amber-50 hover:text-amber-700 shadow-sm'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <div 
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={image.image} 
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold">{image.title}</h3>
                    <p className="text-sm text-white/80 mt-1">{image.description}</p>
                    <span className="inline-block mt-2 text-xs font-medium bg-amber-500/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                      {image.category}
                    </span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                    <i className="fas fa-expand text-white text-sm"></i>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No images found in this category</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-amber-800 to-amber-600 py-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-light">Ready to Experience <span className="font-bold">SHREE SS</span>?</h2>
          <p className="mt-3 text-white/80 text-lg">Book your table and create your own memories with us.</p>
          <Link to="/reservation" className="inline-block mt-6 bg-white text-amber-800 px-10 py-4 rounded-full font-semibold hover:bg-amber-50 transition shadow-lg">
            Reserve Now
          </Link>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-14 right-0 text-white hover:text-amber-400 transition text-3xl"
            >
              <i className="fas fa-times"></i>
            </button>
            <img 
              src={selectedImage.image} 
              alt={selectedImage.title}
              className="w-full rounded-2xl shadow-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
              <h3 className="text-2xl font-bold text-white">{selectedImage.title}</h3>
              <p className="text-white/80 mt-1">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default Gallery