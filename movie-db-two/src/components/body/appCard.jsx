import React, { Component } from 'react';
import moment from 'moment';

import SpinerLoading from '../spinerLoading/spinerLoading.jsx';

import minify from './appCard.js';

import './appCard.css';

export default class AppCard extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);

    this.imageUrl = 'https://image.tmdb.org/t/p/original';
  }

  render() {
    let { original_title, release_date, overview, poster_path } = this.props;

    return (
      <div className="card">
        <div className="card__content">
          <div className="card__content-image">
            {<img className="card__image-img" src={`${this.imageUrl}${poster_path}`} alt="картинка фильма" /> ? (
              <img className="card__image-img" src={`${this.imageUrl}${poster_path}`} alt="картинка фильма" />
            ) : (
              <SpinerLoading />
            )}
          </div>
          <div className="card__content-data">
            <h2 className="card__data-title">{original_title}</h2>
            <p className="card__data-time">{moment(release_date).format('MMMM D, YYYY')}</p>
            <div className="card__data-ganre">
              <div className="card__ganre-title">{null}</div>
              <div className="card__ganre-name">{null}</div>
            </div>
            <p className="card__data-text">{minify(overview, 200)}</p>
          </div>
        </div>
      </div>
    );
  }
}
