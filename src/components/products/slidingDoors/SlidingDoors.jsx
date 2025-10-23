import React from "react";

import AboutSlidingtDoors from "./AboutSlidingDoors";
import PageBanner from "../../PageBanner";
import SlidingDoorAdv from "./SlidingDoorAdv";
import SlidingDoorsFaq from "./SlidingDoorsFaq";
import HeaderSection from "../../../components/HeaderSection";
import Footer from "../../footer/Footer";

const SlidingDoors = () => {
  return (
    <div>
      <HeaderSection />

      <PageBanner
        title="Sliding Doors"
        subtitle="Leading the industry with innovation and quality"
      />

      <AboutSlidingtDoors />
      <SlidingDoorAdv />
      <SlidingDoorsFaq />
      <Footer />
    </div>
  );
};

export default SlidingDoors;
