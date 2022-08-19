import React from 'react';

import SpinerLoading from '../spinerLoading/spinerLoading.jsx';

import AppCard from './appCard.jsx';

const AppMovieCards = (props) => {
  let elements = props.data.map((item) => {
    const { id } = item;

    return <AppCard key={id} {...item} />;
  });

  return <>{elements ? elements : <SpinerLoading />}</>;
};

export default AppMovieCards;
