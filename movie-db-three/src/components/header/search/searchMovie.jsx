import React, { Component } from 'react';
import './searchMovie.css';
import _ from 'lodash';

class SearchMovie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: 'Type to search...',
    };

    this.debounceDelay = _.debounce((value, page) => this.props.onSearch(value, page), 600);

    this.onValueChange = (e) => {
      this.debounceDelay(e.target.value, this.props.page);
      this.setState({
        search: e.target.value,
      });
    };

    this.onFocus = () => {
      this.setState({
        search: '',
      });
    };

    this.onSubmit = (e) => {
      e.preventDefault();
      this.props.onSearch(this.state.search, this.props.page);
      this.setState({
        search: '',
      });
    };
  }

  render() {
    return (
      <form className="search__form" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="edit"
          onChange={this.onValueChange}
          value={this.state.search}
          onFocus={this.onFocus}
        />
      </form>
    );
  }
}

export default SearchMovie;
