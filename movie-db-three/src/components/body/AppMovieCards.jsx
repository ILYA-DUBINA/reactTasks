import React from 'react';

import { SpinerLoading } from '../spinerLoading/spinerLoading.jsx';
import './AppMovieCards.css';

import AppCard from './appCard.jsx';

const AppMovieCards = (props) => {
  let elements = props.data.map((item) => {
    if (item === null) {
      return <SpinerLoading />;
    }
    const { id } = item;
    return <AppCard key={id} {...item} />;
  });

  return <>{elements.length === 0 ? <h2 className="noMovie">Фильмы по вашему запросу не найдены</h2> : elements}</>;
};

export default AppMovieCards;
