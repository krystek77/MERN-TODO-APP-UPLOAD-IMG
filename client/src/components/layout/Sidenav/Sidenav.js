import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, Divider } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const styles = theme => ({
	taskPanel: {},
	paper: {
		backgroundColor: theme.palette.secondary.main,
		color: theme.palette.secondary.contrastText,
		width: '240px',
	},
	drawerHeader: {
		display: 'flex',
		justifyContent: 'flex-end',
		padding: '16px 20px',
	},
});

function Sidenav({ classes }) {
	return (
		<Drawer classes={{ paper: classes.paper }} variant="permanent" elevation={1} anchor="left">
			<List component="nav" className={classes.taskPanel}>
				<ListItem button component={RouterLink} to="/dashboard">
					Dashboard
				</ListItem>
				<ListItem button component={RouterLink} to="/tasks/todo">
					Todo
				</ListItem>
				<ListItem button component={RouterLink} to="/tasks/done">
					Done
				</ListItem>
				<ListItem button component={RouterLink} to="/tasks/todo/create">
					Create
				</ListItem>
			</List>
			<Divider />
		</Drawer>
	);
}

export default withStyles(styles)(Sidenav);
