import React from "react";
import SlidingWindowFaq from "./SlidingWindowFaq";
import SlidingWindowAdv from "./SlidingWindowAdv";
import AboutSlidingWindows from "./AboutSlidingWindows";

const SlidingWindows = () => {
  return (
    <div>
       <AboutSlidingWindows />
      <SlidingWindowAdv />
      <SlidingWindowFaq />
     
    </div>
  );
};

export default SlidingWindows;
