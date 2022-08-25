/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import SwapiService from '../services/swapi-service';

import { SpinerLoading } from './spinerLoading/spinerLoading';
import AppMovieCards from './body/AppMovieCards';
import ErrorIndicator from './error-indicator/error-indicator';
import SearchMovie from './header/search/searchMovie';

// eslint-disable-next-line import/order
import { Pagination } from 'antd';

import 'antd/dist/antd.min.css';
import './App.css';

export default class App extends Component {
  constructor() {
    super();

    this.swapiService = new SwapiService();

    this.state = {
      arrayMovie: null,
      isLoading: true,
      error: true,
      totalArrayMovie: 0,
      pageNumber: 1,
      search: '',         
    };
    this.onError = () => {
      this.setState({
        error: false,
        isLoading: true,
      });
    }; 
    this.searchMovies = (search = 'return', _page) => { // or search = '/'
      if (search.trim() === '') return;
      this.swapiService
        .getAllMovies(search, _page)
        .then((result) => {
          this.setState({
            arrayMovie: result,
            isLoading: false,
            error: false,
            totalArrayMovie: result.length,
            search: search,
          });
        })
        .catch(this.onError);
    };     
  };

  componentDidMount() {
    this.searchMovies();
  }

  render() {
    const { isLoading, error } = this.state;
    const errorMessage = !error && isLoading ? <ErrorIndicator /> : null;
    const spinner = error && isLoading ? <SpinerLoading /> : null;
    const content = !(isLoading || error) ? (
      <div className="allContent">
        <div className="search">
          <SearchMovie onSearch={this.searchMovies} page={this.state.pageNumber}/>
        </div>
        <div className="container">         
          <AppMovieCards data={this.state.arrayMovie} />   
        </div>      
        <div className="pagination">
          {this.state.arrayMovie.length !== 0 ? 
            <Pagination
              size="small"
              total={this.state.totalArrayMovie}
              onChange={(page) => {
                this.setState({          
                  pageNumber: page,          
                }, () => {
                  this.searchMovies(this.state.search, page);
                });
              }}      
            /> : null
          }
        </div>
      </div>
    ) : null;

    return (
      <>
        {errorMessage}
        {spinner}
        {content}
      </>
    );
  }
}
