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
import { createTask } from '../../../store/actions/taskActions';
import teal from '@material-ui/core/colors/teal';

const styles = theme => ({
	createTask: {},
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
	avatarCreate: {
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

function CreateTask(props) {
	const {classes, createTask, message, isAuthenticated} = props;
	const minDate = new Date().toISOString().slice(0, 10);
	let maxDate = minDate.slice(0, 4) * 1 + 2;
	maxDate = maxDate + '-12-31';
	//
	const [task, setTask] = useState({
		title: '',
		priority: 'high',
		deadline: minDate,
		image: null,
		description: '',
		createdAt: minDate,
		updatedAt: minDate,
		finished: false,
	});
	//
	const [isMessage, setIsMessage] = useState(false);
	//
	const handlePriority = event => {
		// console.log(event.target.value);
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
		const image = event.target.files[0];
		setTask({
			...task,
			image,
		});
	};
	//
	const handleCreatingTodoTask = event => {
		//
		event.preventDefault();
		//
		const formData = new FormData();
		//
		formData.append('image', task.image);
		formData.append('title', task.title);
		formData.append('priority', task.priority);
		formData.append('description', task.description);
		formData.append('deadline', task.deadline);
		formData.append('createdAt', minDate);
		formData.append('updatedAt', minDate);

		createTask(formData);
		//
		setIsMessage(true);
		//
		setTask({
			title: '',
			priority: 'high',
			deadline: minDate,
			image: null,
			description: '',
		});
	};

	const { title, priority, deadline, description } = task;
	//
	useEffect(() => {
		if (!isAuthenticated) props.history.push('/users/signin');

		const interval = setTimeout(() => setIsMessage(false), 1000);
		return () => {
			clearTimeout(interval);
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated, isMessage]);
	//
	return (
		<div className={classes.createTask}>
			{isMessage ? (
				<Typography component="span" variant="body1" align="center" classes={{ root: classes.message }}>
					Message: {message}
				</Typography>
			) : null}
			<PageTitle>create todo task</PageTitle>
			<Paper className={classes.formWrapper} elevation={1}>
				<form className={classes.form} onSubmit={handleCreatingTodoTask} encType="multipart/form-data">
					<Grid container spacing={16}>
						<Grid item xs={12}>
							<div className={classes.formTitle}>
								<Avatar className={classes.avatarCreate}>
									<Icon className={classes.icon}>create</Icon>
								</Avatar>
								<Typography component="span" variant="h5">
									create
								</Typography>
							</div>
						</Grid>
						<Grid item xs={12} md={6}>
							<FormControl fullWidth required>
								<InputLabel htmlFor="title">Title</InputLabel>
								<Input
									value={title}
									onChange={handleInputText}
									type="text"
									id="title"
									name="title"
									placeholder="enter title task"
									autoFocus
								/>
							</FormControl>
							<FormControl margin="dense" required>
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
									required
									onChange={handleDeadline}
									inputProps={{ min: minDate, max: maxDate }}
								/>
							</FormControl>
							<FormControl fullWidth margin="dense">
								<TextField label="image" name="image" type="file" onChange={handleImage} />
							</FormControl>
						</Grid>
						<Grid item xs={12} md={6}>
							<FormControl fullWidth>
								<TextField
									multiline
									id="description"
									label="description"
									name="description"
									placeholder="enter description task"
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
									CREATE
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
	return {
		message: state.task.message,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		createTask: task => dispatch(createTask(task)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(CreateTask));
