import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
	Paper,
	FormControl,
	Input,
	InputLabel,
	Grid,
	Avatar,
	Typography,
	TextField,
	FormControlLabel,
	Radio,
	FormLabel,
	RadioGroup,
	Divider,
	Button,
	Link,
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import PageTitle from '../../shared/PageTitle/PageTitle';
import { connect } from 'react-redux';
import { getTaskById, editTask } from '../../../store/actions/taskActions';
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
import teal from '@material-ui/core/colors/teal';

const styles = theme => ({
	editTask: {},
	formWrapper: {
		maxWidth: '800px',
		marginLeft: 'auto',
		marginRight: 'auto',
		padding: theme.spacing.unit * 3,
		backgroundColor: 'rgba(255,255,255,0.8)',
	},
	formTitle: {
		display: 'flex',
		flexWrap: 'nowrap',
		alignItems: 'center',
	},
	avatarEdit: {
		backgroundColor: theme.palette.secondary.main,
		marginRight: theme.spacing.unit,
	},
	icon: {
		color: theme.palette.secondary.contrastText,
	},
	button: {
		marginLeft: 'auto',
		marginRight: theme.spacing.unit * 2,
	},
	footer: {
		paddingTop: theme.spacing.unit * 3,
	},
	message: {
		padding: '1rem',
		marginBottom: '2rem',
		width: 'max-content',
		marginLeft: 'auto',
		marginRight: 'auto',
		borderRadius: '4px',
		backgroundColor: teal[700],
		color: teal[50],
		position: 'fixed',
		zIndex: 2,
		left: theme.spacing.unit * 4,
		top: '100px',
	},
});

function EditTask(props) {
	const { classes, match, getTaskById, editedTask, editTask, message, isAuthenticated } = props;
	const id = match.params.idTask;

	const minDate = new Date().toISOString().slice(0, 10);
	let maxDate = minDate.slice(0, 4) * 1 + 2;
	maxDate = maxDate + '-12-31';
	//
	const [task, setTask] = useState({
		title: '',
		priority: 'high',
		deadline: minDate,
		image: '',
		description: '',
		updatedAt: minDate,
		createdAt: '',
	});
	//
	const [isMessage, setIsMessage] = useState(false);
	//
	const handlePriority = event => {
		console.log(event.target.value);
		setTask({
			...task,
			priority: event.target.value,
		});
	};
	//
	const handleInputText = event => {
		// console.log(event.target.name);
		setTask({
			...task,
			[event.target.name]: event.target.value,
		});
	};
	//
	const handleDeadline = event => {
		setTask({
			...task,
			deadline: event.target.value,
		});
	};
	//
	const handleImage = event => {
		// console.log(event.target.files[0]);
		// const reader = new FileReader();
		// reader.readAsDataURL(event.target.files[0]);
		// reader.onloadend = () => {
		// 	setTask({
		// 		...task,
		// 		image: reader.result,
		// 	});
		// };
		const image = event.target.files[0];
		setTask({
			...task,
			image,
		});
	};
	//
	const handleUpdatingTodoTask = event => {
		event.preventDefault();
		console.log(task);
		//
		const formData = new FormData();
		formData.append('image', task.image);
		formData.append('title', task.title);
		formData.append('priority', task.priority);
		formData.append('description', task.description);
		formData.append('deadline', task.deadline);
		formData.append('updatedAt', minDate);
		formData.append('createdAt', task.createdAt);
		//
		editTask(formData, id);
		//
		setIsMessage(true);
	};

	useEffect(() => {
		if (!isAuthenticated) props.history.push('/users/signin');
		let mounted = true;
		const controller = new AbortController();

		const interval = setTimeout(() => setIsMessage(false), 1000);
		if (mounted) {
			getTaskById(id, controller);
			if (editedTask) {
				setTask({
					title: editedTask.title,
					priority: editedTask.priority,
					deadline: editedTask.deadline,
					image: editedTask.image,
					description: editedTask.description,
					createdAt: editedTask.createdAt,
					updatedAt: editedTask.updatedAt,
				});
			}
		}

		return () => {
			mounted = false;
			controller.abort();
			clearInterval(interval);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editedTask._id]);
	//
	let { title, priority, deadline, description } = task;
	return (
		<div className={classes.wditTask}>
			{isMessage ? (
				<Typography component="span" variant="body1" align="center" classes={{ root: classes.message }}>
					Message: {message}
				</Typography>
			) : null}
			<PageTitle>edit task - {id}</PageTitle>
			<Paper className={classes.formWrapper} elevation={1}>
				<form className={classes.form} onSubmit={handleUpdatingTodoTask}>
					<Grid container spacing={16}>
						<Grid item xs={12}>
							<div className={classes.formTitle}>
								<Avatar className={classes.avatarEdit}>
									<Icon className={classes.icon}>edit</Icon>
								</Avatar>
								<Typography component="span" variant="h5">
									edit
								</Typography>
							</div>
						</Grid>
						<Grid item xs={12} md={6}>
							<FormControl fullWidth>
								<InputLabel htmlFor="title">Title</InputLabel>
								<Input
									value={title}
									onChange={handleInputText}
									type="text"
									id="title"
									name="title"
									autoFocus
								/>
							</FormControl>
							<FormControl margin="dense">
								<FormLabel>Priority</FormLabel>
								<RadioGroup row value={priority} onChange={handlePriority}>
									<FormControlLabel
										control={<Radio />}
										label="high"
										value="high"
										checked={priority === 'high'}
									/>
									<FormControlLabel
										control={<Radio />}
										label="medium"
										value="medium"
										checked={priority === 'medium'}
									/>
									<FormControlLabel
										control={<Radio />}
										label="low"
										value="low"
										checked={priority === 'low'}
									/>
								</RadioGroup>
							</FormControl>
							<FormControl fullWidth>
								<TextField
									label="deadline"
									type="date"
									id="deadline"
									value={deadline}
									onChange={handleDeadline}
									inputProps={{ min: minDate, max: maxDate }}
								/>
							</FormControl>
							<FormControl fullWidth margin="dense">
								<TextField label="image" type="file" onChange={handleImage} />
							</FormControl>
						</Grid>
						<Grid item xs={12} md={6}>
							<FormControl fullWidth>
								<TextField
									multiline
									id="description"
									label="description"
									name="description"
									rows="10"
									rowsMax="10"
									variant="filled"
									value={description}
									onChange={handleInputText}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<FormControl fullWidth>
								<Button
									className={classes.button}
									type="submit"
									variant="contained"
									size="medium"
									color="secondary"
								>
									EDIT
								</Button>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<Divider />
							<Typography className={classes.footer}>
								<Link component={RouterLink} to="/dashboard" color="secondary">
									dashboard
								</Link>
							</Typography>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</div>
	);
}

const mapStateToProps = state => {
	console.log('mapstate');
	return {
		editedTask: state.task.task,
		message: state.task.message,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getTaskById: (_id, controller) => dispatch(getTaskById(_id, controller)),
		editTask: (task, _id) => dispatch(editTask(task, _id)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(EditTask));
