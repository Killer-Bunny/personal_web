export default function(state={},action){
  switch (action.type) {
    case 'GET_CONTENT':
      return {...state, placeholders: action.payload};
    default:
        return state;
  }

}
