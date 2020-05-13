import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getTaskById } from "../../../store/actions/taskActions";
import "abortcontroller-polyfill/dist/polyfill-patch-fetch";
import PageTitle from "../../shared/PageTitle/PageTitle";
import {
  Grid,
  CardMedia,
  CardContent,
  Card,
  CardActions,
  Typography,
  CardHeader,
  Button,
  Divider,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import teal from "@material-ui/core/colors/teal";

import FetchError from "../../shared/FetchError/FetchError";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";

const styles = (theme) => ({
  wrapperDetailTask: {
    maxWidth: "800px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  root: {
    backgroundColor: "rgba(255,255,255,0.6)",
  },
  media: {
    height: "200px",
  },
  finished: {
    color: teal[700],
    fontWeight: "600",
    marginTop: theme.spacing.unit * 2,
  },
});

function TaskDetail({
  match,
  getTaskById,
  task,
  classes,
  isLoading,
  isError,
  isAuthenticated,
  message,
  history,
}) {
  const [detailTask, setDetailTask] = useState({
    title: "",
    priority: "",
    deadline: "",
    image: "",
    description: "",
    createdAt: "",
    updatedAt: "",
    finished: false,
  });
  const [isMessage, setIsMessage] = useState(false);
  const { idTask } = match.params;

  useEffect(() => {
    if (!isAuthenticated) history.push("/users/signin");
    let mounted = true;
    const controller = new AbortController();

    if (mounted) {
      setIsMessage(true);
      getTaskById(idTask, controller);

      if (task) {
        setDetailTask({
          title: task.title,
          priority: task.priority,
          deadline: task.deadline,
          image: task.image,
          description: task.description,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
          finished: task.finished,
        });
      }
      setIsMessage(false);
    }
    return () => {
      mounted = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task._id, isAuthenticated]);

  //
  if (isError)
    return (
      <>
        <FetchError />
        {isMessage && (
          <Typography
            component="span"
            variant="body1"
            align="center"
            classes={{ root: classes.message }}
          >
            {message}
          </Typography>
        )}
      </>
    );
  else if (isLoading)
    return (
      <>
        {isMessage && (
          <Typography
            component="span"
            variant="body1"
            align="center"
            classes={{ root: classes.message }}
          >
            {message}
          </Typography>
        )}
        <LoadingSpinner description="Loading taks details" />
      </>
    );

  const {
    title,
    description,
    image,
    finished,
    createdAt,
    updatedAt,
    deadline,
  } = detailTask;

  return (
    <div className={classes.wrapperDetailTask}>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <PageTitle>tasks details</PageTitle>
          <Typography component="div" variant="subtitle2" align="center">
            {idTask}
          </Typography>
          <Typography component="p" variant="subtitle1" align="center">
            {isMessage ? message : "..."}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Card classes={{ root: classes.root }}>
            <CardHeader
              title={title}
              subheader={`Created at ${createdAt}. Updated at ${updatedAt}. DEADLINE ${deadline}`}
            />
            {image ? (
              <CardMedia
                className={classes.media}
                image={image}
                title={title}
              />
            ) : (
              <LoadingSpinner description="Loading image" />
            )}
            {/* <CardMedia className={classes.media} image={image} title={title} /> */}
            <CardContent>
              <Typography variant="body2" component="p">
                {description}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                classes={{ root: classes.finished }}
              >
                {finished ? "FINISHED" : "NOT FINISHED"}
              </Typography>
            </CardContent>
            <Divider />
            <CardActions>
              <Button component={RouterLink} to="/dashboard">
                dashboard
              </Button>
              <Button component={RouterLink} to={`/tasks/todo/edit/${idTask}`}>
                edit
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
//
const mapStateToProps = (state) => {
  return {
    task: state.task.task,
    isLoading: state.task.isLoading,
    isError: state.task.isError,
    message: state.task.isMessage,
    isAuthenticated: state.user.isAuthenticated,
  };
};
//
const mapDispatchToProps = (dispatch) => {
  return {
    getTaskById: (id, controller) => dispatch(getTaskById(id, controller)),
  };
};
//
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TaskDetail));
