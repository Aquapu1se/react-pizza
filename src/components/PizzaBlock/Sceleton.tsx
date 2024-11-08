import React from 'react';
import ContentLoader from 'react-content-loader';

const Sceleton: React.FC = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="134" cy="136" r="125" />
    <rect x="0" y="270" rx="10" ry="10" width="280" height="28" />
    <rect x="0" y="320" rx="10" ry="10" width="280" height="88" />
    <rect x="125" y="447" rx="25" ry="25" width="152" height="45" />
    <rect x="0" y="447" rx="10" ry="10" width="95" height="30" />
  </ContentLoader>
);

export default Sceleton;
