// import userStore from './user'
import chatStore from './chat'

class Store {
  constructor() {
    // this.user = userStore
    this.chat = chatStore
  }

}

const store = new Store()
export default store