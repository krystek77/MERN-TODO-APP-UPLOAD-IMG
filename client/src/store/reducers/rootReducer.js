import tasksReducer from './tasksReducer';
import usersReducer from './usersReducer';
import errorsReducer from './errorsReducer';
//
import { combineReducers } from 'redux';
//
const rootReducer = combineReducers({
	task: tasksReducer,
	user: usersReducer,
	error: errorsReducer,
});
//
export default rootReducer;
