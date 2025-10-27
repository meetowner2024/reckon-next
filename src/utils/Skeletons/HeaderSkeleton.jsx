export const HeaderSkeleton = () => (
  <div className="bg-gradient-to-r from-[#f8fafc] to-[#ffffff] shadow-md sticky top-0 z-50 h-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
      <div className="bg-gray-200 h-10 w-32 rounded animate-pulse" />
      <div className="hidden lg:flex items-center space-x-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-200 h-6 w-16 rounded animate-pulse" />
        ))}
      </div>
      <div className="hidden lg:block bg-gray-200 h-10 w-40 rounded-full animate-pulse" />
    </div>
  </div>
);
