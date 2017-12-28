export default function eventsReducer(state = { eventResults: [] }, action) {
  switch (action.type) {
    case 'Meetup_Search':
      return { ...state, eventResults: action.payload.data };
    default:
      return state;
  }
}
