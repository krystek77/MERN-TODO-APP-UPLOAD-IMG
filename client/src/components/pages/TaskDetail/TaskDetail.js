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

function TaskDetail({ match, getTaskById, task, classes }) {
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

  const { idTask } = match.params;

  useEffect(() => {
    let mounted = true;
    console.log(idTask);

    const controller = new AbortController();

    if (mounted) {
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
    }
    return () => {
      mounted = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task._id]);

  const {
    title,
    description,
    image,
    finished,
    createdAt,
    updatedAt,
    deadline,
  } = detailTask;
  console.log(task);
  return (
    <div className={classes.wrapperDetailTask}>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <PageTitle>detail task - {idTask}</PageTitle>
        </Grid>
        <Grid item xs={12}>
          <Card classes={{ root: classes.root }}>
            <CardHeader
              title={title}
              subheader={`Created at ${createdAt}. Updated at ${updatedAt}. DEADLINE ${deadline}`}
            />
            <CardMedia
              className={classes.media}
              image={image}
              title={title}
            />
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
