import React from 'react';

function BigCountNumber({ count }) {
  // console.info('BigCountNumber render');
  
  return (
    <p>
      <span className="prefix">Count:</span>
      {count}
    </p>
  );
}

export default BigCountNumber;