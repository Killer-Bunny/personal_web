export default function(state={},action){
  switch (action.type) {
    case 'INSERT_CONTACT':
      return {...state, contact: action.payload}
    case 'GET_CONTACTS':
      return {...state, contact: action.payload}
    default:
      return state
  }

}
