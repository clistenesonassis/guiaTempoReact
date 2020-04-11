import { combineReducers, createStore } from 'redux';
import CityReducer from './reducer';

const rootReducer = combineReducers({
	CityReducer: CityReducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;