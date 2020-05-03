import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PageTitle from '../../shared/PageTitle/PageTitle';

const styles = theme => ({
	home: {
		maxWidth: '1280px',
		marginLeft: 'auto',
		marginRight: 'auto',
	},
});

function Home({ classes }) {
	return (
		<div className={classes.home}>
			<PageTitle>do more in less time</PageTitle>
		</div>
	);
}

export default withStyles(styles)(Home);
