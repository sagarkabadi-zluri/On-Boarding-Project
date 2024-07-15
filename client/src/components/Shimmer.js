// src/components/Shimmer.js

import React, { useState, useEffect } from 'react';

const Shimmer = () => {
  const [showShimmer, setShowShimmer] = useState(true);

  useEffect(() => {
    const shimmerTimer = setTimeout(() => {
      setShowShimmer(false);
    }, 1000); 

    return () => clearTimeout(shimmerTimer);
  }, []);

  return showShimmer ? <div className="shimmer-effect"></div> : null;
};

export default Shimmer;
