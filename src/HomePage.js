import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
// Assets
import MarvelLogo from './assets/img/marvel-logo.svg';
import SearchIcon from './assets/img/search.svg';
// Actions
import { fetchComics } from './actions';
// Components
import BookList from './components/bookList';

const widthWindow = window.innerWidth;

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

  handlePageChange = ({ selected }) => {
    const offset = selected * 20;
    this.props.fetchComics(null, offset);
  };

  render() {
    const { search, searched } = this.state;
    const { comicBooksData } = this.props;
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
        <div className="pagination">
          <ReactPaginate
            pageCount={comicBooksData.total / 20}
            pageRangeDisplayed={widthWindow > 600 ? 3 : 1}
            marginPagesDisplayed={2}
            onPageChange={this.handlePageChange}
            containerClassName={'pagination__list'}
            pageClassName={'pagination__item'}
            breakClassName={'pagination__item'}
            activeClassName={'pagination__selected'}
            previousLabel={widthWindow > 600 ? 'Previous' : '<'}
            previousClassName={'pagination__button pagination__previous'}
            nextLabel={widthWindow > 600 ? 'Next' : '>'}
            nextClassName={'pagination__button pagination__next'}
          />
        </div>
        {searched ? <h2 className="logo__searched">You Searched for: "{searched}"</h2> : null}
        <BookList />
      </div>
    );
  }
}

const mapStateToProps = ({ comicReducers }) => comicReducers;

export default connect(mapStateToProps, { fetchComics })(HomePage);
