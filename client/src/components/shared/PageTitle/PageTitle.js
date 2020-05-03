import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
	pageTitle: {
		paddingTop: theme.spacing.unit * 4,
		paddingBottom: theme.spacing.unit * 4,
		fontWeight: '700',
	},
});

function PageTitle({ classes, children }) {
	return (
		<Typography component="h1" variant="h3" align="center" className={classes.pageTitle}>
			{children}
		</Typography>
	);
}

export default withStyles(styles)(PageTitle);
