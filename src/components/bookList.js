import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
// Components
import Loading from './loading';
import BookItem from './bookItem';
import Error from './error';

const BookList = ({ loading, comicBooksData, error }) => {
  const noLength = comicBooksData.results.length === 0;
  if (loading) return <Loading />;
  if (noLength || error) return <Error error={error} noData={noLength} />;
  return <section className="section-books">{_.map(comicBooksData.results, comic => <BookItem key={comic.id} comic={comic} />)}</section>;
};

const mapStateToProps = ({ comicReducers }) => comicReducers;

export default connect(mapStateToProps, null)(BookList);
