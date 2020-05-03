import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { Typography, MenuList, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { logout } from '../../../store/actions/userActions';

const styles = theme => ({
	signInLinks: {
		display: 'flex',
		alignItems: 'center',
	},
	welcome: {
		color: theme.palette.primary.contrastText,
		fontSize: '24px',
	},
	avatar: {
		backgroundColor: theme.palette.secondary.main,
		marginLeft: theme.spacing.unit * 3,
		color: theme.palette.secondary.contrastText,
	},
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

function SignInLinks(props) {
	const { classes, logout, user } = props;
	const handleLogoutUser = () => {
		console.log('handleLogoutUser');
		logout();
	};

	return (
		<div className={classes.signInLinks}>
			{user && (
				<Typography component="p" className={classes.welcome}>
					Have a nice day, {user.firstName ? user.firstName : user.email}
				</Typography>
			)}
			<Avatar className={classes.avatar}>KW</Avatar>
			<MenuList component="nav" className={classes.menu}>
				<MenuItem button component={RouterLink} to="/dashboard" className={classes.menuLink}>
					Dashboard
				</MenuItem>
				<MenuItem button component={RouterLink} to="/tasks/todo" className={classes.menuLink}>
					Todo
				</MenuItem>
				<MenuItem button component={RouterLink} to="/tasks/done" className={classes.menuLink}>
					Done
				</MenuItem>
				<MenuItem button component={RouterLink} to="/tasks/todo/create" className={classes.menuLink}>
					Create
				</MenuItem>
				<MenuItem button className={classes.menuLink} onClick={handleLogoutUser}>
					Logout
				</MenuItem>
			</MenuList>
		</div>
	);
}

export default connect(
	null,
	{ logout }
)(withStyles(styles)(SignInLinks));
