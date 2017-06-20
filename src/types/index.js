// @flow
export type chatType = {
  sendMessage: Function,
  addMessage: Function,
  receiveRooms: Function,
  getRooms: Function,
  handleInputMessageChange: Function,
  messages: Array<string>,
  rooms: Array<string>,
  inputMessage: {
    inputMessage: string
  }
}

export type storeType = {
    chat: chatType
}