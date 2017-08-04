// @flow
import Spellchecker from 'hunspell-spellchecker'
import affFile from '../dictionary/mi_NZ.aff'
import dictFile from '../dictionary/mi_NZ.dic'
import request from 'superagent'

class Spellcheck {

  spellchecker = new Spellchecker()

  constructor () {
    this.initialiseDictionary()
  }

  initialiseDictionary = async () => {
    const aff = await request.get(affFile)
    const dict = await request.get(dictFile)

    const DICT = this.spellchecker.parse({
        aff: aff.text,
        dic: dict.text
    })
    this.spellchecker.use(DICT)
  }

  getSpelling = (word: string): boolean => {
    if (this.spellchecker.dict) {
      return this.spellchecker.check(word)
    }
    return true
  }

  suggestSpelling = (word: string): string[] => {
    if (this.spellchecker.dict) {
      return this.spellchecker.suggest(word)
    }
    return []
  }

}

const spellcheck = new Spellcheck()

export default spellcheck
