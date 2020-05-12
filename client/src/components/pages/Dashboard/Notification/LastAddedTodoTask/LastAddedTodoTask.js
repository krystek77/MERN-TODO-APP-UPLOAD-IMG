import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Divider,
  ButtonBase,
  IconButton,
  SvgIcon,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import SvgIconButton from "../../../../shared/SvgIconButton/SvgIconButton";
import teal from "@material-ui/core/colors/teal";
import { deleteTask } from "../../../../../store/actions/taskActions";
import { connect } from "react-redux";

const styles = (theme) => ({
  lastAddedTodoTask: {
    padding: theme.spacing.unit * 3,
  },
  media: {
    height: "200px",
  },
  h6: {
    textTransform: "uppercase",
    fontSize: "1rem",
    paddingBottom: theme.spacing.unit,
  },
  card: {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "600px",
  },
  span: {
    display: "inline-block",
    paddingTop: theme.spacing.unit * 1,
    paddingRight: theme.spacing.unit * 2,
  },
  width: {
    minWidth: "100px",
  },
  buttonBase: {
    width: "100%",
    "&:hover": {
      backgroundColor: teal[100],
    },
  },
  green: {
    color: "green",
  },
  black: {
    color: "black",
  },
  icon: {
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: "initial",
      color: theme.palette.secondary.main,
    },
  },
});

function LastAddedTodoTask({ classes, tasks, deleteTask }) {
  const [lastAddedTask, setLastAddedTask] = useState({
    _id: "",
    title: "",
    description: "",
    createdAt: "",
    deadline: "",
    image: "img/sea.jpg",
    finished: false,
  });
  const findLastAddedTask = (tasks) => {
    let task = {};
    task = [...tasks].sort(function (a, b) {
      if (a.createdAt < b.createdAt) return 1;
      if (a.createdAt > b.createdAt) return -1;
      return 0;
    })[0];
    return task;
  };

  const handleDeleteTask = (_id) => {
    if (_id) {
      deleteTask(_id);
    }
  };

  useEffect(() => {
    let mounted = true;
    const task = findLastAddedTask(tasks);
    if (mounted) {
      if (task) {
        setLastAddedTask({
          _id: task._id,
          title: task.title,
          description: task.description,
          createdAt: task.createdAt,
          deadline: task.deadline,
          image: task.image,
          finished: task.finished,
        });
      }
    }
    return () => {
      mounted = false;
      console.log("LAST ADDED TASK UNMOUNTED");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { _id, title, description, createdAt, image } = lastAddedTask;

  return (
    <div className={classes.lastAddedTodoTask}>
      <Typography
        component="h3"
        variant="h6"
        classes={{ h6: classes.h6 }}
        align="center"
      >
        Last added
      </Typography>
      <Card classes={{ root: classes.card }}>
        <ButtonBase
          component={RouterLink}
          to={`/tasks/todo/edit/${_id}`}
          classes={{ root: classes.buttonBase }}
        >
          <CardActionArea>
            <CardMedia className={classes.media} title={title} image={image} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h3">
                {title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {description}
              </Typography>
              <Divider />
              <Typography
                component="span"
                variant="body2"
                classes={{ root: classes.span }}
                className={classes.width}
              >
                Created at:
              </Typography>
              <Typography
                component="span"
                variant="body2"
                classes={{ root: classes.span }}
              >
                {createdAt}
              </Typography>
            </CardContent>
          </CardActionArea>
        </ButtonBase>
        <CardActions>
          <ButtonBase component={RouterLink} to={`/tasks/todo/edit/${_id}`}>
            <IconButton classes={{ root: classes.icon }}>
              <SvgIcon>
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
              </SvgIcon>
            </IconButton>
          </ButtonBase>
          <SvgIconButton handleClick={() => handleDeleteTask(_id)}>
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
            />
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M0 0h24v24H0z"
              fill="none"
            />
          </SvgIconButton>
          <ButtonBase component={RouterLink} to={`/tasks/todo/details/${_id}`}>
            <IconButton classes={{ root: classes.icon }}>
              <SvgIcon>
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </SvgIcon>
            </IconButton>
          </ButtonBase>
        </CardActions>
      </Card>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTask: (_id) => dispatch(deleteTask(_id)),
  };
};
export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(LastAddedTodoTask));
