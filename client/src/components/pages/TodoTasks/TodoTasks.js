import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PageTitle from '../../shared/PageTitle/PageTitle';
import TodoTasksList from '../../shared/TodoTasksList/TodoTasksList';
import { connect } from 'react-redux';

const styles = theme => ({
	todoTasks: {
		maxWidth: '1280px',
		marginLeft: 'auto',
		marginRight: 'auto',
	},
});

function TodoTasks(props) {
	const { classes, tasks, isAuthenticated } = props;
	useEffect(() => {
		if (!isAuthenticated) props.history.push('/users/signin');
		return () => {};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated]);

	return (
		<div className={classes.todoTasks}>
			<PageTitle>todo tasks list</PageTitle>
			<TodoTasksList tasks={tasks} />
		</div>
	);
}

const mapStateToProps = state => ({
	tasks: state.task.tasks,
});

export default connect(mapStateToProps)(withStyles(styles)(TodoTasks));
