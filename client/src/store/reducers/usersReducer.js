import type from '../actions/types';
//
const initialState = {
	token: localStorage.getItem('token'),
	isLoading: false,
	isAuthenticated: false,
	user: null,
};
//
const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case type.USER_LOADING:
			//fetched data login user
			console.log(type.USER_LOADING);
			return {
				...state,
				isLoading: true,
			};
		case type.USER_LOADED:
			//fetching data login user
			console.log(type.USER_LOADED);
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				user: action.user,
			};
		case type.LOGIN_SUCCESS:
			localStorage.setItem('token', action.token);
			console.log(type.LOGIN_SUCCESS);
			return {
				...state,
				token: action.token,
				user: action.user,
				isAuthenticated: true,
				isLoading: false,
			};
		case type.LOGIN_FAIL:
			localStorage.removeItem('token');
			console.log(type.LOGIN_FAIL);
			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: false,
				isLoading: false,
			};
		case type.SIGNUP_SUCCESS:
			localStorage.setItem('token', action.token);
			console.log(type.SIGNUP_SUCCESS);
			return {
				...state,
				token: action.token,
				user: action.user,
				isAuthenticated: true,
				isLoading: false,
			};
		case type.SIGNUP_FAIL:
			localStorage.removeItem('token');
			console.log(type.SIGNUP_FAIL);
			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: false,
				isLoading: false,
			};
		case type.LOGOUT_SUCCES:
			localStorage.removeItem('token');
			console.log(type.LOGOUT_SUCCES);
			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: false,
				isLoading: false,
			};
		case type.AUTH_ERROR:
			localStorage.removeItem('token');
			console.log(type.AUTH_ERROR);
			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: false,
				isLoading: false,
			};
		default:
			return state;
	}
};
export default usersReducer;
