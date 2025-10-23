import React from "react";
import PageBanner from "../../PageBanner";
import AboutFrenchWindows from "./AboutFrenchWindows";
import FrenchWindowsAdv from "./FrenchWindowsAdv";
import FrenchWindowsFaq from "./FrenchWindowsFaq";
import HeaderSection from "../../../components/HeaderSection";
import Footer from "../../footer/Footer";

const FrenchWindows = () => {
  return (
    <div>
      <HeaderSection />

      <PageBanner
        title="French Windows"
        subtitle="Leading the industry with innovation and quality"
      />
      <AboutFrenchWindows />
      <FrenchWindowsAdv />
      <FrenchWindowsFaq />
      <Footer />
    </div>
  );
};

export default FrenchWindows;
