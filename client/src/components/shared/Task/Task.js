import React from 'react';
import { TableCell, TableRow, ButtonBase, IconButton, SvgIcon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SvgIconButton from '../SvgIconButton/SvgIconButton';
import { connect } from 'react-redux';
import { deleteTask } from '../../../store/actions/taskActions';
import teal from '@material-ui/core/colors/teal';
import { Link as RouterLink } from 'react-router-dom';

const styles = theme => ({
	icon: {
		color: theme.palette.primary.main,
		'&:hover': {
			backgroundColor: 'initial',
			color: theme.palette.secondary.main,
		},
	},
	tableCellBody: {
		fontSize: '1rem',
	},
	tableCellRoot: {
		textAlign: 'center',
		padding: '0px',
	},
	row: {
		'&:hover': {
			backgroundColor: teal[100],
		},
	},
	done: {
		textDecoration: 'line-through',
	},
});

function Task({
	classes,
	children,
	done,
	index,
	task: { _id, title, priority, createdAt, updatedAt, deadline },
	deleteTask,
}) {
	//
	const handleDeleteTask = _id => {
		deleteTask(_id);
	};

	return (
		<TableRow classes={{ root: classes.row }} className={done ? classes.done : ''}>
			<TableCell classes={{ body: classes.tableCellBody, root: classes.tableCellRoot }}>{index + 1}</TableCell>
			<TableCell classes={{ body: classes.tableCellBody, root: classes.tableCellRoot }}>{title}</TableCell>
			<TableCell classes={{ body: classes.tableCellBody, root: classes.tableCellRoot }}>{priority}</TableCell>
			<TableCell classes={{ body: classes.tableCellBody, root: classes.tableCellRoot }}>{createdAt}</TableCell>
			<TableCell classes={{ body: classes.tableCellBody, root: classes.tableCellRoot }}>{updatedAt}</TableCell>
			<TableCell classes={{ body: classes.tableCellBody, root: classes.tableCeilRoot }}>{deadline}</TableCell>
			<TableCell classes={{ body: classes.tableCellBody, root: classes.tableCellRoot }}>
				<SvgIconButton handleClick={() => handleDeleteTask(_id)}>
					<path
						xmlns="http://www.w3.org/2000/svg"
						d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
					/>
					<path xmlns="http://www.w3.org/2000/svg" d="M0 0h24v24H0z" fill="none" />
				</SvgIconButton>
				<ButtonBase component={RouterLink} to={`/tasks/todo/details/${_id}`}>
					<IconButton classes={{ root: classes.icon }}>
						<SvgIcon>
							<path d="M0 0h24v24H0z" fill="none" />
							<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
						</SvgIcon>
					</IconButton>
				</ButtonBase>
				{children}
			</TableCell>
		</TableRow>
	);
}

const mapDispatchToProps = dispatch => {
	return {
		deleteTask: _id => dispatch(deleteTask(_id)),
	};
};

export default connect(
	null,
	mapDispatchToProps
)(withStyles(styles)(Task));
