import React, { useState, useEffect } from "react";
import { Link as RouterLink, Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
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
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import PageTitle from "../../shared/PageTitle/PageTitle";
import { connect } from "react-redux";
import { getTaskById, editTask } from "../../../store/actions/taskActions";
import "abortcontroller-polyfill/dist/polyfill-patch-fetch";
import teal from "@material-ui/core/colors/teal";

import FetchError from "../../shared/FetchError/FetchError";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";

const styles = (theme) => ({
  editTask: {},
  formWrapper: {
    maxWidth: "800px",
    marginLeft: "auto",
    marginRight: "auto",
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 2,
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  formTitle: {
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center",
  },
  avatarEdit: {
    backgroundColor: theme.palette.secondary.main,
    marginRight: theme.spacing.unit,
  },
  icon: {
    color: theme.palette.secondary.contrastText,
  },
  button: {
    marginLeft: "auto",
    marginRight: theme.spacing.unit * 2,
  },
  footer: {
    paddingTop: theme.spacing.unit * 3,
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

function EditTask(props) {
  const {
    classes,
    match,
    tasks,
    editTask,
    message,
    isAuthenticated,
    isLoading,
    isError,
  } = props;
  const id = match.params.idTask;
  const minDate = new Date().toISOString().slice(0, 10);
  let maxDate = minDate.slice(0, 4) * 1 + 2;
  maxDate = maxDate + "-12-31";
  //
  const [task, setTask] = useState({
    title: "",
    priority: "",
    deadline: "",
    image: null,
    description: "",
    updatedAt: minDate,
    createdAt: "",
  });
  //
  const [isMessage, setIsMessage] = useState(false);
  //
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  //
  const handlePriority = (event) => {
    setTask({
      ...task,
      priority: event.target.value,
    });
  };
  //
  const handleInputText = (event) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });
  };
  //
  const handleDeadline = (event) => {
    setTask({
      ...task,
      deadline: event.target.value,
    });
  };
  /**
   * Save file to state
   * @param {*} event
   */
  const handleImage = (event) => {
    const image = event.target.files[0];

    setTask({
      ...task,
      image: image,
    });
  };

  const CLOUDINARY_API_BASE_URL =
    "https://api.cloudinary.com/v1_1/doydwvtkw/image/upload";
  const CLOUDINARY_UPLOAD_PRESET = "d1lq6n03";

  const handleUpdatingTodoTask = async (event) => {
    event.preventDefault();
    //
    const formData = new FormData();
    formData.append("file", task.image);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    try {
      setIsUploadingImage(true);
      const res = await fetch(CLOUDINARY_API_BASE_URL, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setIsUploadingImage(false);
      const imgURL = data.secure_url;

      formData.append("image", task.image);
      formData.append("title", task.title);
      formData.append("priority", task.priority);
      formData.append("description", task.description);
      formData.append("deadline", task.deadline);
      formData.append("updatedAt", minDate);
      formData.append("createdAt", task.createdAt);

      setTask({
        ...task,
        image: imgURL,
      });

      formData.delete("file");
      formData.delete("upload_preset");

      setIsMessage(true);
      editTask(formData, id);
      setIsEditingTask(true);
      //
    } catch (error) {}
  };

  useEffect(() => {
    if (!isAuthenticated) props.history.push("/users/signin");
    let mounted = true;
    const filteredTaskById = tasks.filter((task) => task._id === id);
    const [task] = filteredTaskById;
    const controller = new AbortController();
    const interval = setTimeout(() => setIsMessage(false), 1000);

    if (mounted) {
      if (task) {
        setTask({
          ...task,
        });
      }
    }

    return () => {
      mounted = false;
      controller.abort();
      clearInterval(interval);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //
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
        <LoadingSpinner description="Editing task" />
      </>
    );
  else if (isUploadingImage)
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
        <LoadingSpinner description="Uploading image" />
      </>
    );
  let { title, priority, deadline, description, image } = task;
  return (
    <div className={classes.wditTask}>
      {isMessage ? (
        <Typography
          component="span"
          variant="body1"
          align="center"
          classes={{ root: classes.message }}
        >
          Message: {message}
        </Typography>
      ) : null}
      <PageTitle>edit task</PageTitle>
      <Typography component="div" variant="subtitle2" align="center">
        {id}
      </Typography>
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
                    checked={priority === "high"}
                  />
                  <FormControlLabel
                    control={<Radio />}
                    label="medium"
                    value="medium"
                    checked={priority === "medium"}
                  />
                  <FormControlLabel
                    control={<Radio />}
                    label="low"
                    value="low"
                    checked={priority === "low"}
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
                <TextField
                  label="image"
                  type="file"
                  name="image"
                  onChange={handleImage}
                />
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
      {isEditingTask && <Redirect to={`/tasks/todo/details/${id}`} />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.task.isLoading,
    isError: state.task.isError,
    tasks: state.task.tasks,
    message: state.task.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editTask: (task, _id) => dispatch(editTask(task, _id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EditTask));
