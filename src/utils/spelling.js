// @flow
import Spellchecker from 'hunspell-spellchecker'
import affFile from '../dictionary/mi_NZ.aff'
import dictFile from '../dictionary/mi_NZ.dic'
import request from 'superagent'

export default async function spellcheck (word: string) {
  const aff = await request.get(affFile)
  const dict = await request.get(dictFile)

  const spellchecker = new Spellchecker()

  const DICT = spellchecker.parse({
      aff: aff.text,
      dic: dict.text
  })

  spellchecker.use(DICT)
  return spellchecker.check(word)
}
