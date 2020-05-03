import React, { useState, useEffect } from 'react';
import Task from './Task';
import SvgIconButton from '../SvgIconButton/SvgIconButton';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, SvgIcon, ButtonBase } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { finishTask, clearMessage } from '../../../store/actions/taskActions';

const styles = theme => ({
	green: {
		color: 'green',
	},
	black: {
		color: 'black',
	},
	icon: {
		color: theme.palette.primary.main,
		'&:hover': {
			backgroundColor: 'initial',
			color: theme.palette.secondary.main,
		},
	},
});

function TaskWithEditAndFinishedIcons({ task, classes, index, finishTask, clearMessage }) {
	const [newTask, setNewTask] = useState(task);
	// console.log(newTask);

	const handleFinishTask = () => {
		setNewTask({
			...newTask,
			finished: !newTask.finished,
		});
	};

	useEffect(() => {
		let mounted = true;
		// console.log('USEEFFECT TASK');
		// console.log('newTask', newTask);
		const interval = setTimeout(clearMessage, 2000);
		if (mounted) {
			finishTask(newTask);
		}
		return () => {
			clearTimeout(interval);
			mounted = false;
			// console.log('UNMOUNTED TASK');
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newTask.finished]);

	const { finished } = newTask;

	return (
		<Task task={task} done={finished} index={index}>
			<ButtonBase component={RouterLink} to={`/tasks/todo/edit/${task._id}`}>
				<IconButton classes={{ root: classes.icon }}>
					<SvgIcon>
						<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
					</SvgIcon>
				</IconButton>
			</ButtonBase>
			<SvgIconButton
				handleClick={() => handleFinishTask()}
				classes={finished ? { icon: classes.green } : { icon: classes.black }}
			>
				<path xmlns="http://www.w3.org/2000/svg" fill="none" d="M0 0h24v24H0z" />
				<path xmlns="http://www.w3.org/2000/svg" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
			</SvgIconButton>
		</Task>
	);
}

const mapDispatchToProps = dispatch => {
	return {
		finishTask: task => dispatch(finishTask(task)),
		clearMessage: () => dispatch(clearMessage()),
	};
};

export default connect(
	null,
	mapDispatchToProps
)(withStyles(styles)(TaskWithEditAndFinishedIcons));
