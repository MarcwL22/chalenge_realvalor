import React, { Component } from 'react';
import { connect } from 'react-redux';
// Assets
import MarvelLogo from './assets/img/marvel-logo.svg';
import SearchIcon from './assets/img/search.svg';
// Actions
import { fetchComics } from './actions';
// Components
import BookList from './components/bookList';

class HomePage extends Component {
  state = {
    search: '',
    searched: ''
  };

  componentDidMount() {
    this.props.fetchComics();
  }

  onChange = e => {
    this.setState({ search: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.fetchComics(this.state.search || null);
    this.setState({ searched: this.state.search, search: '' });
  };

  render() {
    const { search, searched } = this.state;
    return (
      <div className="container">
        <header className="header">
          <img src={MarvelLogo} alt="MarvelLogo" className="logo" />
          <form onSubmit={this.handleSubmit} className="search">
            <input type="text" className="search__input" placeholder="Search..." value={search} onChange={this.onChange} />
            <button className="search__button" type="submit">
              <img src={SearchIcon} alt="SearchIcon" className="search__icon" />
            </button>
          </form>
        </header>
        <h1 className="logo__heading">List of Comic Books</h1>
        {searched ? <h2 className="logo__searched">You Searched for: "{searched}"</h2> : null}
        <BookList />
      </div>
    );
  }
}

export default connect(null, { fetchComics })(HomePage);
