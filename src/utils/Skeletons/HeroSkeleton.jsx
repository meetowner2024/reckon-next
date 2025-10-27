export const HeroSkeleton = () => {
  return (
    <div className="relative w-full h-[480px] overflow-hidden bg-gray-200">
      {}
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
      {}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />
      {}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
        <div className="bg-gray-300/70 h-12 w-80 sm:w-96 rounded-lg mb-4 animate-pulse" />
        <div className="bg-gray-300/60 h-5 w-64 sm:w-80 rounded-lg animate-pulse" />
      </div>
      {}
      <div className="absolute inset-x-0 bottom-6 flex justify-center gap-2 z-10">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
};
