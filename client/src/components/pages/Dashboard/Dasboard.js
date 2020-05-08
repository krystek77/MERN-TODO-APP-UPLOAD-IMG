import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import PageTitle from "../../shared/PageTitle/PageTitle";
import TodoTasksList from "../../shared/TodoTasksList/TodoTasksList";

import { Grid, Paper, Typography } from "@material-ui/core";
import LastAddedTodoTask from "./Notification/LastAddedTodoTask/LastAddedTodoTask";
import UrgentTodoTask from "./Notification/UrgentTodoTask/UrgentTodoTask";
import { connect } from "react-redux";
import { getAllTasks, clearMessage } from "../../../store/actions/taskActions";
import teal from "@material-ui/core/colors/teal";
import FetchError from "../../shared/FetchError/FetchError";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import "abortcontroller-polyfill/dist/polyfill-patch-fetch";

const styles = (theme) => ({
  dashboard: {},
  dashboardWrapper: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: theme.spacing.unit * 3,
    backgroundColor: "transparent",
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
    fontSize: "0.8rem",
    fontWeight: "500",
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    width: "max-content",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "0.5rem 0.8rem",
    borderRadius: "4px",
  },
  message: {
    padding: "1rem",
    marginBottom: "2rem",
    width: "max-content",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "4px",
    backgroundColor: teal[700],
    color: teal[50],
    position: "fixed",
    zIndex: 2,
    left: theme.spacing.unit * 4,
    top: "100px",
  },
});

function Dashboard(props) {
  const {
    classes,
    tasks,
    message,
    isLoading,
    isError,
    getAllTasks,
    clearMessage,
    isAuthenticated,
  } = props;
  // console.log(props);
  useEffect(() => {
    if (!isAuthenticated) props.history.push("/users/signin");

    // console.log('useEffect from dasboard');
    let mounted = true;
    const controller = new AbortController();
    const interval = setTimeout(clearMessage, 2000);
    if (mounted) {
      getAllTasks(controller);
    }

    return () => {
      mounted = false;
      controller.abort();
      clearTimeout(interval);
      // console.log('Unmounting dashboard, nounted = ', mounted);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks.length, isAuthenticated]);

  if (isError) {
    return <FetchError />;
  } else if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={classes.dashboard}>
      {message && (
        <Typography
          component="span"
          variant="body1"
          align="center"
          classes={{ root: classes.message }}
        >
          Message: {message}
        </Typography>
      )}
      <Paper className={classes.dashboardWrapper} elevation={0}>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <PageTitle>DASHBOARD</PageTitle>
          </Grid>
          <Grid item xs={12}>
            <Typography
              component="h2"
              variant="h5"
              classes={{ h5: classes.h5 }}
            >
              NOTIFICATIONS
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <LastAddedTodoTask tasks={tasks} />
          </Grid>
          <Grid item xs={12} md={6}>
            <UrgentTodoTask tasks={tasks} />
          </Grid>
          <Grid item xs={12}>
            <Typography
              component="h2"
              variant="h5"
              classes={{ h5: classes.h5 }}
            >
              TODO
            </Typography>
            <TodoTasksList tasks={tasks} />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

const mapStateToProps = (state) => {
  // console.log('CURRENT STATE DASHBOARD:', state);
  return {
    tasks: state.task.tasks,
    isLoading: state.task.isLoading,
    isError: state.task.isError,
    message: state.task.message,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAllTasks: (controller) => dispatch(getAllTasks(controller)),
  clearMessage: () => dispatch(clearMessage()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Dashboard));
