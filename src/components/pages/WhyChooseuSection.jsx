import Image from "next/image";

const WhyChooseuSection = () => {
  const features = [
    {
      id: "fabrication",
      title: "Fabrication",
      description:
        "Buy directly from Reckonext and experience assured quality at every stage.",
      gif: "/assets/images/fabricationGif.gif",
    },
    {
      id: "consultative",
      title: "Consultative Approach",
      description:
        "Our trained experts provide tailored, technical solutions for your needs.",
      gif: "/assets/images/consultativeGif.gif",
    },
    {
      id: "leadTimes",
      title: "Fastest Lead Delivery",
      description:
        "We deliver and install within 10 days of order confirmation, ensuring quick turnaround.",
      gif: "/assets/images/leadTimesGif.gif",
    },
    {
      id: "installation",
      title: "In-house Installation",
      description:
        "Our skilled in-house team ensures precise, high-quality installation every time.",
      gif: "/assets/images/installationGif.gif",
    },
  ];
  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {}
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-[#000000] mb-10">
          Why Choose Us
        </h2>
        {}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col items-center text-center group"
            >
              {}
              <div className="w-20 h-20 flex items-center justify-center mb-6 rounded-2xl overflow-hidden shadow-sm bg-gray-50 group-hover:shadow-md transition-shadow duration-300">
                <Image
                  src={feature.gif}
                  alt={feature.title}
                  className="w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                  width={80}
                  height={80}
                />
              </div>
              {}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default WhyChooseuSection;
