import {observable, action} from 'mobx'

const testRoom = 'test'
const io = window.io
const socket = io('http://localhost:3000')

class ChatStore {

  messages = observable([])

  constructor () {
    socket.on(testRoom, this.addMessage)
  }
  
  addMessage = action((message) => {
    this.messages.push(message)
  })

  sendMessage = action((channel = 'test', message = 'test message') => {
    socket.emit(channel, message)
  }) 

}

const chatStore = new ChatStore()

export default chatStore