import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from '../../pages/Home/Home';
import Dashboard from '../../pages/Dashboard/Dasboard';
import TodoTasks from '../../pages/TodoTasks/TodoTasks';
import CreateTask from '../../pages/CreateTask/CreateTask';
import EditTask from '../../pages/EditTask/EditTask';
import DoneTasks from '../../pages/DoneTasks/DoneTasks';
import SignIn from '../../pages/SignIn/SignIn';
import SignUp from '../../pages/SignUp/SignUp';
import NotFounded from '../../pages/NotFounded/NotFounded';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import TaskDetail from '../../pages/TaskDetail/TaskDetail';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const styles = theme => ({
	content: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'nowrap',
		height: '100%',
		flexGrow: '1',
	},
	main: {
		flexGrow: '1',
		background: 'url(/img/bg_beach.jpg)',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'left bottom',
		backgroundSize: 'cover',
		backgroundAttachment: 'fixed',
		padding: '1rem 1rem 6rem',
		marginTop: '81px',
	},
});

function Content({ classes, isAuthenticated }) {
	return ( 
		<div className={classes.content}>
			<Navigation isAuthenticated={isAuthenticated} />
			<main className={classes.main}>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route
						path="/dashboard"
						render={props => <Dashboard {...props} isAuthenticated={isAuthenticated} />}
					/>
					<Route
						path="/tasks/todo"
						exact
						render={props => <TodoTasks {...props} isAuthenticated={isAuthenticated} />}
					/>
					<Route
						path="/tasks/todo/create"
						render={props => <CreateTask {...props} isAuthenticated={isAuthenticated} />}
					/>
					<Route
						path="/tasks/todo/details/:idTask"
						render={props => <TaskDetail {...props} isAuthenticated={isAuthenticated} />}
					/>
					<Route
						path="/tasks/todo/edit/:idTask"
						render={props => <EditTask {...props} isAuthenticated={isAuthenticated} />}
					/>
					<Route
						path="/tasks/done"
						render={props => <DoneTasks {...props} isAuthenticated={isAuthenticated} />}
					/>
					<Route path="/users/signin" exact component={SignIn} />
					<Route path="/users/signup" exact component={SignUp} />
					<Route component={NotFounded} />
				</Switch>
			</main>
			<Footer />
		</div>
	);
}
const mapStateToProps = state => {
	return {
		isAuthenticated: state.user.isAuthenticated,
	};
};

export default connect(
	mapStateToProps,
	null
)(withStyles(styles)(Content));
