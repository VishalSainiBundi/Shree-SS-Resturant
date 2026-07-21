const DishCard=({dish})=>{
    return(
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dish && dish.length > 0 ? (
              dish.slice(0, 6).map((d) => (
                <div key={d._id} className="bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group">
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={d.image || 'https://via.placeholder.com/400x300/amber-100/amber-700?text=No+Image'}
                      alt={d.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300/amber-100/amber-700?text=No+Image';
                      }}
                    />
                    {d.feature && (
                      <div className="absolute top-4 right-4 bg-amber-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow">
                        <i className="fas fa-crown mr-1"></i> Chef's Pick
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{d.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{d.sub || d.main}</p>
                      </div>
                      <span className="text-amber-800 font-bold text-lg">₹ {d.price}</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-3 leading-relaxed line-clamp-2">
                      {d.description}
                    </p>
                    {d.rating && (
                      <div className="mt-3 flex items-center gap-1 text-amber-500">
                        <i className="fas fa-star text-sm"></i>
                        <span className="text-sm font-medium text-gray-700">{d.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-400">No dishes available at the moment.</p>
              </div>
            )}
          </div>
    )
}

export default DishCard