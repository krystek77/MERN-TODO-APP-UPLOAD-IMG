import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { IconButton, SvgIcon } from '@material-ui/core';

const styles = theme => ({
	icon: {
		color: theme.palette.primary.main,
		'&:hover': {
			backgroundColor: 'initial',
			color: theme.palette.secondary.main,
		},
	},
});

function SvgIconButton({ classes,children,handleClick }) {
	return (
		<IconButton classes={{ root: classes.icon }} onClick={handleClick}>
			<SvgIcon>
				{children}
			</SvgIcon>
		</IconButton>
	);
}

export default withStyles(styles)(SvgIconButton)
