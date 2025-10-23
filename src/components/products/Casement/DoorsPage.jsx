import PageBanner from "@/components/PageBanner";
import HeaderSection from "@/components/pages/HeaderSection";
import React from "react";
import AboutCasementDoor from "./AboutCasementDoor";
import DoorsFAQ from "./DoorsFAQ";
import Footer from "@/components/pages/Footer";
import AdvantagesDoors from "./AdvantagesDoors";


const DoorsPage = () => {
  return (
    <div>
      <AboutCasementDoor />
      <AdvantagesDoors />
      <DoorsFAQ />

    </div>
  );
};

export default DoorsPage;
