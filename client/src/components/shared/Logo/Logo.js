/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	logoWrapper: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '10px',
	},
	logo: {
		fontSize: '48px',
		color: theme.palette.primary.contrastText,
	},
	logoText: {
		fontSize: '24px',
		fontWeight: '100',
		color: theme.palette.primary.contrastText,
		whiteSpace: 'nowrap',
		paddingLeft: theme.spacing.unit,
	},
});

function Logo({ children, classes }) {
	return (
		<Link component={RouterLink} to="/" className={classes.logoWrapper}>
			<span role="img" aria-label="eagle" className={classes.logo}>
				🦅
			</span>
			{children && (
				<Typography component="span" className={classes.logoText}>
					{children}
				</Typography>
			)}
		</Link>
	);
}

export default withStyles(styles)(Logo);
