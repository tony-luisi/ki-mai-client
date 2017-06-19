import Spellchecker from 'hunspell-spellchecker'
import dictionary from '../dictionary/mi_NZ.dic'
import affix from '../dictionary/mi_NZ.aff'

const spellchecker = new Spellchecker()
  const DICT = spellchecker.parse({
    aff: affix,
    dic: dictionary
  })

export default function spellcheck (word) {
  spellchecker.use(DICT)
  return spellchecker.check(word)
}
