import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  Cog,
  Home,
  ArrowRight,
  ShieldCheck,
  Layers,
} from "lucide-react";
import { motion } from "framer-motion";
import FadeUp from "../../../components/FadeUp";

const features = [
  { id: 1, Icon: CheckCircle, title: "Certified", body: "Premium uPVC standards" },
  { id: 2, Icon: Cog, title: "Innovative Work", body: "Unique sash & mechanism design" },
  { id: 3, Icon: Home, title: "Experienced", body: "Fenestration experts across India" },
];

const stats = [
  { id: 1, label: "Years", value: "15+" },
  { id: 2, label: "Projects", value: "1200+" },
  { id: 3, label: "Clients", value: "400+" },
];

const AboutCasementWindow = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((s) => (s + 1) % features.length), 3600);
    return () => clearInterval(t);
  }, []);

  // Guard in case features is empty
  const ActiveIcon = features[active] ? features[active].Icon : CheckCircle;

  return (
    <section
      aria-labelledby="about-casement-heading"
      className="relative overflow-hidden bg-gradient-to-br from-white via-[#f9fcff] to-[#ecf3ff] py-16 px-6 sm:px-8 lg:px-16"
    >
      <div className="absolute -left-32 top-10 w-96 h-96 rounded-full bg-[#0e55a1]/5 transform rotate-45 pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-72 h-72 rounded-full bg-[#0c4a8e]/6 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-10 grid gap-8 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7">
            <FadeUp delay={80}>
              <span className="inline-block px-4 py-1.5 text-xs uppercase tracking-wider font-bold text-white bg-[#0e55a1] rounded-full shadow">
                About Doors
              </span>
            </FadeUp>

            <FadeUp delay={160}>
              <h2
                id="about-casement-heading"
                className="mt-4 text-3xl sm:text-4xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#0e55a1] to-[#0c4a8e]"
              >
                Reckon Casement Windows
              </h2>
            </FadeUp>

            <FadeUp delay={240}>
              <p className="mt-4 text-base text-[#1f2e4a]/80 max-w-3xl">
                There is nothing that looks and functions as good as Reckon’s sliding
                windows, whether they are in rooms overlooking gardens and terraces or
                functioning as the main entrance. These are new-generation uPVC sliding
                windows designed for larger openings and are adjoined by multiple sashes
                in a unique mechanism, courtesy of our highly capable team of
                fenestration experts.
              </p>
            </FadeUp>

            <div className="mt-6 flex flex-wrap gap-3 items-center">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-2 px-3 py-2 rounded-md bg-white border border-[#0e55a1]/10 shadow-sm"
              >
                <CheckCircle className="w-4 h-4 text-[#0e55a1]" />
                <span className="text-sm font-medium text-[#0e55a1]">Premium uPVC</span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-2 px-3 py-2 rounded-md bg-white border border-[#0e55a1]/10 shadow-sm"
              >
                <ShieldCheck className="w-4 h-4 text-[#0e55a1]" />
                <span className="text-sm font-medium text-[#1f2e4a]">Secure & Insulated</span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-2 px-3 py-2 rounded-md bg-white border border-[#0e55a1]/10 shadow-sm"
              >
                <Layers className="w-4 h-4 text-[#0e55a1]" />
                <span className="text-sm font-medium text-[#1f2e4a]">Manufactured Precisely</span>
              </motion.div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 items-center">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 8px 30px rgba(14,85,161,0.2)" }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#0e55a1] to-[#0c4a8e] text-white font-semibold shadow-lg"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <a
                href="#contact"
                className="text-sm font-medium text-[#0e55a1] hover:underline"
              >
                Request a Quote
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <motion.div
                initial={{ y: 18, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl overflow-hidden shadow-2xl border border-white/40 bg-white"
                style={{ minHeight: 320 }}
              >
                <img
                  src="/src/assets/images/doors.jpg"
                  alt="Reckon casement Windows"
                  className="w-full h-80 object-cover"
                  loading="lazy"
                />
              </motion.div>

              <motion.div
                initial={{ scale: 0.98, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="absolute -bottom-6 left-6 w-64 bg-white rounded-xl p-4 shadow-lg border border-white/40 backdrop-blur-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-[#f5f8ff]">
                    <CheckCircle className="w-5 h-5 text-[#0e55a1]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#0e55a1]">Premium uPVC</h4>
                    <p className="text-xs text-[#1f2e4a]/70">Superior materials & finish</p>
                  </div>
                </div>
              </motion.div>

              <div className="absolute -top-6 right-0 flex flex-col gap-3">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="w-36 h-20 rounded-lg overflow-hidden shadow-md border border-white/30"
                >
                  <img
                    src="/src/assets/images/doors.jpg"
                    alt="thumb1"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="w-36 h-20 rounded-lg overflow-hidden shadow-md border border-white/30 bg-white"
                >
                  <img
                    src="/src/assets/images/doors.jpg"
                    alt="thumb2"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10 grid gap-6 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-5">
            <div className="h-full rounded-2xl bg-white/70 backdrop-blur-sm p-6 border border-white/40 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#0e55a1]">What we offer</h3>
                <p className="mt-2 text-sm text-[#1f2e4a]/80">
                  As one of India’s best manufacturers of casement doors and other
                  fenestration products, our uPVC sliding windows come in a variety
                  of colour options and utilize only the best of materials in their
                  construction.
                </p>
              </div>

              <div className="mt-6 space-y-3">
                {features.map((f, idx) => {
                  const { Icon } = f;
                  return (
                    <motion.button
                      key={f.id}
                      onClick={() => setActive(idx)}
                      whileHover={{ scale: 1.02 }}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-shadow ${
                        active === idx
                          ? "bg-[#f2f7ff] shadow-md ring-1 ring-[#0e55a1]/20"
                          : "bg-white"
                      }`}
                      aria-pressed={active === idx}
                    >
                      <div
                        className={`p-2 rounded-md ${
                          active === idx ? "bg-[#eaf4ff]" : "bg-[#fbfdff]"
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${active === idx ? "text-[#0e55a1]" : "text-[#0c4a8e]"}`} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#1f2e4a]">{f.title}</div>
                        <div className="text-xs text-[#1f2e4a]/70">{f.body}</div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl bg-white/70 backdrop-blur-md p-6 border border-white/40 shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-[#f5f8ff]">
                  <ActiveIcon className="w-6 h-6 text-[#0e55a1]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#0e55a1]">{features[active].title}</h4>
                  <p className="mt-2 text-sm text-[#1f2e4a]/80">
                    {active === 0 && (
                      <>Premium uPVC sliding windows with exacting manufacturing tolerances ensuring durability and thermal insulation.</>
                    )}
                    {active === 1 && (
                      <>Advanced sash engineering for large openings — multiple sashes working in tandem for effortless operation.</>
                    )}
                    {active === 2 && (
                      <>Decades of fenestration experience: design, manufacturing, and site expertise partnered with responsive after-sales.</>
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#0e55a1] to-[#0c4a8e] text-white font-semibold"
                >
                  Contact Sales
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <a className="text-sm font-medium text-[#0e55a1]" href="#catalog">Download Brochure</a>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white/70 backdrop-blur-sm p-4 border border-white/40 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-sm text-[#1f2e4a]/80">Trusted by builders & homeowners</div>
            <div className="flex gap-3 items-center">
              <div className="w-20 h-6 rounded-md bg-[#f7fbff] flex items-center justify-center text-xs text-[#0e55a1]">ISO</div>
              <div className="w-20 h-6 rounded-md bg-[#f7fbff] flex items-center justify-center text-xs text-[#0e55a1]">BIS</div>
              <div className="w-20 h-6 rounded-md bg-[#f7fbff] flex items-center justify-center text-xs text-[#0e55a1]">Top OEM</div>
            </div>
          </div>

          <div className="flex gap-6 items-center">
            {stats.map((s) => (
              <div key={s.id} className="text-center">
                <div className="text-lg font-extrabold text-[#0e55a1]">{s.value}</div>
                <div className="text-xs text-[#1f2e4a]/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCasementWindow;
