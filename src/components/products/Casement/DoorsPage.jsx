"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import AboutCasementDoor from "./AboutCasementDoor";
import DoorsFAQ from "./DoorsFAQ";
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
