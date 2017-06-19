import Spellchecker from 'hunspell-spellchecker'
import dictionary from '../dictionary/mi_NZ.dic'
import affix from '../dictionary/mi_NZ.aff'

const spellchecker = new Spellchecker()
const DICT = spellchecker.parse({
  aff: affix,
  dic: dictionary
})
spellchecker.use(DICT)

export default function spellcheck (word) {
  return spellchecker.suggest(word)
}
