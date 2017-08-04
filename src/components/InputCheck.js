// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import spellcheck from '../utils/spelling'
import classNames from 'classnames'
import './InputCheck.css';


class InputCheck extends Component {

  checkSpelling = () => {
    const words = this.props.store.chat.inputMessage.inputMessage.split(' ')
    return words.map(word => ({
       correct: spellcheck.getSpelling(word),
       word: word
    }))
  }

  render() {
    const spellwords = this.checkSpelling()
    return (
      <div>
        {spellwords.map((wordObject, i) => {
          const suggestions = spellcheck.suggestSpelling(wordObject.word)
          return (
            <div key={i}>
              <div className={classNames({highlight: !wordObject.correct})}>{wordObject.word}</div>
              {suggestions.map((suggestion, j) => {
                return (
                  <div key={j}>{suggestion}</div>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }
}

export default inject('store')(observer(InputCheck))