import React from 'react';

import Breadcrumb from '../../Breadcrumb';
import { path } from 'framer-motion/client';
import AboutCasementWindow from './AboutCasementWindow';
import CasementWindowAdv from './CasementWindowAdv';
import CasementWindowFaq from './CasementWindowFaq';

const CasementWindow = () => {
  return (
    <div>
     
      <Breadcrumb items={[{ label: "Home", path: "/" }, { label: "Casement Windows", path: "/products/casement-windows" }]} />
      <AboutCasementWindow />
      <CasementWindowAdv />
      <CasementWindowFaq />

    </div>
  );
};

export default CasementWindow;