// @flow
import {observable, action} from 'mobx'

const testRoom = 'test'
const io = window.io
const socket = io('http://localhost:3000')

class ChatStore {

  messages = observable([])
  rooms = observable([])
  inputMessage = observable({ inputMessage: '' })

  constructor () {
    socket.on(testRoom, this.addMessage)
    socket.on('rooms', this.receiveRooms)
  }
  
  addMessage = action((message) => {
    this.messages.push(message)
  })

  sendMessage = action((channel = 'test') => {
    socket.emit(channel, this.inputMessage.inputMessage)
  }) 

  receiveRooms = action((rooms) => {
    this.rooms.replace(rooms)

  })

  getRooms = action(() => {
    socket.emit('rooms', action((rooms) => {
      this.rooms.replace(rooms)
    }))
  })

  handleInputMessageChange = action((e) => {
    this.inputMessage.inputMessage = e.target.value 
  })

}

const chatStore = new ChatStore()

export default chatStore