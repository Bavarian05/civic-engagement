const initialState = {
  windowPosition: null,
  showInfoWindow: false,
  currentEvent: ''
};

export default function eventsMapReducer(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_INFOWINDOW':
      if (action.data.currentEvent) {
        return { ...state,
          windowPosition: action.data.windowPosition,
          showInfoWindow: action.data.showInfoWindow,
          currentEvent: action.data.currentEvent
        };
      }
      return { ...state, windowPosition: action.data.windowPosition };
    case 'CLOSE_INFOWINDOW':
      return { ...state, showInfoWindow: false };
    default:
      return state;
  }
}
