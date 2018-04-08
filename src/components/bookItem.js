import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
// Config
import { hash, public_key as apikey, ts } from '../config';
// Assets and Actions
import Arrow from '../assets/img/arrow.svg';
import Plus from '../assets/img/plus.svg';
import Minus from '../assets/img/minus.svg';

class BookItem extends Component {
  state = {
    showDetail: false,
    charLoading: false,
    showChar: false,
    charIndex: 0,
    characters: []
  };

  // Main Accordion
  handleAccordion = () => {
    const { showDetail } = this.state;
    const { available, items } = this.props.comic.characters;
    if (showDetail) return this.setState({ characters: [], showDetail: false });
    this.setState(
      { showDetail: !this.state.showDetail, charLoading: available > 0 ? true : false },
      () => (available > 0 ? _.forEach(items, ({ resourceURI }, i) => this._getCharacters(resourceURI, available)) : null)
    );
  };

  // Accordion Character
  handleAccordionChar(charIndex) {
    this.setState({ showChar: !this.state.showChar, charIndex });
  }

  // Fetch character method
  _getCharacters(url, index) {
    axios.get(url, { params: { apikey, hash, ts } }).then(({ data }) =>
      this.setState({ characters: [...this.state.characters, data.data.results[0]] }, () => {
        this.setState({ charLoading: this.state.characters.length === index ? false : true });
      })
    );
  }

  renderButton(id) {
    return (
      <button className="book__btn" onClick={this.handleAccordion}>
        {this.state.showDetail ? 'HIDE DETAIL' : 'SHOW MORE'}
        <img
          src={Arrow}
          alt={`ArrowDown${id}`}
          className={`book__btn__img ${this.state.showDetail ? 'book__btn__img--close' : 'book__btn__img--open'}`}
        />
      </button>
    );
  }

  renderDetailAccordion(comic) {
    const { description } = comic;
    const { showDetail, characters, charLoading, showChar, charIndex } = this.state;
    return (
      <div className={`book__detail ${showDetail ? '' : 'book__detail--hidden'} `}>
        <h3 className="book__detail-title">Description:</h3>
        <p className="book__detail-paragraph">{!description ? 'No description found' : description}</p>
        <h3 className="book__detail-title">Characters:</h3>
        <div className="book__detail-group">
          {comic.characters.available === 0 ? (
            <p className="book__detail-character-text">No characters found</p>
          ) : charLoading ? (
            'Carregando ...'
          ) : (
            _.map(characters, ({ name, descrition, thumbnail, id }) => {
              const imgUrl = `${thumbnail.path}.${thumbnail.extension}`;
              return (
                <div key={id} className="book__character">
                  <button className="book__character-btn" onClick={() => this.handleAccordionChar(id)}>
                    {name}
                    <img src={charIndex === id && showChar ? Minus : Plus} alt={`ExpandImg${id}`} className="book__character-btn__img" />
                  </button>
                  <div className={`book__character__group ${charIndex === id && showChar ? '' : 'book__character__group--hidden'} `}>
                    <img src={imgUrl} alt={`charImg${id}`} className="book__character-img" />
                    <div className="ml-sm">
                      <h3 className="book__detail-title">Description:</h3>
                      <p className="book__character-text">{description}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }

  render() {
    const { title, thumbnail, id } = this.props.comic;
    const thumnailImg = `${thumbnail.path}.${thumbnail.extension}`;
    return (
      <div className="book">
        <img src={thumnailImg} alt={`ThumbnailImg${id}`} className="book__img" />
        <h2 className="book__heading">{title}</h2>
        {this.renderDetailAccordion(this.props.comic)}
        {this.renderButton(id)}
      </div>
    );
  }
}

export default BookItem;
