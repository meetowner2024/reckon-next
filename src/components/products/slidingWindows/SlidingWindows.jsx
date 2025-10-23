import React from "react";
import PageBanner from "../../PageBanner";
import AboutSlidingWindows from "./AboutSlidingWindows";
import SlidingWindowAdv from "./SlidingWindowAdv";
import SlidingWindowFaq from "./SlidingWindowFaq";
import HeaderSection from "../../../components/HeaderSection";
import Footer from "../../footer/Footer";

const SlidingWindows = () => {
  return (
    <div>
      <HeaderSection />

      <PageBanner
        title="Sliding Windows"
        subtitle="Leading the industry with innovation and quality"
      />
      <AboutSlidingWindows />
      <SlidingWindowAdv />
      <SlidingWindowFaq />
      <Footer />
    </div>
  );
};

export default SlidingWindows;
