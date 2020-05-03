import type from './types';

//Return errors

export const returnErrors = (message, status, id = null) => {
	console.log(message, status, id);
	return { type: type.GET_ERRORS, message, status, id };
};

//Clear errors

export const clearErrors = () => {
	return {
		type: type.CLEAR_ERRORS,
	};
};
