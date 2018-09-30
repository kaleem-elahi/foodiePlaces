import React from 'react';
import ContentLoader from 'react-content-loader';

const CardLoader = props => (
  <ContentLoader
    height={160}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    {...props}
  >
    <rect x="90" y="3" rx="4" ry="4" width="217" height="19.4" />
    <rect x="90" y="50" rx="4" ry="4" width="207" height="6.4" />
    <rect x="90" y="35" rx="3" ry="3" width="775" height="6.4" />
    <rect x="00" y="00" rx="4" ry="4" width="85" height="84" />
  </ContentLoader>
);

export default CardLoader;
