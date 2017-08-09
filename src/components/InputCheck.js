// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import spellcheck from '../utils/spelling'
import classNames from 'classnames'
import './InputCheck.css';


class InputCheck extends Component {

  handleDefine = (e) => {
    console.log(e.target.name)
  }

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
          return (
            <div key={i}>
              <div className={classNames({highlight: !wordObject.correct})}>{wordObject.word}</div>
              <button name={wordObject.word} onClick={this.handleDefine}>Define</button>
              {!wordObject.correct &&
                <button>Suggest Spelling</button>
              }
            </div>
          )
        })}
      </div>
    )
  }
}

export default inject('store')(observer(InputCheck))