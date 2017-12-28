import { combineReducers } from 'redux';
import locBarReducer from './locBarReducer';
import newsSearchReducer from './politicianSearchReducer';
import propublicaReducer from './propublicaReducer';
import eventsReducer from './eventsSearchReducer';
import eventsMapReducer from './eventsMapReducer';
import setLogin from './setLogin';


const rootReducer = combineReducers({
  GoogleResults: locBarReducer,
  News: newsSearchReducer,
  Propublica: propublicaReducer,
  Events: eventsReducer,
  EventsMap: eventsMapReducer,
  LoggedIn: setLogin
});

export default rootReducer;
