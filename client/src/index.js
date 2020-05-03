import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
//Roboto fonts
import 'typeface-roboto';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './store/reducers/rootReducer';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
// console.log('GET STORE', store.getState());
//

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
