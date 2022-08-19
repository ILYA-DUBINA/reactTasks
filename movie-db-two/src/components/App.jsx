import React, { Component } from 'react';

import SwapiService from '../services/swapi-service';

import SpinerLoading from './spinerLoading/spinerLoading';
import AppMovieCards from './body/AppMovieCards';
import ErrorIndicator from './error-indicator/error-indicator';

import './App.css';

export default class App extends Component {
  constructor() {
    super();

    this.swapiService = new SwapiService();

    this.state = {
      arrayMovie: null,
      isLoading: true,
      error: true,
    };
    this.onError = () => {
      this.setState({
        error: false,
        isLoading: true,
      });
    };
    this.searchMovies = () => {
      this.swapiService
        .getAllMovies()
        .then((result) => {
          this.setState({
            arrayMovie: result,
            isLoading: false,
            error: false,
          });
        })
        .catch(this.onError);
    };
  }

  componentDidMount() {
    setTimeout(() => this.searchMovies(), 0);
  }

  render() {
    const { isLoading, error } = this.state;
    const errorMessage = !error && isLoading ? <ErrorIndicator /> : null;
    const spinner = error && isLoading ? <SpinerLoading /> : null;
    const content = !(isLoading || error) ? (
      <div className="container">
        <AppMovieCards data={this.state.arrayMovie} />
      </div>
    ) : null;

    return (
      <>
        {errorMessage}
        {spinner}
        {content}
        {/* {isLoading ? (
          <SpinerLoading />
        ) : (
          <div className="container">
            <AppMovieCards data={this.state.arrayMovie} />
          </div>
        )} */}
      </>
    );
  }
}
