export const SectionSkeleton = () => (
  <div className="py-12 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="bg-gray-200 h-8 w-64 mx-auto mb-6 rounded animate-pulse" />
      <div className="flex gap-4 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 h-12 w-40 rounded-full animate-pulse"
          />
        ))}
      </div>
    </div>
  </div>
);
