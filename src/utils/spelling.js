// @flow
import Spellchecker from 'hunspell-spellchecker'

const spellchecker = new Spellchecker()
const DICT = spellchecker.parse({
  // aff: affix,
  // dic: dictionary
})
spellchecker.use(DICT)

export default function spellcheck (word: string) {
  return spellchecker.check(word)
}
