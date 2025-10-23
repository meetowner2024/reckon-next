import React from "react";
import PageBanner from "../../PageBanner";
import AboutSFDoors from "./AboutSFDoors";
import SFDoorAdv from "./SFDoorsAdv";
import SFDoorFaq from "./SFDoorFaq";
import HeaderSection from "../../../components/HeaderSection";
import Footer from "../../footer/Footer";

const SFDoors = () => {
  return (
    <div>
            <HeaderSection />

      <PageBanner
        title="Sliding Doors"
        subtitle="Leading the industry with innovation and quality"
      />
      <AboutSFDoors />
      <SFDoorAdv />
      <SFDoorFaq />
         <Footer/>

    </div>
  );
};

export default SFDoors;
