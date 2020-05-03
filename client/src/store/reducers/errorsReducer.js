import type from '../actions/types';

const initialState = {
	message: '',
	status: null,
	id: null,
};

export default function(state = initialState, action) {
	switch (action.type) {
		case type.GET_ERRORS:
			console.log(type.GET_ERRORS);
			return {
				...state,
				message: action.message,
				status: action.status,
				id: action.id,
			};
		case type.CLEAR_ERRORS:
			console.log(type.CLEAR_ERRORS);
			return {
				message: '',
				status: null,
				id: null,
			};
		default:
			return state;
	}
}
