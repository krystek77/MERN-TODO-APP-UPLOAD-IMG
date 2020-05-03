import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Content from './layout/Content/Content';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import lightBlue from '@material-ui/core/colors/lightBlue';
import CssBaseLine from '@material-ui/core/CssBaseline';
import { connect } from 'react-redux';
import { loadUser } from '../store/actions/userActions';
// import { clearErrors } from '../store/actions/errorActions';

const theme = createMuiTheme({
	palette: {
		primary: { main: grey[900] },
		secondary: { main: lightBlue['A700'] },
	},
	typography: {
		useNextVariants: true,
	},
});
//
console.log('Theme', theme);
//
function App({ loadUser }) {
	useEffect(() => {
		let mounted = true;
		if (mounted) {
			// console.log('App mounted');
			loadUser();
		}
		return () => {
			// console.log('APP unmounted');
			mounted = false; 
		};
	}, [loadUser]);
	return (
		<MuiThemeProvider theme={theme}>
			<Router basename={process.env.PUBLIC_URL}>
				<div className="app">
					<CssBaseLine />
					<Content />
				</div>
			</Router>
		</MuiThemeProvider>
	);
}

const mapDispatchToProps = dispatch => {
	return {
		loadUser: () => dispatch(loadUser()),
	};
};

export default connect(
	null,
	mapDispatchToProps
)(App);
