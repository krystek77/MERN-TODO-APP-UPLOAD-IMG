import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
	pageFooter: {
		padding: theme.spacing.unit * 4,
		backgroundColor: theme.palette.common.light,
		color: theme.palette.common.dark,
		textAlign: 'center',
		width: '100%'
	},
	socialLink: {
		paddingRight: theme.spacing.unit * 1,
		paddingLeft: theme.spacing.unit * 1,
		marginTop: theme.spacing.unit * 2,
	},
});

function Footer({ classes }) {
	return (
		<footer className={classes.pageFooter}>
			<Typography component="span" variant="body1">
				Build with love{' '}
				<span role="img" aria-label="love">
					❤️
				</span>{' '}
				Krystian Wrona, 2019 - 2020
			</Typography>
			<Link
				href="https://github.com"
				color="secondary"
				target="_blank"
				rel="noopener"
				className={classes.socialLink}
			>
				GitHub
			</Link>
			<Typography component="span" variant="body1" inline color="primary">
				/
			</Typography>
			<Link
				href="https://www.linkedin.com/in/krystian-wrona-77237ab4/"
				color="secondary"
				target="_blank"
				rel="noopener"
				className={classes.socialLink}
			>
				Linkedin
			</Link>
		</footer>
	);
}

export default withStyles(styles)(Footer);
