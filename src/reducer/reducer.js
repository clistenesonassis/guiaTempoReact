import {
	ADD_CITY,
    REMOVE_CITY,
    ADD_DATA
} from './action';

const INITIAL_STATE	= {
    city: [],
};

const cityReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_CITY:
            state.city.push(action.city)
			return {
                ...state
            };
        case REMOVE_CITY:
            return {
                ...state,
                city: state.city.filter( (city) => city != action.city)
            }
        default:
            return state;
    }
}

export default cityReducer;