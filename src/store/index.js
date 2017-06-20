// @flow
import chatStore from './chat'
import type { chatType } from '../types'

class Store {
  chat: chatType

  constructor() {
    // this.user = userStore
    this.chat = chatStore
  }

}

const store = new Store()
export default store