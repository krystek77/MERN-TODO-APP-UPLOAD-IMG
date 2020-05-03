import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
	signOutLinks: {},
	menu: {
		display: 'flex',
	},
	menuLink: {
		color: theme.palette.primary.contrastText,
		fontSize: '24px',
		fontWeight: '300',
		paddingLeft: '10px',
		paddingRight: '10px',
		whiteSpace: 'nowrap',
	},
});

function SignOutLinks({ classes }) {
	return (
		<div className={classes.signOutLinks}>
			<MenuList className={classes.menu} component="nav">
				<MenuItem component={RouterLink} to="/users/signin" className={classes.menuLink}>
					sign in
				</MenuItem>
				<MenuItem component={RouterLink} to="/users/signup" className={classes.menuLink}>
					sign up
				</MenuItem>
			</MenuList>
		</div>
	);
}

export default withStyles(styles)(SignOutLinks);
