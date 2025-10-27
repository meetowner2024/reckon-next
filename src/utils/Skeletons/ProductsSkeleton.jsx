export const ProductsSkeleton = () => {
  return (
    <section className="px-6 py-12 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section title + subtitle skeleton */}
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-3" />
          <div className="h-4 bg-gray-200 rounded w-80 sm:w-96 mx-auto mb-8" />
        </div>

        {/* Grid of product skeleton cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              {/* Image carousel skeleton */}
              <div className="relative h-56 w-full bg-gray-200 animate-pulse">
                {/* Bottom dots (pagination indicators) */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {[...Array(3)].map((_, j) => (
                    <div
                      key={j}
                      className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"
                    />
                  ))}
                </div>
              </div>

              {/* Product title + subtitle placeholders */}
              <div className="p-4">
                <div className="h-5 bg-gray-300 rounded w-3/4 mb-3 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
