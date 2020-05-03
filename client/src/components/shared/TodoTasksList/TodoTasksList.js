import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

import TodoTask from './TodoTask/TodoTask';
import TaskWithEditAndFinishIcons from '../Task/TaskWithEditAndFinishIcons';

const styles = theme => ({
	todoTaskWrapper: {
		padding: theme.spacing.unit * 2,
		backgroundColor: 'rgba(255,255,255,0.8)',
		overflowX: 'scroll',
		maxWidth: '1280px',
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	table: {
		padding: '0px',
	},
	tableHead: {
		fontSize: '1rem',
		textAlign: 'center',
		textTransform: 'uppercase',
		backgroundColor: theme.palette.primary.light,
		color: theme.palette.primary.contrastText,
	},
});

function TodoTasksList({ classes, tasks, children }) {
	// console.log('TodoTasksList', tasks);

	return (
		<div>
			{children}
			<Paper classes={{ root: classes.todoTaskWrapper }}>
				<Table classes={{ root: classes.table }}>
					<TableHead>
						<TableRow>
							<TableCell classes={{ head: classes.tableHead }}>Lp.</TableCell>
							<TableCell classes={{ head: classes.tableHead }}>Title</TableCell>
							<TableCell classes={{ head: classes.tableHead }}>Priority</TableCell>
							<TableCell classes={{ head: classes.tableHead }}>Created At</TableCell>
							<TableCell classes={{ head: classes.tableHead }}>Updated At</TableCell>
							<TableCell classes={{ head: classes.tableHead }}>Deadline</TableCell>
							<TableCell classes={{ head: classes.tableHead }}>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tasks.length > 0
							? tasks.map((task, index) => (
									<TodoTask key={task._id}>
										<TaskWithEditAndFinishIcons task={task} index={index} />
									</TodoTask>
							  ))
							: null}
					</TableBody>
				</Table>
			</Paper>
		</div>
	);
}

export default withStyles(styles)(TodoTasksList);
