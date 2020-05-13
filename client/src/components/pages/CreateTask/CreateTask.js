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
import { createTask } from "../../../store/actions/taskActions";
import teal from "@material-ui/core/colors/teal";
import FetchError from "../../shared/FetchError/FetchError";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";

const cloudinary = require("../../../utils/cloudinary");

const styles = (theme) => ({
  createTask: {},
  formWrapper: {
    maxWidth: "800px",
    marginLeft: "auto",
    marginRight: "auto",
    padding: theme.spacing.unit * 3,
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  formTitle: {
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center",
  },
  avatarCreate: {
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

function CreateTask(props) {
  const {
    classes,
    createTask,
    message,
    isAuthenticated,
    isLoading,
    isError,
  } = props;
  const minDate = new Date().toISOString().slice(0, 10);
  let maxDate = minDate.slice(0, 4) * 1 + 2;
  maxDate = maxDate + "-12-31";
  //
  const [task, setTask] = useState({
    title: "",
    priority: "high",
    deadline: minDate,
    image: null,
    description: "",
    createdAt: minDate,
    updatedAt: minDate,
    finished: false,
  });
  //
  const [isMessage, setIsMessage] = useState(false);
  //
  const [isCreateTask, setIsCreateTask] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const handlePriority = (event) => {
    //
    setTask({
      ...task,
      priority: event.target.value,
    });
  };
  //
  const handleInputText = (event) => {
    //
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
  const [file, setFile] = useState(null);
  /**
   * Save file to state
   * @param {*} event
   */
  const handleFile = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };
  //
  const handleCreatingTodoTask = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudinary.CLOUDINARY_UPLOAD_PRESET);
    try {
      setIsUploadingImage(true);
      const res = await fetch(cloudinary.CLOUDINARY_API_BASE_URL, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setIsUploadingImage(false);
      const imageURL = data.secure_url;

      formData.append("image", file);
      formData.append("title", task.title);
      formData.append("priority", task.priority);
      formData.append("description", task.description);
      formData.append("deadline", task.deadline);
      formData.append("createdAt", task.createdAt);
      formData.append("updatedAt", task.updatedAt);

      setTask({
        ...task,
        image: imageURL,
      });

      formData.delete("file");
      formData.delete("upload_preset");

      setIsMessage(true);
      createTask(formData);

      setTask({
        title: "",
        priority: "high",
        deadline: minDate,
        image: null,
        description: "",
        createdAt: minDate,
        updatedAt: minDate,
      });
      setFile("");
      setIsCreateTask(true);
    } catch (error) {}
  };

  const { title, priority, deadline, description } = task;
  //
  useEffect(() => {
    if (!isAuthenticated) props.history.push("/users/signin");

    const interval = setTimeout(() => setIsMessage(false), 1000);
    return () => {
      clearTimeout(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
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
        <LoadingSpinner description="Creating task" />
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
  return (
    <div className={classes.createTask}>
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
      <PageTitle>create todo task</PageTitle>
      <Paper className={classes.formWrapper} elevation={1}>
        <form
          className={classes.form}
          onSubmit={handleCreatingTodoTask}
          encType="multipart/form-data"
        >
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
                  required
                  onChange={handleDeadline}
                  inputProps={{ min: minDate, max: maxDate }}
                />
              </FormControl>
              {/* <FormControl fullWidth margin="dense">
                <TextField
                  label="image"
                  name="image"
                  type="file"
                  onChange={handleImage}
                />
              </FormControl> */}
              <FormControl fullWidth variant="outlined">
                <TextField type="file" name="image" onChange={handleFile} />
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
      {isCreateTask && <Redirect to="/dashboard" />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.task.isLoading,
    isError: state.task.isError,
    message: state.task.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createTask: (task) => dispatch(createTask(task)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreateTask));
