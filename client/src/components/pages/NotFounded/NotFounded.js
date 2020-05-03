import React, { useState, useEffect } from 'react';
import { Redirect, Link as RouterLink } from 'react-router-dom';
import { Typography, Link, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PageTitle from '../../shared/PageTitle/PageTitle';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
	notFounded: {
		width: '600px',
		marginLeft: 'auto',
		marginRight: 'auto',
		textAlign: 'center',
	},
	notFoundedArea: {
		backgroundColor: 'rgba(255,255,255,0.8)',
		padding: theme.spacing.unit * 4,
	},
	errorTitle: {
		display: 'flex',
		flexWrap: 'nowrap',
		alignItems: 'center',
	},
	avatarError: {
		marginRight: theme.spacing.unit,
	},
	messageError: {
		color: theme.palette.error.dark,
		fontSize: '2rem',
		lineHeight: '1.1',
		marginTop: theme.spacing.unit,
		marginBottom: theme.spacing.unit,
	},
	redirectMessage: {
		fontSize: '1.2rem',
		marginBottom: theme.spacing.unit,
	},
	divider: {
		marginLeft: theme.spacing.unit * 4,
		marginRight: theme.spacing.unit * 4,
		marginBottom: theme.spacing.unit * 2,
	},
});

function NotFounded({ classes }) {
	const [count, setCount] = useState(100);

	useEffect(() => {
		const countdown = () => {
			if (count > 0) setCount(count - 1);
		};

		// console.log('render');
		const interval = setTimeout(countdown, 1000);
		// console.log('after setTimout');
		return () => {
			// console.log('unmounting');
			clearInterval(interval);
		};
	}, [count]);

	return (
		<div className={classes.notFounded}>
			<PageTitle>not founded</PageTitle>
			<Paper elevation={1} className={classes.notFoundedArea}>
				<div className={classes.errorTitle}>
					<Avatar className={classes.avatarError}>
						<Icon className={classes.icon}>error</Icon>
					</Avatar>
					<Typography component="span" variant="h5">
						error
					</Typography>
				</div>
				<Typography component="p" variant="body1" className={classes.messageError}>
					Page doesn't exist, it is not available or has been deleted
				</Typography>
				<Typography component="p" variant="body2" margin="normal" className={classes.redirectMessage}>
					Redirect to home page in {count} seconds
				</Typography>
				{!count && <Redirect to="/" />}
				<Divider className={classes.divider} />
				<Link component={RouterLink} to="/" color="secondary">
					To home page...
				</Link>
			</Paper>
		</div>
	);
}

export default withStyles(styles)(NotFounded);
